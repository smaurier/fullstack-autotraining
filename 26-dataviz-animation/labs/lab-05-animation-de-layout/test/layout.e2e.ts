// Oracle du lab 05.
//
// Il vérifie que l'animation de layout existe réellement, en lisant les animations en cours
// via l'API du navigateur, puis qu'elle porte sur une TRANSFORMATION et non sur la mise en
// page. Et il vérifie les deux choses que l'œil ne voit pas : le focus et l'annonce.

import { test, expect, type Page } from "@playwright/test";
import { ouvrirLab } from "../../outils/lab";

const LAB = "lab-05-animation-de-layout";

/** Les animations en cours sur les lignes, telles que le navigateur les connaît. */
async function animationsEnCours(page: Page) {
  return page.evaluate(() =>
    document
      .getAnimations()
      .filter((a) => (a.effect as KeyframeEffect)?.target?.classList?.contains("ligne"))
      .map((a) => {
        const effet = a.effect as KeyframeEffect;
        return {
          proprietes: effet.getKeyframes().flatMap((k) => Object.keys(k)),
          duree: (effet.getTiming().duration as number) ?? 0,
        };
      }),
  );
}

test.describe("Animation de layout", () => {
  test("le retrait anime les lignes qui remontent", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    await page.locator(".ligne").first().locator(".retrait").click();
    const animations = await animationsEnCours(page);

    expect(
      animations.length,
      "retirer une ligne fait remonter les suivantes : c'est le même FLIP que le tri",
    ).toBeGreaterThan(0);
  });

  test("le tri anime réellement les lignes", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    await page.getByRole("button", { name: /trier/i }).click();
    const animations = await animationsEnCours(page);

    expect(
      animations.length,
      "aucune animation en cours après le tri : les lignes sautent à leur nouvelle place",
    ).toBeGreaterThan(0);
  });

  test("l'animation porte sur une transformation, pas sur la mise en page", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    await page.getByRole("button", { name: /trier/i }).click();
    const animations = await animationsEnCours(page);
    const proprietes = animations.flatMap((a) => a.proprietes);

    expect(
      proprietes.some((p) => p === "transform" || p === "translate"),
      `propriétés animées : ${JSON.stringify([...new Set(proprietes)])}. FLIP anime une ` +
        `transformation : c'est ce qui la rend fluide, parce qu'on reste au niveau composite.`,
    ).toBe(true);

    for (const interdite of ["top", "left", "marginTop", "height"]) {
      expect(
        proprietes.includes(interdite),
        `${interdite} déclenche une mise en page à chaque image. Cours 25, module 04.`,
      ).toBe(false);
    }
  });

  test("sous préférence réduite, AUCUNE animation n'est lancée", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ouvrirLab(page, infos, LAB);

    await page.getByRole("button", { name: /trier/i }).click();
    const animations = await animationsEnCours(page);

    expect(
      animations.length,
      "une animation de layout EST un déplacement : sous préférence réduite elle se coupe, " +
        "elle ne se raccourcit pas",
    ).toBe(0);
  });

  test("sous préférence réduite, le tri a bien eu lieu : on coupe le mouvement, pas la fonction", async ({
    page,
  }, infos) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ouvrirLab(page, infos, LAB);

    await page.getByRole("button", { name: /trier/i }).click();
    const premier = await page.locator(".ligne").first().textContent();

    expect(premier, "Bastien a 7 ateliers, il doit passer premier").toContain("Bastien");
  });

  test("7.5 (AA) : une région de statut annonce le changement", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const statut = page.locator('[role="status"], [aria-live]');
    await expect(statut, "un tri ou un retrait est une information").toHaveCount(1);

    await page.getByRole("button", { name: /trier/i }).click();
    await page.waitForTimeout(200);

    const texte = (await statut.textContent())!.trim();
    expect(texte.length, "l'annonce doit être renseignée après le tri").toBeGreaterThan(5);
  });

  test("le focus n'est pas perdu quand la ligne qui le porte est retirée", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    // Le scénario canonique : on actionne le bouton DE LA LIGNE, donc le focus est sur un
    // élément qui va disparaître. C'est pour ça que le bouton vit sur la ligne et non dans
    // la barre de commandes : un clic sur un bouton extérieur laisserait le focus sur lui et
    // l'oracle ne verrait jamais le défaut.
    const retrait = page.locator(".ligne").first().locator(".retrait");
    await retrait.click();
    await page.waitForTimeout(200);

    const actif = await page.evaluate(() => ({
      corps: document.activeElement === document.body,
      balise: document.activeElement?.tagName.toLowerCase() ?? "",
      detache: !document.activeElement?.isConnected,
    }));

    expect(
      actif.corps || actif.detache,
      `activeElement : <${actif.balise}>, détaché : ${actif.detache}. Le focus est retombé sur ` +
        `le corps du document : la personne au clavier repart du haut de la page. Il faut le ` +
        `placer AVANT le retrait, sur le voisin le plus proche ou sur un ancrage prévu.`,
    ).toBe(false);
  });

  test("le focus atterrit sur le voisin, pas n'importe où", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    await page.locator(".ligne").first().locator(".retrait").click();
    await page.waitForTimeout(200);

    const classe = await page.evaluate(() => document.activeElement?.className ?? "");
    const ancre = await page.evaluate(() => document.activeElement?.id ?? "");

    expect(
      classe.includes("retrait") || ancre.length > 0,
      `le focus est sur « ${classe || ancre || "rien d'identifiable"} ». Reprendre sur le voisin ` +
        `permet d'enchaîner plusieurs retraits sans retraverser la page.`,
    ).toBe(true);
  });

  test("le retrait est annoncé, avec le nombre restant", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    await page.locator(".ligne").first().locator(".retrait").click();
    await page.waitForTimeout(200);

    const texte = (await page.locator('[role="status"], [aria-live]').textContent())!;
    expect(texte, "l'annonce doit situer l'état après l'action").toMatch(/\d/);
    expect(texte, "elle doit nommer qui a été retiré").toContain("Alondra");
  });

  test("le tri fonctionne, sans préférence aussi", async ({ page }, infos) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await ouvrirLab(page, infos, LAB);

    await page.getByRole("button", { name: /trier/i }).click();
    await page.waitForTimeout(400);

    const ordre = await page.locator(".ligne").evaluateAll((els) =>
      els.map((e) => (e.textContent ?? "").trim()),
    );
    expect(ordre[0]).toContain("Bastien");
    expect(ordre[ordre.length - 1]).toContain("Chloé");
  });
});
