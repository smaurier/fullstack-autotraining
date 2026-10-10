---
titre: Plugins utiles — contraste, contenu, accessibilité structurelle
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [plugin de contraste WCAG réel, plugin de contenu factice réaliste, plugin a11y structurel, critère de sélection d'un plugin, plugin installé vs plugin maîtrisé]
outcomes: [mesurer un contraste réel avec un plugin plutôt qu'à l'œil, générer du contenu factice représentatif de la vraie variabilité pour tester un composant, sélectionner un petit nombre de plugins réellement utiles plutôt qu'accumuler un catalogue non maîtrisé]
prerequis: [c07bis-figma-ai-assiste]
next: c09-collaboration-figjam
tribuzen: audit d'accessibilité d'un écran TribuZen (FamilyDashboard) via plugin de contraste réel, correction jusqu'à 100% conforme WCAG AA
last-reviewed: 2026-10
---

# Plugins utiles — contraste, contenu, accessibilité structurelle

> **Outcomes — tu sauras FAIRE :** mesurer un contraste réel avec un outil plutôt qu'à l'œil,
> générer du contenu factice représentatif de la vraie variabilité d'un composant, et choisir
> un petit nombre de plugins réellement maîtrisés plutôt qu'accumuler un catalogue jamais
> utilisé.
> **Difficulté :** ⭐

## 1. Cas concret d'abord

Le module A06 a introduit l'accessibilité comme discipline de conception, vérifiée "à la
main" (zones tactiles mesurées manuellement, ordre de focus annoté). Le module B02 a établi
que le contraste WCAG n'est PAS une question de théorie de la couleur mais une mesure
objective. Jusqu'ici, cette mesure a pu rester approximative — "ça semble suffisamment
contrasté à l'œil". Un œil, même entraîné, ne mesure pas un ratio de luminance : deux couleurs
peuvent paraître nettement différentes en teinte tout en ayant un contraste de luminosité
insuffisant pour un texte (cas fréquent entre deux couleurs saturées de même luminosité).

Ce module remplace l'estimation par la mesure outillée — pour le contraste, mais aussi pour
deux autres besoins fréquents (contenu réaliste, structure a11y) où l'outil fait gagner un
temps réel sur une vérification manuelle fastidieuse.

## 2. Théorie complète, concise

### 2.1 Plugins de contraste : la mesure, pas l'estimation

Un plugin de contraste calcule le **ratio de luminance réel** entre une couleur de texte et
sa couleur de fond, et le compare aux seuils WCAG (4.5:1 pour le texte standard, 3:1 pour le
grand texte ou les éléments d'interface). C'est un pont direct avec le module B02 (théorie de
la couleur ≠ accessibilité) : une palette peut être harmonieuse selon la théorie et
complètement non conforme si deux couleurs choisies ont une luminosité trop proche — le
plugin révèle ce que l'œil ne détecte pas de façon fiable.

### 2.2 Plugins de contenu : tester avec de la vraie variabilité

Un plugin de contenu factice génère des données RÉALISTES (noms de longueurs variables,
textes de tailles différentes) plutôt qu'un "Lorem ipsum" uniforme ou un texte de test
artificiellement bien calibré. C'est un pont direct avec le module C01 (auto-layout) : un
composant qui tient bien avec un texte de test soigneusement choisi peut casser visuellement
avec un vrai nom de 23 caractères ou un texte vide — le plugin révèle ces cas limites avant
qu'un vrai utilisateur ne les rencontre.

### 2.3 Plugins a11y structurels : la version outillée du module A06

Certains plugins annotent directement dans Figma l'ordre de focus prévu, ou vérifient la
cohérence d'une structure de titres (hiérarchie h1-h6 pensée au stade maquette). C'est la
version outillée, plus rapide et plus systématique, de ce qui a été fait à la main en A06 —
l'outil ne remplace pas la compréhension acquise en A06, il accélère son application répétée.

### 2.4 Le principe central : savoir lesquels comptent vraiment

La tentation d'installer un catalogue entier de plugins (des dizaines, "au cas où") produit
en pratique une bibliothèque de plugins jamais réellement utilisés — un plugin installé mais
non maîtrisé (on ne sait pas précisément ce qu'il mesure ni comment lire son résultat)
n'apporte rien de plus que ne pas l'avoir. La bonne approche : choisir 3-4 plugins couvrant
les 3 besoins ci-dessus (contraste, contenu, structure a11y), et les connaître suffisamment
pour interpréter leur résultat sans hésitation.

## 3. Worked examples

### Exemple A — auditer et corriger le contraste d'un écran TribuZen

1. Ouvrir `FamilyDashboard` (ou un écran équivalent), lister toutes les paires texte/fond
   visibles (titre sur fond, label sur carte, texte de bouton sur couleur d'accent).
2. Mesurer chaque paire avec un plugin de contraste réel — noter le ratio exact obtenu.
3. Pour chaque paire sous le seuil WCAG AA (4.5:1 texte standard), ajuster la luminosité
   d'une des deux couleurs (en HSL, cf. module B02 §2.2) jusqu'à franchir le seuil, sans
   changer la teinte de base (pour rester dans la même famille chromatique).
4. Re-mesurer après correction — documenter avant/après pour chaque paire corrigée.

### Exemple B — tester un composant avec du contenu réaliste plutôt qu'idéal

1. Prendre `RoutineCard` (module C01) testé jusqu'ici avec un texte de démonstration bien
   calibré ("Routine du matin").
2. Générer du contenu factice réaliste via un plugin dédié : noms d'enfants de longueurs très
   différentes, un titre de routine inhabituellement long, un cas où un champ optionnel est
   vide.
3. Observer où l'auto-layout casse réellement (texte qui déborde, carte qui s'étire de façon
   disgracieuse) — ces cas n'apparaissaient pas avec le texte de démonstration initial,
   preuve concrète de l'utilité du plugin plutôt qu'un test "à l'œil" avec un contenu choisi
   pour bien rentrer.

## 4. Pièges & misconceptions

- **Juger un contraste à l'œil plutôt que le mesurer.** Deux couleurs de teinte très
  différente peuvent avoir un contraste de luminance insuffisant — l'œil perçoit la
  différence de teinte, pas le ratio de luminance exact (voir 2.1 et module B02 §2.5).

- **Tester un composant uniquement avec un contenu de démonstration bien calibré.** Ça
  masque les cas limites réels (texte long, champ vide) qu'un vrai utilisateur rencontrera —
  voir Exemple B.

- **Installer un plugin "au cas où" sans jamais apprendre à lire son résultat.** Un plugin
  non maîtrisé n'apporte rien de plus que son absence, et ajoute du bruit dans le panneau
  plugins — voir 2.4.

- **Corriger un contraste en changeant la teinte plutôt que la luminosité.** Ça casse la
  cohérence chromatique de la palette (module B02) pour un gain qui s'obtient aussi bien, et
  plus proprement, en jouant sur la luminosité seule (HSL).

## 5. Ancrage TribuZen

- L'audit de contraste de `FamilyDashboard` (Exemple A) devient un geste répété à chaque
  nouvel écran produit dans les labs suivants — plus de contraste jugé "à l'œil" une fois ce
  module acquis.
- Le test de contenu réaliste (Exemple B) s'applique à tout composant en auto-layout produit
  depuis C01 — `RoutineCard`, `Button`, et tout futur composant du capstone.
- Les 3-4 plugins retenus et maîtrisés ici deviennent l'équipement de base réutilisé dans
  tous les blocs suivants (D, E, F, capstone), plutôt que d'être redécouverts à chaque fois.

## 6. Points clés

1. Un plugin de contraste mesure un ratio de luminance réel — l'œil ne détecte pas de façon
   fiable un contraste insuffisant entre deux teintes différentes.
2. Un plugin de contenu factice réaliste révèle des cas limites (texte long, champ vide)
   qu'un contenu de démonstration bien calibré masque systématiquement.
3. Les plugins a11y structurels accélèrent l'application répétée de ce qui a été compris
   manuellement au module A06, sans remplacer cette compréhension.
4. Le principe central : 3-4 plugins réellement maîtrisés valent mieux qu'un catalogue
   installé mais jamais compris.
5. Corriger un contraste insuffisant en ajustant la luminosité (HSL) préserve la cohérence
   de palette, contrairement à changer la teinte.

## 7. Seeds Anki

```
Pourquoi un plugin de contraste est-il nécessaire plutôt qu'un jugement à l'œil ?|L'œil perçoit la différence de teinte mais pas de façon fiable le ratio de luminance réel — deux couleurs très différentes en teinte peuvent avoir un contraste insuffisant
Que révèle un plugin de contenu factice réaliste qu'un texte de démonstration calibré ne révèle pas ?|Les cas limites réels (texte très long, champ vide, nom inhabituel) où un composant en auto-layout peut casser visuellement
Quel est le principe central de sélection des plugins selon ce module ?|Choisir 3-4 plugins réellement maîtrisés (contraste, contenu, a11y structurel) plutôt qu'accumuler un catalogue jamais utilisé ni compris
Comment corriger un contraste insuffisant sans casser la cohérence de palette ?|Ajuster la luminosité (HSL) de l'une des deux couleurs à teinte constante, plutôt que changer la teinte elle-même
Les seuils de contraste WCAG mentionnés dans ce module, quels sont-ils ?|4.5:1 pour le texte standard, 3:1 pour le grand texte ou les éléments d'interface
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c08-plugins-utiles/`. Tu y audites et corriges le
> contraste réel d'un écran TribuZen jusqu'à 100% de conformité WCAG AA — brief complet et
> rubrique de vérification dans le README du lab.
