---
titre: Test utilisateur minimal — protocole et think-aloud
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [think-aloud protocol, tâche vs question, loi des 5 utilisateurs de Nielsen, biais de l'intervieweur, verbatim vs interprétation, protocole écrit avant la session, débrief structuré]
outcomes: [écrire un protocole de test utilisateur de 5 tâches sans biaiser les réponses, conduire une session think-aloud sans intervenir prématurément, distinguer un verbatim brut d'une interprétation dans un compte-rendu]
prerequis: [a05-heuristiques-ux]
next: a10-design-critique
tribuzen: protocole de test sur un flow TribuZen réel, passé à une vraie personne (Elda ou équivalent)
last-reviewed: 2026-10
---

# Test utilisateur minimal — protocole et think-aloud

> **Outcomes — tu sauras FAIRE :** écrire un protocole de test utilisateur de 5 tâches
> qui ne biaise pas les réponses, conduire une session think-aloud sans intervenir
> prématurément pour "aider", et rédiger un compte-rendu qui distingue clairement les
> verbatims bruts des interprétations.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tu as maquetté le flow d'invitation familiale de TribuZen. Avant de le considérer prêt
pour le développement, tu veux savoir si une vraie personne, sans aide, comprend quoi
faire. Le réflexe à éviter : montrer la maquette à un proche et demander "tu
comprends ?" — question qui obtient presque toujours "oui" par politesse, sans rien
prouver.

Un test utilisateur minimal, même avec une seule personne, révèle des problèmes qu'aucune
relecture solo ne peut voir — parce que le designer connaît déjà l'intention derrière
chaque écran, ce qui rend ses propres angles morts invisibles à lui-même. Ce module donne
le protocole minimal pour qu'un test informel produise une vraie preuve, pas une
confirmation de politesse.

## 2. Théorie complète, concise

### 2.1 Tâche vs question — le principe fondateur du protocole

Un test utilisateur ne pose jamais directement la question qu'on veut résoudre. On ne
demande pas "est-ce que ce bouton est clair ?" (la personne répondra "oui" par
politesse, ou parce qu'elle vient de le regarder et le reconnaît). On donne une
**tâche** à accomplir et on observe si elle réussit sans aide :

```
Mauvais protocole (question directe) :
"Est-ce que tu comprends comment inviter un membre de ta famille ?"

Bon protocole (tâche observable) :
"Tu viens de créer ta famille sur TribuZen. Ton conjoint n'est pas encore inscrit.
Montre-moi comment tu ferais pour l'ajouter."
```

La tâche observable révèle si la personne trouve le bon bouton, dans le bon délai, sans
indice verbal — la question directe ne révèle que ce qu'elle pense devoir répondre.

### 2.2 Le protocole think-aloud

Méthode développée en psychologie cognitive (Ericsson & Simon, années 1980), adoptée en
UX dès les années 1990 : demander à la personne de **verbaliser à voix haute ce qu'elle
pense pendant qu'elle accomplit la tâche**, pas après. "Je cherche un bouton pour
ajouter quelqu'un... je vois 'Paramètres', je clique là... non, ce n'est pas ça..."

Règle de conduite stricte pour l'observateur : **ne jamais intervenir pour aider**, même
si la personne est visiblement bloquée plus de 30 secondes. Intervenir détruit la
donnée — si tu donnes un indice, tu ne sais plus si l'interface fonctionne ou si c'est
ton indice qui a débloqué la personne. Si le blocage est total, noter l'échec de la
tâche et passer à la suivante plutôt que de sauver artificiellement la session.

Formulations neutres autorisées quand la personne s'arrête de verbaliser : "Qu'est-ce
que tu regardes en ce moment ?", "Qu'est-ce que tu t'attends à voir si tu cliques là ?" —
jamais "Essaie plutôt ce bouton" ou "Non, c'est l'autre option".

### 2.3 La loi des 5 utilisateurs de Nielsen — et sa vraie portée

Jakob Nielsen (1993, popularisé via le Nielsen Norman Group) a montré empiriquement que
**5 utilisateurs suffisent à détecter environ 85% des problèmes d'utilisabilité** d'une
interface, et que tester plus de 5 personnes sur la MÊME version produit des
rendements décroissants rapides (les mêmes problèmes réapparaissent, peu de nouveaux).

Nuance importante à ne jamais oublier : ce chiffre suppose un protocole de test
rigoureux (tâches observables, think-aloud, pas de biais de l'intervieweur). 5
utilisateurs avec un mauvais protocole ne révèlent rien de plus que 0 utilisateur — la
loi ne protège pas contre une méthode bâclée, elle dit seulement "si ta méthode est
bonne, 5 suffisent".

### 2.4 Biais de l'intervieweur et formulation neutre

Le biais le plus fréquent d'un designer qui teste sa propre maquette : formuler les
consignes ou les relances de façon à orienter la réponse vers ce qu'il espère entendre.

```
Formulation biaisée : "Tu vois comme c'est simple d'ajouter un membre ?"
Formulation neutre : "Montre-moi comment tu ajouterais un membre à ta famille."

Formulation biaisée (en cours de tâche) : "Tu as vu le bouton vert en haut ?"
Formulation neutre : "Qu'est-ce que tu regardes en ce moment ?"
```

Toute formulation qui contient déjà la réponse attendue (l'emplacement du bouton, un
jugement de valeur sur la simplicité) invalide la mesure.

### 2.5 Verbatim vs interprétation dans le compte-rendu

Un compte-rendu de test utilisateur doit séparer explicitement ce que la personne a
**dit ou fait** (verbatim/observation brute) de ce que l'observateur en **déduit**
(interprétation). Mélanger les deux produit un rapport qui ressemble à une preuve mais
n'en est pas une.

```
Correct :
Verbatim : "Je cherche un bouton 'ajouter', je ne le vois pas dans cet écran."
Observation : a cliqué sur 'Paramètres' puis 'Profil' avant de trouver 'Inviter
  un membre' sous 'Famille' (3 clics, 45 secondes).
Interprétation : le mot 'Inviter' n'est probablement pas celui attendu — la
  personne cherchait 'ajouter'.

Incorrect (tout mélangé sans distinction) :
"L'utilisateur n'a pas trouvé le bouton, l'interface n'est pas claire."
```

La version incorrecte ne permet à personne de vérifier d'où vient la conclusion — la
version correcte permet à un tiers de la contester ou de la confirmer sur la même donnée.

## 3. Worked examples

### Exemple A — protocole complet de 5 tâches pour le flow d'invitation TribuZen

```
PROTOCOLE DE TEST — Flow d'invitation familiale TribuZen
Durée estimée : 15 minutes par personne

Consigne d'ouverture (lue à voix haute à chaque participant) :
"Je vais te donner des tâches à accomplir sur cette maquette. Pense à voix haute
pendant que tu cherches — dis-moi ce que tu vois, ce que tu essaies, même si tu
hésites. Je ne vais pas t'aider pendant la tâche, c'est normal et voulu, ça me permet
de voir où l'interface pose problème, pas de te tester toi."

Tâche 1 : "Tu viens de créer le compte de ta famille. Montre-moi comment tu ajouterais
ton conjoint."
Tâche 2 : "Ton conjoint a reçu l'invitation mais ne l'a pas encore acceptée. Comment
saurais-tu si elle est toujours en attente ?"
Tâche 3 : "Tu t'es trompé et tu as invité la mauvaise adresse email. Annule
l'invitation."
Tâche 4 : "Tu veux que ton enfant de 12 ans ait accès à l'app, mais avec moins de
droits que toi. Montre-moi comment tu ferais."
Tâche 5 : "Retrouve la liste de tous les membres actuels de ta famille, acceptés et en
attente."

Après chaque tâche (débrief court, pas pendant) : "Sur une impression à chaud, comment
ça s'est passé pour toi, cette tâche-là ?"
```

### Exemple B — compte-rendu avec distinction verbatim/interprétation

```
TÂCHE 4 — Inviter avec un rôle restreint (enfant)

Verbatim : "Je ne vois pas où choisir le rôle... ah, il y a un menu déroulant après
avoir tapé l'email, je ne l'avais pas vu au premier regard."
Observation : a tapé l'email, a marqué une pause de 8 secondes avant de repérer le
menu déroulant de rôle, situé sous le champ email sans libellé visible avant
interaction.
Interprétation : le sélecteur de rôle manque de visibilité avant la saisie — un
libellé visible en permanence ("Rôle : Admin ▾") réduirait probablement la pause
observée. À vérifier sur un échantillon plus large avant de généraliser (n=1 ici).
```

## 4. Pièges & misconceptions

- **Poser directement la question qu'on veut résoudre.** Voir 2.1 — ça produit une
  réponse de politesse, pas une mesure. Toujours transformer la question en tâche
  observable.

- **Intervenir pour "aider" dès qu'un blocage dure plus de quelques secondes.** Chaque
  intervention détruit la mesure de cette tâche précise. Un échec de tâche est une
  donnée valide, pas un problème à corriger pendant le test.

- **Croire qu'il faut 5 participants "ou rien".** Même 1 à 2 personnes testées avec un
  protocole rigoureux révèlent des problèmes réels — la loi de Nielsen dit "5 suffisent
  en général", pas "en dessous de 5, ça ne vaut rien". Un test informel à 2 personnes
  avec un bon protocole vaut mieux qu'aucun test.

- **Rédiger un compte-rendu qui mélange observation et interprétation sans les
  distinguer.** Voir 2.5 — un rapport qui ne sépare pas les deux ne peut pas être
  vérifié ni contesté, ce qui le rend inutilisable pour convaincre une équipe ou un
  client sceptique.

- **Généraliser une interprétation issue d'une seule personne comme un fait établi.**
  "L'utilisateur n'a pas trouvé le bouton" (n=1) n'est pas "les utilisateurs ne trouvent
  pas le bouton" — nuancer explicitement la taille de l'échantillon dans le
  compte-rendu, comme dans l'Exemple B.

## 5. Ancrage TribuZen

Protocole directement réutilisable sur tout flow TribuZen avant son passage en
développement : invitation familiale (Exemple A), configuration de routines,
consultation de la gazette hebdomadaire. Le compte-rendu structuré (verbatim +
observation + interprétation, Exemple B) devient une pièce du dossier de handoff
(module A11, Design Ops) remis au développeur — une preuve que le design a été vérifié,
pas juste une maquette "qui a l'air bien".

## 6. Points clés

1. Un test utilisateur donne des tâches observables, jamais des questions directes qui
   obtiennent une réponse de politesse.
2. Le think-aloud demande une verbalisation PENDANT l'action, sans intervention de
   l'observateur même en cas de blocage prolongé.
3. La loi des 5 utilisateurs de Nielsen suppose un protocole rigoureux — elle ne
   protège pas contre une mauvaise méthode.
4. Toute formulation de consigne doit être neutre — ne jamais révéler l'emplacement
   d'un bouton ni un jugement de valeur sur l'interface testée.
5. Un compte-rendu sépare toujours verbatim/observation (fait brut, vérifiable) et
   interprétation (déduction, à nuancer selon la taille de l'échantillon).

## 7. Seeds Anki

```
Pourquoi un test utilisateur donne-t-il des tâches plutôt que des questions directes ?|Une question directe ("c'est clair ?") obtient une réponse de politesse ; une tâche observable révèle si la personne réussit réellement sans aide
Que faire si un participant est bloqué pendant un test think-aloud ?|Ne jamais intervenir pour aider — noter l'échec de la tâche comme donnée valide et passer à la suivante
Que dit réellement la loi des 5 utilisateurs de Nielsen ?|Avec un protocole RIGOUREUX, 5 utilisateurs détectent environ 85% des problèmes d'utilisabilité — elle ne compense pas une méthode bâclée
Quelle est la différence entre un verbatim et une interprétation dans un compte-rendu de test ?|Le verbatim/observation est un fait brut vérifiable (ce qui a été dit/fait) ; l'interprétation est une déduction de l'observateur, à nuancer selon la taille de l'échantillon
Donne un exemple de formulation de consigne biaisée vs neutre|Biaisée : "Tu vois comme c'est simple ?" — Neutre : "Montre-moi comment tu ferais pour..."
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a09-test-utilisateur/`. Tu y écris un protocole de
> 5 tâches pour un flow TribuZen réel, le fais passer à une vraie personne (pas un
> proche complaisant qui connaît déjà le produit, dans la mesure du possible), et
> rédiges le compte-rendu en séparant explicitement verbatims/observations et
> interprétations. Brief complet et rubrique de vérification dans le README du lab.
