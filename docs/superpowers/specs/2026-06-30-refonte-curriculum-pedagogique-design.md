# Refonte pédagogique du curriculum — Design

**Date** : 2026-06-30
**Auteur** : Sylvain + coach IA
**Statut** : design validé en brainstorming, à relire avant plan d'implémentation

---

## 1. Problème

Le curriculum (24 cours, ~370 modules, ~280 labs, ~660 quizzes, ~300 screencasts) souffre de défauts systémiques identifiés lors de l'audit du 26/06/2026 :

- **Labs simulés** : beaucoup imitent l'outil (faux Vitest/Playwright/MSW/etc.) au lieu de l'utiliser. Le cours Testing a révélé l'ampleur du problème.
- **Pratique faible / contenu read-only** : les ajouts récents (DOM, SEO, storage, etc.) sont du contenu à lire, hors boucle de pratique et de révision espacée.
- **Désalignement coach ↔ cours** : le coach extrait les notions à la main, rien n'est structuré pour la consommation automatique.
- **Couverture incomplète** de la liste de priorités personnelle de Sylvain (liste 13-prio).

Objectif global : **un temps de travail efficace** menant à une **maîtrise page blanche** (« dans la tête et dans les doigts ») en fin de formation, mesurée par la **rétention à J+30** (et au-delà via SM-2).

## 2. Objectifs & critères de succès

1. Chaque concept du curriculum est **documenté complètement** (base théorique de référence) ET **pratiqué** (exercice avec corrigé) ET **révisé** (retrieval + SM-2).
2. **100 % de couverture** de la liste 13-prio de Sylvain.
3. **Maîtrise page blanche** : Sylvain sait refaire/expliquer chaque notion sans aide.
4. **Rétention J+30** ≥ seuil (mesurée par le coach via cold replay & SM-2).
5. **Temps efficace** : pas de bloat pédagogique, pas de grind de labs simulés, pas de réécriture de contenu déjà bon.
6. **Synergie coach ↔ cours** : modules directement consommables par le protocole coach.

Non-objectifs : refonte de l'architecture pédagogique de zéro ; ajout d'une 4ᵉ couche d'artefacts ; gamification ; plateforme d'auto-évaluation automatisée (le coach est la boucle de feedback).

## 3. Fondements scientifiques

Méthode ancrée sur les techniques à **haute utilité** (méta-analyse Dunlosky et al., 2013) :

- **Practice testing / retrieval** (effet test, Roediger & Karpicke) — levier #1.
- **Distributed practice / spacing** (SM-2 déjà en place) — levier #2.
- **Desirable difficulties** (Bjork) — friction productive.
- **Worked-example effect + fading** (Sweller, Renkl, van Merriënboer).
- **Generation effect** (Slamecka & Graf) — produire avant de lire.
- **Concret avant abstrait** (déjà règle coach).
- **Transfert en contexte authentique** — TribuZen comme capstone réel.

Techniques à **basse utilité** explicitement **évitées comme cibles** : relire, surligner, résumer. → On n'investit pas dans de « plus beaux modules à relire ». L'investissement va dans les **exercices** + la **boucle retrieval/SM-2**.

**Principe directeur** : la cible d'optimisation est « Sylvain sait-il FAIRE la compétence et ça survit-il à J+30 ? », pas « le module coche-t-il une grille ». La grille est un **plancher minimal**, jamais le but.

## 3bis. Principe directeur : cours 100 % piloté par le coach

Le curriculum est conçu pour être **piloté à 100 % par le coach IA**, qui chapeaute Sylvain et est **force de proposition** (drive la session, propose le focus et la suite, ne attend pas la demande). Conséquences de design :

- Le **module est le matériau-source du coach**, pas un document de lecture en solo. Le coach le métabolise pour conduire la session (extraction notions, retrieval, ancrage, détection de pièges).
- Le module peut donc être une **référence dense et complète** : le coach gère le rythme et la charge cognitive ; le module n'a pas à s'auto-rationner.
- « Lean en forme » se justifie d'autant plus : pas de sections d'auto-apprentissage solo, le coach **est** la médiation.

## 4. Modèle pédagogique (couches)

