// STARTER. Trois animations independantes, et une arithmetique de delais.
// Elle boucle, et rien ne permet de l'arreter.

gsap.to("#c1", { opacity: 1, y: 0, duration: 0.4, repeat: -1, yoyo: true });
gsap.to("#c2", { opacity: 1, y: 0, duration: 0.4, delay: 0.2, repeat: -1, yoyo: true });
gsap.to("#c3", { opacity: 1, y: 0, duration: 0.4, delay: 0.4, repeat: -1, yoyo: true });
