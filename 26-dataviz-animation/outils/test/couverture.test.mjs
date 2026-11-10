// Oracle de l'outil de couverture. `node --test outils/` depuis 25-html-css.
// RED tant que outils/couverture.mjs ne satisfait pas ces contrats.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  parserOutline,
  SECTIONS_META,
  QUESTIONS_RETENUES,
  construireCouverture,
  rendreMarkdown,
  inverserMapping,
} from "../couverture.mjs";

const OUTLINE_EXEMPLE = `
######################################################
#########              LAYOUT                #########
######################################################

# Un commentaire de section, à ignorer.

- id: other_tools
  template: feature
  questions:
    - id: graphics_animation
      template: multiple
      options:
        - id: d3
        - id: three_js
          yearAdded: 2026
        # - id: outil_retire
        - id: na
    - id: other_tools_pain_points
      template: text

- id: component_libraries
  questions:
    - id: data_visualization_libraries
      template: multiple
      options:
        - id: recharts
        - id: visx
          yearAdded: 2026
        - id: na

- id: user_info
  questions:
    - id: age
`;

test("parserOutline rend les sections dans l'ordre du fichier", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  assert.deepEqual(
    sections.map((s) => s.id),
    ["other_tools", "component_libraries", "user_info"],
  );
});

test("parserOutline rattache les questions à leur section", () => {
  const [outils] = parserOutline(OUTLINE_EXEMPLE);
  assert.deepEqual(
    outils.questions.map((q) => q.id),
    ["graphics_animation", "other_tools_pain_points"],
  );
});

test("parserOutline ignore les lignes commentées", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const options = sections.flatMap((s) => s.questions.flatMap((q) => q.options.map((o) => o.id)));
  assert.ok(!options.includes("outil_retire"), "une option commentée ne doit pas être comptée");
});

test("parserOutline capte yearAdded sur une question et sur une option", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const graphiques = sections[0].questions.find((q) => q.id === "graphics_animation");
  assert.equal(graphiques.options.find((o) => o.id === "three_js").yearAdded, 2026);

  const dataviz = sections[1].questions.find((q) => q.id === "data_visualization_libraries");
  assert.equal(dataviz.options.find((o) => o.id === "visx").yearAdded, 2026);
});

test("parserOutline écarte les options de remplissage na et other", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const dataviz = sections[1].questions.find((q) => q.id === "data_visualization_libraries");
  assert.deepEqual(
    dataviz.options.map((o) => o.id),
    ["recharts", "visx"],
  );
});

test("SECTIONS_META déclare les sections hors périmètre de ce cours", () => {
  assert.ok(SECTIONS_META.includes("user_info"));
  assert.ok(SECTIONS_META.includes("resources"));
  assert.ok(SECTIONS_META.includes("features"), "les features du langage sont au cours 10");
  assert.ok(SECTIONS_META.includes("hooks"), "les hooks React sont au cours 05");
});

test("QUESTIONS_RETENUES borne la couverture aux graphiques et à l'animation", () => {
  assert.deepEqual(QUESTIONS_RETENUES.sort(), [
    "animation_libraries",
    "data_visualization_libraries",
    "graphics_animation",
  ]);
});

test("une question hors liste blanche est ignorée, même dans une section retenue", () => {
  const sections = parserOutline(`
- id: other_tools
  questions:
    - id: utilities
      options:
        - id: eslint
`);
  const { lignes } = construireCouverture({ js2026: sections }, {});
  assert.deepEqual(lignes, [], "utilities n'est pas dans QUESTIONS_RETENUES");
});

test("construireCouverture signale un item technique sans module", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const { lignes, orphelins } = construireCouverture(
    { js2026: sections },
    { d3: "03", three_js: "07", recharts: "04", visx: "04" },
  );

  assert.deepEqual(orphelins, [], "tout est mappé dans ce cas");
  assert.equal(lignes.length, 4, "les pain_points et user_info ne comptent pas");
});

test("construireCouverture liste en orphelin ce que le mapping oublie", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const { orphelins } = construireCouverture({ js2026: sections }, { d3: "03" });
  assert.deepEqual(orphelins.sort(), ["recharts", "three_js", "visx"]);
});

test("construireCouverture marque les nouveautés de l'année demandée", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const { lignes } = construireCouverture(
    { js2026: sections },
    { d3: "03", three_js: "07", recharts: "04", visx: "04" },
    { anneeNouveaute: 2026 },
  );
  const nouveaux = lignes.filter((l) => l.nouveau).map((l) => l.item);
  assert.deepEqual(nouveaux.sort(), ["three_js", "visx"]);
});

test("rendreMarkdown produit un tableau et compte les items", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const couverture = construireCouverture(
    { js2026: sections },
    { d3: "03", three_js: "07", recharts: "04", visx: "04" },
    { anneeNouveaute: 2026 },
  );
  const md = rendreMarkdown(couverture, { anneeNouveaute: 2026 });

  assert.match(md, /\| `d3` \| other_tools \| 03 \|/);
  assert.match(md, /4 items techniques/);
  assert.match(md, /three_js/);
});

test("rendreMarkdown annonce les orphelins au lieu de les taire", () => {
  const sections = parserOutline(OUTLINE_EXEMPLE);
  const couverture = construireCouverture({ js2026: sections }, { d3: "03" });
  const md = rendreMarkdown(couverture, { anneeNouveaute: 2026 });
  assert.match(md, /3 items sans module/);
});

test("parserOutline écarte les échelles numériques, qui sont des réponses et non des sujets", () => {
  const sections = parserOutline(`
- id: other_tools
  questions:
    - id: graphics_animation
      options:
        - id: 0
        - id: 1
        - id: d3
`);
  const question = sections[0].questions.find((q) => q.id === "graphics_animation");
  assert.deepEqual(
    question.options.map((o) => o.id),
    ["d3"],
    "une graduation d'échelle ne porte aucun sujet, contrairement à une librairie",
  );

  const { lignes } = construireCouverture({ js2026: sections }, { d3: "03" });
  assert.deepEqual(lignes.map((l) => l.item), ["d3"]);
});

test("inverserMapping rend un index item -> module depuis un plan lisible par module", async () => {
  const { inverserMapping } = await import("../couverture.mjs");
  const plan = { "06": ["subgrid", "css_grid_lanes"], 19: ["tailwind_css"] };
  assert.deepEqual(inverserMapping(plan), {
    subgrid: "06",
    css_grid_lanes: "06",
    tailwind_css: "19",
  });
});

test("inverserMapping refuse qu'un item soit revendiqué par deux modules", async () => {
  const { inverserMapping } = await import("../couverture.mjs");
  assert.throws(
    () => inverserMapping({ "06": ["subgrid"], "07": ["subgrid"] }),
    /subgrid.*06.*07/s,
    "un item a un seul module de référence, sinon la duplication revient par la fenêtre",
  );
});
