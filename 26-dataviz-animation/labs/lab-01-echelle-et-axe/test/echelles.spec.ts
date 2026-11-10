// Oracle du lab 01.
//
// Des fonctions pures, donc un oracle qui vérifie des PROPRIÉTÉS mathématiques plutôt qu'un
// rendu. C'est ce qui permet de prouver qu'un encodage est fidèle : une valeur deux fois plus
// grande doit donner une barre deux fois plus haute, et c'est une assertion, pas une
// impression.

import { describe, test, expect } from "vitest";
import { echelleLineaire, echelleRacine, graduationsRondes, barresDepuis } from "@lab/echelles";

const DONNEES = [
  { etiquette: "janvier", valeur: 120 },
  { etiquette: "février", valeur: 145 },
  { etiquette: "mars", valeur: 90 },
  { etiquette: "avril", valeur: 240 },
];

describe("echelleLineaire", () => {
  test("mappe les bornes du domaine sur les bornes de l'étendue", () => {
    const e = echelleLineaire({ domaine: [0, 100], etendue: [0, 500] });
    expect(e(0)).toBe(0);
    expect(e(100)).toBe(500);
    expect(e(50)).toBe(250);
  });

  test("gère une étendue INVERSÉE, qui est le cas normal en SVG", () => {
    // L'origine SVG est en haut a gauche : une grande valeur doit donner un petit y.
    const y = echelleLineaire({ domaine: [0, 100], etendue: [300, 0] });

    expect(y(0), "la valeur 0 est en bas").toBe(300);
    expect(y(100), "la valeur maximale est en haut").toBe(0);
    expect(y(100)).toBeLessThan(y(50));
  });

  test("est linéaire : un rapport de valeurs se retrouve dans les positions", () => {
    const y = echelleLineaire({ domaine: [0, 200], etendue: [400, 0] });

    const hauteurPour = (v: number) => 400 - y(v);
    expect(
      hauteurPour(100) / hauteurPour(50),
      "une valeur deux fois plus grande doit donner une longueur deux fois plus grande",
    ).toBeCloseTo(2, 6);
  });

  test("ne rend pas NaN sur un domaine plat", () => {
    const e = echelleLineaire({ domaine: [42, 42], etendue: [0, 100] });
    expect(Number.isNaN(e(42)), "un domaine plat arrive quand toutes les valeurs sont égales").toBe(
      false,
    );
  });
});

describe("echelleRacine", () => {
  test("encode l'AIRE : une valeur 4 fois plus grande donne un rayon 2 fois plus grand", () => {
    const r = echelleRacine({ domaine: [0, 400], etendue: [0, 40] });

    expect(
      r(400) / r(100),
      "c'est le piège du module 01 § 3.2 : un rayon linéaire élèverait l'écart au carré",
    ).toBeCloseTo(2, 6);
  });

  test("n'est PAS linéaire, et c'est le point", () => {
    const r = echelleRacine({ domaine: [0, 100], etendue: [0, 10] });
    expect(r(50)).toBeGreaterThan(5);
  });

  test("mappe les bornes", () => {
    const r = echelleRacine({ domaine: [0, 100], etendue: [0, 10] });
    expect(r(0)).toBeCloseTo(0, 6);
    expect(r(100)).toBeCloseTo(10, 6);
  });
});

describe("graduationsRondes", () => {
  test("rend des valeurs lisibles, pas des interpolations du domaine", () => {
    const g = graduationsRondes([0, 347], 5);

    expect(g.length, "environ cinq graduations").toBeGreaterThanOrEqual(3);
    expect(g.length).toBeLessThanOrEqual(9);

    for (const v of g) {
      const reste = v % 10;
      expect(
        Math.min(reste, 10 - reste) < 1e-6 || Number.isInteger(v / 5),
        `${v} n'est pas une graduation ronde : un lecteur devrait interpoler`,
      ).toBe(true);
    }
  });

  test("couvre le domaine sans le dépasser", () => {
    const g = graduationsRondes([0, 347], 5);
    expect(Math.min(...g)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...g)).toBeLessThanOrEqual(347);
  });

  test("survit à un domaine plat", () => {
    expect(() => graduationsRondes([5, 5], 5)).not.toThrow();
  });
});

describe("barresDepuis", () => {
  test("l'axe part de ZÉRO : la longueur encode la valeur", () => {
    const barres = barresDepuis(DONNEES, { largeur: 400, hauteur: 300 });

    const parEtiquette = Object.fromEntries(barres.map((b) => [b.etiquette, b]));
    const rapportValeurs = 240 / 120;
    const rapportHauteurs = parEtiquette.avril.hauteur / parEtiquette.janvier.hauteur;

    expect(
      rapportHauteurs,
      `avril vaut deux fois janvier, donc sa barre doit être deux fois plus haute. ` +
        `Rapport obtenu : ${rapportHauteurs.toFixed(3)}. Un axe tronqué casse cette propriété, ` +
        `et c'est exactement le mensonge du module 01 § 3.1.`,
    ).toBeCloseTo(rapportValeurs, 6);
  });

  test("la plus grande barre occupe toute la hauteur", () => {
    const barres = barresDepuis(DONNEES, { largeur: 400, hauteur: 300 });
    const plusGrande = barres.find((b) => b.valeur === 240)!;

    expect(plusGrande.hauteur).toBeCloseTo(300, 6);
    expect(plusGrande.y).toBeCloseTo(0, 6);
  });

  test("les barres restent dans le cadre", () => {
    const barres = barresDepuis(DONNEES, { largeur: 400, hauteur: 300 });

    for (const b of barres) {
      expect(b.x, `${b.etiquette} sort à gauche`).toBeGreaterThanOrEqual(0);
      expect(b.x + b.largeur, `${b.etiquette} sort à droite`).toBeLessThanOrEqual(400.001);
      expect(b.y, `${b.etiquette} sort en haut`).toBeGreaterThanOrEqual(-0.001);
      expect(b.y + b.hauteur, `${b.etiquette} sort en bas`).toBeLessThanOrEqual(300.001);
    }
  });

  test("le domaine est CALCULÉ : ajouter une valeur plus grande rééchelonne tout", () => {
    const avant = barresDepuis(DONNEES, { largeur: 400, hauteur: 300 });
    const apres = barresDepuis([...DONNEES, { etiquette: "mai", valeur: 480 }], {
      largeur: 400,
      hauteur: 300,
    });

    const avrilAvant = avant.find((b) => b.valeur === 240)!;
    const avrilApres = apres.find((b) => b.valeur === 240)!;

    expect(
      avrilApres.hauteur,
      "avec un domaine écrit en dur, la barre d'avril ne changerait pas, et la nouvelle sortirait du cadre",
    ).toBeLessThan(avrilAvant.hauteur);
    expect(avrilApres.hauteur).toBeCloseTo(300 * (240 / 480), 6);
  });

  test("les barres ne se chevauchent pas, et l'ordre est conservé", () => {
    const barres = barresDepuis(DONNEES, { largeur: 400, hauteur: 300 });

    expect(barres.map((b) => b.etiquette)).toEqual(DONNEES.map((d) => d.etiquette));
    for (let i = 1; i < barres.length; i++) {
      expect(barres[i].x, "les barres se chevauchent").toBeGreaterThanOrEqual(
        barres[i - 1].x + barres[i - 1].largeur - 0.001,
      );
    }
  });

  test("une liste vide ne casse rien", () => {
    expect(barresDepuis([], { largeur: 400, hauteur: 300 })).toEqual([]);
  });
});
