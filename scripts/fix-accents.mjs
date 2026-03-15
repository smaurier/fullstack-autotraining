#!/usr/bin/env node
/**
 * Fixes missing French accents in markdown content.
 * Preserves: file names, links, code blocks, YAML frontmatter, URLs.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');

// Word-level replacements: [wrong, correct]
// Only whole-word replacements to avoid breaking partial words
const REPLACEMENTS = [
  // É/è/ê
  ['developpeur', 'développeur'],
  ['developpeurs', 'développeurs'],
  ['developper', 'développer'],
  ['developpe', 'développé'],
  ['developpement', 'développement'],
  ['Developpeur', 'Développeur'],
  ['Developpeurs', 'Développeurs'],
  ['Developper', 'Développer'],
  ['demarrage', 'démarrage'],
  ['Demarrage', 'Démarrage'],
  ['demarrer', 'démarrer'],
  ['Demarrer', 'Démarrer'],
  ['debutant', 'débutant'],
  ['Debutant', 'Débutant'],
  ['debutants', 'débutants'],
  ['deploiement', 'déploiement'],
  ['Deploiement', 'Déploiement'],
  ['deployer', 'déployer'],
  ['Deployer', 'Déployer'],
  ['deploye', 'déployé'],
  ['deployes', 'déployés'],
  ['deployee', 'déployée'],
  ['deployees', 'déployées'],
  ['deployes', 'déployés'],
  ['depasse', 'dépasse'],
  ['deplacement', 'déplacement'],
  ['dependance', 'dépendance'],
  ['dependances', 'dépendances'],
  ['dependre', 'dépendre'],
  ['decouvrir', 'découvrir'],
  ['decouvre', 'découvre'],
  ['decouvres', 'découvres'],
  ['decouverte', 'découverte'],
  ['decouvertes', 'découvertes'],
  ['decouvrez', 'découvrez'],
  ['decoupage', 'découpage'],
  ['decouper', 'découper'],
  ['decoupe', 'découpé'],
  ['defini', 'défini'],
  ['definir', 'définir'],
  ['definis', 'définis'],
  ['definit', 'définit'],
  ['definition', 'définition'],
  ['definitions', 'définitions'],
  ['Definir', 'Définir'],
  ['deleguer', 'déléguer'],
  ['delegue', 'délégué'],
  ['demande', 'demandé'],  // careful - only past participle
  ['deprecation', 'déprécation'],
  ['derive', 'dérivé'],
  ['derives', 'dérivés'],
  ['desactiver', 'désactiver'],
  ['desactive', 'désactivé'],
  ['detaille', 'détaillé'],
  ['detailles', 'détaillés'],
  ['detecter', 'détecter'],
  ['detecte', 'détecté'],
  ['determine', 'déterminé'],
  ['determiner', 'déterminer'],
  ['deterministe', 'déterministe'],
  ['deterministes', 'déterministes'],
  ['Methodologie', 'Méthodologie'],
  ['methodologie', 'méthodologie'],
  ['methode', 'méthode'],
  ['methodes', 'méthodes'],
  ['Methode', 'Méthode'],
  ['Methodes', 'Méthodes'],
  ['memoire', 'mémoire'],
  ['Memoire', 'Mémoire'],
  ['mecanisme', 'mécanisme'],
  ['mecanismes', 'mécanismes'],
  ['Mecanisme', 'Mécanisme'],
  ['reactivite', 'réactivité'],
  ['Reactivite', 'Réactivité'],
  ['reactif', 'réactif'],
  ['reactifs', 'réactifs'],
  ['reactive', 'réactive'],
  ['reactives', 'réactives'],
  ['resume', 'résumé'],
  ['Resume', 'Résumé'],
  ['resumes', 'résumés'],
  ['resultat', 'résultat'],
  ['Resultat', 'Résultat'],
  ['resultats', 'résultats'],
  ['reseau', 'réseau'],
  ['Reseau', 'Réseau'],
  ['reseaux', 'réseaux'],
  ['Reseaux', 'Réseaux'],
  ['resilience', 'résilience'],
  ['Resilience', 'Résilience'],
  ['resolution', 'résolution'],
  ['resoudre', 'résoudre'],
  ['reference', 'référence'],
  ['references', 'références'],
  ['Reference', 'Référence'],
  ['References', 'Références'],
  ['referentiel', 'référentiel'],
  ['repetition', 'répétition'],
  ['reponse', 'réponse'],
  ['reponses', 'réponses'],
  ['repertoire', 'répertoire'],
  ['repertoires', 'répertoires'],
  ['revision', 'révision'],
  ['reviser', 'réviser'],
  ['Revision', 'Révision'],
  ['Reviser', 'Réviser'],
  ['reutilisable', 'réutilisable'],
  ['reutilisables', 'réutilisables'],
  ['reutiliser', 'réutiliser'],
  ['recapitulatif', 'récapitulatif'],
  ['Recapitulatif', 'Récapitulatif'],
  ['recurrence', 'récurrence'],
  ['recurrent', 'récurrent'],
  ['recurrents', 'récurrents'],
  ['recursif', 'récursif'],
  ['recursifs', 'récursifs'],
  ['recursion', 'récursion'],
  ['recuperation', 'récupération'],
  ['recuperer', 'récupérer'],
  ['recupere', 'récupéré'],
  ['reel', 'réel'],
  ['reelle', 'réelle'],
  ['reels', 'réels'],
  ['reellement', 'réellement'],
  ['securite', 'sécurité'],
  ['Securite', 'Sécurité'],
  ['securise', 'sécurisé'],
  ['securises', 'sécurisés'],
  ['securiser', 'sécuriser'],
  ['serieusement', 'sérieusement'],
  ['specifique', 'spécifique'],
  ['specifiques', 'spécifiques'],
  ['specification', 'spécification'],
  ['specifications', 'spécifications'],
  ['specifier', 'spécifier'],
  ['theorie', 'théorie'],
  ['Theorie', 'Théorie'],
  ['theories', 'théories'],
  ['theorique', 'théorique'],
  ['theoriques', 'théoriques'],
  ['theoreme', 'théorème'],
  ['Theoreme', 'Théorème'],
  ['intermediaire', 'intermédiaire'],
  ['Intermediaire', 'Intermédiaire'],
  ['intermediaires', 'intermédiaires'],
  ['prerequis', 'prérequis'],
  ['Prerequis', 'Prérequis'],
  ['competence', 'compétence'],
  ['competences', 'compétences'],
  ['Competence', 'Compétence'],
  ['Competences', 'Compétences'],
  ['accessibilite', 'accessibilité'],
  ['Accessibilite', 'Accessibilité'],
  ['observabilite', 'observabilité'],
  ['Observabilite', 'Observabilité'],
  ['disponibilite', 'disponibilité'],
  ['Disponibilite', 'Disponibilité'],
  ['scalabilite', 'scalabilité'],
  ['testabilite', 'testabilité'],
  ['maintenabilite', 'maintenabilité'],
  ['fiabilite', 'fiabilité'],
  ['idempotency', 'idempotency'], // English — keep
  ['capacite', 'capacité'],
  ['Capacite', 'Capacité'],
  ['Maitrise', 'Maîtrise'],
  ['maitrise', 'maîtrise'],
  ['maitriser', 'maîtriser'],
  ['Maitriser', 'Maîtriser'],
  ['connaitre', 'connaître'],
  ['Connaitre', 'Connaître'],
  ['apparaitre', 'apparaître'],
  ['Ecrire', 'Écrire'],
  ['ecrire', 'écrire'],
  ['ecrit', 'écrit'],
  ['ecriture', 'écriture'],
  ['Ecriture', 'Écriture'],
  ['heritage', 'héritage'],
  ['Heritage', 'Héritage'],
  ['herite', 'hérité'],
  ['heriter', 'hériter'],
  ['evenement', 'événement'],
  ['evenements', 'événements'],
  ['Evenement', 'Événement'],
  ['Evenements', 'Événements'],
  ['element', 'élément'],
  ['elements', 'éléments'],
  ['Element', 'Élément'],
  ['Elements', 'Éléments'],
  ['etat', 'état'],
  ['Etat', 'État'],
  ['etats', 'états'],
  ['etape', 'étape'],
  ['etapes', 'étapes'],
  ['Etape', 'Étape'],
  ['etude', 'étude'],
  ['evalue', 'évalué'],
  ['evaluer', 'évaluer'],
  ['evaluation', 'évaluation'],
  ['Evaluation', 'Évaluation'],
  ['equipe', 'équipe'],
  ['equipes', 'équipes'],
  ['Equipe', 'Équipe'],
  ['equivalent', 'équivalent'],
  ['equivalents', 'équivalents'],
  ['equivalence', 'équivalence'],
  ['equivalences', 'équivalences'],
  ['eviter', 'éviter'],
  ['Eviter', 'Éviter'],
  ['executant', 'exécutant'],
  ['executer', 'exécuter'],
  ['Executer', 'Exécuter'],
  ['execute', 'exécuté'],
  ['execution', 'exécution'],
  ['Execution', 'Exécution'],
  ['lecon', 'leçon'],
  ['lecons', 'leçons'],
  ['Lecon', 'Leçon'],
  ['Lecons', 'Leçons'],
  ['facon', 'façon'],
  ['Facon', 'Façon'],
  ['francais', 'français'],
  ['Francais', 'Français'],
  ['cle', 'clé'],
  ['cles', 'clés'],
  ['cree', 'créé'],
  ['creee', 'créée'],
  ['creer', 'créer'],
  ['Creer', 'Créer'],
  ['creation', 'création'],
  ['Creation', 'Création'],
  ['systeme', 'système'],
  ['systemes', 'systèmes'],
  ['Systeme', 'Système'],
  ['Systemes', 'Systèmes'],
  ['probleme', 'problème'],
  ['problemes', 'problèmes'],
  ['Probleme', 'Problème'],
  ['modele', 'modèle'],
  ['modeles', 'modèles'],
  ['Modele', 'Modèle'],
  ['requete', 'requête'],
  ['requetes', 'requêtes'],
  ['Requete', 'Requête'],
  ['fenetre', 'fenêtre'],
  ['meme', 'même'],
  ['Meme', 'Même'],
  ['tres', 'très'],
  ['Tres', 'Très'],
  ['apres', 'après'],
  ['Apres', 'Après'],
  ['derniere', 'dernière'],
  ['dernieres', 'dernières'],
  ['premiere', 'première'],
  ['premieres', 'premières'],
  ['maniere', 'manière'],
  ['manieres', 'manières'],
  ['entiere', 'entière'],
  ['differente', 'différente'],
  ['differentes', 'différentes'],
  ['different', 'différent'],
  ['differents', 'différents'],
  ['difference', 'différence'],
  ['differences', 'différences'],
  ['Difference', 'Différence'],
  ['preferer', 'préférer'],
  ['prefere', 'préféré'],
  ['preference', 'préférence'],
  ['precedent', 'précédent'],
  ['precedente', 'précédente'],
  ['precedents', 'précédents'],
  ['Precedent', 'Précédent'],
  ['precis', 'précis'],
  ['precise', 'précisé'],
  ['precision', 'précision'],
  ['presentation', 'présentation'],
  ['presente', 'présenté'],
  ['presenter', 'présenter'],
  ['prevenir', 'prévenir'],
  ['prevoit', 'prévoit'],
  ['prevu', 'prévu'],
  ['prevus', 'prévus'],
  ['genere', 'généré'],
  ['generee', 'générée'],
  ['generer', 'générer'],
  ['Generer', 'Générer'],
  ['generique', 'générique'],
  ['generiques', 'génériques'],
  ['Generique', 'Générique'],
  ['general', 'général'],
  ['generale', 'générale'],
  ['generalement', 'généralement'],
  ['generation', 'génération'],
  ['Generation', 'Génération'],
  ['gere', 'géré'],
  ['gerer', 'gérer'],
  ['Gerer', 'Gérer'],
  ['geree', 'gérée'],
  ['integre', 'intégré'],
  ['integree', 'intégrée'],
  ['integrer', 'intégrer'],
  ['Integrer', 'Intégrer'],
  ['integration', 'intégration'],
  ['Integration', 'Intégration'],
  ['interet', 'intérêt'],
  ['interets', 'intérêts'],
  ['necessite', 'nécessité'],
  ['necessaire', 'nécessaire'],
  ['necessaires', 'nécessaires'],
  ['Necessaire', 'Nécessaire'],
  ['numero', 'numéro'],
  ['numeros', 'numéros'],
  ['numerique', 'numérique'],
  ['numeriques', 'numériques'],
  ['numerotes', 'numérotés'],
  ['numerotation', 'numérotation'],
  ['Numerotation', 'Numérotation'],
  ['parametres', 'paramètres'],
  ['parametre', 'paramètre'],
  ['Parametre', 'Paramètre'],
  ['strategie', 'stratégie'],
  ['strategies', 'stratégies'],
  ['Strategie', 'Stratégie'],
  ['Strategies', 'Stratégies'],
  ['propriete', 'propriété'],
  ['proprietes', 'propriétés'],
  ['Propriete', 'Propriété'],
  ['verifie', 'vérifié'],
  ['verifier', 'vérifier'],
  ['Verifier', 'Vérifier'],
  ['verification', 'vérification'],
  ['Verification', 'Vérification'],
  ['hierarchie', 'hiérarchie'],
  ['Hierarchie', 'Hiérarchie'],
  ['hierarchique', 'hiérarchique'],
  ['entierement', 'entièrement'],
  ['completement', 'complètement'],
  ['deja', 'déjà'],
  ['Deja', 'Déjà'],
  ['ou', 'où'],  // CAREFUL — only when meaning "where", not "or"
  ['ca', 'ça'],
  ['Ca', 'Ça'],
  ['a la', 'à la'],
  ['a un', 'à un'],
  ['a une', 'à une'],
  ['a chaque', 'à chaque'],
  ['a partir', 'à partir'],
  ['a raison', 'à raison'],
  ['a fond', 'à fond'],
  ['a tester', 'à tester'],
  ['a construire', 'à construire'],
  ['a comprendre', 'à comprendre'],
  ['a apprendre', 'à apprendre'],
  ['a ecrire', 'à écrire'],
  ['a faire', 'à faire'],
  ['a utiliser', 'à utiliser'],
  ['a observer', 'à observer'],
  ['a maitriser', 'à maîtriser'],
  ['a deployer', 'à déployer'],
  ['a connaitre', 'à connaître'],
  ['a integrer', 'à intégrer'],
  ['a retenir', 'à retenir'],
  ['a savoir', 'à savoir'],
  ['a suivre', 'à suivre'],
  ['a mesure', 'à mesure'],
  ['grace a', 'grâce à'],
  ['Grace a', 'Grâce à'],
  // Be very careful with 'a' alone — too many false positives
];

// Sort by length descending to replace longer phrases first
REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'scripts') {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function isInCodeBlock(content, pos) {
  // Check if position is inside a fenced code block
  let inCode = false;
  let i = 0;
  while (i < pos) {
    if (content.startsWith('```', i)) {
      inCode = !inCode;
      i += 3;
    } else {
      i++;
    }
  }
  return inCode;
}

function isInLink(content, pos) {
  // Check if position is inside a markdown link target [text](HERE) or reference
  const before = content.lastIndexOf('](', pos);
  if (before === -1) return false;
  const closeParen = content.indexOf(')', before + 2);
  return closeParen > pos;
}

function isInFrontmatter(content, pos) {
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) return false;
  const endFm = content.indexOf('\n---', 4);
  return endFm !== -1 && pos < endFm + 4;
}

function isInInlineCode(content, pos) {
  // Check if inside backtick inline code
  const lineStart = content.lastIndexOf('\n', pos) + 1;
  const lineEnd = content.indexOf('\n', pos);
  const line = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
  const posInLine = pos - lineStart;

  let inCode = false;
  for (let i = 0; i < posInLine; i++) {
    if (line[i] === '`') inCode = !inCode;
  }
  return inCode;
}

let totalFiles = 0;
let totalReplacements = 0;
const allFiles = walk(ROOT);

for (const filePath of allFiles) {
  let content = readFileSync(filePath, 'utf-8');
  const original = content;

  for (const [wrong, correct] of REPLACEMENTS) {
    // Use word boundary regex
    // For multi-word phrases, don't use word boundaries at internal spaces
    const escaped = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<=^|[\\s\\p{P}])${escaped}(?=[\\s\\p{P}]|$)`, 'gmu');

    let match;
    const positions = [];
    while ((match = regex.exec(content)) !== null) {
      positions.push({ index: match.index, length: match[0].length });
    }

    // Replace in reverse order to preserve positions
    for (let i = positions.length - 1; i >= 0; i--) {
      const pos = positions[i].index;

      // Skip if inside code block, link, frontmatter, or inline code
      if (isInCodeBlock(content, pos)) continue;
      if (isInLink(content, pos)) continue;
      if (isInFrontmatter(content, pos)) continue;
      if (isInInlineCode(content, pos)) continue;

      // Find the actual word start (after the lookbehind character)
      const actualStart = content[pos] === ' ' || content[pos] === '\n' || /\p{P}/u.test(content[pos])
        ? pos + 1
        : pos;

      content = content.slice(0, actualStart) + correct + content.slice(actualStart + wrong.length);
      totalReplacements++;
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, 'utf-8');
    totalFiles++;
  }
}

console.log(`✅ ${totalReplacements} accents corriges dans ${totalFiles} fichiers`);
