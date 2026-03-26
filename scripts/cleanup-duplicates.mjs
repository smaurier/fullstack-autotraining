#!/usr/bin/env node
/**
 * Removes duplicate "Lab associé" and "Ressources associées" sections
 * from modules that now have the standardized "parcours-recommande" block.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MARKER = '<!-- parcours-recommande -->';

const COURSES = [
  '05-algorithms', '03-typescript', '04-js-runtime', '06-testing', '07-nestjs',
  '08-postgresql', '09-http-caching', '13-distributed-systems',
  '12-observability-sre', '15-react-native', '16-webgpu-3d', '14-ia',
];

let totalCleaned = 0;

for (const courseSlug of COURSES) {
  const modulesDir = join(ROOT, courseSlug, 'modules');
  if (!existsSync(modulesDir)) continue;

  const files = readdirSync(modulesDir).filter(f => f.endsWith('.md'));
  let cleaned = 0;

  for (const file of files) {
    const filePath = join(modulesDir, file);
    let content = readFileSync(filePath, 'utf-8');

    // Only clean files that have the parcours block
    if (!content.includes(MARKER)) continue;

    const original = content;

    // Normalize line endings for regex
    content = content.replace(/\r\n/g, '\n');

    // Remove "## Lab associé" sections (heading + content until next ## or ---)
    content = content.replace(/\n## Lab associé\n[\s\S]*?(?=\n## |\n---)/g, '');

    // Remove "**Ressources associées :**" blocks
    content = content.replace(/\n\*\*Ressources associe+s :\*\*\n(?:- \[.*?\]\(.*?\)\n?)*/g, '');

    // Clean up resulting triple+ blank lines
    content = content.replace(/\n{4,}/g, '\n\n');

    if (content !== original) {
      writeFileSync(filePath, content, 'utf-8');
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 ${courseSlug}: ${cleaned} modules cleaned`);
    totalCleaned += cleaned;
  }
}

console.log(`\nTotal: ${totalCleaned} modules cleaned`);
