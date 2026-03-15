# Diagrammes d'Architecture — Fullstack JS

Diagrammes Mermaid couvrant les concepts architecturaux fondamentaux du curriculum.
Chaque diagramme est accompagne d'une explication courte.

---

## 1. Event Loop Node.js

L'event loop orchestre l'execution du code asynchrone en Node.js selon un ordre de priorite strict.
Les microtaches (Promises) sont toujours videes avant de passer aux macrotaches (timers, I/O).

```mermaid
flowchart TD
    A["Pile d'appels (Call Stack)"] -->|"Pile vide ?"| B{"File de microtaches\n(Promise.then, queueMicrotask)"}
    B -->|"Non vide : executer TOUTES\nles microtaches"| B
    B -->|"Vide"| C{"File de macrotaches\n(setTimeout, setInterval, I/O)"}
    C -->|"Executer UNE macrotache"| A
    C -->|"File vide"| D["Attente d'evenements\n(poll phase)"]
    D -->|"Nouvel evenement"| A

    style A fill:#4a90d9,color:#fff
    style B fill:#e8a838,color:#fff
    style C fill:#d94a4a,color:#fff
    style D fill:#6b7b8d,color:#fff
```

---

## 2. Pipeline OpenTelemetry (OTel)

Le Collector OTel centralise la collecte de telemetrie (traces, metriques, logs) avant de les distribuer aux backends.
L'application instrumente envoie les donnees via le SDK, le Collector les transforme puis les exporte.

```mermaid
flowchart LR
    subgraph App["Application"]
        SDK["OTel SDK\n(traces, metriques, logs)"]
    end

    subgraph Collector["OTel Collector"]
        R["Receivers\n(OTLP, Zipkin)"]
        P["Processors\n(batch, filter, sampling)"]
        E["Exporters\n(multi-backend)"]
        R --> P --> E
    end

    subgraph Backends["Backends d'observabilite"]
        Prom["Prometheus\n(metriques)"]
        Jaeg["Jaeger\n(traces)"]
        Loki["Loki\n(logs)"]
    end

    SDK --> R
    E --> Prom
    E --> Jaeg
    E --> Loki

    style App fill:#2d6a4f,color:#fff
    style Collector fill:#e76f51,color:#fff
    style Backends fill:#264653,color:#fff
```

---

## 3. Architecture NestJS — Cycle de vie d'une requete

NestJS applique une serie de couches (middleware, guards, interceptors, pipes) avant et apres le handler.
L'ordre est deterministe et chaque couche a une responsabilite unique (authentification, validation, transformation).

```mermaid
flowchart LR
    A["Requete HTTP"] --> B["Middleware\n(logging, CORS)"]
    B --> C["Guards\n(authentification,\nautorisation)"]
    C --> D["Interceptors\n(avant handler :\ncache, logging)"]
    D --> E["Pipes\n(validation,\ntransformation)"]
    E --> F["Route Handler\n(controleur)"]
    F --> G["Interceptors\n(apres handler :\nmapping, timeout)"]
    G --> H["Reponse HTTP"]

    style A fill:#6b7b8d,color:#fff
    style F fill:#4a90d9,color:#fff
    style H fill:#2d6a4f,color:#fff
```

---

## 4. OAuth2 — Authorization Code Flow

Le flux Authorization Code est le plus securise pour les applications web avec backend.
Le code d'autorisation est echange cote serveur contre des tokens, evitant l'exposition du secret client.

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant F as Frontend
    participant AS as Serveur d'autorisation
    participant B as Backend

    U->>F: Clic "Se connecter"
    F->>AS: Redirection /authorize<br/>(client_id, redirect_uri, scope, state)
    AS->>U: Page de consentement
    U->>AS: Accepte et s'authentifie
    AS->>F: Redirection avec code + state
    F->>B: Envoie le code d'autorisation
    B->>AS: POST /token<br/>(code, client_secret, redirect_uri)
    AS->>B: access_token + refresh_token
    B->>F: Set-Cookie httpOnly<br/>(session ou tokens)
    F->>U: Connecte avec succes
