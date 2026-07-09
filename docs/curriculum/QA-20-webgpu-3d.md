# QA — 20-webgpu-3d (refonte v1)

> Cours réécrit en autonomie (rollout). 29 modules (00-28) + 29 labs.
> Consolidation 31 modules legacy v0 → 29, orphelins + harnais purgés. LE plus gros cours.
> **3D / WebGPU / WebGL / Three.js — débutant → expert.**
> **Context7 mort → vérif par WebFetch** (gpuweb.github.io, developer.mozilla.org, threejs.org,
> learnopengl.com, iquilezles.org, raytracing.github.io). GATE PASS (build OK). QA 2 blocs read-only.
> **Cours refait SANS override delimiters** → thème propre (0 fuite `{{ title }}`).

## Verdict : SHIP (0 P0, 0 P1)

Corrections appliquées (P2 navigation) :
| Prio | Fichier | Problème | Correction |
|------|---------|----------|------------|
| P2 | M28 §capstone | renvois faux : volumétrique « module 25 » → **24** ; WebXR « module 26 » → **25** | corrigés |
| P2 | M17 §2.9 | KTX2/Basis « module 15 » → **27** | corrigé |
| P2 | M05 §1 | bloc WGSL mislabellé ` ```glsl ` | ` ```wgsl ` |

Corrigés aussi au gate : M03 prereq slug obsolète (`01-algebre-lineaire` → `01-algebre-lineaire-pour-la-3d`),
lab-06 legacy (harnais `npx tsx`, pas de J+30) → réécrit README-only propre.

## P2 non bloquants (laissés)
- format `libs:` inégal (objet `[{name,version}]` vs `["three"]` vs `[]`) — cosmétique, pré-existant.
- M00 : 3 FLAG-DOC support navigateur 2026 (Chrome 113+/Safari iOS 26/Firefox) — transparence assumée.
- M14 : 1 FLAG-DOC chaîne RGBELoader/PMREMGenerator (API principale `scene.environment` confirmée).
- lab-05 : léger gap-fill (harnais WGSL fourni, learner remplit le bloc shader) — acceptable pour un lab shader.

## Points forts vérifiés (WebFetch)
Three.js **r185** confirmé (version courante). NDC WebGPU z∈[0,1] vs WebGL z∈[-1,1] correct + conversion.
PBR Cook-Torrance/GGX/Fresnel-Schlick (learnopengl/Filament), column-major, quaternions/slerp,
WGSL (@group/@binding, alignement vec3f, storage buffers, dispatchWorkgroups), instancing/indirect/
timestamp, UnrealBloomPass/SSAOPass/KTX2Loader signatures exactes, ray-sphere/Möller-Trumbore,
Beer-Lambert/Henyey-Greenstein, SDF iquilezles, Rapier `-compat`, WebXR reference spaces, Web Audio
PannerNode/HRTF. **Zéro API/formule inventée détectée.**

## Gate résiduel — PASS
Chaîne next 00→…→28→sentinel `fin-parcours-20-webgpu-3d`. 29 modules valident, **7 sections exactement**
(2 modules initialement à 14/17 sections réécrits propres). Anti-simulé : harnais legacy purgés, labs
100% README-only (oracle = rendu navigateur WebGPU/WebGL réel). **Thème propre** (0 fuite `{{ title }}`) :
pas d'override delimiters, WGSL/GLSL/JS en blocs de code. Re-gaté **GATE PASS** (build OK).
