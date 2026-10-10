---
titre: Accessibilité comme discipline de conception
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [ordre de focus, zones tactiles 44px, pattern d'erreur de formulaire sans dépendre de la couleur seule, structure de titres pour lecteur d'écran, accessibilité en conception vs correction en dev]
outcomes: [annoter un ordre de focus logique sur une maquette avant tout développement, dimensionner et vérifier des zones tactiles conformes, concevoir un pattern d'erreur de formulaire qui ne repose jamais sur la couleur seule, structurer la hiérarchie de titres d'un écran dès le wireframe]
prerequis: [a05-heuristiques-ux]
next: a07-ux-writing
tribuzen: audit d'accessibilité au stade maquette d'un flow TribuZen existant (onboarding ou une routine), avant tout code
last-reviewed: 2026-10
---

# Accessibilité comme discipline de conception

> **Outcomes — tu sauras FAIRE :** annoter un ordre de focus logique sur une maquette avant
> tout développement, dimensionner des zones tactiles conformes, concevoir un pattern
> d'erreur de formulaire qui ne dépend jamais de la couleur seule, et structurer la
> hiérarchie de titres d'un écran dès le wireframe plutôt qu'en correction tardive.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un flow d'onboarding TribuZen fonctionne très bien à la souris : chaque champ se clique dans
l'ordre naturel de lecture, les erreurs apparaissent en rouge sous le champ fautif. Le jour
où ce même flow est testé au clavier seul (touche Tab), l'ordre de focus saute du champ email
au bouton "Annuler" avant le champ mot de passe — parce que ce bouton a été ajouté plus tard
dans le code, à un endroit qui ne correspond pas à sa position visuelle. Et le jour où une
personne daltonienne regarde l'écran, le champ en erreur se distingue... par sa seule bordure
rouge, invisible pour elle.

Ces deux problèmes n'ont rien à voir avec du code mal écrit : la maquette elle-même n'a
jamais prévu ni l'ordre de focus, ni une deuxième façon de signaler une erreur. Corriger ça
en développement coûte une réécriture ; le prévoir en maquette coûte une annotation. C'est
tout l'objet de ce module : l'accessibilité comme question posée AVANT le premier pixel de
code, pas comme ticket de correction après coup.

## 2. Théorie complète, concise

### 2.1 Ordre de focus — l'ordre visuel n'est pas automatiquement l'ordre de navigation

Au clavier (touche Tab) ou avec un lecteur d'écran, un utilisateur parcourt l'interface dans
l'**ordre du DOM**, pas dans l'ordre où les éléments apparaissent à l'écran. Si le code place
un bouton "Annuler" avant le champ "Mot de passe" alors qu'il apparaît visuellement après,
l'utilisateur au clavier rencontre les deux dans un ordre qui ne correspond à rien de logique.

Ce n'est pas un problème de développement à corriger plus tard : c'est une question de
conception à trancher dès la maquette. Chaque wireframe doit porter une annotation explicite
de l'ordre de parcours attendu (numéroter les éléments 1, 2, 3...), pour que le futur
développeur (Sylvain lui-même, en autre casquette) sache quel ordre coder, sans deviner.

### 2.2 Zones tactiles — la cible doit être assez grande pour être atteinte

Une cible tactile (bouton, lien, case à cocher) doit mesurer au moins **44×44px** — repère
constant chez Apple (HIG), Google (Material) et le WCAG (critère 2.5.5, niveau AAA, mais
largement adopté comme bonne pratique même hors obligation stricte). Une cible plus petite
échoue en usage réel pour des raisons très concrètes : un doigt plus large que la moyenne, un
léger tremblement (âge, fatigue, pathologie), un écran utilisé en mouvement (dans les
transports). Ce n'est pas une marge de confort, c'est une contrainte physique mesurable.

Piège fréquent : confondre la taille VISUELLE d'une icône (ex. 16×16px) avec la taille de sa
zone cliquable réelle — la zone cliquable doit être agrandie autour de l'icône jusqu'à
atteindre 44×44px, l'icône elle-même peut rester petite visuellement.

