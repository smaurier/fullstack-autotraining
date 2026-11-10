// SOLUTION DE REFERENCE. A n'ouvrir qu'apres ton GREEN.

export type Point = { etiquette: string; valeur: number };

export type Barre = {
  etiquette: string;
  valeur: number;
  x: number;
  y: number;
  largeur: number;
  hauteur: number;
};

export function echelleLineaire({
  domaine,
  etendue,
}: {
  domaine: [number, number];
  etendue: [number, number];
}) {
  const [d0, d1] = domaine;
  const [e0, e1] = etendue;
  const amplitude = d1 - d0;

  // Un domaine plat ne doit pas rendre NaN : on renvoie le milieu de l'etendue.
  if (amplitude === 0) return () => (e0 + e1) / 2;

  // La formule gere les deux sens d'etendue, donc l'inversion de l'axe vertical.
  return (valeur: number) => e0 + ((valeur - d0) / amplitude) * (e1 - e0);
}

export function echelleRacine({
  domaine,
  etendue,
}: {
  domaine: [number, number];
  etendue: [number, number];
}) {
  const [d0, d1] = domaine;
  const [e0, e1] = etendue;

  // On encode l'AIRE : le rayon suit la racine carree de la valeur.
  const r0 = Math.sqrt(Math.max(0, d0));
  const r1 = Math.sqrt(Math.max(0, d1));
  const amplitude = r1 - r0;

  if (amplitude === 0) return () => (e0 + e1) / 2;

  return (valeur: number) =>
    e0 + ((Math.sqrt(Math.max(0, valeur)) - r0) / amplitude) * (e1 - e0);
}

export function graduationsRondes(domaine: [number, number], nombreVise = 5): number[] {
  const [d0, d1] = domaine;
  if (d1 === d0) return [d0];

  const brut = (d1 - d0) / Math.max(1, nombreVise);
  const magnitude = 10 ** Math.floor(Math.log10(brut));

  // On choisit le pas « rond » le plus proche parmi 1, 2, 5 et 10 fois la magnitude.
  const pas = [1, 2, 5, 10].map((m) => m * magnitude).find((p) => p >= brut) ?? 10 * magnitude;

  const debut = Math.ceil(d0 / pas) * pas;
  const graduations: number[] = [];
  // Le petit epsilon evite qu'une borne exacte soit perdue par l'arithmetique flottante.
  for (let v = debut; v <= d1 + pas * 1e-9; v += pas) {
    graduations.push(Number((Math.round(v / pas) * pas).toPrecision(12)));
  }
  return graduations;
}

export function barresDepuis(
  donnees: Point[],
  { largeur, hauteur, espacement = 0.2 }: { largeur: number; hauteur: number; espacement?: number },
): Barre[] {
  if (donnees.length === 0) return [];

  const maxi = Math.max(...donnees.map((d) => d.valeur));

  // L'axe part de ZERO : pour des barres, l'encodage est la longueur.
  const y = echelleLineaire({ domaine: [0, maxi], etendue: [hauteur, 0] });

  const pas = largeur / donnees.length;
  const largeurBarre = pas * (1 - espacement);

  return donnees.map((d, i) => ({
    etiquette: d.etiquette,
    valeur: d.valeur,
    x: i * pas + (pas - largeurBarre) / 2,
    y: y(d.valeur),
    largeur: largeurBarre,
    hauteur: hauteur - y(d.valeur),
  }));
}
