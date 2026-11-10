// STARTER. Ca marche, et les elements sautent. Aucune animation de layout, aucune annonce,
// et le focus se perd quand on retire la ligne depuis son propre bouton.

let membres = [
  { id: "a", nom: "Alondra", ateliers: 3 },
  { id: "b", nom: "Bastien", ateliers: 7 },
  { id: "c", nom: "Chloé", ateliers: 1 },
  { id: "d", nom: "Driss", ateliers: 5 },
];

const liste = document.querySelector("#liste");

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

document.querySelector("#trier").addEventListener("click", () => {
  membres = [...membres].sort((x, y) => y.ateliers - x.ateliers);
  rendre();
});

liste.addEventListener("click", (evenement) => {
  const bouton = evenement.target.closest(".retrait");
  if (!bouton) return;
  membres = membres.filter((m) => m.id !== bouton.dataset.id);
  rendre();
});

rendre();
