---
titre: <titre lisible>
cours: <NN-nom-cours>
notions: [<notion1>, <notion2>]
outcomes: [<sait faire X>, <sait faire Y>]
prerequis: [<notion-amont>]
next: <slug-module-suivant>
libs: [{ name: <pkg-npm>, version: <ref> }]
tribuzen: <couche TribuZen ancrée — doit matcher la table fil-rouge de progress.md>
last-reviewed: <YYYY-MM>
---

<!-- Ce fichier est le TEMPLATE canonique, pas un module réel.
     Les <placeholders> sont normaux ici. Tout module réécrit doit
     remplacer les placeholders et passer scripts/validate-module.ps1. -->

# <Titre du module>

> **Outcomes — tu sauras FAIRE :** <verbe d'action>, <verbe d'action>.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord

<Un problème réel à résoudre AVANT la théorie. Generation effect. Donne le contexte TribuZen si possible.>

## 2. Théorie complète, concise

<Couverture TOTALE des notions du frontmatter. Chunks d'1 idée. Prose + code. Pas de diagramme décoratif. Dense, pas mince.>

## 3. Worked examples

<1-2 exemples 100% résolus, pas à pas.>

## 4. Pièges & misconceptions

<Discrimination des concepts proches. Chaque piège = nom + pourquoi c'est faux + le correct.>

## 5. Ancrage TribuZen

<Où, dans le vrai produit, on utilise ça. Doit matcher le mapping fil-rouge.>

## 6. Points clés

<Liste numérotée, 1 ligne par notion clé.>

## 7. Seeds Anki

```
<question 1>|<réponse 1>
<question 2>|<réponse 2>
<question 3>|<réponse 3>
<question 4>|<réponse 4>
<question 5>|<réponse 5>
```

(5-8 paires Q|R. Alimente SM-2 + anki-mcp.)

## Pont vers le lab

> Lab associé : <chemin>. Pratique guidée + corrigé complet.
