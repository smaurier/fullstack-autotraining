# Lab G05 — Entonnoir de nuada et entonnoir de tâche TribuZen

> **Module associé :** [`modules/g05-mesurer-un-parcours.md`](../../modules/g05-mesurer-un-parcours.md)
> **Forme :** Zéro — aucune base de référence n'existe sur aucun de tes projets.
> **Outil :** un tableur pour les relevés, un chronomètre, une mesure agrégée côté site.

> **Lab charnière du bloc G.** C'est lui qui transforme « j'ai refait le parcours » en « j'ai
> fait passer la perte de X à Y ». Les labs G01, G03 et G06 produisent des corrections ; sans
> la base de référence relevée **ici et avant elles**, aucune de ces corrections ne sera
> démontrable. Si tu ne fais qu'un seul lab du bloc G, fais celui-là, et fais-le en premier.

## Échauffement (20 min, jetable)

> Prends une boutique en ligne et écris son entonnoir d'achat en cinq étapes observables.
> Puis, pour chaque étape, dis **comment** tu la compterais sans identifier personne.
> Contrainte : aucune étape ne doit être un état mental (« hésite », « est convaincu ») — si
> tu en écris une, remplace-la par un comportement observable qui en est le proxy.

Le piège attendu : écrire « ajoute au panier » puis « est prêt à payer ». Le second n'est pas
observable ; son proxy est « ouvre la page de paiement ».

## Lire avant

Relire précisément :
- §2.1 — la perte entre deux étapes, et les deux disciplines de lecture (séquentialité,
  observabilité).
- §2.2 — les quatre métriques de l'entonnoir de tâche, dont le contournement.
- §2.5 — ce qui constitue une base de référence honnête.
- §2.6 — mesurer sans surveiller.

Prérequis de contenu : le protocole de test utilisateur du module A09 est réutilisé tel quel
pour la partie TribuZen. Ne pas réinventer un protocole.

## Brief

### Partie 1 — entonnoir de conversion de nuada-audit.com

1. Définir **cinq étapes** observables et réellement séquentielles, de l'arrivée à la demande
   envoyée.
2. Pour chaque étape, écrire **ce qui est compté** et **comment**.
3. Écrire explicitement **ce qui n'est pas collecté** (identité, IP conservée, contenu des
   champs, parcours individuel reconstitué) et la durée de conservation retenue.
4. Relever la **base de référence** sur une période écrite et datée. Ne rien modifier sur le
   site pendant cette période.

### Partie 2 — entonnoir de tâche TribuZen

5. Choisir une tâche réelle, écrire ses étapes.
6. Relever les **quatre métriques** sur une personne réelle (protocole A09) : réussite, temps,
   erreurs, contournement.
7. Noter tout **contournement verbalisé** (« est-ce que je peux pas juste... ») — c'est la
   donnée la plus précieuse du lab.

## Livrable attendu

- Le tableau des cinq étapes de nuada avec ce qui est compté, ce qui ne l'est pas, et la durée
  de conservation.
- Le relevé de base de référence, daté, avec la période couverte.
- Le tableau des quatre métriques TribuZen pour une personne, avec les erreurs décrites
  factuellement (pas interprétées).
- Une phrase, une seule, nommant **la plus grosse perte** de l'entonnoir de nuada et donc
  l'endroit où travailler.

## Rubrique de vérification

**Rubrique objective :**
- Les cinq étapes sont strictement séquentielles : impossible d'atteindre l'étape N sans
  l'étape N-1. Si c'est possible, l'entonnoir est refusé.
- Aucune étape n'est un état mental ; chaque étape nomme un comportement comptable.
- La liste de ce qui **n'est pas** collecté est présente et explicite.
- La base de référence porte une date de début, une date de fin, et la mention de ce qui a
  changé par ailleurs pendant la période (ou « rien »).
- Les quatre métriques sont relevées, y compris le contournement (« aucun observé » est une
  réponse valide, un blanc ne l'est pas).
- Les erreurs observées sont décrites comme des faits, séparées de toute interprétation
  (règle déjà posée en A09).

**Revue qualitative :** le brief demandait une mesure qui désigne un endroit où travailler.
La question est donc : la plus grosse perte est-elle identifiée par le relevé plutôt que par
ton intuition, et la conclusion désigne-t-elle **une seule** étape ? Un lab qui conclut « il
faut tout améliorer » n'a pas mesuré. Et si le relevé contredit ce que tu pensais avant, c'est
le signe que le lab a fonctionné : le noter explicitement.

## Variante J+30 (fading)

Refaire le relevé de l'entonnoir de nuada après avoir appliqué **une seule** correction issue
de G01, G03 ou G06. Comparer à la base de référence, et écrire honnêtement la part
d'incertitude d'attribution (qu'est-ce qui a changé d'autre pendant la période). C'est cette
honnêteté sur l'attribution qui rend la mesure défendable face à un contradicteur, pas le
chiffre lui-même.
