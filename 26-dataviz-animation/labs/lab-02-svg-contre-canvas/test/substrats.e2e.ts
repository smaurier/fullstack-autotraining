// Oracle du lab 02.
//
// Il compare ce que les DEUX substrats exposent à l'arbre d'accessibilité. C'est la seule
// façon de rendre visible l'affirmation du module 02 : un canvas est une image muette, et un
// SVG non maîtrisé est un arbre bruyant.

import { test, expect } from "@playwright/test";
import { ouvrirLab, arbreAccessibilite, violationsAxe } from "../../outils/lab";

const LAB = "lab-02-svg-contre-canvas";

test.describe("Les trois substrats", () => {
  test("le SVG est UNE image nommée dans l'arbre, pas des dizaines de nœuds", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const arbre = await arbreAccessibilite(page);
    const images = arbre.filter((n) => n.role === "image" || n.role === "img" || n.role === "graphics-document");

    expect(
      images.length,
      `nœuds de rôle image trouvés : ${images.length}. Il en faut deux, un par graphique.`,
    ).toBeGreaterThanOrEqual(2);

    const nomme = images.find((n) => /SVG/i.test(n.nom));
    expect(nomme, `le SVG doit porter un nom accessible. Noms vus : ${images.map((i) => i.nom).join(" | ")}`).toBeTruthy();
  });

  test("les marques du SVG sortent de l'arbre", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const cache = await page.locator("#marques-svg").getAttribute("aria-hidden");
    expect(
      cache,
      "un rect ne dit rien d'utile : laisser les marques dans l'arbre produit un bruit de dizaines de nœuds vides",
    ).toBe("true");

    const arbre = await arbreAccessibilite(page);
    expect(
      arbre.length,
      `${arbre.length} nœuds dans l'arbre. Avec les marques exclues, la page doit rester sobre.`,
    ).toBeLessThan(60);
  });

  test("le canvas, qui n'expose rien par nature, reçoit un rôle et un nom", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const canvas = page.locator("#graphe-canvas");
    expect(await canvas.getAttribute("role"), "un canvas nu est un élément sans rôle").toBe("img");

    const nom = (await canvas.getAttribute("aria-label")) ?? "";
    expect(nom.length, "le canvas doit porter un nom accessible : il n'a aucun contenu").toBeGreaterThan(20);
  });

  test("le nom du canvas dit quelque chose, pas « graphique »", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const nom = ((await page.locator("#graphe-canvas").getAttribute("aria-label")) ?? "").toLowerCase();

    expect(
      /\d/.test(nom),
      `« ${nom} » ne contient aucun chiffre. Une alternative doit donner les repères, pas décrire le contenant. Module 06 § 3.2.`,
    ).toBe(true);
  });

  test("un tableau de données équivalent existe, et il est atteignable", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    // Un repli est acceptable, un masquage non : on ouvre avant de chercher.
    const details = page.locator("details");
    if ((await details.count()) > 0) {
      await details.first().evaluate((d: HTMLDetailsElement) => {
        d.open = true;
      });
    }

    const tableau = page.getByRole("table");
    await expect(tableau, "c'est le seul chemin vers l'information pour le canvas").toHaveCount(1);

    for (const valeur of ["120", "145", "90", "240"]) {
      await expect(tableau, `la valeur ${valeur} doit figurer dans le tableau`).toContainText(valeur);
    }
  });

  test("le tableau n'est pas masqué visuellement : il sert à tout le monde", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const details = page.locator("details");
    if ((await details.count()) > 0) {
      await details.first().evaluate((d: HTMLDetailsElement) => {
        d.open = true;
      });
    }

    const masque = await page.locator("table").evaluate((el) => {
      const s = getComputedStyle(el);
      const boite = el.getBoundingClientRect();
      return (
        s.clipPath.includes("inset(50%)") ||
        (boite.width <= 1 && boite.height <= 1) ||
        s.position === "absolute" && boite.left < -100
      );
    });

    expect(
      masque,
      "un tableau en masquage visuel réserve les données aux technologies d'assistance. Un <details> sert tout le monde.",
    ).toBe(false);
  });

  test("le canvas est net sur un écran à haute densité", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const net = await page.locator("#graphe-canvas").evaluate((el: HTMLCanvasElement) => {
      const dpr = window.devicePixelRatio || 1;
      const largeurCss = el.getBoundingClientRect().width;
      // Le buffer doit valoir la taille CSS multipliee par la densite.
      return Math.abs(el.width - largeurCss * dpr) < 2;
    });

    expect(
      net,
      "sans gestion de devicePixelRatio, un canvas est flou sur tout écran moderne. Module 02 § 1.3.",
    ).toBe(true);
  });

  test("axe ne trouve aucune violation", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    const violations = await violationsAxe(page);
    expect(violations, JSON.stringify(violations, null, 1)).toEqual([]);
  });
});
