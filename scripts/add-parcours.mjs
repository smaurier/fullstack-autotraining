#!/usr/bin/env node
/**
 * Adds a "Parcours recommandé" navigation block at the end of each module,
 * linking to the corresponding lab, visualization(s), and quiz.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

const ROOT = join(import.meta.dirname, '..');

// ── Visualization mappings: course → { vizFile: [moduleNumbers] }
const VIZ_MAP = {
  '05-algorithms': {
    'complexity-growth.html': [1],
    'binary-search.html': [4],
    'heap-operations.html': [5],
    'bfs-dfs.html': [7],
    'dp-table.html': [9],
  },
  '00-typescript': {
    'type-hierarchy.html': [1, 8, 15],
    'type-narrowing.html': [4, 15],
    'generics-flow.html': [6, 7],
    'conditional-types.html': [11, 12],
    'module-resolution.html': [9, 16],
  },
  '01-js-runtime': {
    'event-loop.html': [3],
    'call-stack.html': [1],
    'gc-tricolor.html': [7],
    'jit-pipeline.html': [9, 10],
    'hidden-classes.html': [11],
  },
  '06-testing': {
    'test-pyramid.html': [1],
    'tdd-cycle.html': [15],
    'ci-pipeline.html': [13],
    'page-object.html': [10, 11],
    'mocking-strategies.html': [4],
  },
  '07-nestjs': {
    'event-loop.html': [1],
    'middleware-pipeline.html': [6, 7],
    'dependency-injection.html': [11],
    'orm-query-flow.html': [14, 15, 16, 17],
    'nestjs-lifecycle.html': [13],
  },
  '08-postgresql': {
    'btree-index.html': [5, 6, 7],
    'query-planner.html': [6],
    'mvcc-isolation.html': [8],
    'lock-matrix.html': [9, 10],
    'wal-transaction.html': [4],
  },
  '09-http-caching': {
    'http-lifecycle.html': [0, 1],
    'cache-decision-tree.html': [3, 4, 5, 6],
    'multi-layer-cache.html': [7, 8, 9],
    'ssr-hydration.html': [10, 11],
    'stale-while-revalidate.html': [5, 6],
  },
  '13-distributed-systems': {
    'network-partitions.html': [1, 2, 15],
    'cap-theorem.html': [10, 11],
    'saga-orchestration.html': [12, 14],
    'circuit-breaker.html': [16],
    'consistent-hashing.html': [11],
    'consensus-raft.html': [20],
  },
  '12-observability-sre': {
    'three-pillars.html': [1, 2, 4, 7],
    'metric-types.html': [4, 5, 6],
    'distributed-trace.html': [7, 8],
    'slo-error-budget.html': [10, 11],
    'incident-lifecycle.html': [12, 13],
  },
  '15-react-native': {
    'react-native-architecture.html': [0],
    'flexbox-playground.html': [5],
    'navigation-flow.html': [8, 9],
    'state-management-comparison.html': [10],
    'animation-curves.html': [17, 18],
    'bridge-vs-jsi.html': [24, 25],
    'bundle-analyzer.html': [22, 25],
  },
  '16-webgpu-3d': {
    'rendering-pipeline.html': [4],
    'transformations.html': [2],
    'projections.html': [3],
    'lighting-models.html': [5],
    'shader-sandbox.html': [7, 19],
    'scene-graph.html': [8, 13],
    'gpu-pipeline.html': [6, 9],
  },
};

// ── Special lab mappings where module number != lab number
const SPECIAL_LAB_MAP = {
  '09-http-caching': {
    // module num → lab folder name suffix
    4: null,  // no dedicated lab (lab-03 covers 03-04)
    5: 'lab-04-etag-conditional',
    6: 'lab-05-swr-implementation',
    7: 'lab-06-cache-strategies',
    8: 'lab-07-mini-cdn',
    9: 'lab-08-reverse-proxy-cache',
    10: 'lab-10-ssr-from-scratch',
    11: 'lab-11-isr-implementation',
    12: 'lab-12-edge-middleware',
    13: 'lab-13-streaming-responses',
    14: 'lab-14-performance-audit',
    15: 'lab-15-full-architecture',
  },
  '12-observability-sre': {
    20: 'lab-21-kubernetes-observability',
    21: 'lab-22-finops-observability',
  },
};

// ── Visualization display names
const VIZ_NAMES = {
  'complexity-growth.html': 'Croissance des complexités',
  'binary-search.html': 'Binary Search',
  'heap-operations.html': 'Opérations sur heap',
  'bfs-dfs.html': 'BFS vs DFS',
  'dp-table.html': 'Table DP',
  'type-hierarchy.html': 'Hiérarchie des types',
  'type-narrowing.html': 'Type Narrowing',
  'generics-flow.html': 'Generics Flow',
  'conditional-types.html': 'Conditional Types',
  'module-resolution.html': 'Module Resolution',
  'event-loop.html': 'Event Loop',
  'call-stack.html': 'Call Stack',
  'gc-tricolor.html': 'GC Tri-color',
  'jit-pipeline.html': 'Pipeline JIT',
  'hidden-classes.html': 'Hidden Classes',
  'test-pyramid.html': 'Pyramide des tests',
  'tdd-cycle.html': 'Cycle TDD',
  'ci-pipeline.html': 'Pipeline CI/CD',
  'page-object.html': 'Page Object Pattern',
  'mocking-strategies.html': 'Stratégies de mocking',
  'middleware-pipeline.html': 'Middleware Pipeline',
  'dependency-injection.html': 'Dependency Injection',
  'orm-query-flow.html': 'ORM Query Flow',
  'nestjs-lifecycle.html': 'NestJS Lifecycle',
  'btree-index.html': 'B-tree Index',
  'query-planner.html': 'Query Planner',
  'mvcc-isolation.html': 'MVCC & Isolation',
  'lock-matrix.html': 'Lock Matrix',
  'wal-transaction.html': 'WAL & Transaction',
  'http-lifecycle.html': 'HTTP Lifecycle',
  'cache-decision-tree.html': 'Cache Decision Tree',
  'multi-layer-cache.html': 'Multi-Layer Cache',
  'ssr-hydration.html': 'SSR & Hydration',
  'stale-while-revalidate.html': 'Stale-While-Revalidate',
  'network-partitions.html': 'Network Partitions',
  'cap-theorem.html': 'Théorème CAP',
  'saga-orchestration.html': 'Saga Orchestration',
  'circuit-breaker.html': 'Circuit Breaker',
  'consistent-hashing.html': 'Consistent Hashing',
  'consensus-raft.html': 'Consensus Raft',
  'three-pillars.html': 'Three Pillars',
  'metric-types.html': 'Metric Types',
  'distributed-trace.html': 'Distributed Trace',
  'slo-error-budget.html': 'SLO Error Budget',
  'incident-lifecycle.html': 'Incident Lifecycle',
  'react-native-architecture.html': 'Architecture React Native',
  'flexbox-playground.html': 'Flexbox Playground',
  'navigation-flow.html': 'Navigation Flow',
  'state-management-comparison.html': 'State Management',
  'animation-curves.html': 'Animation Curves',
  'bridge-vs-jsi.html': 'Bridge vs JSI',
  'bundle-analyzer.html': 'Bundle Analyzer',
  'rendering-pipeline.html': 'Pipeline de rendu',
  'transformations.html': 'Transformations',
  'projections.html': 'Projections',
  'lighting-models.html': 'Modèles d\'éclairage',
  'shader-sandbox.html': 'Shader Sandbox',
  'scene-graph.html': 'Scene Graph',
  'gpu-pipeline.html': 'GPU Pipeline',
};

// ── Courses with modules/ structure
const COURSES = [
  '05-algorithms', '00-typescript', '01-js-runtime', '06-testing', '07-nestjs',
  '08-postgresql', '09-http-caching', '13-distributed-systems',
  '12-observability-sre', '15-react-native', '16-webgpu-3d', '14-ia',
];

// Marker to detect if block was already added
const MARKER = '<!-- parcours-recommande -->';

function extractModuleNumber(filename) {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : null;
}

function findLabDir(courseDir, courseSlug, modNum) {
  // Check special mapping first
  const special = SPECIAL_LAB_MAP[courseSlug];
  if (special && modNum in special) {
    if (special[modNum] === null) return null;
    const labPath = join(courseDir, 'labs', special[modNum]);
    return existsSync(labPath) ? special[modNum] : null;
  }

  // Find by number prefix
  const labsDir = join(courseDir, 'labs');
  if (!existsSync(labsDir)) return null;

  const padded = String(modNum).padStart(2, '0');
  const labs = readdirSync(labsDir);
  const match = labs.find(l => l.startsWith(`lab-${padded}-`));
  return match || null;
}

function findQuizFile(courseDir, modNum) {
  const quizzesDir = join(courseDir, 'quizzes');
  if (!existsSync(quizzesDir)) return null;

  const padded = String(modNum).padStart(2, '0');
  const quizzes = readdirSync(quizzesDir);
  const match = quizzes.find(q => q.startsWith(`quiz-${padded}-`) && q.endsWith('.html'));
  return match || null;
}

function getVisualizationsForModule(courseSlug, modNum) {
  const vizMap = VIZ_MAP[courseSlug];
  if (!vizMap) return [];

  const results = [];
  for (const [file, modules] of Object.entries(vizMap)) {
    if (modules.includes(modNum)) {
      results.push({ file, name: VIZ_NAMES[file] || file.replace('.html', '') });
    }
  }
  return results;
}

function findLabReadme(courseDir, labDirName) {
  const labPath = join(courseDir, 'labs', labDirName);
  if (existsSync(join(labPath, 'README.md'))) return 'README';
  // Some labs might not have a README — check for exercise files
  if (existsSync(join(labPath, 'exercise.ts'))) return null; // link to dir
  return null;
}

function buildParcoursBlock(courseSlug, courseDir, modNum, moduleFiles, currentIndex) {
  const lines = [];
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(MARKER);
  lines.push('');
  lines.push('::: tip Parcours recommandé');

  let step = 1;

  // Lab
  const labDir = findLabDir(courseDir, courseSlug, modNum);
  if (labDir) {
    const readme = findLabReadme(courseDir, labDir);
    const labLink = readme
      ? `../labs/${labDir}/${readme}`
      : `../labs/${labDir}/`;
    const labName = labDir.replace(/^lab-\d+-/, '').replace(/-/g, ' ');
    lines.push(`${step}. **Lab** : [${labDir}](${labLink})`);
    step++;
  }

  // Visualizations
  const vizs = getVisualizationsForModule(courseSlug, modNum);
  for (const viz of vizs) {
    lines.push(`${step}. **Visualisation** : [${viz.name}](../visualizations/${viz.file})`);
    step++;
  }

  // Quiz
  const quiz = findQuizFile(courseDir, modNum);
  if (quiz) {
    lines.push(`${step}. **Quiz** : [${quiz.replace('.html', '').replace(/-/g, ' ')}](../quizzes/${quiz})`);
    step++;
  }

  lines.push(':::');

  // If nothing was added (no lab, no viz, no quiz), skip
  if (step === 1) return null;

  return lines.join('\n');
}

// ── Main
let totalModified = 0;
let totalSkipped = 0;

for (const courseSlug of COURSES) {
  const courseDir = join(ROOT, courseSlug);
  const modulesDir = join(courseDir, 'modules');

  if (!existsSync(modulesDir)) {
    console.log(`⏭  ${courseSlug}: no modules/ dir, skipping`);
    continue;
  }

  const moduleFiles = readdirSync(modulesDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  let modified = 0;

  for (let i = 0; i < moduleFiles.length; i++) {
    const file = moduleFiles[i];
    const modNum = extractModuleNumber(file);
    if (modNum === null) {
      // Handle special files like prerequis-maths-pour-la-3d.md or 99-references
      continue;
    }

    const filePath = join(modulesDir, file);
    let content = readFileSync(filePath, 'utf-8');

    // Skip if already has parcours block
    if (content.includes(MARKER)) {
      totalSkipped++;
      continue;
    }

    // Remove existing "Lab associé" section (01-js-runtime pattern)
    content = content.replace(/\n## Lab associé\n[\s\S]*$/m, '');

    const block = buildParcoursBlock(courseSlug, courseDir, modNum, moduleFiles, i);
    if (!block) continue;

    // Ensure file ends with newline before appending
    if (!content.endsWith('\n')) content += '\n';

    content += block + '\n';
    writeFileSync(filePath, content, 'utf-8');
    modified++;
  }

  console.log(`✅ ${courseSlug}: ${modified} modules updated`);
  totalModified += modified;
}

console.log(`\nTotal: ${totalModified} modules updated, ${totalSkipped} already had parcours`);
