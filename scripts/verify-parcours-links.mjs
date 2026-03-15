#!/usr/bin/env node
/**
 * Verifies every link inside <!-- parcours-recommande --> blocks
 * across ALL courses. Reports broken links.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';

const ROOT = join(import.meta.dirname, '..');

// Find all .md files recursively
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

const MARKER = '<!-- parcours-recommande -->';
let totalFiles = 0;
let totalLinks = 0;
let brokenLinks = [];
let filesWithParcours = 0;

const allMdFiles = walkMd(ROOT);

for (const filePath of allMdFiles) {
  const content = readFileSync(filePath, 'utf-8');
  if (!content.includes(MARKER)) continue;

  filesWithParcours++;

  // Extract the parcours block — find the closing ::: (not the opening ::: tip)
  const markerIdx = content.indexOf(MARKER);
  const afterMarker = content.substring(markerIdx);
  // Find "::: tip" then find standalone ":::" after it
  const tipIdx = afterMarker.indexOf('::: tip');
  if (tipIdx === -1) continue;
  const afterTip = afterMarker.substring(tipIdx + 7);
  const closeIdx = afterTip.indexOf('\n:::');
  if (closeIdx === -1) continue;

  const block = afterMarker.substring(0, tipIdx + 7 + closeIdx + 4);

  // Extract all markdown links from the block
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(block)) !== null) {
    const linkText = match[1];
    const linkTarget = match[2];
    totalLinks++;

    // Resolve the link relative to the file's directory
    const fileDir = dirname(filePath);
    let resolvedPath = resolve(fileDir, linkTarget);

    // Try with .md extension if no extension
    const hasExtension = /\.\w+$/.test(linkTarget);

    let found = false;

    if (existsSync(resolvedPath)) {
      found = true;
    } else if (!hasExtension) {
      // Try with .md
      if (existsSync(resolvedPath + '.md')) {
        found = true;
      }
      // Try as directory
      if (existsSync(resolvedPath) && statSync(resolvedPath).isDirectory()) {
        found = true;
      }
    }
    // For links ending with /README, try README.md
    if (!found && linkTarget.endsWith('/README')) {
      if (existsSync(resolvedPath + '.md')) {
        found = true;
      }
    }
    // For links ending with /ENONCE, try ENONCE.md
    if (!found && linkTarget.endsWith('/ENONCE')) {
      if (existsSync(resolvedPath + '.md')) {
        found = true;
      }
    }

    if (!found) {
      const relFile = filePath.replace(ROOT + '\\', '').replace(ROOT + '/', '');
      brokenLinks.push({
        file: relFile,
        linkText,
        linkTarget,
        resolvedPath: resolvedPath.replace(ROOT + '\\', '').replace(ROOT + '/', ''),
      });
    }
  }
}

console.log(`Files with parcours blocks: ${filesWithParcours}`);
console.log(`Total links checked: ${totalLinks}`);
console.log(`Broken links: ${brokenLinks.length}`);
console.log('');

if (brokenLinks.length > 0) {
  console.log('=== BROKEN LINKS ===\n');
  // Group by file
  const byFile = {};
  for (const bl of brokenLinks) {
    if (!byFile[bl.file]) byFile[bl.file] = [];
    byFile[bl.file].push(bl);
  }
  for (const [file, links] of Object.entries(byFile)) {
    console.log(`📄 ${file}`);
    for (const l of links) {
      console.log(`   ❌ [${l.linkText}](${l.linkTarget})`);
      console.log(`      → resolved: ${l.resolvedPath}`);
    }
    console.log('');
  }
} else {
  console.log('✅ All links are valid!');
}
