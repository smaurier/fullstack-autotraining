---
titre: Mesurer un parcours — entonnoir de tâche d'abord, conversion ensuite
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [entonnoir et perte par étape, entonnoir de tâche, les quatre métriques produit (réussite, temps, erreurs, contournement), Goals-Signals-Metrics et HEART, SUS, base de référence, condition de validité d'un A/B test, mesurer sans surveiller]
outcomes: [construire un entonnoir et lire la perte entre deux étapes plutôt que le taux final, choisir les métriques d'un parcours produit avant de choisir l'outil, établir une base de référence qui rend une amélioration démontrable]
prerequis: [g04-flows-multi-etapes]
next: g06-architecture-decision
tribuzen: entonnoir de conversion de nuada-audit.com instrumenté, plus un entonnoir de tâche TribuZen avec les quatre métriques produit relevées sur une personne réelle
last-reviewed: 2026-10
---

# Mesurer un parcours — entonnoir de tâche d'abord, conversion ensuite

> **Outcomes — tu sauras FAIRE :** construire un entonnoir et en lire la perte entre deux
> étapes au lieu du taux final, choisir les métriques d'un parcours produit avant de choisir
> l'outil, et établir une base de référence sans laquelle « c'est mieux » reste une opinion.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A01 exige, avant toute maquette, des critères de succès mesurables : « le temps
entre l'inscription et le premier déploiement diminue », « aucun des cinq participants ne
confond configuration et facturation ». C'est la bonne exigence. Mais aucun module du cours
n'apprenait jusqu'ici à **relever** ces chiffres. Un critère qu'on ne sait pas mesurer
redevient une opinion au moment du bilan, c'est-à-dire exactement là où il devait servir.

C'est le module qui ferme ce trou, et c'est lui qui transforme une phrase de portfolio. « J'ai
refait le parcours de demande de devis » est une affirmation sur du travail. « J'ai fait
passer la perte entre la page de service et le formulaire de 68 % à 41 % » est une
affirmation sur un résultat. La deuxième se défend face à un contradicteur ; la première non.

## 2. Théorie complète, concise

### 2.1 L'entonnoir : la perte entre deux étapes, jamais le taux final

Un **entonnoir** est la liste ordonnée des étapes qu'il faut franchir pour atteindre le
résultat visé, avec l'effectif présent à chaque étape. Comme des gens s'arrêtent en route,
la liste se rétrécit — d'où le nom.

```
1000  arrivent sur une page du site        (entrée A)
 400  comprennent ce qui est proposé        -60 %
 120  jugent le prestataire crédible        -70 %
  80  ouvrent le formulaire                 -33 %
  25  l'envoient                            (sortie B)   -69 %
```

Le taux global (2,5 %) ne dit rien d'actionnable. Le chiffre utile est la **perte entre deux
étapes consécutives**, parce qu'elle désigne l'endroit où travailler. Ici, deux pertes de
60 % et 70 % en haut d'entonnoir pèsent bien plus lourd que le formulaire, qui est pourtant
l'endroit que l'intuition pousse à retravailler parce que c'est le plus concret.

Deux disciplines de lecture : les étapes doivent être **réellement séquentielles** (si on
peut atteindre l'étape 4 sans l'étape 3, l'entonnoir est faux), et chaque étape doit être
**observable** (un comportement qu'on peut compter, pas un état mental qu'on suppose — « juge
crédible » doit donc être approché par un proxy observable, par exemple « consulte la page
références »).

### 2.2 Côté produit, l'entonnoir devient un entonnoir de tâche

Dans un outil de travail, personne ne « convertit ». L'utilisateur a une tâche à finir, et
l'entonnoir devient la suite des étapes de cette tâche. Quatre métriques le décrivent, et ce
sont celles qui comptent en entretien de design produit :

1. **Le taux de réussite de tâche** — la personne a-t-elle atteint le résultat, oui ou non.
   La plus importante, et la plus souvent remplacée par des mesures plus faciles.
2. **Le temps de tâche** — à comparer à lui-même avant et après, jamais à un standard absolu.
3. **Le taux d'erreur** — nombre de fois où une étape est refaite, corrigée, ou échoue.
4. **Le contournement** — la tâche faite ailleurs : dans un tableur, par email, en appelant
   un collègue, en demandant au support.

Le quatrième est le signal le plus fort et le moins mesuré du métier. Un utilisateur qui
exporte systématiquement tes données pour les retravailler dans un tableur te dit que ton
écran ne fait pas le travail, et il le dit sans jamais ouvrir de ticket. Savoir aller
chercher ce signal (dans les tickets de support, dans les exports, en demandant) distingue un
designer produit d'un faiseur de maquettes.

### 2.3 Goals, Signals, Metrics — et HEART

Le piège universel de la mesure est de mesurer **ce qui est facile** : les clics, les pages
vues, le temps passé. La discipline **Goals / Signals / Metrics** l'empêche, en imposant
l'ordre inverse :

1. **Goal** — ce qu'on veut obtenir, en français, sans chiffre.
2. **Signal** — quel comportement observable change si le goal est atteint.
3. **Metric** — comment on compte ce signal.

```
Goal    : un nouvel utilisateur obtient un résultat utile dès la première session.
Signal  : il crée sa première routine et la consulte le lendemain.
Metric  : part des comptes créés qui ont une routine consultée à J+1.
```

Le cadre **HEART** sert de liste de familles pour ne pas n'en garder qu'une :
**H**appiness (satisfaction déclarée), **E**ngagement (intensité d'usage),
**A**doption (nouveaux usages d'une fonction), **R**etention (retour au fil du temps),
**T**ask success (réussite de tâche). Un tableau de bord qui ne contient que de
l'engagement mesure l'addiction, pas l'utilité.

### 2.4 Le SUS : utile en comparaison, inutile en valeur absolue

Le **System Usability Scale** est un questionnaire standard de dix affirmations notées de 1
à 5, qui produit un score sur 100. Deux règles d'usage :

- Il vaut comme **comparaison** : le même produit avant et après, ou deux versions.
- Il ne vaut presque rien en **valeur absolue isolée** sur un petit échantillon — annoncer
  « notre SUS est de 74 » sans point de comparaison est une décoration de présentation.

Son intérêt réel : c'est une mesure de perception bon marché, qui complète les mesures de
comportement du §2.2. Les deux ne disent pas la même chose, et quand elles se contredisent
(tâche réussie mais perception mauvaise), la contradiction est elle-même l'information.

### 2.5 La base de référence, sans laquelle rien n'est démontrable

C'est la règle la plus simple et la plus violée : **mesurer avant de changer**. Sans relevé
initial, toute amélioration est une affirmation invérifiable, et le travail fourni devient
indéfendable même s'il était bon.

Ce qui constitue une base de référence honnête : la même définition d'étape, la même période
de référence (un mois complet vaut mieux qu'une semaine, pour absorber les variations de
jour et de saison), et la mention explicite de ce qui a changé par ailleurs. Si le site a
aussi gagné en référencement entre les deux relevés, l'entonnoir a changé pour deux raisons
et l'attribution est honnêtement incertaine. Le dire est plus solide que de s'attribuer le
tout.

**La condition de validité d'un A/B test**, pour la même raison : une seule variable
modifiée, les deux versions servies sur la même période, un volume suffisant pour que l'écart
dépasse le bruit, et le critère de décision écrit **avant** de regarder les résultats. Sur
un site à faible trafic — ce qui est le cas de nuada et de nahual — un A/B test n'atteindra
jamais ce volume : la méthode honnête y est le test utilisateur qualitatif (A09) plus
l'entonnoir en avant/après, pas un A/B test sans puissance présenté comme une preuve.

### 2.6 Mesurer sans surveiller

Un entonnoir se construit avec des **compteurs agrégés** : combien de personnes ont franchi
l'étape, pas qui. On n'a besoin d'aucune donnée personnelle pour savoir où un parcours fuit.

Trois principes qui recoupent directement le cours 23 (droit du numérique) : finalité
déclarée avant la collecte, minimisation (on ne collecte que l'étape franchie et l'horodatage
grossier), durée de conservation définie. Et le réflexe qui simplifie tout : si une mesure
exige de pister un individu à travers le temps, demande-toi d'abord si la version agrégée ne
répond pas déjà à la question. Elle y répond presque toujours.

## 3. Worked examples

### Exemple A — instrumenter l'entonnoir de nuada-audit.com

Étapes retenues, toutes observables :

```
É1  Arrivée sur une page de service        compteur de vue de page
É2  Consultation de la page méthode OU références   (proxy de "cherche à se rassurer")
É3  Ouverture du formulaire de demande     vue de la page/section formulaire
É4  Première saisie dans un champ          premier événement de saisie
É5  Envoi réussi                           page de confirmation atteinte
```

Ce qui est compté : le franchissement d'étape, agrégé, horodaté à la journée.
Ce qui n'est **pas** compté : identité, adresse IP conservée, contenu des champs, parcours
individuel reconstitué.

Base de référence : un mois complet avant toute modification, avec le relevé écrit et daté.
Lecture attendue : la plus grosse perte désigne l'étape à travailler, et elle seule. Si c'est
É1 vers É2, le problème est la page de service (module G06) ; si c'est É4 vers É5, le problème
est le formulaire lui-même (module G04).

### Exemple B — entonnoir de tâche TribuZen, les quatre métriques

Tâche : « ajouter une routine du soir pour un enfant déjà enregistré ».

```
Étapes : Accueil → Choisir l'enfant → Créer la routine → Choisir le moment → Enregistrer

Relevé sur une personne réelle (protocole du module A09) :
- Réussite de tâche   : oui
- Temps de tâche      : 2 min 40 s   (base de référence)
- Erreurs             : 2  (a cherché "Routines" avant de passer par l'enfant ;
                            a enregistré sans choisir le moment, erreur bloquante)
- Contournement       : a demandé "est-ce que je peux pas juste écrire l'heure direct ?"
                        → signal d'un besoin de saisie rapide non servi
```

Les deux erreurs sont exploitables immédiatement et sans ambiguïté : la première confirme le
résultat du tree testing du module G03 (la structure fait chercher par domaine avant
l'enfant), la seconde désigne un ordre d'étapes à revoir dans le wizard du module G04. Et le
contournement verbalisé révèle un besoin que la tâche telle que définie ne couvre pas.

## 4. Pièges & misconceptions

- **Lire le taux final plutôt que la perte par étape.** Le taux global ne désigne aucun
  endroit où travailler.

- **Mesurer ce qui est facile.** Clics, pages vues et temps passé sont disponibles, donc
  tentants, et ne répondent presque jamais au goal. La discipline Goals-Signals-Metrics
  existe pour ça.

- **Des étapes non séquentielles ou non observables.** Un entonnoir dont on peut sauter une
  étape, ou dont une étape est un état mental supposé, produit des chiffres faux.

- **Pas de base de référence.** L'amélioration devient indémontrable, même réelle.

- **Un A/B test sans volume suffisant**, présenté comme une preuve. Sur un site à faible
  trafic, c'est du bruit habillé en donnée.

- **Le SUS en valeur absolue** sur cinq personnes.

- **Ne mesurer que l'engagement.** On mesure alors l'addiction, pas l'utilité (voir HEART).

- **Collecter plus que nécessaire** pour « au cas où ». La version agrégée répond presque
  toujours à la question, et elle n'engage ni conservation ni risque.

## 5. Ancrage nuada / nahual / TribuZen

- L'entonnoir de nuada (Exemple A) est à instrumenter avec une mesure agrégée, et la base de
  référence doit être relevée **avant** toute modification issue des modules G01, G03 et G06 —
  sinon le travail de tout le bloc G devient indéfendable.
- L'entonnoir de tâche TribuZen (Exemple B) se relève avec le protocole déjà appris en A09 :
  aucun outil supplémentaire n'est nécessaire, seulement un chronomètre et de la rigueur.
- Sur nahual, la sortie B est un contact reçu. L'entonnoir y est court et à faible volume :
  l'avant/après qualitatif et le relevé du chemin réellement parcouru y valent plus qu'un
  tableau de bord.

## 6. Points clés

1. Le chiffre actionnable d'un entonnoir est la perte entre deux étapes consécutives, pas le
   taux final.
2. Dans un produit de travail, l'entonnoir devient un entonnoir de tâche décrit par quatre
   métriques : réussite, temps, erreurs, contournement.
3. Le contournement (la tâche faite dans un autre outil) est le signal le plus fort et le
   moins mesuré.
4. Goals avant Signals avant Metrics, sinon on mesure ce qui est facile ; HEART rappelle de
   ne pas ne garder que l'engagement.
5. Sans base de référence relevée avant le changement, une amélioration réelle reste
   indémontrable — et un A/B test sans volume suffisant n'est pas une preuve.

## 7. Seeds Anki

```
Quel est le seul chiffre actionnable d'un entonnoir ?|La perte entre deux étapes consécutives : elle désigne où travailler, ce que le taux global ne fait pas
Quelles sont les quatre métriques d'un entonnoir de tâche produit ?|Taux de réussite de tâche, temps de tâche, taux d'erreur, et contournement (tâche faite dans un autre outil)
Pourquoi le contournement est-il le signal le plus précieux ?|Il prouve que l'écran ne fait pas le travail, et l'utilisateur ne le signale jamais par un ticket — il faut aller le chercher
Quel est l'ordre imposé par Goals-Signals-Metrics et pourquoi ?|But en français, puis comportement observable qui change, puis façon de le compter — l'ordre inverse fait mesurer ce qui est facile (clics, pages vues)
Quelles sont les conditions de validité d'un A/B test ?|Une seule variable, même période pour les deux versions, volume suffisant pour dépasser le bruit, critère de décision écrit avant de regarder les résultats
Pourquoi une base de référence est-elle obligatoire ?|Sans relevé avant le changement, toute amélioration est invérifiable et le travail devient indéfendable même s'il était bon
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g05-mesurer-un-parcours/`. Tu y définis et instrumentes
> l'entonnoir de nuada-audit.com (étapes observables, ce qui est compté, ce qui ne l'est pas,
> base de référence datée), puis tu relèves les quatre métriques d'un entonnoir de tâche
> TribuZen sur une personne réelle — brief complet et rubrique dans le README du lab.
