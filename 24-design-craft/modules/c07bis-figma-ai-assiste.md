---
titre: Figma AI, assisté sans être dirigé par elle
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [génération IA de variantes, premier jet vs décision finale, grilles du Bloc B comme filtre de jugement, accélérer l'exploration vs accepter sans relecture]
outcomes: [générer plusieurs premiers jets IA distincts d'un même écran, critiquer un résultat IA avec au moins deux grilles déjà apprises, décider explicitement de garder/corriger/jeter un résultat IA avec une justification écrite]
prerequis: [c07-pont-figma-code]
next: c08-plugins-utiles
tribuzen: générer un premier jet IA d'un écran TribuZen pas encore designé puis le juger avec les grilles Gestalt/hiérarchie/accessibilité déjà apprises
last-reviewed: 2026-10
---

# Figma AI, assisté sans être dirigé par elle

> **Outcomes — tu sauras FAIRE :** générer plusieurs premiers jets IA distincts pour un même
> écran, critiquer un résultat IA avec au moins deux grilles déjà apprises dans le cours
> (Gestalt, hiérarchie, accessibilité), et décider explicitement de le garder, le corriger ou
> le jeter avec une justification écrite — jamais l'accepter tel quel parce qu'il "a l'air
> propre".
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un outil IA de Figma peut produire, en quelques secondes, un écran complet à partir d'un
prompt ou d'une image de référence. Le réflexe naturel face à un résultat visuellement
propre et cohérent est de le considérer comme "fini" — exactement le même réflexe qui, côté
code, pousse à accepter une suggestion d'autocomplétion IA sans la relire parce qu'elle
compile et a l'air correcte. Dans les deux cas, "ça a l'air bon" n'est pas une preuve que
c'est bon : seule une relecture avec de vrais critères (ici, les grilles du Bloc B) peut le
confirmer ou l'infirmer.

Le risque concret pour TribuZen : accepter un écran généré par IA qui regroupe mal
l'information (violation Gestalt du module B04 passée inaperçue parce que "ça se présente
bien"), ou qui a un contraste insuffisant (violation accessibilité du module A06 invisible
à l'œil sur un écran démo lumineux). Ce module construit le réflexe de relecture systématique.

## 2. Théorie complète, concise

### 2.1 Ce que Figma AI fait réellement : accélérer un brouillon, pas trancher

Les fonctionnalités IA de Figma permettent, au choix : générer des **variantes** à partir
d'un composant existant (plusieurs déclinaisons visuelles d'un même composant), ou produire
un **premier jet** d'écran à partir d'un prompt texte ou d'une image de référence. Dans les
deux cas, l'IA produit une PROPOSITION, pas une décision. Elle joue le même rôle que le
benchmark concurrentiel (module A02) ou les thumbnails crayon (module B07) : une source
d'idées à juger, jamais une source de vérité.

### 2.2 Le principe central : la même discipline que pour le code généré

Accepter un résultat IA sans le repasser par une grille de jugement explicite revient
exactement à accepter du code généré par un assistant sans le relire — même risque de bug
invisible, même nécessité de relecture systématique. Les grilles déjà apprises dans ce cours
servent précisément à ça :

- **Gestalt (module B04)** : le résultat IA groupe-t-il l'information de façon cohérente
  (proximité, similarité) ou mélange-t-il des éléments sans logique de regroupement claire ?
- **Hiérarchie visuelle (module B09, à venir dans l'ordre du cours)** : l'œil est-il guidé
  vers ce qui compte vraiment, ou l'IA a-t-elle produit un écran visuellement "plat" où tout
  semble avoir la même importance ?
- **Accessibilité (module A06)** : les zones tactiles sont-elles dimensionnées (44px), le
  contraste texte/fond est-il suffisant une fois mesuré (pas supposé) ?
- **Sémiotique (module B06)** : les icônes générées utilisent-elles des symboles
  conventionnels reconnaissables, ou des pictogrammes ambigus inventés par le modèle ?

### 2.3 La compétence qui compte : juger, pas s'abstenir

Le module ne demande PAS de renoncer à l'outil par principe — refuser systématiquement
l'IA serait une erreur symétrique à l'accepter sans filtre, les deux évitent le vrai travail
de jugement. La compétence visée est précisément : savoir produire plusieurs premiers jets
rapidement avec l'IA (gain de temps réel sur l'exploration), puis appliquer un jugement
humain rigoureux avant de retenir, corriger ou jeter chacun.

### 2.4 Piège central : accepter parce que c'est la première proposition

Le risque le plus fréquent n'est pas de ne pas juger du tout, mais de juger complaisamment
UNE seule proposition parce qu'elle est arrivée vite et semble suffisante — le même biais
d'ancrage que celui évité par le thumbnailing en volume du module B07 (produire plusieurs
pistes avant de converger). Générer au moins deux jets différents avant de juger force à
comparer plutôt qu'à valider la première idée venue.

## 3. Worked examples

### Exemple A — générer deux jets, les juger avec deux grilles différentes

Besoin : un écran de confirmation de routine terminée pour TribuZen, jamais encore designé.

1. Générer un premier jet IA à partir d'un prompt décrivant le besoin (écran de
   confirmation, ton familial chaleureux, cohérent avec la palette sauge/terracotta).
