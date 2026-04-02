#!/usr/bin/env node
/**
 * Adds inter-course navigation links:
 * - At the END of each course's last module: "Cours suivant → ..."
 * - At the START of each course's first module: "Cours précédent: ..."
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

const NAV_END_MARKER = '<!-- navigation-inter-cours -->';
const NAV_START_MARKER = '<!-- nav-cours-precedent -->';

// Full curriculum progression order
const PROGRESSION = [
  {
    slug: '05-algorithms',
    name: 'Algorithms',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/12-projet-final.md',
  },
  {
    slug: '00-typescript',
    name: 'TypeScript',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/19-projet-final.md',
  },
  {
    slug: '01-js-runtime',
    name: 'JS Runtime',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-vue-ensemble.md',
    lastFile: 'modules/15-debugging-session.md',
  },
  {
    slug: '02-vue',
    name: 'Vue.js',
    type: 'cours',
    firstFile: 'cours/01-debutant/00-typer-vue3.md',
    lastFile: 'cours/12-vue-query/02-patterns-avances.md',
  },
  {
    slug: '03-angular',
    name: 'Angular',
    type: 'cours',
    firstFile: 'cours/00-de-vue-a-angular/01-vue-vs-angular-mental-model.md',
    lastFile: 'cours/12-recettes-esn/02-entretien-technique.md',
  },
  {
    slug: '04-react',
    name: 'React',
    type: 'cours',
    firstFile: 'cours/00-de-vue-angular-a-react/01-react-mental-model.md',
    lastFile: 'cours/12-recettes-esn/02-entretien-technique.md',
  },
  {
    slug: '06-testing',
    name: 'Testing',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/18-projet-final.md',
  },
  {
    slug: '07-nestjs',
    name: 'NestJS',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-monde-backend.md',
    lastFile: 'modules/26-graphql-nestjs.md',
  },
  {
    slug: '08-postgresql',
    name: 'PostgreSQL',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-vue-ensemble.md',
    lastFile: 'modules/18-partitioning-et-scaling.md',
  },
  {
    slug: '09-http-caching',
    name: 'HTTP & Caching',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-vue-ensemble.md',
    lastFile: 'modules/15-projet-final.md',
  },
  {
    slug: '11-architecture',
    name: 'Architecture',
    type: 'cours',
    firstFile: 'cours/00-fondamentaux/01-quest-ce-que-architecture.md',
    lastFile: 'cours/13-culture-architecturale/06-modernisation-legacy.md',
  },
  {
    slug: '13-distributed-systems',
    name: 'Systemes Distribues',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/24-projet-final.md',
  },
  {
    slug: '12-observability-sre',
    name: 'Observabilite & SRE',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/19-projet-final.md',
  },
  {
    slug: '15-react-native',
    name: 'React Native',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/27-projet-final.md',
    bonus: true,
  },
  {
    slug: '16-webgpu-3d',
    name: 'WebGPU & 3D',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-introduction.md',
    lastFile: 'modules/29-projet-final-expert.md',
    bonus: true,
  },
  {
    slug: '14-ia',
    name: 'IA pour Devs JS',
    type: 'modules',
    firstFile: 'modules/00-prerequis-et-paysage-ia.md',
    lastFile: 'modules/19-projet-final.md',
  },
];

function relativePath(fromSlug, fromType, toSlug, toFile) {
  // from modules/XX.md or cours/XX/YY.md → to ../../other-course/file
  const depth = fromType === 'cours' ? '../../../' : '../../';
  return `${depth}${toSlug}/${toFile}`;
}

let modified = 0;

for (let i = 0; i < PROGRESSION.length; i++) {
  const course = PROGRESSION[i];
  const prev = i > 0 ? PROGRESSION[i - 1] : null;
  const next = i < PROGRESSION.length - 1 ? PROGRESSION[i + 1] : null;

  // === ADD "Cours suivant" at the END of last module ===
  if (next) {
    const lastPath = join(ROOT, course.slug, course.lastFile);
    if (!existsSync(lastPath)) {
      console.warn(`⚠️  Not found: ${course.slug}/${course.lastFile}`);
      continue;
    }

    let content = readFileSync(lastPath, 'utf-8').replace(/\r\n/g, '\n');

    if (!content.includes(NAV_END_MARKER)) {
      const link = relativePath(course.slug, course.type, next.slug, next.firstFile);
      const bonusNote = next.bonus
        ? `\n> Ce cours est optionnel (Palier 5 — bonus). Tu peux aussi passer directement au cours suivant.`
        : '';

      const block = `
---

${NAV_END_MARKER}

::: info Cours suivant
Bravo, tu as termine le cours **${course.name}** ! ${bonusNote}
Le prochain cours du curriculum est **${next.name}**.

[Commencer ${next.name} →](${link})
:::
`;
      if (!content.endsWith('\n')) content += '\n';
      content += block;
      writeFileSync(lastPath, content, 'utf-8');
      modified++;
    }
  } else {
    // Last course in curriculum
    const lastPath = join(ROOT, course.slug, course.lastFile);
    if (existsSync(lastPath)) {
      let content = readFileSync(lastPath, 'utf-8').replace(/\r\n/g, '\n');
      if (!content.includes(NAV_END_MARKER)) {
        const block = `
---

${NAV_END_MARKER}

::: info Curriculum termine
Bravo, tu as termine le dernier cours du curriculum Full-Stack JavaScript !

Consulte le [projet capstone](../../capstone/projet-capstone-fullstack.md) pour mettre en pratique l'ensemble de tes competences dans un projet integre.
:::
`;
        if (!content.endsWith('\n')) content += '\n';
        content += block;
        writeFileSync(lastPath, content, 'utf-8');
        modified++;
      }
    }
  }

  // === ADD "Cours précédent" at the START of first module ===
  if (prev) {
    const firstPath = join(ROOT, course.slug, course.firstFile);
    if (!existsSync(firstPath)) {
      console.warn(`⚠️  Not found: ${course.slug}/${course.firstFile}`);
      continue;
    }

    let content = readFileSync(firstPath, 'utf-8').replace(/\r\n/g, '\n');

    if (!content.includes(NAV_START_MARKER)) {
      const link = relativePath(course.slug, course.type, prev.slug, prev.lastFile);
      const navBlock = `${NAV_START_MARKER}\n> **Cours precedent** : [${prev.name}](${link}). Si tu arrives ici sans avoir fait les cours precedents, consulte le [guide de demarrage](${course.type === 'cours' ? '../../../' : '../../'}GUIDE-DEMARRAGE.md).\n\n`;

      // Insert after the first heading line
      const firstHeadingEnd = content.indexOf('\n');
      if (firstHeadingEnd !== -1) {
        const afterHeading = content.indexOf('\n', firstHeadingEnd + 1);
        // Insert after first blank line after heading
        content = content.slice(0, firstHeadingEnd + 1) + '\n' + navBlock + content.slice(firstHeadingEnd + 1);
      }

      writeFileSync(firstPath, content, 'utf-8');
      modified++;
    }
  }
}

console.log(`✅ ${modified} files updated with inter-course navigation`);
