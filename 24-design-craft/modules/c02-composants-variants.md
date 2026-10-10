---
titre: Composants & variants — l'équivalent design des props/cva
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [composant principal vs instance, variants comme propriétés paramétrables, override d'instance, comparaison directe avec cva, duplication de composants comme anti-pattern]
outcomes: [construire un composant à variants multiples équivalent à un composant cva codé, distinguer ce qu'une instance peut overrider de ce qui nécessite de changer le composant principal, reconnaître pourquoi dupliquer un composant pour chaque variante casse la synchronisation]
prerequis: [c01-interface-auto-layout]
next: c03-styles-tokens
tribuzen: Button Figma en variants, miroir exact du Button shadcn/cva déjà codé dans TribuZen
last-reviewed: 2026-10
---

# Composants & variants — l'équivalent design des props/cva

> **Outcomes — tu sauras FAIRE :** construire un composant Figma à variants multiples
> directement équivalent à un composant `cva` codé, distinguer un override d'instance légitime
> d'un changement qui nécessite de toucher le composant principal, et reconnaître pourquoi
> dupliquer un composant pour chaque variante casse la synchronisation entre eux.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

TribuZen a déjà un `Button` codé en shadcn/`cva` : `variant` (default/destructive/outline),
`size` (sm/md/lg), et un état `disabled`. Si on construit la version Figma de ce bouton en
créant un calque séparé pour chaque combinaison (3 variants × 3 tailles × 2 états = 18
boutons indépendants, sans aucun lien entre eux), toute correction future (ex. changer le
radius de bordure sur tous les boutons) oblige à retoucher les 18 calques un par un, à la
main, avec le risque réel d'en oublier un. C'est l'exact inverse de ce que `cva` apporte en
code : une seule définition, des props qui combinent les variantes. Ce module construit
l'équivalent Figma de cette garantie.

## 2. Théorie complète, concise

### 2.1 Composant principal et instance : un lien vivant, pas une copie

Un **composant principal** (main component) est la définition unique d'un élément. Une
**instance** est une copie qui reste LIÉE à ce principal : modifier le composant principal
répercute automatiquement le changement sur toutes ses instances, sauf sur les propriétés
qu'une instance a explicitement overridées. C'est l'inverse d'un copier-coller de calques,
qui produit des copies totalement indépendantes dès l'instant de la copie.

### 2.2 Variants : plusieurs composants réunis en UN SEUL paramétrable

Les **variants** regroupent plusieurs composants (ex. un bouton `default`, un bouton
`destructive`, un bouton `outline`) en un seul composant parent, exposé avec des propriétés
sélectionnables dans le panneau Figma — exactement comme `cva` expose des props en code :

```
cva (code)                          Variants Figma (équivalent conceptuel)
─────────────────────────────────   ─────────────────────────────────────
variant: "default" | "destructive"  Propriété "Variant" : default / destructive / outline
  | "outline"
size: "sm" | "md" | "lg"            Propriété "Size" : sm / md / lg
disabled?: boolean                  Propriété "State" : default / disabled
```

Chaque combinaison de propriétés (ex. `variant=destructive, size=lg, state=disabled`)
correspond à UNE des faces du composant à variants, toutes définies dans le même fichier,
toutes modifiables depuis le panneau de propriétés d'une instance — sans jamais dupliquer de
calque.

### 2.3 Override d'instance : ce qui est permis sans casser le lien

Une instance peut overrider certaines propriétés sans rompre son lien au composant
principal — typiquement le **contenu** (le texte d'un bouton précis, "Valider" au lieu de
"Enregistrer") ou la **sélection de variant** elle-même (changer `size` de `md` à `lg` sur
cette instance précise). Ce qui N'EST PAS un override légitime : changer la structure du
composant (ajouter un calque qui n'existe pas dans le principal, changer un radius de bordure
qui devrait être une propriété globale du design system) — ce type de changement doit se
faire sur le composant PRINCIPAL, pas sur une instance isolée, sinon il ne se propage à
aucune autre instance et crée une incohérence silencieuse.

### 2.4 L'anti-pattern à éviter absolument : dupliquer plutôt que varianter

Créer un bouton "destructive" en dupliquant le calque du bouton "default" puis en changeant
sa couleur produit deux composants principaux totalement indépendants. Toute correction future
du radius, du padding ou de la typographie du bouton doit alors être répétée manuellement sur
CHAQUE composant dupliqué — exactement le problème qu'un design system (et `cva` côté code)
existe pour éliminer. Le symptôme typique en production : un bouton "oublié" qui garde
l'ancien radius après une refonte visuelle, parce qu'il vivait dans un fichier dupliqué non
repéré.

## 3. Worked examples

### Exemple A — construire `Button` avec 3 propriétés de variants

1. Construire d'abord UN bouton de base en auto-layout (module C01 : Hug en largeur par
   défaut, Fill si le brief le demande explicitement).
2. Ajouter la propriété `Variant` (default/destructive/outline) : changer la couleur de fond
   et de bordure pour chaque valeur, sans dupliquer le calque de texte ni la structure.
3. Ajouter la propriété `Size` (sm/md/lg) : changer le padding et la taille de texte pour
   chaque valeur, en gardant la MÊME structure d'auto-layout sous-jacente.
4. Ajouter la propriété `State` (default/disabled) : changer l'opacité ou la couleur pour
   l'état désactivé, sans dupliquer le composant.
5. Résultat : une seule définition, 3×3×2 = 18 combinaisons accessibles depuis le panneau de
   propriétés d'une instance, zéro duplication de calque.

### Exemple B — override légitime vs override illégitime

Besoin : un bouton "Valider la routine" en instance, avec un radius légèrement plus arrondi
que le reste du design system (demande ponctuelle, pas une évolution du système).

- **Override légitime sur l'instance** : changer le texte en "Valider la routine", choisir
  `variant=default, size=md` — ce sont des propriétés exposées, prévues pour varier
  instance par instance.
- **Override ILLÉGITIME sur l'instance** : détacher le radius de bordure du composant
  principal pour le changer localement. Cette modification ne se propagera à aucune autre
  instance et crée une incohérence invisible tant que personne ne compare les deux boutons
  côte à côte. Si le radius doit vraiment changer pour tout le design system, la bonne action
  est de modifier le composant PRINCIPAL — si c'est un cas vraiment ponctuel et voulu, il doit
  être documenté explicitement comme une exception, pas laissé silencieux.

## 4. Pièges & misconceptions

- **Dupliquer un composant pour chaque variante au lieu d'utiliser le système de variants.**
  Voir 2.4 — le symptôme en production est une incohérence qui réapparaît après chaque refonte
  visuelle, un composant dupliqué "oublié".

- **Confondre override de propriété exposée et override de structure.** Voir 2.3 et
  l'Exemple B — changer `size` sur une instance est prévu ; détacher un style du composant
  principal pour le modifier localement ne l'est pas.

- **Créer une propriété de variant pour chaque micro-différence.** Une propriété doit
  correspondre à une vraie dimension de variation réutilisée ailleurs (comme une prop de
  `cva`) — multiplier les propriétés pour des cas uniques produit un composant illisible dans
  le panneau de propriétés, l'équivalent design d'une API avec 15 props jamais toutes
  utilisées ensemble.

- **Oublier qu'un composant à variants hérite de l'auto-layout du module C01.** Chaque valeur
  de `Size` doit garder une configuration Hug/Fill cohérente — un bouton `size=lg` qui
  "oublie" son mode de resize casse de la même façon qu'en C01, avec une cause différente.

## 5. Ancrage TribuZen

- Le `Button` Figma devient la référence visuelle vérifiable face au `Button` shadcn/cva déjà
  codé — toute nouvelle variante ajoutée en code (ex. un nouveau `variant="ghost"`) doit se
  refléter dans le composant Figma, et réciproquement.
- La table de correspondance variant Figma ↔ prop code (produite dans le lab) devient un
  document de référence réutilisable pour tout futur composant TribuZen construit dans les
  deux mondes (design et code).
- Les tokens de couleur utilisés pour chaque variant (module C03, à venir) doivent déjà être
  anticipés ici comme des styles nommés, pas des valeurs libres choisies au clic.

## 6. Points clés

1. Un composant principal et ses instances restent liés — modifier le principal répercute sur
   toutes les instances sauf les propriétés explicitement overridées.
2. Les variants regroupent plusieurs composants en un seul paramétrable par propriétés —
   l'équivalent direct de `cva` côté code, même logique, deux outils différents.
3. Un override d'instance légitime porte sur une propriété exposée (variant, contenu) ; un
   override illégitime détache une partie du composant principal pour la modifier localement.
4. Dupliquer un composant pour chaque variante casse la synchronisation : toute correction
   future doit être répétée manuellement sur chaque copie, avec le risque d'en oublier une.
5. Une propriété de variant doit correspondre à une vraie dimension de variation réutilisée,
   pas à chaque micro-différence ponctuelle.

## 7. Seeds Anki

```
Quelle est la différence entre un composant principal et une instance ?|Le principal est la définition unique ; l'instance est une copie liée qui répercute automatiquement les changements du principal, sauf propriétés overridées
À quoi correspondent les variants Figma en code ?|À cva (class variance authority) : une seule définition de composant, des propriétés qui combinent les variantes plutôt que des composants dupliqués
Quelle est la différence entre un override légitime et illégitime sur une instance ?|Légitime : changer une propriété exposée (variant, contenu) prévue pour varier ; illégitime : détacher une partie structurelle du composant principal pour la modifier localement, hors système
Pourquoi dupliquer un composant pour chaque variante est un anti-pattern ?|Toute correction future doit être répétée manuellement sur chaque copie, avec un risque réel d'en oublier une — exactement le problème que cva/les variants éliminent
Comment savoir si une nouvelle propriété de variant est justifiée ?|Si elle correspond à une vraie dimension de variation réutilisée ailleurs (comme une prop cva) ; sinon c'est un cas ponctuel à gérer autrement, pas une nouvelle propriété
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c02-composants-variants/`. Tu y construis `Button` en
> variants Figma complets, miroir exact du `Button` shadcn/cva codé — brief complet et
> rubrique de vérification dans le README du lab.
