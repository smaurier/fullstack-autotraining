#!/usr/bin/env node
/**
 * Deep verification: resolves every link in parcours blocks and checks
 * that target files exist AND are non-empty.
 * Also checks for common issues like wrong relative paths.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';

const ROOT = join(import.meta.dirname, '..');
const MARKER = '<!-- parcours-recommande -->';

function walkMd(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...walkMd(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

let totalLinks = 0;
let brokenLinks = [];
let warningLinks = [];

for (const filePath of walkMd(ROOT)) {
  const content = readFileSync(filePath, 'utf-8');
  if (!content.includes(MARKER)) continue;

  const markerIdx = content.indexOf(MARKER);
  const afterMarker = content.substring(markerIdx);
  const tipIdx = afterMarker.indexOf('::: tip');
  if (tipIdx === -1) continue;
  const afterTip = afterMarker.substring(tipIdx + 7);
  const closeIdx = afterTip.indexOf('\n:::');
  if (closeIdx === -1) continue;
  const block = afterMarker.substring(0, tipIdx + 7 + closeIdx + 4);

  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  const fileDir = dirname(filePath);
  const relFile = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '').replace(/\\/g, '/');

  while ((match = linkRegex.exec(block)) !== null) {
    const linkText = match[1];
    const linkTarget = match[2];
    totalLinks++;

    const resolved = resolve(fileDir, linkTarget);

    // Try various extensions
    let found = false;
    let actualPath = null;
    const candidates = [
      resolved,
      resolved + '.md',
      resolved + '.html',
    ];

    for (const c of candidates) {
      if (existsSync(c)) {
        found = true;
        actualPath = c;
        break;
      }
    }

    // For directory links (ending with /)
    if (!found && linkTarget.endsWith('/')) {
      const dirPath = resolved;
      if (existsSync(dirPath) && statSync(dirPath).isDirectory()) {
        found = true;
        actualPath = dirPath;
      }
    }

    if (!found) {
      brokenLinks.push({ file: relFile, linkText, linkTarget });
    } else {
      // Check file is non-empty
      try {
        const stat = statSync(actualPath);
        if (stat.isFile() && stat.size === 0) {
          warningLinks.push({ file: relFile, linkText, linkTarget, issue: 'EMPTY FILE (0 bytes)' });
        }
      } catch {}

      // Verify relative path depth makes sense
      const upCount = (linkTarget.match(/\.\.\//g) || []).length;
      // For module-based courses, links should use ../
      // For cours-based courses (nested dirs), links should use ../../
      if (relFile.includes('/cours/') && relFile.split('/').length >= 4 && upCount < 2 && !linkTarget.startsWith('/')) {
        // Cours in subdirectory should use ../../ to reach exercices/quizzes
        if (linkTarget.includes('exercices/') || linkTarget.includes('quizzes/') || linkTarget.includes('projet-fil-rouge/')) {
          warningLinks.push({ file: relFile, linkText, linkTarget, issue: `Only ${upCount} ../ but file is nested` });
        }
      }
    }
  }
}

console.log(`Total links verified: ${totalLinks}`);
console.log(`Broken: ${brokenLinks.length}`);
console.log(`Warnings: ${warningLinks.length}`);
console.log('');

if (brokenLinks.length > 0) {
  console.log('=== BROKEN LINKS ===\n');
  for (const bl of brokenLinks) {
    console.log(`❌ ${bl.file}`);
    console.log(`   [${bl.linkText}](${bl.linkTarget})\n`);
  }
}

if (warningLinks.length > 0) {
  console.log('=== WARNINGS ===\n');
  for (const wl of warningLinks) {
    console.log(`⚠️  ${wl.file}`);
    console.log(`   [${wl.linkText}](${wl.linkTarget})`);
    console.log(`   Issue: ${wl.issue}\n`);
  }
}

if (brokenLinks.length === 0 && warningLinks.length === 0) {
  console.log('✅ All links are valid and targets are non-empty!');
}
