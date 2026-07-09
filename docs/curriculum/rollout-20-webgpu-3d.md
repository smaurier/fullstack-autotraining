# Refonte 20-webgpu-3d — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `20-webgpu-3d/modules/NN-slug.md` + `20-webgpu-3d/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `20-webgpu-3d/modules/NN-*.md` (31 fichiers, format `# Module` → AU TEMPLATE) → CONSOLIDÉS en 29.
> **Cours 3D / WebGPU / graphisme temps réel — débutant → expert. LE plus gros cours.**

## Contrat agent (invariants gate)

1. **Vérif API/spec via WebFetch** (Context7 MORT). Sources officielles :
   - **WebGPU → gpuweb.github.io/gpuweb (spec) + developer.mozilla.org/en-US/docs/Web/API/WebGPU_API**
   - **WGSL → gpuweb.github.io/gpuweb/wgsl** · WebGL → MDN WebGL API / khronos.org
   - **Three.js → threejs.org/docs + threejs.org/manual** (vérifier la version/r-number courante 2026)
   - Maths 3D → sources reconnues (matrices/quaternions) ; PBR → learnopengl.com/PBR, Google Filament docs
   Si URL inconnue → WebSearch puis WebFetch. Si échec/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (API WebGPU/WGSL, r-number Three.js, signatures).
2. **Frontmatter** clés exemplar : `titre, cours: 20-webgpu-3d, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert STRICT** : maths → théorie rendu → WebGL → WebGPU/WGSL → Three.js → rendu avancé → sujets experts → capstone.
5. **Lab = README-only** : exercice concret (coder un shader, un pipeline WebGPU, une scène Three.js, un compute shader) qui tourne dans un navigateur réel (WebGPU/Chrome ; starter HTML/JS/TS fourni dans le README) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (harnais legacy supprimé).
6. **Fil-rouge TribuZen** : une **feature 3D pour TribuZen** (ex. carte/globe interactif des sorties de la famille, badge/trophée 3D animé, visualisation du feed en 3D). Rester concret et cohérent d'un module à l'autre.
7. `{{ }}` en prose/inline → échapper. WGSL/GLSL/JS avec `{ }` et interpolation → BLOCS DE CODE (jamais de `{{ }}` nu en prose ; si mention inline nécessaire → `<code v-pre>...</code>`). **Config VitePress SANS override delimiters** (thème propre) ; le build est l'oracle.

## Colonne vertébrale (29 modules — consolidation de 31 legacy)

| NN | Module (slug) | Source legacy | next |
|----|--------|---------------|------|
| 00 | prerequis-et-introduction (3D temps réel, GPU, aperçu pipeline, carte du cours) | 00 | 01 |
| 01 | algebre-lineaire-pour-la-3d (vecteurs, matrices, produit scalaire/vectoriel) | 01 + prerequis-maths-pour-la-3d | 02 |
| 02 | transformations-et-quaternions (translation/rotation/échelle, quaternions) | 02 | 03 |
| 03 | cameras-et-projections (view/projection, perspective/ortho, frustum) | 03 | 04 |
| 04 | pipeline-de-rendu (étapes rasterisation, vertex/fragment, depth) | 04 | 05 |
| 05 | lumiere-materiaux-et-pbr (modèles d'éclairage, PBR metallic/roughness) | 05 | 06 |
| 06 | webgl-fondamentaux (contexte, buffers, draw calls, GLSL intro) | 06 | 07 |
| 07 | shaders-buffers-textures (GLSL vertex/fragment, VBO/VAO, textures) | 07 | 08 |
| 08 | scene-webgl-complete (assembler une scène WebGL animée) | 08 | 09 |
| 09 | webgpu-architecture-et-wgsl (adapter/device, WGSL, différences WebGL) | 09 | 10 |
| 10 | render-pipeline-et-bind-groups (pipeline WebGPU, bind groups, uniforms) | 10 | 11 |
| 11 | compute-shaders-et-gpgpu (compute WGSL, workgroups, GPGPU) | 11 | 12 |
| 12 | webgpu-avance (techniques avancées, multi-pass, indirect, timestamp) | 12 | 13 |
| 13 | threejs-fondamentaux (scene/camera/renderer, mesh, boucle) | 13 | 14 |
| 14 | materiaux-et-lumieres-threejs (materials, lights, ombres Three.js) | 14 | 15 |
| 15 | modeles-et-animations (glTF, skinning, AnimationMixer) | 15 | 16 |
| 16 | post-processing-et-effets (EffectComposer, passes, bloom) | 16 | 17 |
| 17 | performance-et-optimisation (draw calls, instancing, LOD, profiling GPU) | 17 | 18 |
| 18 | shadow-mapping (shadow maps, PCF, cascades) | 18 | 19 |
| 19 | shaders-creatifs (noise, raymarching de base, effets procéduraux) | 19 | 20 |
| 20 | physique-et-interactions (raycasting, collisions, intégration physique) | 20 | 21 |
| 21 | modelisation-3d-et-geometrie (géométrie procédurale, BufferGeometry, meshes) | 22 | 22 |
| 22 | ray-tracing (principes, ray-sphere, path tracing en compute) | 23 | 23 |
| 23 | global-illumination-et-screen-space (GI, SSAO, SSR) | 24 | 24 |
| 24 | rendu-volumetrique (volumes, fog, clouds, raymarching volumétrique) | 25 | 25 |
| 25 | webxr-et-animation-procedurale (WebXR, VR/AR, animation procédurale) | 26 | 26 |
| 26 | audio-3d-spatial (Web Audio spatial, positional audio) | 27 | 27 |
| 27 | virtual-textures-et-streaming (virtual textures, streaming de gros assets) | 28 | 28 |
| 28 | projet-final (capstone : une expérience 3D TribuZen complète, WebGPU+Three.js) | 21 + 29 | (fin) |

29 modules (00-28) + 29 labs. Dernier module (28) `next` = sentinel `fin-parcours-20-webgpu-3d`.
Consolidations : maths (01 + prerequis-maths-pour-la-3d) → 01 ; deux projets-final (21 + 29-expert) → 28 (capstone unique intégrant l'expert). Renuméroter proprement 00-28 ; supprimer orphelins legacy + harnais après write.
