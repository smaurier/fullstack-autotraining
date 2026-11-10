// Jeu de donnees a deux series. TU NE MODIFIES PAS CE FICHIER.
export const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];

export const SERIES = [
  { cle: "cuisine", nom: "Cuisine", valeurs: [120, 132, 90, 145, 160, 180] },
  { cle: "couture", nom: "Couture", valeurs: [60, 75, 110, 140, 200, 240] },
];

/** Rend une chaine de chemin SVG pour une serie. */
export function chemin(valeurs, { largeur, hauteur, maxi }) {
  const pas = largeur / (valeurs.length - 1);
  return valeurs
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * pas).toFixed(1)},${(hauteur - (v / maxi) * hauteur).toFixed(1)}`)
    .join("");
}

export const MAXI = Math.max(...SERIES.flatMap((s) => s.valeurs));