```
Module (référence complète, lean en forme)
   ↓ pont
Lab (énoncé + corrigé complet commenté — feedback = COACH, zéro test simulé)
   ↓ application
TribuZen (capstone réel, vrai outil du marché)
   ↕ transversal
Coach + SM-2 + Anki (retrieval, spacing, fluency-trap)
```

- **Module** = base documentaire **complète** (toute notion du domaine couverte, rien renvoyé à « débrouille-toi ») mais **lean en forme** (pas de ritual padding, pas de diagramme décoratif — profil Sylvain skip les diagrammes, prose dense + code).
- **Lab** = pratique guidée. **Pas de harnais de test simulé** : la boucle de feedback est le **coach en session**. Contenu = énoncé clair (vrai outil), étapes en friction, **corrigé complet commenté**, variante-contrainte pour le J+30 replay, pont application TribuZen.
- **TribuZen** = capstone réel (mapping cours → couche TribuZen déjà acté dans `private/progress.md`).
- **Coach + SM-2 + Anki** = boucle de retrieval/spacing, non dupliquée dans chaque module.

## 5. Template MODULE (7 sections + frontmatter)

Frontmatter YAML standardisé (parsable par le coach et le hook fraîcheur) :

```yaml
---
titre: <titre>
cours: <NN-nom-cours>
notions: [<notion1>, <notion2>, ...]   # consommé par coach Règle 0 (extraction auto) + gate couverture
outcomes: [<sait faire X>, <sait faire Y>]
prerequis: [<notion-amont>]             # coach vérifie cold-replays dépendants, séquence
next: <module-suivant>                  # coach = force de proposition (propose la suite)
libs: [{ name: <pkg>, version: <ref> }] # consommé par le hook fraîcheur
tribuzen: <couche TribuZen ancrée>      # doit matcher la table fil-rouge de progress.md
last-reviewed: YYYY-MM
---
```

