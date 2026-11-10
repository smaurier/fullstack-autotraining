# 12. L'animation accessible

> **Outcome :** à la fin, tu sais pourquoi `prefers-reduced-motion` est un contrat médical et non
> une option de confort, tu sais dégrader une chorégraphie sans la casser, et tu sais que
> respecter la préférence ne suffit pas à être conforme.
>
> **Labs :** [lab-04](../labs/lab-04-timeline-gsap/README) et
> [lab-06](../labs/lab-06-lottie-respectueux/README)

## 1. Pour qui, et contre quoi

Le cours 25 module 12 § 4 pose le principe. Ce module le complète par ce qui est propre aux
animations élaborées, celles que les modules 09, 10 et 11 permettent de faire.

Les **troubles vestibulaires** provoquent, face à un mouvement non voulu et de grande amplitude,
des vertiges, des nausées et des migraines. Ce n'est pas une gêne : c'est un symptôme physique
qui peut durer des heures après la visite. Les personnes concernées ne sont pas rares, et elles
n'ont aucun moyen de prévoir qu'une page va les rendre malades.

S'y ajoutent les troubles de l'attention, pour lesquels une interface qui bouge en permanence
rend la lecture coûteuse, et la photosensibilité, traitée par le critère `13.7 (A)`.

### 1.1 L'échelle de nocivité, par amplitude

Ce qui déclenche, ce n'est pas « une animation ». C'est **la surface qui bouge et la distance
parcourue**.

| Motif | Risque |
|---|---|
| Parallaxe, plans à vitesses différentes | **élevé** |
| Zoom ou translation sur une grande surface | **élevé** |
| Défilement détourné, épinglage avec déplacement horizontal | **élevé** |
| Carrousel automatique | élevé |
| Animation de layout sur beaucoup d'éléments | moyen à élevé |
| Cascade sur une longue liste | moyen |
| Déplacement local de quelques pixels | faible |
| Fondu, changement de couleur | **faible** |

La dernière ligne est importante : **un fondu n'est pas un problème.** C'est ce qui rend la
dégradation possible sans perdre l'information.

## 2. Réduire n'est pas raccourcir

La règle du cours 25, redite ici parce que les librairies rendent l'erreur plus facile :

```css
/* ⛔ Le contournement qui ne protege de rien */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

Une translation de quatre cents pixels en une centaine de microsecondes **reste** une translation
de quatre cents pixels. Pire : elle devient un saut brutal, ce qui est désagréable pour tout le
monde.

**Ce qu'il faut faire : supprimer le déplacement, garder l'information.** Un élément qui entrait
en glissant entre en fondu. L'utilisateur garde l'indication qu'un changement a eu lieu, sans
subir le mouvement.

### 2.1 La dégradation, librairie par librairie

**GSAP**, par deux mondes déclarés, module 09 § 6 :

```js
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => { /* la choregraphie */ });
mm.add('(prefers-reduced-motion: reduce)', () => { /* un fondu, sans deplacement */ });
```

**Motion**, par un crochet, module 10 § 5 :

```jsx
const reduit = useReducedMotion();
<motion.li layout={!reduit} initial={{ opacity: 0, y: reduit ? 0 : 20 }} />
```

Noter `layout={!reduit}` : une animation de layout **est** un déplacement, donc elle se coupe.

**Lottie**, par une pause sur l'image finale, module 11 § 6 :

```js
if (reduit.matches) { lecteur.pause(); lecteur.seek(lecteur.totalFrames); }
```

**Le natif**, par une autre animation :

```css
.carte { animation: glisser-et-apparaitre 300ms both; }
@media (prefers-reduced-motion: reduce) {
  .carte { animation: apparaitre 150ms both; }   /* une AUTRE, pas la meme raccourcie */
  .progression { animation: none; animation-timeline: none; }   /* l'ordre compte */
  html { scroll-behavior: auto; }
}
```

### 2.2 Les quatre oublis classiques

Dans l'ordre de fréquence :

1. **les animations liées au défilement** : `animation-timeline` doit être coupé, et l'ordre des
   déclarations compte, parce que le raccourci `animation` réinitialise `animation-timeline` ;
2. **`scroll-behavior: smooth`** : du mouvement non demandé, à remettre en `auto` ;
3. **les transitions de vue** : à neutraliser par `::view-transition-*` ;
4. **les animations pilotées par du JavaScript** : une boucle `requestAnimationFrame` ou un
   lecteur Lottie ne consultent aucune media query.

Le quatrième est celui que ce cours ajoute : avec une librairie, **la préférence ne s'applique
pas d'elle-même**. Elle doit être lue et appliquée par ton code.

## 3. Respecter la préférence ne suffit pas

Le point le plus important du module, et le plus souvent manqué.

**Critère `13.8 (A)` : pour tout contenu en mouvement ou clignotant, il existe un moyen de
l'arrêter**, sauf si le mouvement dure moins de cinq secondes.

« Un moyen de l'arrêter » signifie un **contrôle**, visible et utilisable au clavier. Pas un
réglage système.

```html
<button type="button" id="pause-animation" aria-pressed="false">
  Mettre l'animation en pause
