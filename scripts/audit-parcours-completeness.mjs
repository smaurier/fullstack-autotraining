#!/usr/bin/env node
/**
 * Audit: check that every module/cours file that SHOULD have a parcours block
 * actually has one, and that the block contains at least one resource link.
 * Also checks that files with labs/exercises/quizzes/screencasts are referenced.
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MARKER = '<!-- parcours-recommande -->';

// ── Module-based courses
const MODULE_COURSES = [
  '05-algorithms', '03-typescript', '04-js-runtime', '06-testing', '07-nestjs',
  '08-postgresql', '09-http-caching', '13-distributed-systems',
  '12-observability-sre', '15-react-native', '16-webgpu-3d', '14-ia',
];

console.log('=== MODULE-BASED COURSES ===\n');

for (const slug of MODULE_COURSES) {
  const modulesDir = join(ROOT, slug, 'modules');
  if (!existsSync(modulesDir)) continue;

  const files = readdirSync(modulesDir).filter(f => f.endsWith('.md')).sort();
  const issues = [];

  for (const file of files) {
    const content = readFileSync(join(modulesDir, file), 'utf-8');
    const match = file.match(/^(\d+)-/);
    if (!match) {
      if (!content.includes(MARKER)) {
        // Special files (99-references, prerequis-maths, etc.) - OK to skip
      }
      continue;
    }

    const modNum = parseInt(match[1], 10);
    const hasParcours = content.includes(MARKER);

    if (!hasParcours) {
      issues.push(`  ❌ ${file}: NO parcours block`);
      continue;
    }

    // Count links in the block
    const markerIdx = content.indexOf(MARKER);
    const block = content.substring(markerIdx);
    const links = (block.match(/\]\(/g) || []).length;

    if (links === 0) {
      issues.push(`  ⚠️  ${file}: parcours block has 0 links`);
    }

    // Check what's included
    const hasScreencast = block.includes('**Screencast**');
    const hasLab = block.includes('**Lab**');
    const hasQuiz = block.includes('**Quiz**');
    const hasViz = block.includes('**Visualisation**');

    // Check if corresponding resources exist
    const padded = String(modNum).padStart(2, '0');
    const labsDir = join(ROOT, slug, 'labs');
    const labExists = existsSync(labsDir) && readdirSync(labsDir).some(l => l.startsWith(`lab-${padded}-`));
    const quizzesDir = join(ROOT, slug, 'quizzes');
    const quizExists = existsSync(quizzesDir) && readdirSync(quizzesDir).some(q => q.startsWith(`quiz-${padded}-`));
    const screencastsDir = join(ROOT, slug, 'screencasts');
    const screencastExists = existsSync(screencastsDir) && readdirSync(screencastsDir).some(s => s.startsWith(`screencast-${padded}-`));

    if (labExists && !hasLab) issues.push(`  ⚠️  ${file}: lab exists but NOT in parcours`);
    if (quizExists && !hasQuiz) issues.push(`  ⚠️  ${file}: quiz exists but NOT in parcours`);
    if (screencastExists && !hasScreencast) issues.push(`  ⚠️  ${file}: screencast exists but NOT in parcours`);
  }

  if (issues.length > 0) {
    console.log(`📋 ${slug}:`);
    issues.forEach(i => console.log(i));
    console.log('');
  } else {
    console.log(`✅ ${slug}: all ${files.length} modules OK`);
  }
}

// ── Cours-based courses
console.log('\n=== COURS-BASED COURSES ===\n');

const COURS_COURSES = ['01-vue', '00-react', '02-angular', '11-architecture'];

for (const slug of COURS_COURSES) {
  const courseDir = join(ROOT, slug);

  // Find all cours .md files
  function findCoursFiles(dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...findCoursFiles(full));
      else if (entry.name.endsWith('.md') && entry.name !== 'parcours.md') results.push(full);
    }
    return results;
  }

  const coursDir = join(courseDir, 'cours');
  if (!existsSync(coursDir)) continue;

  const coursFiles = findCoursFiles(coursDir);
  const withParcours = coursFiles.filter(f => readFileSync(f, 'utf-8').includes(MARKER));
  const withoutParcours = coursFiles.filter(f => !readFileSync(f, 'utf-8').includes(MARKER));

  console.log(`📋 ${slug}: ${withParcours.length}/${coursFiles.length} cours files have parcours`);

  // List which subdirectories have parcours blocks
  const subdirsWithParcours = new Set();
  for (const f of withParcours) {
    const rel = f.replace(coursDir + '\\', '').replace(coursDir + '/', '');
    const parts = rel.split(/[/\\]/);
    if (parts.length > 1) subdirsWithParcours.add(parts[0]);
    else subdirsWithParcours.add('(root)');
  }

  const allSubdirs = readdirSync(coursDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();

  const missingSubdirs = allSubdirs.filter(d => !subdirsWithParcours.has(d));
  if (missingSubdirs.length > 0) {
    console.log(`  ⚠️  Subdirectories without any parcours block: ${missingSubdirs.join(', ')}`);
  }

  // Check exercices coverage
  const exDir = join(courseDir, 'exercices');
  if (existsSync(exDir)) {
    const allExercises = readdirSync(exDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => e.name);

    // Check which exercises are referenced in any parcours block
    const allContent = withParcours.map(f => readFileSync(f, 'utf-8')).join('\n');
    const unreferenced = allExercises.filter(ex => !allContent.includes(ex));
    if (unreferenced.length > 0) {
      console.log(`  ⚠️  Unreferenced exercises: ${unreferenced.join(', ')}`);
    } else {
      console.log(`  ✅ All ${allExercises.length} exercises referenced`);
    }
  }

  // Check quizzes coverage
  const qDir = join(courseDir, 'quizzes');
  if (existsSync(qDir)) {
    const allQuizzes = readdirSync(qDir).filter(f => f.endsWith('.html'));
    const allContent = withParcours.map(f => readFileSync(f, 'utf-8')).join('\n');
    const unreferenced = allQuizzes.filter(q => !allContent.includes(q));
    if (unreferenced.length > 0) {
      console.log(`  ⚠️  Unreferenced quizzes: ${unreferenced.join(', ')}`);
    }
  }

  console.log('');
}
