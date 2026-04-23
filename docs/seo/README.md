# SEO Operations — FunLoading360

Working directory for the SEO agent team. Master plan lives at `/Users/work/.claude/plans/a-si-c-doar-rustling-allen.md`.

## Structure

```
docs/seo/
├── README.md                    ← this file
├── priority-keywords.md         ← 30 keywords tracked daily via workflow-4
├── prompt-fanout-list.md        ← 40 AEO test prompts for workflow-10
├── outreach-templates.md        ← canonical email templates (link-building)
├── kpi-dashboard-template.md    ← weekly/monthly report format
├── cities/                      ← per-city research notes
├── clusters/                    ← topic cluster keyword maps
├── ab-tests/                    ← A/B test specs + results
├── raw-data/                    ← archived JSON snapshots from n8n
├── weekly-YYYY-MM-DD.md         ← weekly reports (created Mondays)
├── monthly-YYYY-MM.md           ← monthly reports (1st working day)
├── baseline-YYYY-MM-DD.md       ← Phase 1 audit baselines
├── tech-audit-YYYY-MM-DD.md     ← technical audits from seo-technical-aeo
├── gbp-audit-YYYY-MM-DD.md      ← GBP audits from seo-local-domination
├── nap-audit-YYYY-MM-DD.md      ← NAP consistency audits
├── cro-audit-YYYY-MM-DD.md      ← CRO friction maps
├── keyword-map-YYYY-MM-DD.md    ← URL → keyword mapping (Phase 2.5)
├── on-page-rewrite-log-*.md     ← Phase 2.5 before/after log
└── outreach-tracker.md          ← running list of pitches, responses, verified links
```

## Agent ownership

| Area | Agent |
|---|---|
| `raw-data/`, weekly/monthly reports, coordination | `seo-orchestrator` |
| `tech-audit-*.md`, schema, llms.txt, robots, AEO | `seo-technical-aeo` |
| `cities/`, GBP audits, NAP audits, local work | `seo-local-domination` |
| `clusters/`, rewrite log, keyword maps, outreach | `seo-content-authority` |
| `ab-tests/`, cro-audit | `seo-cro-specialist` |

## Cadence

- **Daily**: workflow-3 (GSC pull), workflow-4 (rank tracking), workflow-6 (reviews) run unattended; raw data lands in `raw-data/`.
- **Weekly (Monday)**: `seo-orchestrator` publishes `weekly-<date>.md` with priorities for the week.
- **Weekly (rolling)**: workflow-7 (competitor watch), workflow-9 (CrUX), workflow-10 (AEO presence), workflow-11 (GA4 digest).
- **Monthly (1st working day)**: `seo-orchestrator` publishes `monthly-YYYY-MM.md` with KPI deltas and pivot recommendations.

## Hard rules

- Never delete raw data. Archive only.
- Every report must cite date range and data source.
- Every action in a report must have a named owner (agent) and deadline.