</button>
```

La raison est simple : une personne qui n'a **pas** activé le réglage système, parce qu'elle ne
sait pas qu'il existe ou parce qu'elle le veut ailleurs, doit pouvoir arrêter ton carrousel.
Respecter `prefers-reduced-motion` protège ceux qui l'ont réglé. Le bouton protège les autres.

Les deux sont nécessaires, et ils ne se remplacent pas.

### 3.1 Les autres critères engagés

| Critère | Ce qu'il exige | Où ça se joue |
|---|---|---|
| `13.8 (A)` | un moyen d'arrêter tout mouvement de plus de 5 s | carrousels, boucles, Lottie |
| `13.7 (A)` | pas plus de trois flashes par seconde | transitions brutales, vidéo, stroboscopie |
| `10.13 (AA)` | un contenu additionnel animé reste contrôlable | infobulles, panneaux au survol |
| `7.4 (A)` | pas de changement de contexte inattendu | une animation qui déplace le focus ou la page |
| `10.7 (A)` | le focus reste visible | pendant et après l'animation |

Le dernier mérite une attention particulière avec les librairies : une animation qui transforme
un conteneur peut **couper ou déplacer** l'indicateur de focus de ses enfants, par le mécanisme
du cours 25 module 04. À vérifier au clavier, pendant l'animation.

## 4. Le focus pendant une animation

Trois situations, trois réponses. C'est la partie que les modules 09 et 10 rendent possible, donc
risquée.

**Un élément focusé est déplacé.** Le focus suit l'élément, et c'est correct. Mais si
l'indicateur est coupé par un conteneur transformé, la personne ne voit plus où elle est.

**Un élément focusé est retiré.** Le focus part sur le corps du document, et la personne perd sa
place. Il faut déplacer le focus **avant** le retrait, sur un point d'ancrage prévu.

```js
// Avant de retirer l'element focuse, on deplace le focus a un endroit sense
if (element.contains(document.activeElement)) {
  pointAncrage.focus();
}
retirer(element);
```

**Un élément apparaît et doit recevoir le focus.** À faire après l'animation d'entrée, pas
pendant : un `focus()` en cours de transformation peut faire défiler la page à un endroit
intermédiaire.

## 5. Comment vérifier

Quatre gestes, aucun ne prend plus d'une minute.

1. **Émuler la préférence** dans les outils de développement, et recharger. Les animations
   doivent être **absentes**, pas rapides.
2. **Mesurer un déplacement** : la position d'un élément juste après le chargement et une seconde
   plus tard. Sous préférence réduite, l'écart doit être nul. C'est exactement ce que font les
   oracles des labs 04 et 06.
3. **Chercher le bouton d'arrêt** sur tout ce qui boucle plus de cinq secondes.
4. **Naviguer au clavier pendant l'animation**, et vérifier que le focus reste visible et à sa
   place.

Le deuxième geste est celui qui distingue une vérification réelle d'une impression : **un
déplacement se mesure en pixels**, il ne s'apprécie pas à l'œil.

## 6. Ce que l'enquête interroge, et où c'est traité

Aucun item n'est rattaché à ce module, et c'est le même constat que pour le module 06 : **aucune
enquête ne demande si tes animations respectent la préférence de mouvement.** Elles demandent
quelle librairie tu utilises.

Les deux modules de ce cours qui n'ont aucun item d'enquête sont donc exactement les deux qui
portent l'accessibilité. Ce n'est pas un hasard : la profession mesure ses outils, pas ses
responsabilités.

## 7. Les pièges

1. **Raccourcir au lieu de supprimer le déplacement.** Une translation instantanée reste une
   translation.
2. **Oublier `animation-timeline`**, et le mettre après le raccourci `animation`, qui le
   réinitialise.
3. **Oublier `scroll-behavior: auto`.**
4. **Oublier les transitions de vue.**
5. **Croire qu'une librairie respecte la préférence.** Elle ne la lit pas pour toi.
6. **Croire que respecter la préférence suffit.** `13.8 (A)` demande un **contrôle**.
7. **Mettre un Lottie en pause sur une image vide** au lieu de son état final.
8. **Ne pas écouter le changement de préférence** en cours de visite.
9. **Perdre le focus** en retirant un élément animé.
10. **Juger un déplacement à l'œil** au lieu de le mesurer.

## 8. Auto-test

1. Pourquoi `prefers-reduced-motion` est-il un contrat et non une option de confort ?
2. Qu'est-ce qui détermine la nocivité d'une animation, et quel motif est à faible risque ?
3. Pourquoi `animation-duration: 0.01ms` ne protège-t-il de rien, et aggrave-t-il parfois ?
4. Donne la forme propre de la dégradation pour GSAP, pour Motion, et pour Lottie.
5. Cite les quatre oublis classiques, et celui qui est propre aux librairies.
6. Respecter la préférence suffit-il pour `13.8 (A)` ? Justifie en une phrase.
7. Que faire du focus avant de retirer un élément focusé ?
8. Quel geste de vérification distingue une mesure d'une impression ?
9. Pourquoi les deux modules sans item d'enquête de ce cours sont-ils ceux qui portent
   l'accessibilité ?
