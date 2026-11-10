// SOLUTION DE REFERENCE. A n'ouvrir qu'apres ton GREEN.
import { DONNEES, barres } from "../../outils/donnees.js";

const geometrie = barres(DONNEES, { largeur: 400, hauteur: 200 });

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

const canvas = document.querySelector("#graphe-canvas");

// Sans cela, le canvas est flou sur tout ecran a haute densite. Module 02 § 1.3.
const dpr = window.devicePixelRatio || 1;
const largeurCss = canvas.width;
const hauteurCss = canvas.height;
canvas.width = largeurCss * dpr;
canvas.height = hauteurCss * dpr;
canvas.style.inlineSize = `${largeurCss}px`;
canvas.style.blockSize = `${hauteurCss}px`;

const ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);
ctx.fillStyle = "#0b5fff";
for (const b of geometrie) {
  ctx.fillRect(b.x, b.y, b.largeur, b.hauteur);
}
