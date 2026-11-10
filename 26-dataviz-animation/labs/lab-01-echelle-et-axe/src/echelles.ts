// STARTER. Quatre fonctions a ecrire. Aucune dependance : ce sont des fonctions PURES,
// et c'est ce qui permet de les tester sans navigateur et sans DOM.
//
// Lis le module 01 (§ 2 et § 3) et le module 03 (§ 2 et § 3.1) avant de commencer.

export type Point = { etiquette: string; valeur: number };

export type Barre = {
  etiquette: string;
  valeur: number;
  x: number;
  y: number;
  largeur: number;
  hauteur: number;
};

/**
 * Une echelle lineaire : elle mappe une valeur du domaine vers l'etendue.
 *
 * Attention a l'orientation : en SVG l'origine est en haut a gauche, donc une etendue
 * [hauteur, 0] fait descendre les petites valeurs. L'echelle doit gerer les deux sens.
 */
export function echelleLineaire(_options: { domaine: [number, number]; etendue: [number, number] }) {
  throw new Error("a implementer");
}

/**
 * Une echelle pour encoder une quantite sur une AIRE (un rayon de cercle).
 * Module 01 § 3.2 : encoder sur un rayon lineaire eleve les ecarts au carre.
 */
export function echelleRacine(_options: { domaine: [number, number]; etendue: [number, number] }) {
  throw new Error("a implementer");
}

/**
 * Des graduations « rondes » couvrant le domaine, en visant environ `nombreVise` valeurs.
 * Module 01 § 2.3 : un lecteur qui doit interpoler entre 69,4 et 138,8 ne lit pas, il devine.
 */
export function graduationsRondes(
  _domaine: [number, number],
  _nombreVise = 5,
): number[] {
  throw new Error("a implementer");
}

/**
 * La geometrie d'un diagramme en barres.
 *
 * Le domaine se CALCULE depuis les donnees, et il part de zero : pour des barres,
 * l'encodage est la LONGUEUR, donc un axe tronque est un mensonge. Module 01 § 3.1.
 */
export function barresDepuis(
  _donnees: Point[],
  _options: { largeur: number; hauteur: number; espacement?: number },
): Barre[] {
  throw new Error("a implementer");
}