Sections (dans l'ordre) :

1. **Outcomes « tu sauras faire »** — verbes d'action, pas une liste de sujets.
2. **Cas concret d'abord** — un problème à résoudre avant la théorie (generation effect).
3. **Théorie complète, concise** — chunks d'1 idée, prose + code, couverture **totale** des notions.
4. **1-2 worked examples résolus** — pas à pas.
5. **Pièges / misconceptions** — discrimination des concepts proches (feed fluency-trap, Règle 5 coach).
6. **Ancrage TribuZen** — où dans le vrai produit.
7. **Seeds Anki (5-8 Q|R)** — alimente SM-2 + anki-mcp.

Retrieval / fading / self-explanation ne sont **pas** des sections de module : ils sont portés par le **lab** et le **coach** (anti-bloat).

## 6. Template LAB

- Outcome clair + starter minimal avec **vrai outil** (zéro simulé).
- Étapes en friction (desirable difficulty).
- **Corrigé complet commenté** (fini les gap-fills).
- Variante-contrainte pour le J+30 replay (fading).
- Pont application TribuZen réelle.
- **Feedback = coach en session**, pas de test-runner auto.

## 7. Grille d'audit (plancher minimal)

Chaque module/lab scoré 0-3 sur 8 critères : couverture notions · concret-avant-abstrait · worked examples complets · (lab) vrai outil + corrigé complet · pièges/misconceptions · ancrage TribuZen · actualité technique (versions) · seeds Anki présentes.

**Plancher = tous critères ≥ 2, aucune notion sans friction possible.** La grille sert l'**audit-first** (cf. §9), pas la cible d'optimisation.

## 8. Sort des artefacts existants

- **Screencasts (~300)** : auditer → fusionner le contenu **unique** dans le module → **suppression dure** des fichiers + retrait des sidebars VitePress.
- **Quizzes (~660)** : extraire les **questions** → **banque de retrieval par module** (fusionnée avec les seeds Anki, source unique) → alimente coach + SM-2 + anki-mcp → **suppression dure** des HTML.
- **Labs** : réécrits au template §6 (vrai outil + corrigé) ou supprimés si redondants.
- **Modules** : audit-first, réécriture lourde uniquement sous le plancher, retouche légère sinon.

## 9. Processus par cours (sous-projet)

Chaque cours = un cycle :

1. **Audit** (grille §7 + précision technique via Context7) → rapport de gaps.
2. **Matrice couverture** liste 13-prio → 100 % pour les items du cours.
3. **Réécriture modules** au template §5 (lourde sous plancher, légère sinon).
4. **Réécriture/remplacement labs** au template §6.
5. **Absorption screencasts + quizzes** → suppression dure.
6. **Câblage VitePress** (sidebar) + **fix imports** + **build de vérification** (`npm install && npm run docs:build` vert — voir `docs/curriculum/BUILD-CHECK.md` : contrôle liens morts récurrent, intra-cours = fixer, cross-cours = ignorer via pattern standard).
7. **Génération seeds Anki + entrées SM-2** + push anki-mcp.
8. **Commits par submodule sur `main`** (fréquents pour rollback granulaire ; pas de branche — rollback via git si besoin).

## 10. Synergie coach ↔ cours

Workstream dédié — **refactor du protocole coach** (pas un bolt-on : `progress.md` est déjà volumineux et doit scaler à 24 cours). Mettre à jour `private/progress.md` pour **consommer la nouvelle structure** :

- Règle 0 (extraction notions) lit le **frontmatter `notions:`** au lieu d'extraire à la main.
- Gate couverture totale = cocher les `notions:` du frontmatter.
- Pièges/misconceptions du module → détection fluency-trap (Règle 5).
- Ancrage TribuZen du module ↔ table fil-rouge.
- Seeds Anki → génération Anki (gate fin de cours) + anki-mcp.

## 11. Hook fraîcheur (extension)

`private/hooks/freshness-check.ps1` étendu pour, par cours :

- **Versions** : drift major des libs (déjà fait).
- **Nouveautés relatives au cours** : détecter via Context7 / WebSearch les nouvelles features/patterns pertinents (ex : nouveautés IA pour 18-ia, nouveaux patterns React, nouvelles Web APIs) → signaler, pas éditer auto.
- Lit le frontmatter `libs:` + `last-reviewed:` des modules pour cibler.

## 12. Pilote & validation

- **Pilote** : 2-3 modules témoins — **1 de Testing** (déclencheur, motivant) + **1 d'un cours typique** (ex : `01-js-runtime` ou `10-postgresql`).
- **Validation rapide (double critère)** : (a) **rétention** — Sylvain étudie les modules témoins → retrieval immédiat + J+7 ; (b) **orchestration coach** — le coach arrive-t-il à driver le module réécrit (extraction notions via frontmatter, retrieval, ancrage, force de proposition) ? + QA technique. Si les deux OK → **template figé en v1**.
- Le template peut évoluer en v1.1 si la rétention long terme révèle un défaut.

## 13. Exécution (big-bang après pilote)

- Après validation du template v1 : **rollout big-bang** sur les 24 cours, dans l'ordre parcours (00 TS → 01 JS → 06 Test → 04 React → 09 Nest → 10 PG → …), via **sous-agents parallèles** (modèle de l'audit 4-agents du 26/06).
- **QA gate obligatoire** sur chaque sortie d'agent : précision technique (Context7) + grille-plancher **avant commit**. Pas de confiance aveugle (risque d'hallucination de contenu péda).
- Vérification build VitePress + imports à chaque cours.

## 14. Risques & mitigations

| Risque | Mitigation |
|--------|-----------|
| Volume écrit avant rétention prouvée (big-bang) | Pilote + validation rapide, template v1 révisable, hook fraîcheur |
| Agents hallucinent du contenu technique | QA gate Context7 + grille-plancher avant commit |
| Concurrence avec RGAA (priorité jusqu'au 20 oct) | RGAA reste primaire ; le chantier tourne en parallèle, jamais à sa place |
| Destruction de contenu déjà bon | Audit-first : réécriture lourde seulement sous plancher |
| Corruption repo (commits de masse, submodules) | Commits fréquents par submodule sur main, rollback git |
| Perte de contenu unique (screencasts/quizzes) | Absorption avant suppression |

## 15. Définition de « terminé » (par cours)

- Tous modules au template, plancher ≥ 2 partout.
- Tous labs au template (vrai outil + corrigé).
- Screencasts + quizzes absorbés et supprimés.
- Couverture 13-prio du cours = 100 %.
- Build VitePress vert, imports cohérents, zéro lien mort intra-cours (cf. `docs/curriculum/BUILD-CHECK.md`).
- Seeds Anki générées + SM-2 + anki-mcp branchés.
- Coach (progress.md) aligné sur la nouvelle structure.
- Commits par submodule sur main.
