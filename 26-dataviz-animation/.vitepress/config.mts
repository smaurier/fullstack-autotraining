import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Dataviz & Animation",
  description:
    "Encoder une donnée sans mentir, choisir entre SVG, Canvas et WebGL, rendre un graphique accessible, et animer sans trahir la préférence de mouvement.",
  lang: "fr-FR",
  srcDir: ".",
  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: "Modules", link: "/modules/00-prerequis-et-protocole" },
      { text: "Labs", link: "/labs/lab-01-echelle-et-axe/README" },
      { text: "Couverture", link: "/couverture-state-of" },
    ],
    sidebar: {
      "/modules/": [
        {
          text: "Fondations",
          items: [
            { text: "00. Prérequis et protocole", link: "/modules/00-prerequis-et-protocole" },
            { text: "01. Encoder une donnée", link: "/modules/01-encoder-une-donnee" },
            { text: "02. SVG, Canvas, WebGL", link: "/modules/02-svg-canvas-webgl" },
            { text: "03. D3 comme socle", link: "/modules/03-d3-comme-socle" },
          ],
        },
        {
          text: "Graphiques en production",
          items: [
            { text: "04. Les wrappers React", link: "/modules/04-wrappers-react" },
            { text: "05. Les suites complètes", link: "/modules/05-suites-completes" },
            { text: "06. Graphiques accessibles", link: "/modules/06-graphiques-accessibles" },
            { text: "07. Performance", link: "/modules/07-performance-dataviz" },
          ],
        },
        {
          text: "Animation",
          items: [
            { text: "08. Principes de l'animation", link: "/modules/08-principes-de-l-animation" },
            { text: "09. GSAP et timelines", link: "/modules/09-gsap-et-timelines" },
            { text: "10. Motion et physique", link: "/modules/10-motion-et-physique" },
            { text: "11. Pipeline designer", link: "/modules/11-pipeline-designer" },
            { text: "12. Animation accessible", link: "/modules/12-animation-accessible" },
          ],
        },
      ],
    },
    outline: { level: [2, 3], label: "Sur cette page" },
    docFooter: { prev: "Précédent", next: "Suivant" },
  },
});
