---
titre: UX writing & microcopy
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [message d'erreur sans blâme, état vide actionnable, label de bouton en verbe d'action, voice & tone cohérent, microcopy créative vs claire]
outcomes: [réécrire un message d'erreur pour qu'il soit actionnable plutôt qu'accusateur, concevoir un état vide qui explique et propose une action, nommer un bouton par un verbe d'action précis, maintenir un ton cohérent à travers toute une interface]
prerequis: [a06-accessibilite-conception]
next: a08-ethique-dark-patterns
tribuzen: réécriture des messages d'erreur et états vides d'un flow TribuZen existant, avant/après documenté
last-reviewed: 2026-10
---

# UX writing & microcopy

> **Outcomes — tu sauras FAIRE :** réécrire un message d'erreur pour qu'il soit actionnable
> plutôt qu'accusateur, concevoir un état vide qui explique et propose une action, nommer un
> bouton par un verbe d'action précis, et maintenir un ton cohérent à travers toute une
> interface plutôt que de le traiter écran par écran.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un écran TribuZen vide (aucune routine créée encore) affiche "Aucune donnée." Techniquement
exact, inutile pour l'utilisateur : il ne sait pas si c'est normal, ni ce qu'il doit faire.
À côté, un champ mot de passe trop court affiche "Erreur 422" — vrai code HTTP, zéro
information utile pour un parent fatigué qui remplit ce formulaire le soir.

Le texte d'une interface n'est pas une case qu'on remplit après coup pour "faire joli" — pour
un produit dense en informations comme une console de pilotage, il porte autant de charge que
la mise en page elle-même. Ce module construit trois règles simples pour que chaque mot d'une
interface fasse avancer l'utilisateur plutôt que de le bloquer sans lui dire quoi faire.

## 2. Théorie complète, concise

### 2.1 Messages d'erreur : jamais la faute de l'utilisateur, toujours une action possible

Un message d'erreur a deux fonctions, jamais une seule : dire ce qui s'est passé, et dire
quoi faire ensuite. "Champ invalide" remplit la première fonction de façon vague et la
seconde pas du tout. "Cet email ne semble pas valide, vérifie l'arobase" fait les deux : le
problème est nommé précisément, et l'action à faire est évidente.

La formulation ne doit jamais accuser ("Vous avez mal rempli ce champ") ni exposer un détail
technique inutile à l'utilisateur ("Erreur 422 : Unprocessable Entity"). Le ton reste factuel
et orienté solution, jamais défensif ni technique.

### 2.2 États vides : expliquer pourquoi, proposer quoi faire

Un état vide (aucune donnée à afficher) n'est jamais une erreur — c'est un état normal du
produit à un moment donné (premier lancement, filtre trop restrictif, liste réellement vide).
"Aucune donnée" laisse l'utilisateur dans l'incertitude : est-ce normal ? Est-ce cassé ? Un
bon état vide répond à deux questions : POURQUOI c'est vide ("Aucune routine créée pour le
moment"), et QUOI FAIRE pour en sortir ("Créer ta première routine" avec le bouton qui va
avec, directement sur l'écran vide — pas caché dans un menu).

### 2.3 Labels de boutons : un verbe d'action précis

Un bouton "OK" ou "Soumettre" ne dit rien de ce qui va se produire au clic. Un bouton
"Ajouter une routine" dit exactement l'action qui suit. La règle est simple : le label d'un
bouton principal commence par un verbe d'action et nomme l'objet de l'action — "Créer",
"Ajouter", "Supprimer la routine", jamais un mot générique qui pourrait s'appliquer à
n'importe quel bouton de n'importe quelle interface.

### 2.4 Voice & tone : une cohérence à travers TOUTE l'interface, pas écran par écran

Le "voice" est la personnalité globale d'un produit (pour TribuZen : chaleureux, simple,
familial — pas corporate ni technique). Le "tone" est l'inflexion de cette personnalité selon
le contexte (un message de succès peut être enjoué, un message d'erreur reste factuel et
rassurant, jamais inquiétant). La voix ne change jamais ; le ton s'adapte à la situation sans
jamais devenir incohérent avec cette voix de fond.

L'erreur fréquente est de rédiger chaque écran isolément, au moment où on le conçoit, sans
relire l'ensemble des textes du produit ensemble — la cohérence se vérifie en relisant TOUS
les messages d'un coup, pas un par un.

## 3. Worked examples

### Exemple A — réécrire un message d'erreur et un état vide de TribuZen

Situation initiale : champ mot de passe trop court affiche "Erreur 422" ; liste de routines
vide affiche "Aucune donnée."

