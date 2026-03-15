#!/usr/bin/env node
/**
 * Reverts false positive "où" → "ou" for the conjunction "or".
 * Keeps "où" only in patterns that clearly mean "where":
 *   - "d'où", "là où", "par où", "endroit où", "moment où", "cas où"
 *   - "savoir où", "comprendre où", etc.
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'scripts') {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// Patterns where "où" is correct (means "where")
const WHERE_PATTERNS = [
  /d'où/gi,
  /là où/gi,
  /par où/gi,
  /endroit où/gi,
  /moment où/gi,
  /cas où/gi,
  /point où/gi,
  /espace où/gi,
  /phase où/gi,
  /situation où/gi,
  /contexte où/gi,
  /savoir où/gi,
  /comprendre où/gi,
  /chercher où/gi,
  /voir où/gi,
  /trouver où/gi,
  /dire où/gi,
  /indiquer où/gi,
  /montrer où/gi,
  /Par où commencer/gi,
];

let totalFiles = 0;
let totalFixes = 0;

for (const filePath of walk(ROOT)) {
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  // Step 1: Save all legitimate "où" (meaning "where") by replacing them with a placeholder
  const savedPositions = [];
  for (const pattern of WHERE_PATTERNS) {
    content = content.replace(pattern, (match) => {
      const placeholder = `__WHERE_${savedPositions.length}__`;
      savedPositions.push(match);
      return placeholder;
    });
  }

  // Step 2: Replace all remaining standalone "où" with "ou" (false positives = conjunction "or")
  // Use lookbehind/lookahead for word boundaries since \b doesn't work with accented chars
  const beforeCount = (content.match(/(?<=\s|^)où(?=\s|$|[,;:.!?)])/gm) || []).length;
  content = content.replace(/(?<=\s|^)Où(?=\s|$|[,;:.!?)])/gm, 'Ou');
  content = content.replace(/(?<=\s|^)où(?=\s|$|[,;:.!?)])/gm, 'ou');
  const afterCount = (content.match(/(?<=\s|^)où(?=\s|$|[,;:.!?)])/gm) || []).length;

  // Step 3: Restore legitimate "où" from placeholders
  for (let i = 0; i < savedPositions.length; i++) {
    content = content.replace(`__WHERE_${i}__`, savedPositions[i]);
  }

  if (content !== original) {
    writeFileSync(filePath, content, 'utf-8');
    totalFiles++;
    totalFixes += beforeCount - afterCount;
  }
}

console.log(`✅ Corrigé ${totalFixes} faux positifs "où" → "ou" dans ${totalFiles} fichiers`);