```

---

## 5. Saga Pattern — Choregraphie

En choregraphie, chaque service ecoute les evenements et declenche l'etape suivante ou sa compensation.
En cas d'echec, les transactions compensatoires annulent les etapes precedentes en ordre inverse.

```mermaid
sequenceDiagram
    participant OS as Service Commande
    participant PS as Service Paiement
    participant IS as Service Inventaire
    participant SS as Service Expedition

    OS->>PS: Evenement : CommandeCreee
    PS->>PS: Debiter le compte
    PS->>IS: Evenement : PaiementReussi
    IS->>IS: Reserver le stock
    IS->>SS: Evenement : StockReserve
    SS->>SS: Planifier l'expedition
    SS->>OS: Evenement : ExpeditionPlanifiee

    Note over OS,SS: Scenario d'echec (stock insuffisant)

    OS->>PS: Evenement : CommandeCreee
    PS->>IS: Evenement : PaiementReussi
    IS-->>PS: Evenement : EchecReservation
    PS->>PS: Compensation : rembourser
    PS-->>OS: Evenement : PaiementAnnule
    OS->>OS: Compensation : annuler la commande
```

---

## 6. Cache-Aside Pattern

Le pattern Cache-Aside place le cache (Redis) devant la base de donnees pour reduire la latence.
L'application verifie d'abord le cache ; en cas de miss, elle interroge la DB puis alimente le cache avec un TTL.

```mermaid
flowchart TD
    A["Requete entrante"] --> B{"Verifier Redis"}
    B -->|"Cache Hit"| C["Retourner les donnees\ndu cache"]
    B -->|"Cache Miss"| D["Interroger PostgreSQL"]
    D --> E["Stocker dans Redis\n(avec TTL)"]
    E --> F["Retourner les donnees"]

    G["Expiration TTL"] -.->|"Cle expiree\nautomatiquement"| B

    style B fill:#e8a838,color:#fff
    style C fill:#2d6a4f,color:#fff
    style D fill:#4a90d9,color:#fff
    style E fill:#d94a4a,color:#fff
```

---

## 7. React Reconciliation (Diffing du Virtual DOM)

React utilise un arbre virtuel (VDOM) pour minimiser les manipulations couteuses du DOM reel.
Apres un changement d'etat, React compare l'ancien et le nouveau VDOM puis applique uniquement les differences.

```mermaid
flowchart LR
    A["setState()\nou useState setter"] --> B["Creer un nouveau\nVirtual DOM"]
    B --> C["Algorithme de Diff\n(ancien VDOM vs nouveau)"]
    C --> D["Calculer les\nchangements minimaux"]
    D --> E["Appliquer au\nDOM reel (commit)"]
    E --> F["Repaint du\nnavigateur"]

    style A fill:#4a90d9,color:#fff
    style C fill:#e8a838,color:#fff
    style E fill:#2d6a4f,color:#fff
```

---

## 8. Pipeline CI/CD

Le pipeline CI/CD automatise la verification, la construction et le deploiement du code.
Les etapes de lint et tests unitaires tournent en parallele pour accelerer le feedback.

```mermaid
flowchart LR
    A["Push sur\nla branche"] --> B["Lint\n(ESLint, Prettier)"]
    A --> C["Tests unitaires\n(Vitest / Jest)"]
    B --> D["Build\n(Docker / Vite)"]
    C --> D
    D --> E["Tests E2E\n(Playwright)"]
    E --> F["Deployer\nStaging"]
    F --> G["Smoke Tests"]
    G --> H{"Smoke OK ?"}
    H -->|"Oui"| I["Deployer\nProduction"]
    H -->|"Non"| J["Rollback +\nAlerte equipe"]

    style A fill:#6b7b8d,color:#fff
    style D fill:#e8a838,color:#fff
    style I fill:#2d6a4f,color:#fff
    style J fill:#d94a4a,color:#fff
