#!/usr/bin/env node
/**
 * Phase 1: Add screencasts to existing parcours blocks (11 module-based courses)
 * Phase 2: Add parcours blocks to 4 cours-based courses (03-vue, 08-react, 09-angular, 10-architecture)
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MARKER = '<!-- parcours-recommande -->';

// ════════════════════════════════════════════
// PHASE 1: Add screencasts to module-based courses
// ════════════════════════════════════════════

const MODULE_COURSES = [
  '01-typescript', '02-js-runtime', '04-testing', '05-nestjs',
  '06-postgresql', '07-http-caching', '11-distributed-systems',
  '12-observability-sre', '13-react-native', '14-webgpu-3d', '15-ia',
];

function findScreencast(courseDir, modNum) {
  const dir = join(courseDir, 'screencasts');
  if (!existsSync(dir)) return null;
  const padded = String(modNum).padStart(2, '0');
  const files = readdirSync(dir);
  return files.find(f => f.startsWith(`screencast-${padded}-`) && f.endsWith('.md')) || null;
}

let phase1Count = 0;

for (const courseSlug of MODULE_COURSES) {
  const courseDir = join(ROOT, courseSlug);
  const modulesDir = join(courseDir, 'modules');
  if (!existsSync(modulesDir)) continue;

  const moduleFiles = readdirSync(modulesDir).filter(f => f.endsWith('.md'));
  let modified = 0;

  for (const file of moduleFiles) {
    const match = file.match(/^(\d+)-/);
    if (!match) continue;
    const modNum = parseInt(match[1], 10);

    const filePath = join(modulesDir, file);
    let content = readFileSync(filePath, 'utf-8');

    if (!content.includes(MARKER)) continue;

    // Already has screencast?
    if (content.includes('**Screencast**')) continue;

    const screencast = findScreencast(courseDir, modNum);
    if (!screencast) continue;

    // Insert screencast line before the ::: closing
    const scLine = `1. **Screencast** : [${screencast.replace('.md', '').replace(/-/g, ' ')}](../screencasts/${screencast})`;

    // Insert as first item (before Lab)
    content = content.replace(
      /(::: tip Parcours recommandé\n)/,
      `$1${scLine}\n`
    );

    // Renumber remaining items
    let stepNum = 2;
    content = content.replace(
      /(::: tip Parcours recommandé\n.*\n)((?:\d+\. \*\*(?:Lab|Visualisation|Quiz)\*\*.*\n)+)/,
      (match, header, items) => {
        const renumbered = items.replace(/^\d+/gm, () => String(stepNum++));
        return header + renumbered;
      }
    );

    writeFileSync(filePath, content, 'utf-8');
    modified++;
  }

  if (modified > 0) {
    console.log(`📹 ${courseSlug}: ${modified} screencasts added`);
    phase1Count += modified;
  }
}

console.log(`Phase 1 done: ${phase1Count} screencasts added\n`);

// ════════════════════════════════════════════
// PHASE 2: Add parcours blocks to cours-based courses
// ════════════════════════════════════════════

// Mapping: for each cours-based course, define modules with their last file
// and associated exercises, quizzes, projet-fil-rouge

const COURS_COURSES = {
  '03-vue': {
    modules: [
      {
        lastFile: 'cours/01-debutant/07-options-vs-composition-api.md',
        exercises: ['02-compteur-reactif', '03-liste-de-taches', '04-formulaire-contact', '05-catalogue-produits', '06-chronometre', '07-options-vs-composition'],
      },
      {
        lastFile: 'cours/02-intermediaire/06-transitions-et-animations.md',
        exercises: ['08-theme-injection', '09-dashboard-composables', '09-dashboard-filtres', '10-crud-api', '11-formulaire-multi-etapes', '12-carte-profil-slots', '13-tableau-generique', '13-tableau-reutilisable', '14-galerie-animee'],
      },
      {
        lastFile: 'cours/03-avance/07-msw-et-mocking-api.md',
        exercises: ['15-app-multi-pages', '16-store-pinia', '17-tests-complets', '28-e2e-playwright', '28b-msw-vitest'],
      },
      {
        lastFile: 'cours/04-expert/04-patterns-entreprise.md',
        exercises: ['18-performance-audit', '19-architecture-patterns'],
      },
      {
        lastFile: 'cours/05-nuxt3/05-seo-et-meta.md',
        exercises: ['20-nuxt-patterns', '20-blog-nuxt-simule'],
      },
      {
        lastFile: 'cours/06-storybook/03-design-system.md',
        exercises: ['21-ui-kit-storybook', '21-ui-kit-composants'],
      },
      {
        lastFile: 'cours/07-cicd/03-monitoring.md',
        exercises: ['22-pipeline-ci', '22-pipeline-ci-visuel'],
      },
      {
        lastFile: 'cours/08-api-typees/02-trpc.md',
        exercises: ['23-client-api-type'],
      },
      {
        lastFile: 'cours/09-accessibilite/03-audit-a11y.md',
        exercises: ['24-audit-accessibilite'],
        quizzes: ['quiz-09-accessibilite.html'],
      },
      {
        lastFile: 'cours/10-i18n/02-strategies-avancees.md',
        exercises: ['25-i18n-multi-locale'],
      },
      {
        lastFile: 'cours/11-auth-securite/03-rbac-et-permissions.md',
        exercises: ['26-auth-securite'],
      },
      {
        lastFile: 'cours/12-vue-query/02-patterns-avances.md',
        exercises: ['27-vue-query-crud'],
        projetFilRouge: true,
      },
    ],
  },
  '08-react': {
    modules: [
      {
        lastFile: 'cours/00-de-vue-angular-a-react/03-premier-projet-react.md',
        exercises: ['01-premier-composant'],
      },
      {
        lastFile: 'cours/01-composants-jsx/05-evenements-et-formulaires-basiques.md',
        exercises: ['02-compteur-hooks', '03-liste-de-taches', '04-catalogue-produits', '05-chronometre'],
      },
      {
        lastFile: 'cours/02-hooks-fondamentaux/05-custom-hooks.md',
        exercises: ['06-hooks-avances', '07-custom-hooks'],
      },
      {
        lastFile: 'cours/03-state-management/04-tanstack-query.md',
        exercises: ['08-context-theme', '09-zustand-store', '10-react-query'],
      },
      {
        lastFile: 'cours/04-routing/03-protection-et-lazy.md',
        exercises: ['11-routing-multi-pages'],
      },
      {
        lastFile: 'cours/05-formulaires/03-patterns-formulaires-avances.md',
        exercises: ['12-formulaire-rhf', '13-formulaire-multi-etapes'],
      },
      {
        lastFile: 'cours/06-nextjs/05-middleware-et-config.md',
        exercises: ['14-nextjs-blog', '15-server-components', '16-api-routes', '16b-middleware-nextjs'],
      },
      {
        lastFile: 'cours/07-tests/03-tests-api-msw.md',
        exercises: ['17-tests-composants', '18-tests-integration'],
      },
      {
        lastFile: 'cours/08-performance-patterns/04-react-19-nouveautes.md',
        exercises: ['20-performance-audit', '21-composition-patterns'],
        quizzes: ['quiz-10-react19.html'],
      },
      {
        lastFile: 'cours/09-accessibilite/02-aria-patterns-avances.md',
        quizzes: ['quiz-09-accessibilite.html'],
      },
      {
        lastFile: 'cours/09-styling/02-css-modules-et-alternatives.md',
        exercises: ['22-tailwind-dashboard'],
      },
      {
        lastFile: 'cours/10-auth-securite/01-auth-nextauth.md',
        exercises: ['23-auth-nextauth'],
      },
      {
        lastFile: 'cours/11-cicd-deploiement/02-deploiement.md',
      },
      {
        lastFile: 'cours/12-recettes-esn/02-entretien-technique.md',
        exercises: ['25-entretien-react'],
        projetFilRouge: true,
      },
    ],
  },
  '09-angular': {
    modules: [
      {
        lastFile: 'cours/00-de-vue-a-angular/03-premier-projet-angular.md',
        exercises: ['01-premier-composant'],
      },
      {
        lastFile: 'cours/01-composants-templates/08-defer-et-zoneless.md',
        exercises: ['02-compteur-signaux', '03-liste-de-taches', '04-formulaire-template', '05-catalogue-produits', '06-chronometre', '07-pipes-personnalises'],
        quizzes: ['quiz-defer-zoneless.html'],
      },
      {
        lastFile: 'cours/02-signals-avances/03-patterns-signaux.md',
        exercises: ['08-signaux-avances'],
      },
      {
        lastFile: 'cours/03-services-di/03-injection-tokens.md',
        exercises: ['09-theme-injection', '10-dashboard-services'],
      },
      {
        lastFile: 'cours/04-routing/04-lazy-loading.md',
        exercises: ['11-app-multi-pages', '12-guards-et-lazy'],
      },
      {
        lastFile: 'cours/05-rxjs-essentiel/04-interop-signals-rxjs.md',
        exercises: ['13-recherche-rxjs', '13b-rxjs-vs-signals'],
      },
      {
        lastFile: 'cours/06-http-api/03-error-handling-et-cache.md',
        exercises: ['14-crud-api', '15-interceptors'],
      },
      {
        lastFile: 'cours/07-formulaires/04-patterns-formulaires.md',
        exercises: ['16-formulaire-reactive', '17-formulaire-multi-etapes', '18-signal-forms'],
      },
      {
        lastFile: 'cours/08-angular-material/03-cdk-patterns.md',
        exercises: ['19-material-dashboard', '19b-drag-drop-kanban'],
      },
      {
        lastFile: 'cours/09-accessibilite/01-accessibilite-angular.md',
        quizzes: ['quiz-accessibilite-cdk-a11y.html'],
      },
      {
        lastFile: 'cours/09-tests/03-tests-http-et-di.md',
        exercises: ['20-tests-complets'],
      },
      {
        lastFile: 'cours/10-state-management/03-quand-utiliser-quoi.md',
        exercises: ['22-store-signaux', '23-ngrx-signal-store'],
      },
      {
        lastFile: 'cours/11-cicd-auth-securite/02-auth-jwt-guards.md',
        exercises: ['25-auth-complete'],
      },
      {
        lastFile: 'cours/12-recettes-esn/02-entretien-technique.md',
        exercises: ['26-entretien-angular'],
        projetFilRouge: true,
      },
    ],
  },
  '10-architecture': {
    modules: [
      {
        lastFile: 'cours/00-fondamentaux/06-raisonner-en-architecte.md',
        exercises: ['01-refactoring-solid', '02-identifier-patterns', '03-injection-dependances', '04-tradeoff-analysis'],
      },
      {
        lastFile: 'cours/01-patterns-architecturaux/07-twelve-factor-idempotency.md',
        exercises: ['05-layered-to-hexagonal', '06-vertical-slice-module', '07-decomposer-monolithe', '07b-quand-ne-pas-decomposer', '08-twelve-factor-checklist'],
      },
      {
        lastFile: 'cours/02-domain-driven-design/05-repositories-specifications.md',
        exercises: ['09-modeliser-domaine', '10-bounded-contexts-pratique', '10b-context-map', '11-fsm-commande'],
      },
      {
        lastFile: 'cours/03-architecture-backend/08-concurrence-asynchronisme.md',
        exercises: ['12-api-rest-nestjs', '13-auth-oidc-rbac', '14-multi-tenant-isolation', '14b-multi-site', '15-job-queue-bullmq', '16-race-condition-locking'],
      },
      {
        lastFile: 'cours/04-architecture-bdd/06-search-architecture.md',
        exercises: ['17-schema-ecommerce', '18-optimisation-requetes', '18b-fulltext-search', '19-polyglot-persistence', '20-search-abstraction'],
      },
      {
        lastFile: 'cours/05-architecture-frontend/10-offline-first-pwa.md',
        exercises: ['21-component-tree', '22-design-tokens-theme', '23-ssr-isr-hybrid', '24-performance-audit', '25-i18n-hreflang', '25b-seo-audit', '26-micro-frontend', '27-pwa-offline'],
      },
      {
        lastFile: 'cours/06-communication-integration/06-api-gateway-bff.md',
        exercises: ['28-http2-benchmark', '29-api-rest-avancee', '30-webhook-hmac', '30b-webhook-consumer', '31-bff-ecommerce'],
      },
      {
        lastFile: 'cours/07-patterns-distribues/07-consistency-patterns.md',
        exercises: ['32-cap-classifier', '33-cqrs-catalogue-commandes', '34-saga-commande', '35-outbox-pattern', '36-game-day-panne'],
      },
      {
        lastFile: 'cours/08-securite/06-privacy-by-design.md',
        exercises: ['37-threat-model-stride', '38-securiser-api', '39-csp-hash-only', '40-audit-securite', '41-implementer-cmp'],
      },
      {
        lastFile: 'cours/09-performance-scalabilite/06-serverless.md',
        exercises: ['42-cache-multi-niveaux', '43-cdn-image-pipeline', '44-capacity-planning', '45-serverless-vs-containers'],
      },
      {
        lastFile: 'cours/10-observabilite-devops/05-infrastructure-as-code.md',
        exercises: ['46-pipeline-observabilite', '47-slos-error-budgets', '48-cicd-feature-flags', '49-blue-green-deploy'],
      },
      {
        lastFile: 'cours/11-testing-architecture/04-load-testing-production.md',
        exercises: ['50-strategie-test-ecommerce', '51-contract-tests-pact', '51b-msw-mock-layer', '52-load-test-k6'],
      },
      {
        lastFile: 'cours/12-architecture-pratique/07-evolutionary-finops-wardley.md',
        exercises: ['53-adr-c4-fil-rouge', '54-fitness-functions', '55-team-topologies', '56-wardley-map'],
      },
      {
        lastFile: 'cours/13-culture-architecturale/06-modernisation-legacy.md',
        exercises: ['57-api-mobile-friendly', '58-crdt-editeur', '59-anti-corruption-layer'],
        projetFilRouge: true,
      },
    ],
  },
};

let phase2Count = 0;

for (const [courseSlug, config] of Object.entries(COURS_COURSES)) {
  const courseDir = join(ROOT, courseSlug);
  let modified = 0;

  for (const mod of config.modules) {
    const filePath = join(courseDir, mod.lastFile);
    if (!existsSync(filePath)) {
      console.warn(`⚠️  ${courseSlug}: file not found: ${mod.lastFile}`);
      continue;
    }

    let content = readFileSync(filePath, 'utf-8');

    // Normalize CRLF
    content = content.replace(/\r\n/g, '\n');

    // Skip if already has parcours block
    if (content.includes(MARKER)) continue;

    const exercises = mod.exercises || [];
    const quizzes = mod.quizzes || [];
    const hasProjet = mod.projetFilRouge || false;

    // Nothing to add?
    if (exercises.length === 0 && quizzes.length === 0 && !hasProjet) continue;

    const lines = [];
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(MARKER);
    lines.push('');
    lines.push('::: tip Parcours recommandé');

    let step = 1;

    // Exercises
    for (const ex of exercises) {
      const exDir = join(courseDir, 'exercices', ex);
      if (!existsSync(exDir)) {
        console.warn(`⚠️  ${courseSlug}: exercise not found: exercices/${ex}`);
        continue;
      }

      // Determine link target
      const hasReadme = existsSync(join(exDir, 'README.md'));
      const hasEnonce = existsSync(join(exDir, 'ENONCE.md'));
      let target;
      if (hasReadme) target = `../../exercices/${ex}/README`;
      else if (hasEnonce) target = `../../exercices/${ex}/ENONCE`;
      else target = `../../exercices/${ex}/`;

      const displayName = ex.replace(/-/g, ' ').replace(/^\d+b?\s/, '');
      const isReinforcement = ex.match(/\d+b-/) || ex.endsWith('b');
      const prefix = isReinforcement ? '**Renforcement** : ' : '**Exercice** : ';
      lines.push(`${step}. ${prefix}[${ex}](${target})`);
      step++;
    }

    // Quizzes
    for (const quiz of quizzes) {
      const quizName = quiz.replace('.html', '').replace(/-/g, ' ');
      lines.push(`${step}. **Quiz** : [${quizName}](../../quizzes/${quiz})`);
      step++;
    }

    // Projet fil rouge
    if (hasProjet) {
      lines.push(`${step}. **Projet fil rouge** : [README](../../projet-fil-rouge/README)`);
      step++;
    }

    lines.push(':::');

    if (!content.endsWith('\n')) content += '\n';
    content += lines.join('\n') + '\n';

    writeFileSync(filePath, content, 'utf-8');
    modified++;
  }

  console.log(`✅ ${courseSlug}: ${modified} cours files updated`);
  phase2Count += modified;
}

console.log(`Phase 2 done: ${phase2Count} cours files updated\n`);
console.log(`Total: ${phase1Count + phase2Count} files updated`);
