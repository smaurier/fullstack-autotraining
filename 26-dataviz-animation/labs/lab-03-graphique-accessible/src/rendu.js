// STARTER. Le rendu est correct. Tout le reste est a faire.
import { SERIES, chemin, MAXI } from "../../outils/series.js";

const groupe = document.querySelector("#marques");

for (const serie of SERIES) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", chemin(serie.valeurs, { largeur: 400, hauteur: 200, maxi: MAXI }));
  path.setAttribute("class", `serie serie-${serie.cle}`);
  groupe.append(path);
}
