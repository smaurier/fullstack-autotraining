# QA — 18-ia (refonte v1)

> Cours réécrit en autonomie (rollout). 21 modules (00-20) + 21 labs.
> Reformatage au template des 21 modules legacy v0 (fond riche conservé). Orphelins purgés.
> **Cours IA/LLM — application-first puis internals puis RAG/prod.**
> **Context7 mort → vérif par skill claude-api (source Anthropic) + WebFetch** (docs.anthropic.com/
> platform.claude.com, modelcontextprotocol.io, ollama api, github pgvector, arxiv 1706.03762,
> OWASP LLM Top 10 2025, EU AI Act). GATE PASS (build OK). QA consolidée (1 agent, surface risque).

## Verdict : SHIP (0 P0)

Faits API critiques tous **confirmés exacts** (skill claude-api = source d'autorité citée par les modules) :
IDs modèles (`claude-opus-4-8` défaut, `claude-sonnet-4-6`, `claude-haiku-4-5`), prix ($5/$25, $3/$15,
$1/$5), contextes (Opus 1M/128K…), `thinking:{type:'adaptive'}` + `output_config.effort`,
`budget_tokens`/`temperature`→400 sur 4.x, prompt caching (préfixe min 4096 Opus/2048 Sonnet),
Message Batches (−50%, 100k req), Ollama (`/api/generate`,`/api/chat`, port 11434), pgvector (`<=>`, HNSW).
**Aucune invention d'ID/prix/API. Aucun secret/clé réelle** (placeholder `sk-ant-<CLE-...>` partout).

## Module 17-securite-et-ethique (SENSIBLE) — conforme
- ✅ FLAG-REVIEW en tête module ET lab.
- ✅ Contenu DÉFENSIF only (payloads offensifs legacy neutralisés → taxonomie abstraite).
- ✅ Cadre légal = « principes, pas conseil juridique » + renvoi juriste/DPO (×3).
- ✅ OWASP LLM Top 10 2025 (LLM01/02/05/06/07) noms exacts ; EU AI Act (4 niveaux, Art. 5/6/Annexe III).
- **→ FLAG-REVIEW HUMAIN : Sylvain doit valider 17 (module + lab) avant diffusion publique.**

## P2 non bloquants (laissés en l'état — cap budget)
- labs 14/15 : endpoint Ollama legacy `/api/embeddings` (retour `.embedding`) vs `/api/embed` (`.embeddings[0]`) enseigné au module 13. Les deux marchent ; à harmoniser plus tard.
- creds Postgres divergents entre labs (lab-13 `tribuzen`/`tribuzen` vs lab-15/20 `rag`/`rag`) — chaque lab cohérent en interne.
- M17 : « mid-conversation system message Opus 4.8+ » dispo en réalité dès 4.7 (conservateur, pas faux).

## FLAG-DOC (posés par les agents write)
- M03 : versions exactes Copilot/Cursor (bougent vite, source WebSearch).
- M05 : `registerResource` / Streamable HTTP transport MCP (SDK v2 en mouvement).
- M19 : frameworks agentiques (LangGraph/Vercel AI SDK/Agent SDK) bougent vite → vérifier la version installée.

## Gate résiduel — PASS
Chaîne next 00→…→20→sentinel `fin-parcours-18-ia`. `{{ }}` en prose : aucun non échappé (les
occurrences sont en blocs code). Doublons clés YAML : aucun. Anti-simulé : harnais legacy
(exercise.ts/solution.ts) purgés, labs 100% README-only. Re-gaté **GATE PASS** (build OK).
