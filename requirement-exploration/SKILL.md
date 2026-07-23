---
name: requirement-exploration
description: Interactive Chinese requirements-exploration workflow for turning raw business requirements into a complete software requirements document for later ontology/modeling work. Use when the user explicitly asks for "requirement-exploration", "需求探索技能包", "需求探索", or wants a staged requirements interview that distinguishes AI-autofilled common knowledge from business-specific confirmations, explores relevant reverse and business-exception flows, produces Mermaid process diagrams, checks completeness, and optionally exports Markdown/Word documents.
license: custom
metadata:
  version: "1.0.0"
  source-manifest: skill.manifest.yaml
  domain: 软件需求探索
---

# Requirement Exploration

This skill adapts the bundled `skillpack/v1` requirement-exploration package for Codex.

Use it as a staged, interactive requirements-analysis workflow. Default to Chinese output unless the user asks otherwise.

## Source Files

Read these bundled files before running the workflow:

- `skill.manifest.yaml` for package metadata, boundaries, and declared capabilities.
- `prompt/system-fragment.md` for the full behavior prompt and staged interaction rules.
- `knowledge/requirement-spec.md` for the required software requirements document structure and completeness checklist.
- `knowledge/exploration-prompt.md` for the original exploration method.
- `data/config.yaml` for configuration, terminology, and checklist details.
- `capability/tools.yaml` for the declared tool contracts.

## Important Codex Adaptation

The original package declares tools such as `save_requirement_draft`, `check_completeness`, `generate_final_document`, `render_mermaid`, and `export_to_word`.

Those tool names are not automatically callable Codex tools after installing this folder. When the workflow needs them:

- Persist drafts by writing or updating Markdown files in the user's chosen workspace location.
- Perform completeness checks manually against `knowledge/requirement-spec.md` and `data/config.yaml`.
- Generate the final Markdown document directly in the workspace.
- For Word export, use available document-conversion capabilities when present, or explain the missing converter/renderer clearly.
- For Mermaid diagrams, include valid Mermaid source in the Markdown unless a renderer is available.

## Workflow Contract

Follow the staged process in `prompt/system-fragment.md`:

1. Stage 0: receive raw requirements and confirm overall understanding.
2. Stage 1: explore business objects.
3. Stage 2: explore business functions, rules, relevant reverse actions, and business exceptions.
4. Stage 3: explore scenarios and processes, including material reverse/exception branches and Mermaid flowcharts.
5. Stage 4: explore roles and data-permission scopes.
6. Stage 5: perform completeness check, produce final Markdown, then ask whether Word export is needed.

Do not skip stages unless the user explicitly asks to narrow the task. Ask business-specific B-class questions instead of inventing answers. Use `[AI自动补全]`, `[已确认]`, and `[待确认]` markers as defined by the source prompt.

For each state-changing core function or process, check whether withdrawal, rejection, cancellation, voiding, pause/resume, correction, reopening, or business-rule failure applies. Record actor, allowed pre-state, action, post-state, downstream/object/metric impact, approval/audit needs, and acceptance outcome. Permit explicit `不适用`. Draw material branches; keep simple validation failures in rule tables.

## Boundaries

This skill can help with software requirements exploration, requirements-document drafting, business reverse/exception flow exploration, process diagrams, completeness checks, and Markdown output.

Do not treat it as a UI/UX design, technical architecture, database schema, API design, transaction rollback, retry, idempotency, or infrastructure compensation workflow unless the user explicitly changes scope.