2. Générer un second jet avec un prompt légèrement différent (ex. en insistant sur la
   simplicité plutôt que la célébration visuelle) pour obtenir une vraie alternative, pas une
   variation cosmétique du même jet.
3. Juger le jet 1 avec la grille Gestalt (B04) : les éléments de confirmation (icône, texte,
   bouton de retour) sont-ils groupés par proximité de façon cohérente, ou dispersés ?
4. Juger le jet 2 avec la grille accessibilité (A06) : la zone tactile du bouton de retour
   fait-elle au moins 44px, le contraste texte/fond est-il mesuré et suffisant ?
5. Conclusion documentée : lequel des deux jets (ou aucun, ou une fusion des deux) est retenu,
   avec la raison précise issue des grilles, jamais "je préfère celui-là".

### Exemple B — un résultat IA qui échoue à une grille malgré une apparence propre

Un jet IA produit un écran visuellement soigné (couleurs cohérentes, typographie propre) mais
place le texte d'erreur en gris clair sur fond blanc chaud — contraste mesuré insuffisant
(grille A06). Sans relecture avec l'outil de mesure de contraste (module C08, à venir), ce
défaut serait resté invisible sur un écran lumineux de bureau. Décision : conserver la
structure du jet (bonne hiérarchie, bon regroupement) mais corriger explicitement la couleur
du texte d'erreur avant tout usage réel — ni rejet total, ni acceptation telle quelle.

## 4. Pièges & misconceptions

- **Accepter un résultat IA parce qu'il "a l'air bon".** C'est précisément ce que ce module
  interdit — voir 2.2 : la même discipline que pour du code généré, relecture systématique
  obligatoire, jamais une impression générale en guise de validation.

- **Refuser l'IA par principe, sans même l'essayer.** Symétrique de l'erreur précédente —
  voir 2.3 : la compétence recherchée est le jugement, pas l'évitement.

- **Générer un seul jet et le juger comme s'il était la seule option possible.** Voir 2.4 —
  sans comparaison, le jugement porte sur "est-ce acceptable" plutôt que sur "est-ce le
  meilleur des choix disponibles".

- **Juger uniquement avec une seule grille (ex. seulement l'esthétique générale).** Les
  défauts les plus coûteux (accessibilité, structure sémantique) sont souvent invisibles à
  l'œil sans un outil ou une grille dédiée — voir Exemple B.

## 5. Ancrage TribuZen

- Tout écran TribuZen pas encore designé peut désormais démarrer par un ou plusieurs premiers
  jets IA, à condition que la relecture par grille soit systématique avant tout usage réel.
- La liste de grilles disponibles (Gestalt B04, hiérarchie B09, accessibilité A06, sémiotique
  B06) devient un outil réutilisable pour tout jugement de maquette, générée par IA ou non.
- Ce réflexe de relecture prépare directement le module C08 (plugins utiles) : certaines
  grilles qualitatives (accessibilité) gagnent à être vérifiées avec un outil de mesure réel
  plutôt qu'à l'œil, comme déjà vu dans l'Exemple B.

## 6. Points clés

1. Un résultat IA est une proposition à juger, jamais une décision finale — même discipline
   que pour du code généré par un assistant.
2. Juger avec au moins deux grilles déjà apprises (Gestalt, hiérarchie, accessibilité,
   sémiotique) révèle des défauts invisibles à l'œil sur une première impression.
3. Générer plusieurs jets avant de juger évite le biais d'ancrage sur la première proposition
   arrivée.
4. La compétence visée est le jugement, ni le rejet systématique de l'outil ni l'acceptation
   sans filtre.
5. Un résultat peut être partiellement retenu (bonne structure, défaut ponctuel corrigé) —
   le jugement n'est pas binaire garder/jeter.

## 7. Seeds Anki

```
Pourquoi juger un résultat IA avec la même discipline que du code généré ?|Dans les deux cas, "ça a l'air bon" n'est pas une preuve — seule une relecture avec de vrais critères confirme ou infirme la qualité réelle
Quelle est la compétence centrale visée par ce module ?|Savoir juger ce que l'IA produit (avec des grilles explicites), pas savoir s'en passer ni l'accepter sans filtre
Pourquoi générer au moins deux jets IA différents avant de juger ?|Éviter le biais d'ancrage sur la première proposition arrivée — comparer force un vrai jugement plutôt qu'une validation complaisante
Citer deux grilles du Bloc B/A utilisables pour juger un écran généré par IA|Gestalt (regroupement cohérent de l'information) et accessibilité (contraste mesuré, zones tactiles 44px) — ou hiérarchie visuelle, ou sémiotique
Un résultat IA qui échoue à une grille doit-il toujours être jeté entièrement ?|Non — il peut être partiellement retenu (bonne structure gardée, défaut ponctuel corrigé) ; le jugement n'est pas binaire
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c07bis-figma-ai-assiste/`. Tu y génères plusieurs
> premiers jets IA d'un écran TribuZen, tu les juges avec des grilles déjà apprises, et tu
> documentes une décision finale justifiée — brief complet et rubrique de vérification dans
> le README du lab.
