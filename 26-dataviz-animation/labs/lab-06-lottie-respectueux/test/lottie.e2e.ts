// Oracle du lab 06.
//
// L'état de l'animation n'est pas lu dans le DOM mais dans le lecteur lui-même, par
// `lottie.getRegisteredAnimations()`. C'est ce qui rend ce lab mesurable : on compare des
// numéros d'image, pas des impressions visuelles.

import { test, expect, type Page } from "@playwright/test";
import { ouvrirLab, arbreAccessibilite, violationsAxe } from "../../outils/lab";

const LAB = "lab-06-lottie-respectueux";

declare global {
  interface Window {
    lottie: {
      getRegisteredAnimations(): Array<{ currentFrame: number; totalFrames: number; isPaused: boolean }>;
    };
  }
}

/** Attend que le lecteur ait chargé le fichier du designer. */
async function attendreLeLecteur(page: Page) {
  await page.waitForFunction(
    () => {
      const animations = window.lottie?.getRegisteredAnimations() ?? [];
      return animations.length > 0 && animations[0].totalFrames > 0;
    },
    undefined,
    { timeout: 5000 },
  );
}

async function imageCourante(page: Page) {
  return page.evaluate(() => window.lottie.getRegisteredAnimations()[0].currentFrame);
}

/** Trois relevés sur une seconde : un seul ne distingue pas l'immobile du hasard. */
async function releves(page: Page, nombre = 3) {
  const vus: number[] = [];
  for (let i = 0; i < nombre; i++) {
    vus.push(await imageCourante(page));
    await page.waitForTimeout(400);
  }
  return vus;
}

test.describe("Une animation importée, respectueuse", () => {
  test("sans préférence, l'animation joue réellement", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const vus = await releves(page);
    expect(
      new Set(vus).size,
      `images relevées : ${JSON.stringify(vus)}. Sans animation qui tourne, ce lab ne prouve rien.`,
    ).toBeGreaterThan(1);
  });

  test("sous préférence réduite, l'animation NE JOUE PAS", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const vus = await releves(page);
    expect(
      new Set(vus).size,
      `images relevées : ${JSON.stringify(vus)}. Le lecteur ne lit pas la préférence pour toi : ` +
        `autoplay est un choix, et il se prend après avoir interrogé matchMedia.`,
    ).toBe(1);
  });

  test("sous préférence réduite, elle est figée sur son état FINAL, pas sur une image vide", async ({
    page,
  }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const total = await page.evaluate(() => window.lottie.getRegisteredAnimations()[0].totalFrames);
    const vus = await releves(page);

    for (const image of vus) {
      expect(
        image,
        `image ${image} sur ${total}. Couper le mouvement ne veut pas dire montrer une image ` +
          `blanche : il faut l'état d'arrivée, celui qui porte le sens. Module 11 § 8, piège 6.`,
      ).toBeGreaterThanOrEqual(total * 0.9);
    }
  });

  test("le lecteur est sorti de l'arbre d'accessibilité", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const cache = await page.locator("#lecteur").getAttribute("aria-hidden");
    expect(
      cache,
      "un Lottie rendu en SVG, c'est des centaines de noeuds sans nom. Module 11 § 6.",
    ).toBe("true");

    const arbre = await arbreAccessibilite(page);
    expect(
      arbre.length,
      `${arbre.length} noeuds dans l'arbre. Avec le lecteur exclu, la page doit rester sobre.`,
    ).toBeLessThan(30);
  });

  test("1.3 (A) : l'information est portée par du texte, pas par l'animation", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const legende = page.locator("figcaption");
    await expect(
      legende,
      "l'animation est opaque : si elle porte l'information, personne ne l'a. Module 11 § 6.",
    ).toHaveCount(1);

    const texte = (await legende.textContent())!.trim();
    expect(texte.length, "la légende doit dire ce que l'animation raconte").toBeGreaterThan(15);
    expect(texte, "ici l'information est la confirmation de l'inscription").toMatch(/confirm/i);
  });

  test("13.8 (A) : la séquence boucle, donc un contrôle visible existe", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const bouton = page.getByRole("button", { name: /pause|arrêter/i });
    await expect(
      bouton,
      "respecter la préférence ne suffit pas : une boucle de plus de cinq secondes exige un contrôle",
    ).toHaveCount(1);
    await expect(bouton).toHaveAttribute("aria-pressed", "false");
  });

  test("le contrôle arrête réellement l'animation, et restitue son état", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const bouton = page.getByRole("button", { name: /pause|arrêter/i });
    await bouton.click();
    await expect(bouton, "l'état du bouton doit être restitué, le libellé reste stable").toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const vus = await releves(page);
    expect(new Set(vus).size, `images relevées après la pause : ${JSON.stringify(vus)}`).toBe(1);
  });

  test("le changement de préférence EN COURS DE VISITE est écouté", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);

    const enMouvement = await releves(page, 2);
    expect(new Set(enMouvement).size, "l'animation doit tourner avant la bascule").toBeGreaterThan(1);

    // La personne active la préférence dans son système, la page est déjà ouverte.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(300);

    const apres = await releves(page);
    expect(
      new Set(apres).size,
      `images relevées après la bascule : ${JSON.stringify(apres)}. Lire la préférence une fois ` +
        `au chargement ne suffit pas : elle peut changer. Module 11 § 8, piège 7.`,
    ).toBe(1);
  });

  test("le fichier reçu du designer ne contient aucune image bitmap embarquée", async ({ page }, infos) => {
    // Ce test est le seul du lab qui est vert avant que tu commences, et c'est volontaire :
    // c'est une porte de RECEPTION, à rejouer à chaque nouveau livrable. Module 11 § 2.2.
    await ouvrirLab(page, infos, LAB);

    const reponse = await page.request.get(`/${LAB}/animations/confirmation.json`);
    expect(reponse.status()).toBe(200);
    const fichier = await reponse.json();

    const embarquees = (fichier.assets ?? []).filter(
      (a: { p?: string; e?: number }) => typeof a.p === "string" && /^data:/.test(a.p),
    );
    expect(
      embarquees.length,
      `${embarquees.length} image(s) encodée(s) en base64 dans le JSON. C'est la première cause ` +
        `d'un Lottie de plusieurs mégaoctets, et la conversation se tient avant la fin du projet.`,
    ).toBe(0);
  });

  test("axe ne trouve aucune violation", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    await attendreLeLecteur(page);
    const violations = await violationsAxe(page);
    expect(violations, JSON.stringify(violations, null, 1)).toEqual([]);
  });
});
