# 11. Le pipeline depuis un outil de design

> **Outcome :** à la fin, tu sais recevoir une animation faite par un designer sans la recoder,
> tu connais le coût réel d'un fichier Lottie, et tu sais pourquoi une animation importée est le
> cas le plus risqué du cours en matière d'accessibilité.
>
> **Lab :** [lab-06 : Lottie respectueux](../labs/lab-06-lottie-respectueux/README)

## 1. Le problème : deux métiers, un livrable

Un designer produit une animation dans After Effects, Rive ou Figma. Un développeur doit la
mettre dans une page. Trois voies, et elles ne coûtent pas la même chose.

| Voie | Coût d'intégration | Fidélité | Maintenance |
|---|---|---|---|
| **Recoder** en CSS ou en GSAP | élevé | approximative | la retouche repasse par le développeur |
| **Exporter une vidéo** | faible | parfaite | lourd, non stylable, mal accessible |
| **Exporter des données** d'animation | faible | très bonne | **le designer retouche seul** |

La troisième colonne de la dernière ligne est tout l'intérêt du pipeline : **le designer modifie
son fichier, remplace l'export, et le développeur ne touche à rien.**

## 2. Lottie

### 2.1 Ce que c'est

Un format de données : un fichier JSON décrivant une animation vectorielle, exporté depuis After
Effects par une extension, et rejoué par une bibliothèque dans la page. Il existe aussi un
format compressé, en `.lottie`.

```html
<!-- Avec l'element personnalise du lecteur -->
<dotlottie-player src="/animations/nahual-intro.lottie" autoplay loop></dotlottie-player>
```

### 2.2 Le coût réel, et le piège

Un fichier Lottie **peut être énorme**. Les causes, par ordre de fréquence :

1. **des images bitmap embarquées** : elles sont encodées en base64 dans le JSON, donc un fichier
   de deux mégaoctets pour une animation de trois secondes ;
2. **des tracés très détaillés** : un dessin vectorisé depuis une image a des milliers de points ;
3. **des expressions** After Effects, qui demandent un moteur plus lourd côté lecteur ;
4. **la bibliothèque de lecture elle-même**, qui n'est pas négligeable.

```bash
# A faire systematiquement en recevant un fichier
ls -lh animations/*.json animations/*.lottie
node -e "const a=require('./animations/intro.json');console.log('calques:',a.layers?.length,'| images embarquees:',(a.assets||[]).filter(x=>x.p).length)"
```

**La conversation à avoir avec le designer**, et elle vaut mieux qu'une optimisation après coup :
pas de bitmap, pas d'expression, des formes simples. C'est beaucoup moins coûteux que de
renégocier un fichier de deux mégaoctets en fin de projet.

### 2.3 Le contrôle depuis le code

Une animation importée ne doit pas être une boîte noire qui tourne en boucle. Le minimum :

```js
const lecteur = document.querySelector('dotlottie-player');

// Jouer au bon moment, pas au chargement
observateur.observe(lecteur);          // IntersectionObserver, ou view() en CSS

// Et pouvoir arreter : critere 13.8 (A)
boutonPause.addEventListener('click', () => {
  enPause ? lecteur.play() : lecteur.pause();
});
```

## 3. Rive

Une approche différente, et plus intéressante pour une interface : Rive exporte non pas une
animation linéaire mais une **machine à états**. Le fichier contient les états, les transitions,
et des entrées que le code pilote.

```
Un bouton Rive : etats « repos », « survol », « charge », « succes »
Le code envoie une entree ; Rive gere la transition entre etats.
```

L'intérêt : l'animation **réagit** au lieu de se dérouler. Le designer décrit le comportement,
pas seulement le mouvement. Le coût : un outil de plus à apprendre pour l'équipe de design, et un
format propre à un éditeur.

## 4. Theatre.js et Remotion

**`theatre_js`** : un éditeur d'animation **dans le navigateur**, qui pilote tes propres objets,
y compris une scène Three.js. Le mouvement est séquencé visuellement et sauvegardé en JSON, puis
rejoué par le code. C'est l'outil qui convient quand l'animation porte sur une scène 3D
existante, donc directement pertinent pour la série de tableaux de Nahual.

**`remotion`** : l'inverse de tout ce module. On écrit une vidéo **en React**, et on la rend en
fichier vidéo côté serveur. Ce n'est pas de l'animation d'interface : c'est de la production
vidéo programmatique, pour des rendus personnalisés ou des séquences générées. À connaître pour
ne pas le confondre avec les autres.

## 5. La règle de décision

```
Qui produit l'animation, et pour quoi ?
├── un designer, une sequence lineaire a rejouer       → Lottie
├── un designer, un composant qui REAGIT               → Rive
├── moi, sur une scene 3D existante                    → Theatre.js
├── moi, et le livrable est une VIDEO                  → Remotion
└── moi, et c'est une transition d'interface           → le natif, puis module 09 ou 10
```

