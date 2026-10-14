# Lab H03 — Matrice d'états de la bascule 3D / 2D

> **Module associé :** [`modules/h03-matrice-etats.md`](../../modules/h03-matrice-etats.md)
> **Forme :** Zéro — la bascule n'existe pas encore, donc aucun de ses états n'a été pensé.
> **Outil :** un tableur pour la matrice, Figma pour les cases marquées M.
> **Ancrage :** fil rouge « Nahual 2D » (voir le lab H01 pour le cadrage du chantier et ses
> deux règles non négociables).

## Pourquoi ce composant est le bon sujet

La bascule 3D vers 2D est le composant le plus riche en états de tout le portfolio, et presque
tous ses états sont invisibles si on ne dresse pas la matrice. Il doit gérer : le chargement du
rendu 3D, l'indisponibilité de WebGL, une préférence système de mouvement réduit, un glissement
en cours, un glissement abandonné à mi-chemin, le focus clavier, le mode 2D actif, le retour
vers le 3D, et l'arrivée directe en 2D sans que le 3D ait jamais été chargé.

C'est exactement le genre de composant où un développeur pressé maquette deux états (3D et 2D)
et découvre les sept autres en production.

## Échauffement (25 min, jetable)

> Prends un interrupteur de thème clair/sombre dans un produit que tu utilises. Dresse sa
> matrice minimale : états de donnée (préférence système, choix explicite, aucun choix), états
> système (avant hydratation, après), états d'interaction (survol, focus, pressé). Contrainte :
> trouve l'état qui produit le clignotement blanc au chargement, et dis dans quelle case il vit.

Le piège attendu : ne pas voir l'état « avant hydratation ». C'est celui qui produit le défaut
visible le plus courant du web, et il n'apparaît dans aucune maquette.

## Lire avant

Relire précisément :
- §2.1 — les quatre familles d'états, et lesquelles sont oubliées vs refaites inutilement.
- §2.3 — les trois valeurs possibles d'une case, et l'interdiction de la case vide.
- §2.4 — le critère de non-déductibilité qui décide ce qui mérite une maquette.
- Exemple A — le format du tableau et la lecture case par case.

## Brief

1. **Lister les zones** du composant en lignes : la piste de glissement, le curseur
   lui-même, le libellé d'état, le contrôle alternatif (clic/clavier), et la zone de contenu
   derrière.
2. **Lister les états** en colonnes, en couvrant obligatoirement les quatre familles du §2.1 :
   - donnée : 3D disponible, 3D indisponible, préférence mouvement réduit active ;
   - système : chargement du rendu, échec de chargement, connexion dégradée ;
   - droit : sans objet ici — le noter explicitement, c'est une réponse valide ;
   - interaction : repos, survol, focus clavier, glissement en cours, glissement abandonné,
     mode 2D actif.
3. **Remplir chaque case** avec M (maquetté), H (hérité) ou X (hors périmètre assumé). **Aucune
   case vide.**
4. **Traiter explicitement les deux règles du fil rouge** (voir lab H01) comme des cases de la
   matrice :
   - l'arrivée avec `prefers-reduced-motion` actif doit donner le mode 2D **sans** interaction ;
   - toute case de la famille interaction accessible au glissement doit avoir sa jumelle
     accessible au clic et au clavier. Si une case n'a pas de jumelle, c'est un défaut
     d'accessibilité à nommer, pas une case à laisser.
5. **Maquetter les cases M**, et seulement elles.
6. **Écrire la règle de pluriel / de libellé** de l'état (comment on nomme « 2D actif » dans
   l'interface) — le texte fait partie de l'état (module A07).

## Livrable attendu

- La matrice complète, zéro case vide, avec M / H / X sur chaque case.
- Le décompte final : combien de M, de H, de X, sur combien de cases au total.
- Les maquettes des seules cases M.
- Les deux règles du fil rouge traitées comme des cases, avec leur verdict.
- La liste des cases qui ont révélé un défaut d'accessibilité, s'il y en a.

## Rubrique de vérification

**Rubrique objective :**
- Aucune case vide dans la matrice. Une seule case vide invalide le lab.
- Les quatre familles d'états sont représentées, y compris la famille « droit » traitée en
  « sans objet » explicite.
- L'état « arrivée en mouvement réduit » existe et aboutit au mode 2D sans interaction requise.
- Chaque état atteignable par glissement a une case jumelle pour le clic et le clavier.
- Le décompte M / H / X est écrit, et le nombre de maquettes produites égale exactement le
  nombre de M.
- Au moins un état de contenu ou de libellé est traité (le texte de l'état).

**Revue qualitative :** le brief demandait une couverture vérifiable plutôt qu'exhaustive. Les
questions sont donc : les cases marquées H sont-elles réellement déductibles par quelqu'un qui
lit le design system (et non marquées H par fatigue), et les X sont-ils des décisions assumées
qu'on pourrait contester en revue ? Une matrice où tout est M signale qu'on n'a pas trié ; une
matrice où presque tout est H signale qu'on a esquivé.

## Variante J+30 (fading)

Dresser la matrice d'un **deuxième** composant du fil rouge — une carte de projet en mode 2D —
sans relire la première matrice, puis comparer les colonnes que tu as spontanément retenues.
Les familles que tu oublies la deuxième fois sont celles qui ne sont pas encore automatiques,
et c'est presque toujours la famille « droit » ou le contenu extrême.