### 2.3 Pattern d'erreur de formulaire — jamais la couleur seule

Un champ en erreur signalé UNIQUEMENT par une bordure rouge échoue pour toute personne
daltonienne (environ 8% des hommes) et pour quiconque consulte l'écran en niveaux de gris
(impression, mode économie d'énergie). Le pattern correct combine toujours au moins deux
signaux indépendants de la couleur :
- un **message textuel** explicite associé au champ ("Cet email ne semble pas valide"),
- une **icône ou un symbole** (ex. point d'exclamation) en plus de la couleur,
- parfois un changement de forme/bordure (épaisseur) qui reste visible en niveaux de gris.

Ce module se limite au PATTERN pensé en maquette (où le message apparaît, quelle forme il
prend) — l'implémentation technique (annonce programmatique pour lecteur d'écran) relève du
code, pas de la conception, mais une maquette qui ne prévoit jamais d'emplacement pour ce
message ne laisse aucune chance au développeur de bien faire.

### 2.4 Structure de contenu pour lecteur d'écran — la hiérarchie de titres se pense au wireframe

Un lecteur d'écran permet de naviguer directement de titre en titre (sans lire tout le
contenu intermédiaire), à condition que la hiérarchie des titres (niveau 1, niveau 2,
niveau 3...) soit cohérente et corresponde à une vraie structure logique — pas à une suite
d'éléments stylés gros/petit sans relation hiérarchique réelle. Cette hiérarchie doit déjà
être visible dans le wireframe basse fidélité (module A04) : quel bloc est le titre principal
de l'écran, quels sont ses sous-titres, est-ce qu'un bloc visuellement "gros" est vraiment un
titre de section ou juste un texte mis en avant sans rôle structurel.

## 3. Worked examples

### Exemple A — annoter l'ordre de focus d'un wireframe d'onboarding TribuZen

1. Repérer tous les éléments interactifs de l'écran : champ prénom, champ email, champ mot de
   passe, case "j'accepte les conditions", bouton "Continuer", lien "J'ai déjà un compte".
2. Les numéroter dans l'ordre logique de remplissage : 1 (prénom), 2 (email), 3 (mot de
   passe), 4 (case conditions), 5 (bouton Continuer), 6 (lien connexion) — le lien de
   connexion en dernier, car il sort du flow principal plutôt que de le faire avancer.
3. Documenter ce numérotage directement sur le wireframe (annotation visible), pas dans un
   document séparé qu'un développeur pourrait ne jamais ouvrir.
4. Vérifier qu'aucun élément interactif n'est oublié (ex. un bouton "Retour" en haut d'écran,
   souvent ajouté tardivement et oublié dans ce type d'annotation).

### Exemple B — corriger un message d'erreur qui dépend de la couleur seule

Situation donnée : champ "Email" en erreur, signalé par une bordure rouge uniquement.

1. Diagnostic : un daltonien ou une impression en niveaux de gris ne perçoit aucune
   différence entre ce champ et un champ valide.
2. Ajout d'un message textuel sous le champ : "Cet email ne semble pas valide, vérifie
   l'arobase" — explicite, pas juste "Erreur".
3. Ajout d'une icône (point d'exclamation) à côté du message, pour un repérage visuel rapide
   indépendant de la couleur.
4. La bordure rouge RESTE (elle aide les personnes qui voient bien les couleurs), mais elle
   n'est plus le SEUL signal — c'est la combinaison qui rend le pattern robuste.

## 4. Pièges & misconceptions

- **Traiter l'accessibilité comme une passe de correction en fin de développement.** C'est
  exactement l'inverse de ce que ce module enseigne : chaque problème ci-dessus se prévient
  en quelques minutes à la maquette, et se corrige en heures une fois codé.

- **Confondre taille visuelle d'une icône et taille de sa zone cliquable.** Une icône de
  16px peut avoir une zone cliquable de 44px si elle est entourée d'un espace cliquable
  invisible — les deux mesures ne sont pas la même chose.

