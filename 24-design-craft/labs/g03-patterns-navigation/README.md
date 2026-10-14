# Lab G03 — Tree testing du sitemap TribuZen et correction d'étiquetage

> **Module associé :** [`modules/g03-patterns-navigation.md`](../../modules/g03-patterns-navigation.md)
> **Forme :** Zéro — le sitemap de A03 n'a jamais été éprouvé par un regard extérieur.
> **Outil :** l'arborescence en texte brut, un tableur pour le relevé. Aucun outil de design.

## Échauffement (20 min, jetable)

> Prends la barre de navigation d'un site de presse. Classe chacune de ses entrées dans l'une
> des quatre couches du §2.1 (globale, locale, contextuelle, utilitaire), puis repère les
> entrées qui sont dans la mauvaise couche. Contrainte : propose une barre globale de quatre
> entrées maximum, et dis où part chaque entrée retirée.

Le piège attendu : retirer des entrées sans leur donner de nouvelle place. Une entrée retirée
de la globale ne disparaît pas, elle descend.

## Lire avant

Relire précisément :
- §2.1 — les quatre couches et la règle d'arbitrage pour entrer dans la globale.
- §2.2 — les trois familles de mauvais libellés, et le test de prédiction.
- §2.5 — le protocole de tree testing, et les trois choses qu'on mesure.
- Exemple B — le format des huit tâches et du relevé. C'est la méthode, pas le corrigé.

Règle à ne pas violer en écrivant les tâches : **aucune tâche ne doit contenir le mot du
libellé** qu'elle est censée faire trouver. Sinon tu testes la lecture, pas la structure.

## Brief

1. Reprendre le **sitemap TribuZen de A03** tel quel, en texte brut, sans aucune interface.
2. Écrire **huit tâches** formulées comme des besoins, aucune ne contenant le mot de la
   rubrique cible.
3. Faire passer le test à **deux personnes minimum** qui ne connaissent pas le produit. Pas de
   commentaire, pas d'aide, pas de reformulation pendant le test.
4. Relever pour chaque tâche : réussite (oui/non), directivité (directe/après détour),
   branche d'erreur (où la personne est partie à tort).
5. Calculer le **taux de réussite** global.
6. Produire **une** correction justifiée par une branche d'erreur observée : un libellé
   réécrit, un élément déplacé, ou une entrée dupliquée en navigation contextuelle. Une seule,
   la plus coûteuse.

## Livrable attendu

- Les huit tâches écrites, telles que passées.
- Le tableau de relevé complet pour les deux personnes.
- Le taux de réussite calculé.
- La correction retenue, avec la branche d'erreur qui la justifie nommée explicitement.
- Le sitemap de A03 soit modifié, soit marqué « testé, inchangé » avec la raison.

## Rubrique de vérification

**Rubrique objective :**
- Huit tâches, aucune ne contenant le mot du libellé cible (vérifiable mot à mot).
- Deux passations minimum, relevées séparément et non fusionnées.
- Les trois mesures présentes pour chaque tâche (réussite, directivité, branche d'erreur).
- Le taux de réussite est calculé et écrit, pas estimé.
- Exactement une correction proposée, rattachée à une branche d'erreur observée et non à une
  intuition.
- Le sitemap de A03 porte une trace de ce test (modifié, ou « testé, inchangé » daté).

**Revue qualitative :** le brief demandait de tester la structure sans la souffler. Les
questions sont donc : les tâches sont-elles formulées comme de vrais besoins (et non comme des
instructions de navigation), et la correction retenue découle-t-elle de ce que les personnes
ont fait plutôt que de ce que tu pensais déjà avant le test ? Un lab dont la correction était
déjà décidée avant la première passation n'a rien testé.

## Variante J+30 (fading)

Refaire le test avec les **mêmes huit tâches** après avoir appliqué la correction, sur deux
personnes différentes. Comparer les deux taux de réussite. C'est ta première mesure
avant/après du cours, et elle prépare directement le module G05.
