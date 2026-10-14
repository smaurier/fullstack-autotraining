# Lab H04 — Modèle de domaine, permissions, et la frontière des deux modes

> **Module associé :** [`modules/h04-domaine-roles-permissions.md`](../../modules/h04-domaine-roles-permissions.md)
> **Forme :** Zéro — ni le modèle de domaine de TribuZen ni la frontière 3D/2D ne sont écrits.
> **Outil :** un document pour le modèle et la frontière, Figma pour les variantes d'écran.
> **Ancrage :** TribuZen pour le domaine et les permissions (un portfolio n'a ni rôles ni
> droits), et le fil rouge « Nahual 2D » pour la partie frontière de thème.

## Échauffement (25 min, jetable)

> Prends un outil collaboratif que tu connais (un dépôt partagé, un agenda, un espace de
> fichiers). Écris ses entités et leurs cardinalités en six lignes maximum, puis trouve **une**
> cardinalité que tu aurais spontanément supposée fausse (« un » là où il y a « plusieurs »).
> Contrainte : dis quel écran serait faux si on se trompait sur cette cardinalité.

Le piège attendu : s'arrêter aux entités sans les cardinalités. Les entités sont faciles et ne
décident rien ; ce sont les cardinalités qui rendent un écran juste ou faux.

## Lire avant

Relire précisément :
- §2.1 — les trois questions de cardinalité, dont celle sur l'immuabilité.
- §2.3 — concevoir par permission et non par rôle.
- §2.4 — les trois réponses à « pas le droit », et la réponse interdite.
- §2.5 — pourquoi on maquette la variante la plus pauvre d'abord.
- §2.6 — le tableau de ce qu'un thème peut et ne peut pas changer.

## Brief

### Partie 1 — modèle de domaine TribuZen

1. Écrire les **entités, relations et cardinalités** de TribuZen. Minimum six relations.
2. Pour chaque relation, répondre aux trois questions du §2.1 : un ou plusieurs, obligatoire ou
   optionnel, qu'est-ce qui est immuable et à partir de quand.
3. Formuler **au moins une règle d'immuabilité** explicite (du type « une occurrence passée
   n'est corrigeable que pendant N heures »), et dire quel état d'interface elle impose.
4. Nommer **au moins un écran existant que ce modèle rend faux** et dire pourquoi. C'est le
   critère de réussite de la partie : un modèle qui ne corrige rien n'a rien révélé.

### Partie 2 — permissions

5. Définir **trois profils par permissions**, jamais par rôles : la liste des permissions de
   chacun, et la table « zone ou élément d'écran vers permission requise ».
6. Pour chaque élément conditionné, choisir **laquelle des trois réponses** du §2.4 s'applique
   (masquer / désactiver avec explication / expliquer et proposer un chemin), et écrire le
   texte de l'explication quand il y en a une.
7. **Maquetter l'écran principal dans la variante la plus pauvre d'abord**, puis l'enrichir
   pour les deux autres profils.

### Partie 3 — la frontière des deux modes (fil rouge Nahual 2D)

8. Écrire, pour le portfolio, le tableau du §2.6 appliqué aux modes 3D et 2D : ce qui **peut**
   différer entre les deux rendus, et ce qui **ne doit jamais** différer.
9. Vérifier la règle : si la structure, l'ordre du contenu, la position des actions ou les
   libellés changent entre 3D et 2D, ce ne sont plus deux modes du même produit mais deux
   produits. Nommer explicitement les écarts que tu acceptes et pourquoi.

## Livrable attendu

- Le modèle de domaine avec cardinalités et réponses aux trois questions.
- Au moins une règle d'immuabilité, et l'état d'interface qu'elle impose.
- Le nom d'un écran existant que le modèle corrige, avec l'explication.
- Les trois profils en permissions, et la table élément vers permission.
- Les trois variantes de l'écran principal, conçues dans l'ordre pauvre vers riche.
- Le tableau de frontière 3D / 2D, avec les écarts acceptés et leur justification.

## Rubrique de vérification

**Rubrique objective :**
- Six relations minimum, chacune avec sa cardinalité explicite.
- Les trois questions du §2.1 traitées pour chaque relation, sans case vide.
- Au moins une règle d'immuabilité écrite, avec l'état d'interface correspondant.
- Au moins un écran existant identifié comme faux par le modèle.
- Les profils sont définis par permissions ; un profil défini par un nom de rôle sans sa liste
  de permissions est refusé.
- Aucun élément conditionné n'est laissé en « laisser agir puis refuser ».
- Chaque élément désactivé porte le texte de son explication.
- La variante la plus pauvre est maquettée en premier (l'ordre de production doit être visible,
  par exemple par la datation des frames).
- Le tableau de frontière 3D/2D distingue le variable de l'invariant, et aucun invariant de la
  colonne de droite n'est violé sans justification écrite.

**Revue qualitative :** le brief demandait un modèle qui corrige des écrans et des variantes qui
ne soient pas des écrans troués. Les questions sont donc : la variante la plus pauvre est-elle
un écran complet et cohérent (et non l'écran riche avec des vides), et la frontière 3D/2D
tient-elle sans que le mode 2D devienne un produit différent avec son propre plan ?

## Variante J+30 (fading)

Ajouter un quatrième profil hybride (par exemple : quelqu'un qui peut exporter mais pas
modifier) **sans redessiner aucun écran**. Si tu dois redessiner, c'est que tu avais conçu par
rôle et non par permission — et c'est exactement la démonstration que le module annonçait.
