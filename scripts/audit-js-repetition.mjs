#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = join(import.meta.dirname, '..');

const COURSE_DIR_PATTERN = /^\d{2}-/;
const SOURCE_EXTENSIONS = new Set([
  '.md',
  '.ts',
  '.js',
  '.tsx',
  '.jsx',
  '.vue',
]);

const SKIPPED_DIRS = new Set([
  'node_modules',
  '.git',
  '.vitepress',
  'dist',
  'build',
  'coverage',
  'public',
]);

const TARGET_DIRS = readdirSync(ROOT, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && COURSE_DIR_PATTERN.test(entry.name))
  .map((entry) => entry.name)
  .sort();

const CONCEPTS = {
  destructuring: [/destructuring/i],
  spread: [/spread/i],
  template_literals: [/template literal/i, /template literal[s]?/i],
  json: [/JSON\.parse/i, /JSON\.stringify/i],
  regexp: [/RegExp/i, /regex/i],
  match_all: [/matchAll/i],
  call_apply_bind: [/\.call\(/, /\.apply\(/, /\.bind\(/],
  promise_finally: [/Promise\.finally/i, /\.finally\(/],
  callback_error_first: [/error-first/i, /promisify/i, /fetchUserCb/i, /err:\s*Error\s*\|\s*null/i],
  object_methods: [/Object\.entries/i, /Object\.fromEntries/i, /Object\.keys/i, /Object\.values/i],
  set: [/new Set/i, /\bSet\b/],
  prototype: [/prototype/i, /Object\.create/i],
  try_catch_finally: [/try\/catch\/finally/i, /try\s*\{/i, /catch\s*\(/i, /finally/i],
  generators_iterators: [/function\*/i, /IterableIterator/i, /\byield\b/i, /generator/i],
  url_search_params: [/URLSearchParams/i],
};

const MARKER_PREFIX = 'JS-REPETITION:';
const CONCEPT_ALIASES = {
  destructuring: 'destructuring',
  spread: 'spread',
  template_literals: 'template_literals',
  template_literals_string: 'template_literals',
  json: 'json',
  regexp: 'regexp',
  regex: 'regexp',
  match_all: 'match_all',
  matchall: 'match_all',
  call_apply_bind: 'call_apply_bind',
  promise_finally: 'promise_finally',
  callback_error_first: 'callback_error_first',
  object_methods: 'object_methods',
  set: 'set',
  prototype: 'prototype',
  try_catch_finally: 'try_catch_finally',
  generators_iterators: 'generators_iterators',
  generators: 'generators_iterators',
  url_search_params: 'url_search_params',
  urlsearchparams: 'url_search_params',
};

function walk(dir) {
  if (!existsSync(dir)) return [];

  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);

    if (stats.isDirectory()) {
      if (SKIPPED_DIRS.has(entry)) {
        continue;
      }
      results.push(...walk(full));
      continue;
    }

    const ext = entry.slice(entry.lastIndexOf('.'));
    if (SOURCE_EXTENSIONS.has(ext)) {
      results.push(full);
    }
  }

  return results;
}

function analyzeFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const hits = new Set();

  for (const line of content.split(/\r?\n/)) {
    const markerIndex = line.indexOf(MARKER_PREFIX);
    if (markerIndex === -1) continue;

    const rawValues = line
      .slice(markerIndex + MARKER_PREFIX.length)
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    for (const rawValue of rawValues) {
      const concept = CONCEPT_ALIASES[rawValue];
      if (concept) {
        hits.add(concept);
      }
    }
  }

  for (const [concept, patterns] of Object.entries(CONCEPTS)) {
    if (patterns.some((pattern) => pattern.test(content))) {
      hits.add(concept);
    }
  }

  return [...hits];
}

const conceptToFiles = new Map();
for (const concept of Object.keys(CONCEPTS)) {
  conceptToFiles.set(concept, []);
}

const courseToFileCount = new Map();

for (const dir of TARGET_DIRS) {
  const files = walk(join(ROOT, dir));
  courseToFileCount.set(dir, files.length);
  for (const filePath of files) {
    const hits = analyzeFile(filePath);
    for (const concept of hits) {
      conceptToFiles.get(concept).push(relative(ROOT, filePath).replaceAll('\\', '/'));
    }
  }
}

console.log('=== AUDIT REPETITION JS ===\n');
console.log(`Cours analysés: ${TARGET_DIRS.length}`);
for (const dir of TARGET_DIRS) {
  console.log(`- ${dir}: ${courseToFileCount.get(dir)} fichier(s) scanné(s)`);
}

console.log('');

for (const concept of Object.keys(CONCEPTS)) {
  const files = conceptToFiles.get(concept);
  const uniqueFiles = [...new Set(files)].sort();
  const level = uniqueFiles.length >= 3 ? 'OK' : uniqueFiles.length === 2 ? 'MOYEN' : uniqueFiles.length === 1 ? 'FRAGILE' : 'ABSENT';

  console.log(`- ${concept}: ${level} (${uniqueFiles.length} fichier(s))`);
  for (const file of uniqueFiles.slice(0, 8)) {
    console.log(`  • ${file}`);
  }
  if (uniqueFiles.length > 8) {
    console.log(`  • ... ${uniqueFiles.length - 8} autre(s)`);
  }
}

console.log('\n=== PRIORITES SUGGEREES ===\n');

for (const concept of Object.keys(CONCEPTS)) {
  const count = [...new Set(conceptToFiles.get(concept))].length;
  if (count <= 1) {
    console.log(`- ${concept}: a renforcer en priorité`);
  } else if (count === 2) {
    console.log(`- ${concept}: couverture moyenne, une repetition de plus serait souhaitable`);
  }
}