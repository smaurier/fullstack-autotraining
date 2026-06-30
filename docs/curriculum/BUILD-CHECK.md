# Contrôle build & liens morts — récurrent, par cours

> **Pourquoi ce doc** : chaque cours est un site **VitePress isolé**. Un build qui n'a jamais tourné cache de la dette (liens morts, numérotation périmée). Découvert au pilote (10-postgresql : 3 liens morts pré-existants, dont `05-nestjs` au lieu de `09-nestjs` après un réordonnancement). **À contrôler systématiquement** à chaque cours traité — c'est récurrent.

## Gate obligatoire (definition de « terminé » d'un cours)

Avant de fermer un cours dans le rollout :

```bash
cd <NN-cours>
npm install
npm run docs:build   # DOIT être vert (zéro lien mort non justifié)
```

## Règle liens morts

Deux catégories, deux traitements :

| Type de lien | Exemple | Traitement |
|--------------|---------|-----------|
| **Intra-cours** | `./05-index-fondamentaux` | **FIXER** (jamais ignorer) — un lien mort intra-cours = vraie erreur |
| **Cross-cours** | `../../09-nestjs/modules/...` | **IGNORER** via config — valide en navigation repo, hors racine du build isolé |

### Pattern standard `ignoreDeadLinks` (à mettre dans chaque `.vitepress/config.mts`)

```ts
ignoreDeadLinks: [
  // ... patterns propres au cours (quizzes, visualizations, labs) ...
  /\.\.\/\.\.\//, // liens cross-cours (../../<cours>) : isolés au build, valides en repo
],
```

> Ne PAS mettre `ignoreDeadLinks: true` (ignore tout) — on perd la détection des vrais liens morts intra-cours.

## Pièges récurrents à vérifier

1. **Numérotation périmée** après réordonnancement du curriculum (ex: `05-nestjs` → `09-nestjs`, `07-http-caching` → `11-http-caching`). Vérifier que la cible existe vraiment (`Glob`).
2. **Fichiers déplacés/supprimés** référencés (ex: `GUIDE-DEMARRAGE.md`).
3. **Sidebars VitePress** désynchronisées des modules réels (modules ajoutés/supprimés non répercutés).

## Intégration

- Étape 6 du cycle par cours (cf. `docs/superpowers/specs/...-design.md` §9) = ce contrôle.
- À terme : envisager un script qui build tous les cours et agrège les erreurs (CI-like), pour ne pas dépendre du build manuel par cours.