- **Signaler une erreur par la couleur seule en pensant que "c'est plus propre visuellement".**
  Un message texte + une icône ne nuisent pas à l'esthétique s'ils sont bien intégrés — le
  vrai choix n'est pas "beau VS accessible", c'est "accessible pensé dès le départ VS ajouté
  au forceps plus tard, souvent moins beau".

- **Construire une hiérarchie de titres par taille de police plutôt que par structure
  logique.** Un texte stylé "gros" qui n'est pas un vrai titre de section casse la navigation
  par titre d'un lecteur d'écran, même si ça "a l'air" d'un titre visuellement.

## 5. Ancrage TribuZen

- L'onboarding et les flows de routine de TribuZen gagnent une annotation d'ordre de focus
  systématique, à tenir à jour à chaque ajout d'élément interactif (voir Design Ops, module
  A11, pour la discipline de documentation qui rend ça durable).
- Toute future maquette TribuZen qui introduit un champ de formulaire doit prévoir dès le
  wireframe l'emplacement du message d'erreur et son pattern (texte + icône), jamais la
  couleur seule.
- Les zones tactiles de TribuZen (déjà pensé pour un usage familial, parfois par des enfants
  ou sur mobile en mouvement) sont un terrain particulièrement concret pour la règle des
  44px — pas une contrainte abstraite.

## 6. Points clés

1. L'ordre de focus (navigation clavier/lecteur d'écran) suit l'ordre du DOM, pas l'ordre
   visuel — il doit être annoté explicitement sur la maquette, pas laissé au hasard du code.
2. Une zone tactile doit mesurer au moins 44×44px — la taille visuelle d'une icône et la
   taille de sa zone cliquable sont deux mesures différentes.
3. Un pattern d'erreur de formulaire ne dépend jamais de la couleur seule : message texte +
   icône, la couleur peut rester en renfort mais jamais en signal unique.
4. La hiérarchie de titres d'un écran se pense dès le wireframe, par structure logique réelle,
   pas par taille de police.
5. L'accessibilité pensée en conception coûte des minutes ; corrigée après coup en
   développement, elle coûte des heures et laisse souvent des trous.

## 7. Seeds Anki

```
Pourquoi l'ordre de focus visuel et l'ordre de focus clavier peuvent-ils diverger ?|L'ordre clavier/lecteur d'écran suit l'ordre du DOM (code), pas l'ordre visuel — un élément ajouté tardivement dans le code peut apparaître au mauvais moment au clavier même si visuellement il est bien placé
Quelle taille minimale pour une zone tactile, et pourquoi ?|Au moins 44×44px — repère WCAG/HIG/Material ; une cible plus petite échoue en usage réel (doigt large, tremblement, mobilité réduite)
Pourquoi ne jamais signaler une erreur de formulaire par la couleur seule ?|Une personne daltonienne ou un affichage en niveaux de gris ne perçoit pas la différence — il faut toujours combiner la couleur avec un texte explicite et/ou une icône
Qu'est-ce qui distingue un vrai titre de section d'un texte simplement stylé "gros" ?|Le vrai titre a un rôle structurel dans la hiérarchie du contenu (navigable par un lecteur d'écran) ; un texte stylé gros sans rôle structurel casse cette navigation même s'il "a l'air" d'un titre
Pourquoi traiter l'accessibilité en conception plutôt qu'en correction après développement ?|Chaque problème (focus, zones tactiles, pattern d'erreur, hiérarchie) coûte quelques minutes à prévenir en maquette, contre des heures à corriger une fois codé — et certains trous ne sont même plus visibles une fois le code écrit
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a06-accessibilite-conception/`. Tu y annotes l'ordre de
> focus, mesures les zones tactiles et corriges les patterns d'erreur d'un flow TribuZen
> existant, directement dans la maquette — brief complet et rubrique de vérification dans le
> README du lab.
