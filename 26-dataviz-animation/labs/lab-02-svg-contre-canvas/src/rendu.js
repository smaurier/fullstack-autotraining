// STARTER. Le rendu fonctionne. L'accessibilite, non.
import { DONNEES, barres } from "../../outils/donnees.js";

const geometrie = barres(DONNEES, { largeur: 400, hauteur: 200 });

// --- SVG : un rect par barre, et rien d'autre
const groupe = document.querySelector("#marques-svg");
for (const b of geometrie) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", String(b.x));
  rect.setAttribute("y", String(b.y));
  rect.setAttribute("width", String(b.largeur));
  rect.setAttribute("height", String(b.hauteur));
  rect.setAttribute("fill", "#0b5fff");
  groupe.append(rect);
}

// --- Canvas : des pixels, et rien de plus
const canvas = document.querySelector("#graphe-canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#0b5fff";
for (const b of geometrie) {
  ctx.fillRect(b.x, b.y, b.largeur, b.hauteur);
}
