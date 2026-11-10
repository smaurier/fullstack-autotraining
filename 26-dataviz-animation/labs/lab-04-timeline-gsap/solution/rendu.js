// SOLUTION DE REFERENCE. A n'ouvrir qu'apres ton GREEN.

const bouton = document.querySelector("#pause");
let sequence = null;

// gsap.matchMedia declare DEUX MONDES au lieu de corriger l'un par l'autre.
// Module 09 § 6.
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Une timeline : les positions sont relatives, donc changer une duree ne casse rien.
  sequence = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 0.4, ease: "power2.out" } })
    .to("#c1", { opacity: 1, y: 0 })
    .to("#c2", { opacity: 1, y: 0 }, "-=0.2")
    .to("#c3", { opacity: 1, y: 0 }, "-=0.2");

  return () => {
    sequence.kill();
    sequence = null;
  };
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  // Pas la meme animation raccourcie : on SUPPRIME le deplacement et on garde le fondu.
  gsap.set(".carte", { y: 0 });
  const fondu = gsap.to(".carte", { opacity: 1, duration: 0.15 });
  return () => fondu.kill();
});

bouton.addEventListener("click", () => {
  if (!sequence) return;
  const enPause = !sequence.paused();
  sequence.paused(enPause);

  // Le libelle reste STABLE : c'est aria-pressed qui porte l'etat. Un bouton dont le texte
  // change est ambigu (decrit-il l'etat courant ou l'action a venir ?), et il casse le
  // pilotage a la voix. Cours 25, module 17 § 3.2.
  bouton.setAttribute("aria-pressed", String(enPause));
});
