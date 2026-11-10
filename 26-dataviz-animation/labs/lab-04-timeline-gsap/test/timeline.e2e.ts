// Oracle du lab 04.
//
// L'assertion centrale mesure un DÉPLACEMENT en pixels sous émulation de
// prefers-reduced-motion. C'est la seule façon de distinguer une animation supprimée d'une
// animation accélérée, et c'est tout l'objet du module 12 § 2.

import { test, expect, type Page, type TestInfo } from "@playwright/test";
import { ouvrirLab } from "../../outils/lab";

const LAB = "lab-04-timeline-gsap";

/** Déplacement vertical d'une carte entre le chargement et une seconde plus tard. */
async function deplacement(page: Page, infos: TestInfo) {
  await ouvrirLab(page, infos, LAB);
  const tot = (await page.locator("#c3").boundingBox())!.y;
  await page.waitForTimeout(900);
  const tard = (await page.locator("#c3").boundingBox())!.y;
  return Math.abs(tard - tot);
}

async function source(page: Page, cible: string) {
  const reponse = await page.request.get(`/${LAB}/${cible}/rendu.js`);
  expect(reponse.status()).toBe(200);
  return (await reponse.text()).replace(/\/\/[^\n]*/g, "");
}

test.describe("Timeline et préférence de mouvement", () => {
  test("sans préférence, la séquence déplace bien les cartes", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const bouge = await deplacement(page, infos);

    expect(bouge, "sans animation, ce lab ne prouve rien").toBeGreaterThan(5);
  });

  test("sous préférence réduite, les cartes NE SE DÉPLACENT PAS", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const bouge = await deplacement(page, infos);

    expect(
      bouge,
      `la carte s'est déplacée de ${bouge.toFixed(1)} px sous préférence réduite. Une librairie ` +
        `ne lit pas la préférence pour toi : il faut deux mondes déclarés, pas une durée raccourcie.`,
    ).toBeLessThanOrEqual(1);
  });

  test("sous préférence réduite, le contenu reste visible : on coupe le mouvement, pas l'information", async ({
    page,
  }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ouvrirLab(page, infos, LAB);
    await page.waitForTimeout(500);

    const opacite = await page.locator("#c3").evaluate((el) => Number(getComputedStyle(el).opacity));
    expect(opacite, "les cartes doivent finir pleinement visibles").toBeGreaterThan(0.95);
  });

  test("13.8 (A) : un bouton permet d'arrêter l'animation", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    const bouton = page.getByRole("button", { name: /pause|arrêter/i });
    await expect(
      bouton,
      "la séquence boucle : respecter la préférence ne suffit pas, 13.8 exige un contrôle visible",
    ).toHaveCount(1);
    await expect(bouton).toHaveAttribute("aria-pressed", "false");
  });

  test("le bouton arrête réellement le mouvement, et l'annonce", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    const bouton = page.getByRole("button", { name: /pause|arrêter/i });
    await bouton.click();
    await expect(bouton, "l'état doit être restitué").toHaveAttribute("aria-pressed", "true");

    const avant = (await page.locator("#c3").boundingBox())!.y;
    await page.waitForTimeout(600);
    const apres = (await page.locator("#c3").boundingBox())!.y;

    expect(
      Math.abs(apres - avant),
      "après la pause, plus rien ne doit bouger",
    ).toBeLessThanOrEqual(1);
  });

  test("la séquence est une timeline, pas une pile de délais", async ({ page }, infos) => {
    const cible = await ouvrirLab(page, infos, LAB);
    const js = await source(page, cible);

    expect(
      js,
      "des délais empilés sont intenables : changer une durée oblige à recalculer les suivants",
    ).toMatch(/gsap\.timeline\(/);

    const delais = js.match(/delay\s*:/g) ?? [];
    expect(delais, `${delais.length} delay trouvés. Une timeline utilise des positions relatives.`).toEqual([]);
  });

  test("la préférence est gérée par deux mondes déclarés, pas par un raccourcissement", async ({ page }, infos) => {
    const cible = await ouvrirLab(page, infos, LAB);
    const js = await source(page, cible);

    expect(
      js,
      "gsap.matchMedia déclare deux mondes et nettoie quand la condition cesse d'être vraie",
    ).toMatch(/matchMedia\(/);
    expect(js, "il faut traiter explicitement le cas reduce").toMatch(/prefers-reduced-motion:\s*reduce/);
  });
});
