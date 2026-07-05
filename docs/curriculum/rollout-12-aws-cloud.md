# Refonte 12-aws-cloud — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `12-aws-cloud/modules/NN-slug.md` + `12-aws-cloud/labs/lab-NN-slug/README.md`.
> Exemplar OBLIGATOIRE : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy à réécrire = `12-aws-cloud/modules/NN-*.md` (format `# Module` legacy → AU TEMPLATE).
> **Cours API-lourd (AWS + CDK)** — vérif systématique.

## Contrat agent (invariants gate — non négociables)

1. **Vérif API/service via WebFetch** (Context7 MORT). Docs officielles :
   - Services AWS (IAM, VPC, EC2, S3, Lambda, API Gateway, RDS, DynamoDB, SQS/SNS/EventBridge, Cognito, ECS/Fargate, CloudFront, CloudWatch/X-Ray) → docs.aws.amazon.com
   - CDK (constructs, L1/L2/L3, aws-cdk-lib) → docs.aws.amazon.com/cdk + WebSearch si besoin
   - Déploiement Nuxt/Next sur AWS → docs officielles + WebFetch
   Si l'URL exacte est inconnue → `WebSearch` puis `WebFetch`. Si fetch échoue/incertain → `<!-- FLAG-DOC: <quoi vérifier> -->`, NE PAS deviner (limites de service, noms d'API, quotas — zéro invention).
2. **Frontmatter** clés exemplar : `titre, cours: 12-aws-cloud, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE tout item de notions[] contenant `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert** : pas de notion d'un module ultérieur.
5. **Lab = README-only** : énoncé + critères + corrigé vrai-outil (AWS CLI, Console, CDK `cdk deploy`, SAM) + **feedback = coach** + **variante J+30**. ZÉRO harnais de test simulé (le legacy `labs/test-utils.ts` a été supprimé — ne pas le recréer). ⚠️ Coût AWS : le lab doit rappeler le **teardown** (détruire les ressources) + rester dans le **Free Tier** quand possible.
6. **Fil-rouge TribuZen** : ancrer dans l'infra cloud de TribuZen (auth Cognito, API Lambda+API Gateway, stockage S3 avatars, DynamoDB feed, CloudFront, déploiement).
7. `{{ }}` en prose → échapper (SSR VitePress). Pas de framework front dans le corps hors nécessité.

## Colonne vertébrale (numérotation legacy conservée — 20 modules)

| NN | Module | next |
|----|--------|------|
| 00 | prerequis-et-vue-ensemble (compte, régions, IAM root, CLI, modèle de responsabilité partagée) | 01 |
| 01 | iam-identity-access (users/groups/roles/policies, moindre privilège) | 02 |
| 02 | vpc-networking (VPC, subnets, route tables, IGW/NAT, SG vs NACL) | 03 |
| 03 | ec2-compute (instances, AMI, types, EBS, user-data, ASG survol) | 04 |
| 04 | s3-stockage-objets (buckets, classes de stockage, versioning, policies, presigned URLs) | 05 |
| 05 | cdk-infrastructure-code (IaC, constructs L1/L2/L3, stacks, cdk deploy/diff) | 06 |
| 06 | lambda-serverless (fonctions, handlers, triggers, cold start, layers) | 07 |
| 07 | api-gateway (REST vs HTTP API, intégrations Lambda, autorisers, stages) | 08 |
| 08 | rds-elasticache (RDS moteurs, Multi-AZ, read replicas ; ElastiCache Redis) | 09 |
| 09 | dynamodb (tables, partition/sort key, GSI/LSI, on-demand vs provisioned, single-table) | 10 |
| 10 | messaging-evenements (SQS, SNS, EventBridge, fan-out, DLQ) | 11 |
| 11 | cognito-authentification (User Pools, Identity Pools, flows, JWT) | 12 |
| 12 | ecs-fargate-containers (ECS, Fargate, task/service, ALB) | 13 |
| 13 | cloudfront-cdn (distributions, origins, cache behaviors, OAC, invalidation) | 14 |
| 14 | cloudwatch-xray-observabilite (logs, metrics, alarms, X-Ray tracing) | 15 |
| 15 | securite-aws-avancee ⚠️SENSIBLE (KMS, Secrets Manager, WAF, GuardDuty, least privilege avancé) | 16 |
| 16 | architectures-serverless (patterns event-driven, API+Lambda+DynamoDB, Step Functions) | 17 |
| 17 | cicd-devops (CodePipeline/CodeBuild, GitHub Actions vers AWS, OIDC) | 18 |
| 18 | projet-final-architecture-cloud (capstone : concevoir l'archi cloud TribuZen) | 19 |
| 19 | deployer-nuxt-next-aws (déploiement concret d'une app Nuxt/Next sur AWS) | (fin) |

20 modules (00-19) + 20 labs (existent déjà, à réécrire au template README-only).
Dernier module (19) `next` = sentinel `fin-parcours-12-aws-cloud`.
Module 15 (sécu AWS) + 01 (IAM) → factuel sécurité vérifié WebFetch ; flaguer M15 review lundi si claims sensibles.