Et la question préalable, toujours la même : **est-ce que le natif suffit ?** Une icône qui se
transforme en croix, un indicateur de chargement, un dépliement : tout cela se fait en CSS ou en
SVG animé, sans pipeline, sans bibliothèque de lecture, et avec une accessibilité qu'on contrôle.

Un fichier Lottie de cinq cents kilo-octets pour une icône de chargement est un cas réel et
fréquent.

## 6. L'accessibilité : le cas le plus risqué du cours

Une animation importée est le pire cas, pour trois raisons qui se cumulent.

**Elle est opaque.** Un Lottie se rend en SVG ou en canvas selon le lecteur. Dans les deux cas,
son contenu est illisible : des centaines de nœuds sans sens, ou une image muette.

```html
<!-- Le minimum : l'animation est decorative, donc elle sort de l'arbre -->
<dotlottie-player src="…" aria-hidden="true" role="presentation"></dotlottie-player>

<!-- Si elle porte une information, c'est le texte qui la porte, pas elle -->
<figure>
  <dotlottie-player src="/succes.lottie" aria-hidden="true"></dotlottie-player>
  <figcaption>Votre inscription est confirmée.</figcaption>
</figure>
```

**Elle boucle.** Une animation importée tourne souvent en boucle par défaut, et le critère
`13.8 (A)` est alors engagé dès cinq secondes : il faut un moyen de l'arrêter. Une boucle
infinie sans contrôle est une non-conformité, pas un choix esthétique.

**Elle ignore la préférence de mouvement.** Le lecteur ne consulte pas `prefers-reduced-motion`
pour toi. C'est à toi de le faire, et c'est l'objet du lab 06 :

```js
const reduit = matchMedia('(prefers-reduced-motion: reduce)');

function appliquerPreference() {
  if (reduit.matches) {
    lecteur.pause();
    lecteur.seek(lecteur.totalFrames);   // afficher l'etat FINAL, pas une image vide
  } else {
    lecteur.play();
  }
}

appliquerPreference();
reduit.addEventListener('change', appliquerPreference);   // la preference peut changer en cours
```

Deux détails qui font la différence entre une implémentation correcte et une implémentation
approximative : **afficher l'image finale** plutôt que de laisser un cadre vide, et **écouter le
changement** de préférence, parce qu'elle peut être modifiée pendant la visite.

Et le critère `4.9 (A)` du référentiel s'applique : un média non temporel, ce qu'est une
animation vectorielle, a besoin d'une alternative équivalente si elle porte de l'information.

## 7. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `lottie`, `theatre_js`.

`remotion` apparaît dans State of React, mais dans la question sur les **moteurs de rendu**, aux
côtés de React Native et de React PDF. L'enquête le classe donc comme une cible de rendu, et
c'est exactement juste : il ne produit pas une animation d'interface, il produit un fichier. Il
n'entre donc pas dans la couverture de ce cours.

## 8. Les pièges

1. **Accepter un Lottie sans l'ouvrir.** Les bitmaps embarqués font des fichiers de plusieurs
   mégaoctets.
2. **Utiliser un Lottie pour une icône animée.** Le CSS ou un SVG animé suffisent, sans lecteur.
3. **Laisser `loop` par défaut.** Critère `13.8 (A)` engagé dès cinq secondes.
4. **Laisser l'animation dans l'arbre d'accessibilité.** Des centaines de nœuds sans sens, ou une
   image muette.
5. **Oublier `prefers-reduced-motion`.** Le lecteur ne le fait pas pour toi.
6. **Mettre en pause sur une image vide** au lieu de l'état final.
7. **Ne pas écouter le changement de préférence.** Elle peut être modifiée en cours de visite.
8. **Confondre Remotion et une bibliothèque d'animation.** Il produit des fichiers vidéo.
9. **Négocier le poids en fin de projet.** La conversation sur les contraintes se tient avant.

## 9. Lire avant le lab

Pour [lab-06](../labs/lab-06-lottie-respectueux/README) : § 2.2, § 2.3, § 6 en entier.

## 10. Auto-test

1. Quel est l'intérêt décisif d'un export de données par rapport à un recodage ?
2. Cite quatre causes d'un fichier Lottie trop lourd, et la conversation qui les évite.
3. Quelle différence de nature entre Lottie et Rive ?
4. Que produit Remotion, et pourquoi n'est-il pas dans la couverture de ce cours ?
5. Pourquoi une animation importée doit-elle être `aria-hidden` par défaut ?
6. À partir de quelle durée une boucle engage-t-elle `13.8 (A)` ?
7. Que faut-il afficher quand on met l'animation en pause sous préférence réduite, et pourquoi ?
8. Pourquoi écouter l'évènement de changement de la préférence ?
