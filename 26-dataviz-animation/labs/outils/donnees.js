// Jeu de donnees partage des labs. TU NE MODIFIES PAS CE FICHIER.
export const DONNEES = [
  { etiquette: "Cuisine", valeur: 120 },
  { etiquette: "Jardinage", valeur: 145 },
  { etiquette: "Photographie", valeur: 90 },
  { etiquette: "Couture", valeur: 240 },
];

/** La geometrie du lab 01, fournie ici pour que les labs suivants s'y appuient. */
export function barres(donnees, { largeur, hauteur, espacement = 0.2 }) {
  const maxi = Math.max(...donnees.map((d) => d.valeur));
  const pas = largeur / donnees.length;
  const largeurBarre = pas * (1 - espacement);
  return donnees.map((d, i) => {
    const h = (d.valeur / maxi) * hauteur;
    return {
      etiquette: d.etiquette,
      valeur: d.valeur,
      x: i * pas + (pas - largeurBarre) / 2,
      y: hauteur - h,
      largeur: largeurBarre,
      hauteur: h,
    };
  });
}
