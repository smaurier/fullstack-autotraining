# Refonte 18-ia — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `18-ia/modules/NN-slug.md` + `18-ia/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `18-ia/modules/NN-*.md` (21 modules, format `# Module` riche → AU TEMPLATE).
> **Cours IA/LLM — application-first (utiliser) puis internals (comprendre) puis RAG/prod.**
> Refonte surtout de FORME (le fond legacy est bon) : frontmatter + 7 sections + seeds + labs README-only.

## Contrat agent (invariants gate)

1. **Vérif API/faits via WebFetch** (Context7 MORT). Sources officielles :
   - **API Claude → docs.anthropic.com** (Messages API, streaming, tool use, prompt caching, models, pricing). Modèle par défaut à citer : **Claude Opus 4.8** (`claude-opus-4-8`), famille 4.x. NE PAS inventer d'IDs de modèles ni de prix — WebFetch ou `<!-- FLAG-DOC -->`.
   - **MCP → modelcontextprotocol.io** (spec, SDK TS) · OpenAI → platform.openai.com/docs
   - Ollama → ollama.com/docs · embeddings/RAG → docs des libs (transformers.js, pgvector, LangChain/LlamaIndex si cités)
   - Transformer/attention/maths → papers (Attention Is All You Need), sources pédago reconnues
   Si URL inconnue → WebSearch puis WebFetch. Si échec/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (IDs de modèles, prix, tailles de contexte, noms d'API).
2. **Frontmatter** clés exemplar : `titre, cours: 18-ia, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre** : application-first (prompting→API→MCP→agents) puis internals (maths→NN→transformer→fine-tuning) puis local/embeddings/RAG puis éval/sécu/prod. Chaque module ne suppose que les précédents.
5. **⚠️ Module 17-securite-ethique = SENSIBLE** (prompt injection, jailbreak, PII, EU AI Act/RGPD) → contenu **DÉFENSIF** uniquement (défenses, guardrails, détection ; PAS de payloads offensifs exploitables), `<!-- FLAG-REVIEW: sécu/légal IA — valider par Sylvain -->` sur module ET lab. Le cadre réglementaire = « principes, pas conseil juridique », renvoi expert. Vérifier EU AI Act via source officielle.
6. **Lab = README-only** : exercice concret (écrire un prompt, appeler l'API Claude, coder un MCP server, un RAG, un guardrail) avec vrai outil (SDK réel, docker-compose si besoin) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé. Les clés API = placeholder `sk-ant-<CLE-EXEMPLE-NE-JAMAIS-COMMITTER>` (le `<` casse le scan) ; JAMAIS de vraie clé.
7. **Fil-rouge TribuZen** : IA au service de TribuZen (assistant famille, RAG sur les activités, agent de suggestion de sorties).
8. `{{ }}` en prose → échapper (SSR). Prompts avec accolades → blocs code.

## Colonne vertébrale (21 modules — quasi 1:1 legacy, reformatés)

| NN | Module (slug) | Source legacy | next |
|----|--------|---------------|------|
| 00 | prerequis-et-paysage-ia | 00 | 01 |
| 01 | prompting-fondamental | 01 | 02 |
| 02 | prompting-avance | 02 | 03 |
| 03 | assistants-code | 03 | 04 |
| 04 | api-claude | 04 (focus Claude/Anthropic, OpenAI en comparaison) | 05 |
| 05 | mcp-model-context-protocol | 05 | 06 |
| 06 | agents-orchestration | 06 | 07 |
| 07 | maths-essentielles | 07 | 08 |
| 08 | neural-network-from-scratch | 08 | 09 |
| 09 | transformer-et-attention | 09 | 10 |
| 10 | entrainement-et-fine-tuning | 10 | 11 |
| 11 | tokenization-et-embeddings | 12 | 12 |
| 12 | llms-locaux-ollama | 11 | 13 |
| 13 | rag-fondamental | 13 | 14 |
| 14 | rag-avance | 14 | 15 |
| 15 | chatbot-rag-projet | 15 | 16 |
| 16 | evaluation-et-observabilite-llm | 16 | 17 |
| 17 | securite-et-ethique ⚠️SENSIBLE | 17 | 18 |
| 18 | production-et-couts | 18 | 19 |
| 19 | agentic-frameworks | 20 | 20 |
| 20 | projet-final | 19 | (fin) |

21 modules (00-20) + 21 labs. Dernier module (20) `next` = sentinel `fin-parcours-18-ia`.
Réordonné vs legacy : tokenization/embeddings (legacy 12) remonté avant llms-locaux (legacy 11) car RAG en dépend ; agentic-frameworks (legacy 20) placé en 19 avant projet-final (legacy 19→20). Renuméroter proprement 00-20 ; supprimer orphelins legacy après write. Module 17 → FLAG-REVIEW.