1. Message d'erreur réécrit : "Ton mot de passe doit contenir au moins 8 caractères" — nomme
   le problème précisément, propose implicitement l'action (allonger le mot de passe).
2. État vide réécrit : "Aucune routine créée pour le moment. Crée ta première routine du
   matin ou du soir pour commencer." + un bouton "Créer une routine" directement visible sur
   cet écran vide, pas seulement dans un menu séparé.
3. Vérification du ton : les deux messages restent factuels et chaleureux, cohérents avec le
   reste de l'interface familiale de TribuZen, sans jargon technique ni accusation.

### Exemple B — distinguer label de bouton générique et label actionnable

Bouton initial : "Soumettre" sur un formulaire d'ajout d'enfant au profil familial.

- Diagnostic : "Soumettre" pourrait être le label de n'importe quel bouton de n'importe quel
  formulaire — il ne dit rien du résultat de l'action.
- Réécriture : "Ajouter cet enfant au profil" — verbe d'action + objet précis, l'utilisateur
  sait exactement ce qui va se produire.

## 4. Pièges & misconceptions

- **Une microcopy "créative" qui sacrifie la clarté.** Un message d'erreur plein d'humour qui
  devient incompréhensible sous la pression d'un vrai blocage (ex. mot de passe oublié,
  formulaire bloqué) trahit l'objectif : l'humour peut exister dans le ton général du produit,
  jamais au prix de la clarté au moment précis où l'utilisateur est bloqué.

- **Un état vide qui n'explique que la cause, sans proposer d'action.** "Aucun résultat pour
  ce filtre" sans bouton pour réinitialiser le filtre laisse l'utilisateur dans une impasse
  qu'il doit résoudre seul.

- **Confondre "verbe d'action" et "mot d'action vague".** "Valider" ou "Confirmer" restent
  trop génériques sur un bouton principal — préciser l'objet ("Valider la routine", "Confirmer
  la suppression") lève toute ambiguïté, en particulier pour une action irréversible.

- **Rédiger chaque écran isolément sans relire l'ensemble.** Un ton chaleureux sur l'un et
  froidement technique sur l'autre casse la cohérence même si chaque message est individuellement
  correct — la cohérence ne se vérifie qu'en relisant tous les textes ensemble.

## 5. Ancrage TribuZen

- Tous les messages d'erreur et états vides des flows existants de TribuZen (onboarding,
  routines, gazette) sont un terrain direct d'application des trois règles de ce module.
- La voix de TribuZen (chaleureuse, familiale, simple) devient une référence écrite
  réutilisable à chaque nouveau message ajouté au produit — pas réinventée à chaque écran.
- Le pont avec le Bloc A08 (éthique) est direct : un message honnête et actionnable est aussi
  la première brique d'une interface qui ne manipule jamais son utilisateur.

## 6. Points clés

1. Un message d'erreur doit toujours dire quoi faire, jamais seulement ce qui s'est passé —
   et ne jamais accuser l'utilisateur.
2. Un état vide explique pourquoi c'est vide et propose une action visible pour en sortir.
3. Un label de bouton principal commence par un verbe d'action précis et nomme son objet,
   jamais un mot générique comme "OK" ou "Soumettre".
4. Le voice (personnalité globale) ne change jamais ; le tone (inflexion contextuelle) s'y
   adapte sans jamais le contredire.
5. La cohérence de ton ne se vérifie qu'en relisant TOUS les textes d'un produit ensemble,
   jamais écran par écran isolément.

## 7. Seeds Anki

```
Quelles sont les deux fonctions d'un message d'erreur ?|Dire ce qui s'est passé ET dire quoi faire ensuite — un message qui ne fait que la première partie reste incomplet
Que doit toujours contenir un bon état vide ?|Une explication de pourquoi c'est vide, et une action visible pour en sortir (pas seulement un constat)
Pourquoi un bouton "Soumettre" ou "OK" est-il un mauvais label ?|Il ne dit rien du résultat de l'action — un verbe d'action précis + son objet ("Ajouter une routine") lève l'ambiguïté
Quelle est la différence entre voice et tone en UX writing ?|Le voice est la personnalité globale et constante du produit ; le tone est son inflexion selon le contexte, qui s'adapte sans jamais contredire le voice
Pourquoi la cohérence de ton ne se vérifie-t-elle qu'en relisant tous les textes ensemble ?|Chaque message peut être individuellement correct mais incohérent avec les autres si on ne les compare jamais entre eux
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a07-ux-writing/`. Tu y réécris tous les messages
> d'erreur et états vides d'un flow TribuZen existant selon les trois règles du module —
> brief complet et rubrique de vérification dans le README du lab.
