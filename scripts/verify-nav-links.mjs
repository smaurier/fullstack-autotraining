#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';

const ROOT = join(import.meta.dirname, '..');

const MARKERS = ['<!-- navigation-inter-cours -->', '<!-- nav-cours-precedent -->'];

function walkMd(dir) {
  const { readdirSync } = await_import();
  const results = [];
  for (const entry of require('fs').readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') results.push(...walkMd(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

// Simple recursive walk
import { readdirSync } from 'fs';
function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') results.push(...walk(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

let total = 0, broken = 0;

for (const file of walk(ROOT)) {
  const content = readFileSync(file, 'utf-8');
  for (const marker of MARKERS) {
    if (!content.includes(marker)) continue;
    const idx = content.indexOf(marker);
    const chunk = content.substring(idx, idx + 500);
    const links = [...chunk.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g)];
    for (const m of links) {
      total++;
      const target = m[2];
      const resolved = resolve(dirname(file), target);
      const found = existsSync(resolved) || existsSync(resolved + '.md');
      if (!found) {
        broken++;
        const rel = file.replace(ROOT + '\\', '').replace(ROOT + '/', '').replace(/\\/g, '/');
        console.log(`❌ ${rel}: [${m[1]}](${target})`);
      }
    }
  }
}

console.log(`\nTotal: ${total} links, ${broken} broken`);
