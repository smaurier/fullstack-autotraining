// SOLUTION DE REFERENCE. A n'ouvrir qu'apres ton GREEN.
//
// FLIP, les quatre etapes (module 10 § 2.2) :
//   First  : mesurer AVANT
//   Last   : laisser le navigateur recalculer
//   Invert : ramener visuellement chaque element a sa position d'avant
//   Play   : animer cette transformation vers zero
//
// On n'anime JAMAIS la mise en page : on anime une transformation, donc on reste au niveau
// composite du pipeline (cours 25, module 04).

let membres = [
  { id: "a", nom: "Alondra", ateliers: 3 },
  { id: "b", nom: "Bastien", ateliers: 7 },
  { id: "c", nom: "Chloé", ateliers: 1 },
  { id: "d", nom: "Driss", ateliers: 5 },
];

const liste = document.querySelector("#liste");
const annonce = document.querySelector("#annonce");
const ancrage = document.querySelector("#ancrage");

const mouvementReduit = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function rendre() {
  liste.innerHTML = "";
  for (const m of membres) {
    const li = document.createElement("li");
    li.className = "ligne";
    li.dataset.id = m.id;
    li.innerHTML =
      `<span>${m.nom}</span><span class="compte">${m.ateliers} ateliers</span>` +
      `<button type="button" class="retrait" data-id="${m.id}">Retirer ${m.nom}</button>`;
    liste.append(li);
  }
}

/** Positions de chaque ligne, indexees par identifiant. */
function mesurer() {
  const positions = new Map();
  for (const li of liste.querySelectorAll(".ligne")) {
    positions.set(li.dataset.id, li.getBoundingClientRect());
  }
  return positions;
}

function muterAvecFlip(muter) {
  // 1. FIRST
  const avant = mesurer();

  // 2. LAST : la mutation, puis le navigateur recalcule
  muter();
  rendre();

  // Sous preference reduite, une animation de layout EST un deplacement : on la coupe.
  // On ne la raccourcit pas. Module 12 § 2.1.
  if (mouvementReduit()) return;

  for (const li of liste.querySelectorAll(".ligne")) {
    const positionAvant = avant.get(li.dataset.id);
    if (!positionAvant) continue;                 // element nouveau : rien a inverser

    const apres = li.getBoundingClientRect();
    const ecart = positionAvant.top - apres.top;
    if (Math.abs(ecart) < 1) continue;

    // 3. INVERT et 4. PLAY, sur une transformation : niveau composite, donc fluide.
    li.animate(
      [{ transform: `translateY(${ecart}px)` }, { transform: "translateY(0)" }],
      { duration: 300, easing: "cubic-bezier(0, 0, 0.2, 1)" },
    );
  }
}

document.querySelector("#trier").addEventListener("click", () => {
  muterAvecFlip(() => {
    membres = [...membres].sort((x, y) => y.ateliers - x.ateliers);
  });
  annonce.textContent = `Liste triée par nombre d'ateliers, ${membres.length} participants.`;
});

liste.addEventListener("click", (evenement) => {
  const bouton = evenement.target.closest(".retrait");
  if (!bouton) return;

  const id = bouton.dataset.id;
  const retire = membres.find((m) => m.id === id);
  const restants = membres.filter((m) => m.id !== id);

  // Le focus est place AVANT le retrait, parce que l'element qui le porte va disparaitre.
  // On vise le voisin le plus proche, et seulement a defaut le point d'ancrage.
  // Module 10 § 5 : laisser le focus tomber sur le corps du document, c'est renvoyer la
  // personne au clavier en haut de page.
  const ligne = bouton.closest(".ligne");
  const voisin = ligne.nextElementSibling ?? ligne.previousElementSibling;
  const idVoisin = voisin?.dataset.id ?? null;

  muterAvecFlip(() => {
    membres = restants;
  });

  const repli = idVoisin && liste.querySelector(`.ligne[data-id="${idVoisin}"] .retrait`);
  (repli ?? ancrage).focus();

  annonce.textContent = `${retire.nom} retiré. ${membres.length} participants restants.`;
});

rendre();
