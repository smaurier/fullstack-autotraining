# QA — 12-aws-cloud (refonte v1)

> Cours réécrit en autonomie (rollout week-end 2026-07-03→05). 20 modules (00-19) + 20 labs.
> Legacy `# Module` réécrit au template ; `test-utils.ts` + harnais legacy supprimés.
> **Context7 mort → vérif API par WebFetch** (docs.aws.amazon.com, cdk, sst.dev, docs.github.com).
> GATE PASS déterministe. QA agents read-only en 3 blocs (00-06 / 07-13 / 14-19), WebFetch à l'appui.

## Corrections appliquées (P0/P1/P2)

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P0 | M12 §2.4 | Table Fargate « 512 CPU (pas de 1 Go) » FAUX (1 Go valide, 512 Mo non) | « (pas de 512 Mo) » |
| P0 | lab-16 | ASL préfixe erreur `DynamoDb.` (intégration optimisée = `DynamoDB.`) → idempotence ne se déclenche jamais, rejeu FAILED | 5 occ. `DynamoDb.`→`DynamoDB.` |
| P1 | M11 §1 | FLAG-DOC Cognito MAU non résolu | Fermé : 10 000 MAU/mois (Lite/Essentials, depuis nov. 2024) |
| P1 | lab-02 | SSM Session Manager sans instance profile `AmazonSSMManagedInstanceCore` → learner bloqué | Rôle+profile ajoutés + forward-ref M03 |
| P2 | lab-06 | runtime nodejs20.x | nodejs22.x |
| P2 | lab-11 | CDK `HttpApi + CognitoUserPoolsAuthorizer` (REST-only) | `HttpUserPoolAuthorizer` |
| P2 | M18/M15 | « WAF sur HTTP API » (impossible en v2) | WAF sur CloudFront devant l'API |
| P2 | lab-18 | setup via packages `apigatewayv2-alpha` dépréciés | forme stable `aws-cdk-lib` d'abord |
| P2 | M19 §2.4 | FLAG-DOC VUE_APP_ vs NUXT_PUBLIC_ | Levé (VUE_APP_ vérifié correct pour sst.aws.Nuxt) |

## FLAG-REVIEW humain (Sylvain)
- **M15-securite-aws-avancee** — QA a validé les claims (KMS envelope, rotation, Secrets Manager vs Parameter Store, WAF ressources, GuardDuty sources, SCP vs permissions boundary) comme corrects et les recommandations comme sûres (moindre privilège, secret jouet, teardown). Commentaire FLAG-REVIEW en tête. À valider par Sylvain.

## FLAG-DOC restants
- M18 §2.5 : prix unitaires AWS volatils (renvoi Pricing Calculator, ordres de grandeur seulement).

## Verdict

Lot haute qualité, **factuel AWS/CDK vérifié verbatim via WebFetch**. Currency captée et corrigée
vs legacy : gp3 80000 IOPS, Free Tier 15/07/2025 (auto-close), Cognito 10000 MAU (nov 2024),
Multi-AZ instance ne sert pas la lecture, DynamoDB LSI à la création/GSI capacité propre, CDK v2
aws-cdk-lib, OAC (pas OAI), GitHub OIDC v4 (thumbprint plus requis), SST v3/OpenNext, WAF pas sur
HTTP API. Labs README-only vrai-outil (Console/CLI/CDK/SST), coach, J+30, **teardown obligatoire**
(coût AWS), zéro harnais. Corrections appliquées, re-gaté **GATE PASS**.
