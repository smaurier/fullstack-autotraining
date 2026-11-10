// SOLUTION DE REFERENCE. A n'ouvrir qu'apres ton GREEN.
//
// Le lecteur ne lit pas la preference a ta place, ne sort pas de l'arbre d'accessibilite tout
// seul, et n'offre aucun controle. Les trois sont a ta charge.

const lecteur = document.querySelector("#lecteur");
const controle = document.querySelector("#controle");

const preference = matchMedia("(prefers-reduced-motion: reduce)");

const animation = lottie.loadAnimation({
  container: lecteur,
  renderer: "svg",
  // On ne demande PAS la lecture automatique : c'est la preference qui decide, apres chargement.
  loop: true,
  autoplay: false,
  path: "../animations/confirmation.json",
});

/** Etat final et lisible, pas une image vide : la coche est dessinee, rien ne tourne. */
function figerSurLEtatFinal() {
  animation.goToAndStop(animation.totalFrames - 1, true);
}

function appliquerLaPreference() {
  if (preference.matches) {
    figerSurLEtatFinal();
    controle.hidden = true;             // plus rien ne bouge : le controle n'a plus d'objet
  } else {
    controle.hidden = false;
    controle.setAttribute("aria-pressed", "false");
    animation.play();
  }
}

animation.addEventListener("DOMLoaded", appliquerLaPreference);

// La preference peut changer EN COURS DE VISITE. Module 11 § 8, piege 7.
preference.addEventListener("change", appliquerLaPreference);

controle.addEventListener("click", () => {
  const enPause = controle.getAttribute("aria-pressed") === "true";

  if (enPause) {
    animation.play();
    controle.setAttribute("aria-pressed", "false");
  } else {
    // En pause, on montre l'etat final : une animation arretee sur une image intermediaire
    // laisse une information coupee en deux.
    figerSurLEtatFinal();
    controle.setAttribute("aria-pressed", "true");
  }

  // Le libelle reste stable, c'est aria-pressed qui porte l'etat. Cours 25, module 17.
});