```

---

## 9. PostgreSQL MVCC (Multi-Version Concurrency Control)

MVCC permet aux transactions concurrentes de lire des versions differentes d'une meme ligne sans se bloquer.
Chaque transaction voit un snapshot coherent de la base au moment ou elle a commence.

```mermaid
sequenceDiagram
    participant T1 as Transaction T1<br/>(SELECT)
    participant DB as PostgreSQL<br/>(Heap)
    participant T2 as Transaction T2<br/>(UPDATE)

    T1->>DB: BEGIN (snapshot pris)
    T1->>DB: SELECT * FROM produits WHERE id=1
    DB->>T1: Ligne v1 (prix = 100)

    T2->>DB: BEGIN
    T2->>DB: UPDATE produits SET prix=120 WHERE id=1
    Note over DB: Cree Ligne v2, Ligne v1 reste visible pour T1

    T1->>DB: SELECT * FROM produits WHERE id=1
    DB->>T1: Ligne v1 (prix = 100, snapshot isolation)

    T2->>DB: COMMIT
    Note over DB: Ligne v2 desormais visible pour les nouvelles transactions

    T1->>DB: COMMIT
    Note over T1,DB: T1 a toujours vu v1 pendant toute sa duree

    participant T3 as Nouvelle Transaction T3
    T3->>DB: SELECT * FROM produits WHERE id=1
    DB->>T3: Ligne v2 (prix = 120)
```

---

## 10. WebSocket + Redis Pub/Sub (Synchronisation temps reel)

Redis Pub/Sub permet de synchroniser les messages WebSocket entre plusieurs instances de serveur.
Quand un client envoie un message, il est publie dans Redis puis diffuse a tous les serveurs abonnes.

```mermaid
flowchart LR
    subgraph Instance1["Serveur 1"]
        CA["Client A\n(WebSocket)"]
        S1["Handler WS"]
    end

    subgraph Redis["Redis Pub/Sub"]
        CH["Canal : notifications"]
    end

    subgraph Instance2["Serveur 2"]
        S2["Handler WS"]
        CB["Client B\n(WebSocket)"]
    end

    CA -->|"Envoie message"| S1
    S1 -->|"PUBLISH"| CH
    CH -->|"SUBSCRIBE"| S2
    S2 -->|"Transmet message"| CB

    CH -->|"SUBSCRIBE"| S1
    S1 -->|"Broadcast local"| CA

    style Redis fill:#d94a4a,color:#fff
    style Instance1 fill:#4a90d9,color:#fff
    style Instance2 fill:#2d6a4f,color:#fff
```

---

## 11. SLO et Budget d'Erreurs

Le budget d'erreurs quantifie la marge d'indisponibilite acceptable avant de geler les deploiements.
Avec un SLO de 99.9%, on dispose de 43 minutes d'erreur par mois (30 jours).

```mermaid
flowchart TD
    A["Total des requetes\n(30 jours)"] --> B["SLO = 99.9%\nBudget = 0.1%"]
    B --> C["Budget d'erreurs\n= 43 min / mois"]
    C --> D{"Budget restant ?"}
    D -->|"Superieur a 25%"| E["Deploiements normaux\n(feature releases)"]
    D -->|"Entre 10% et 25%"| F["Alerte equipe SRE\n(prudence)"]
    D -->|"Inferieur a 10%"| G["Feature freeze\n(fiabilite uniquement)"]
    G --> H["Actions correctrices :\nfix bugs, optimiser, alerting"]
    H --> D

    style C fill:#e8a838,color:#fff
    style E fill:#2d6a4f,color:#fff
    style F fill:#d98a4a,color:#fff
    style G fill:#d94a4a,color:#fff
```

---

## 12. JWT Auth Flow (Access + Refresh Tokens)

Le access token (courte duree, 15 min) est utilise pour chaque requete authentifiee.
Le refresh token (longue duree, 7 jours, httpOnly cookie) permet de renouveler le access token sans re-authentification.

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Serveur API
    participant DB as Base de donnees

    C->>S: POST /login (email, mot de passe)
    S->>DB: Verifier les identifiants
    DB->>S: Utilisateur valide
    S->>C: access_token (JWT, 15min, en memoire)<br/>+ refresh_token (7j, httpOnly cookie)

    Note over C,S: Requetes authentifiees

    C->>S: GET /api/data<br/>Authorization: Bearer access_token
    S->>S: Verifier signature + expiration JWT
    S->>C: 200 OK + donnees

    Note over C,S: Access token expire

    C->>S: GET /api/data<br/>Authorization: Bearer access_token
    S->>C: 401 Token expire

    C->>S: POST /refresh<br/>(refresh_token via cookie)
    S->>DB: Verifier refresh token (non revoque)
    DB->>S: Token valide
    S->>C: Nouveau access_token (15min)<br/>+ rotation refresh_token

    C->>S: GET /api/data<br/>Authorization: Bearer nouveau_token
    S->>C: 200 OK + donnees
```
