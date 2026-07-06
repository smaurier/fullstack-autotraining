# Dette technique — override `delimiters` VitePress casse le thème

## Symptôme
Menu / sommaire ("Sur cette page") affichent le code du thème littéralement :
`{{ resolveTitle(theme) }}`, `{{ title }}` en cascade.

## Cause (confirmée empiriquement 2026-07-06)
Les configs de cours utilisaient :
```ts
vue: { template: { compilerOptions: { delimiters: ['(%(', ')%)'] } } }
```
But cet override s'applique à **@vitejs/plugin-vue globalement**, donc aussi aux composants
`.vue` du **thème par défaut de VitePress** (VPLocalNav, VPDocAsideOutline…). Leur interpolation
`{{ }}` cesse de fonctionner → rendue en texte brut. Vérifié : un build de 17-distributed
(0 moustache prose) produit **53 fichiers HTML** contenant `{{ title }}` littéral.

L'override avait été ajouté pour empêcher que les moustaches de démo en prose
(`{{ $value }}` Prometheus, `{{ }}` Vue, `${{ }}` GitHub Actions) cassent le build SSR.

## Fix propre (à appliquer à la reprise)
1. **Retirer** le bloc `vue: { template: { compilerOptions: { delimiters } } }` de la config du cours.
2. **Neutraliser les `{{ }}` de PROSE** du contenu (ceux hors blocs de code) :
   - déplacer dans un bloc de code fencé (déjà `v-pre` par VitePress), OU
   - envelopper : `<span v-pre>{{ x }}</span>`, OU
   - échapper : `&#123;&#123; x &#125;&#125;`.
   ⚠️ Les `{{ }}` en **inline code** `` `{{ x }}` `` ne sont **pas** protégés par VitePress
   (seuls les blocs fencés le sont) → à v-pre aussi s'ils contiennent `{{ }}`.
3. **Le build est l'oracle** : `pnpm run docs:build` échoue sur chaque moustache prose restante
   en donnant `fichier.md:ligne`. Itérer jusqu'à `build complete`.
4. Vérifier le rendu : `grep -rl "{{ title }}" .vitepress/dist` doit être **vide**.

## État par cours (2026-07-06)
| Cours | Override | Build sans override | Action |
|-------|----------|---------------------|--------|
| 17-distributed-systems | **RETIRÉ ✅** | OK (0 moustache prose) | fait |
| 18-ia | **RETIRÉ ✅** | OK (0 moustache prose) | fait |
| 16-observability-sre | conservé (dette) | KO — `{{ $value }}`/`{{ $labels.x }}` Prometheus en prose/inline | v-pre à faire |
| 02-vue | conservé (dette) | KO — ~586 `{{ }}` (majorité en blocs code OK ; qq prose à v-pre) | v-pre à faire |
| autres cours shippés (00,01,03,04,05,06,07,08,09,10,11,12,13,14,15,21) | à auditer | inconnu | `grep -l "delimiters:" */.vitepress/config.mts` puis même procédure |

## Gate
`scripts/gate-course.ps1` n'exige PLUS l'override (il le **signale en warning**). Le build SSR
reste le check dur contre les moustaches en prose. Les nouveaux cours doivent naître SANS override.
