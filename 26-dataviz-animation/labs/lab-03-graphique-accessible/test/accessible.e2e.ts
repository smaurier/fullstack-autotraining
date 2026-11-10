// Oracle du lab 03.
//
// C'est l'oracle le plus proche du cœur du cours. Il vérifie notamment deux choses qu'aucun
// outil automatique ne vérifie : que l'alternative dit quelque chose, mesuré par la présence
// de repères chiffrés, et que les séries restent distinguables sans la couleur, mesuré sur les
// motifs de trait.

import { test, expect } from "@playwright/test";
import { ouvrirLab, arbreAccessibilite, ratioContraste, verdictContraste, violationsAxe } from "../../outils/lab";

const LAB = "lab-03-graphique-accessible";

async function ouvrirLesDetails(page: import("@playwright/test").Page) {
  const details = page.locator("details");
  if ((await details.count()) > 0) {
    await details.first().evaluate((d: HTMLDetailsElement) => {
      d.open = true;
    });
  }
}

test.describe("Un graphique accessible", () => {
  test("1.1 (A) : le graphique est une image nommée dans l'arbre", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const role = await page.locator("#graphe").getAttribute("role");
    expect(role, "sans role=img, un SVG est annoncé de façon inconsistante selon les moteurs").toBe("img");

    const arbre = await arbreAccessibilite(page);
    const image = arbre.find((n) => (n.role === "image" || n.role === "img") && n.nom.length > 0);
    expect(image, "le graphique doit apparaître comme UNE image portant un nom").toBeTruthy();
  });

  test("1.3 (A) : l'alternative dit quelque chose, avec des repères chiffrés", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const description = await page.locator("#graphe desc, #graphe title").allTextContents();
    const texte = description.join(" ");

    expect(texte.length, "il faut un title et une desc").toBeGreaterThan(40);

    const chiffres = texte.match(/\d+/g) ?? [];
    expect(
      chiffres.length,
      `« ${texte.trim().slice(0, 90)} » : une alternative pertinente donne les repères. ` +
        `Décrire la forme (« courbe montante ») n'est pas vérifiable par qui ne voit pas.`,
    ).toBeGreaterThanOrEqual(2);

    expect(
      /graphique en|diagramme en|courbe montante/i.test(texte),
      "l'alternative décrit le contenant ou la forme au lieu de l'information",
    ).toBe(false);
  });

  test("les marques sortent de l'arbre", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    expect(await page.locator("#marques").getAttribute("aria-hidden")).toBe("true");
  });

  test("3.1 (A) : les séries sont distinguables SANS la couleur", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const motifs = await page.locator(".serie").evaluateAll((series) =>
      series.map((s) => getComputedStyle(s).strokeDasharray || "none"),
    );

    expect(motifs.length, "les deux séries doivent être présentes").toBe(2);
    expect(
      new Set(motifs).size,
      `motifs de trait : ${JSON.stringify(motifs)}. Les deux séries ont le même, donc seule la ` +
        `couleur les distingue. C'est le test du niveau de gris du module 06 § 5.1, automatisé.`,
    ).toBe(2);
  });

  test("la légende reprend le motif, sinon elle ne dit pas la même chose", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const legende = await page.locator(".legende li").allTextContents();
    expect(legende.length).toBe(2);

    const decritLeMotif = legende.some((t) => /plein|tiret|pointill|dash/i.test(t));
    const puces = await page.locator(".puce").evaluateAll((els) =>
      els.map((e) => getComputedStyle(e).borderTopStyle),
    );

    expect(
      decritLeMotif || new Set(puces).size === 2,
      `légende : ${JSON.stringify(legende)}. Elle doit distinguer les séries autrement que par ` +
        `la couleur, par le texte ou par le motif de sa puce.`,
    ).toBe(true);
  });

  test("3.3 (AA) : chaque série atteint 3:1 contre le fond", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const couleurs = await page.locator(".serie").evaluateAll((series) =>
      series.map((s) => ({
        classe: s.getAttribute("class") ?? "",
        trait: getComputedStyle(s).stroke,
      })),
    );
    const fond = await page.locator("body").evaluate((el) => {
      let courant: Element | null = el;
      while (courant) {
        const c = getComputedStyle(courant).backgroundColor;
        if (c && !/^rgba\(.*,\s*0\)$/.test(c)) return c;
        courant = courant.parentElement;
      }
      return "rgb(255, 255, 255)";
    });

    for (const serie of couleurs) {
      const ratio = ratioContraste(serie.trait, fond);
      const { conforme, seuil } = verdictContraste(ratio, { nonTextuel: true });
      expect(
        conforme,
        `${serie.classe} : ${serie.trait} sur ${fond} donne ${ratio.toFixed(2)}:1, seuil ${seuil}. ` +
          `Une série est un élément non textuel porteur d'information.`,
      ).toBe(true);
    }
  });

  test("un tableau de données équivalent porte toutes les valeurs", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    await ouvrirLesDetails(page);

    const tableau = page.locator("table");
    await expect(tableau, "c'est le chemin vers l'information pour qui ne voit pas le dessin").toHaveCount(1);

    for (const valeur of ["120", "132", "90", "145", "160", "180", "60", "75", "110", "140", "200", "240"]) {
      await expect(tableau, `la valeur ${valeur} manque dans le tableau`).toContainText(valeur);
    }
  });

  test("le tableau a un titre et des en-têtes avec portée", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    await ouvrirLesDetails(page);

    await expect(page.locator("table caption"), "5.4 (A) : un tableau de données a un titre").toHaveCount(1);

    const portees = await page.locator("table th").evaluateAll((ths) =>
      ths.map((th) => th.getAttribute("scope")),
    );
    expect(
      portees.every((p) => p === "col" || p === "row"),
      `5.6 et 5.7 (A) : chaque en-tête a une portée. Portées trouvées : ${JSON.stringify(portees)}`,
    ).toBe(true);
  });

  test("un lien mène aux données depuis la légende du graphique", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);

    const lien = page.locator("figcaption a, figure a");
    await expect(lien, "le chemin vers les données doit être visible, pas devinable").toHaveCount(1);

    const href = await lien.getAttribute("href");
    expect(href).toMatch(/^#/);
    expect(await page.locator(href!).count(), `la cible ${href} doit exister`).toBe(1);
  });

  test("axe ne trouve aucune violation, ce qui est nécessaire et pas suffisant", async ({ page }, infos) => {
    await ouvrirLab(page, infos, LAB);
    const violations = await violationsAxe(page);
    expect(violations, JSON.stringify(violations, null, 1)).toEqual([]);
  });
});
