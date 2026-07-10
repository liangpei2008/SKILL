---
name: prototype-generation
description: Generate clickable business prototypes through staged Chinese product exploration. Use when the user asks to create, generate, plan, or refine a software prototype, HTML prototype, clickable prototype, product demo, requirement-validation prototype, presales demo, or R&D handoff prototype from raw business requirements or an existing requirements document.
---

# Prototype Generation

Use this skill to turn raw business needs or a confirmed requirements document into a clickable prototype. Default to Chinese output unless the user asks otherwise.

This skill mirrors the staged style of `requirement-exploration`, but its scope is different: it may cover page structure, content layout, interaction states, sample data, and clickable navigation. It must not drift into database design, API design, deployment architecture, or detailed implementation planning unless the user explicitly changes scope.

## Source Files

Read the relevant bundled references before running the workflow:

- `references/prototype-method.md` for the staged interview process, A/B confirmation rules, and interaction style.
- `references/prototype-spec.md` for the required prototype specification structure, completeness checklist, and HTML prototype acceptance criteria.
- `references/admin-backend-ui-interaction.md` when the requested prototype is a management backend, admin console, operations platform, internal system, CRM/ERP/OA-style back office, or data-management console.
- `assets/html-prototype-template/` when generating a standalone HTML prototype and the project does not already provide a better frontend stack.

## Workflow Contract

Follow the staged process in `references/prototype-method.md`:

1. Stage 0: receive raw prototype request and confirm overall understanding.
2. Stage 1: explore users, goals, and demo scenarios.
3. Stage 2: explore page/module map and navigation.
4. Stage 3: explore page content, actions, states, and sample data.
5. Stage 4: explore role differences, data visibility, and process flows.
6. Stage 5: perform completeness check and generate prototype artifacts.

Do not skip stages unless the user explicitly narrows the task. Ask business-specific B-class questions instead of inventing answers. Use `[AI自动补全]`, `[已确认]`, and `[待确认]` markers while drafting.

## Output Modes

Choose one output mode based on the user request:

- **Prototype spec only**: create a Markdown prototype specification with page map, page details, flows, roles, and open questions.
- **Clickable HTML prototype**: create a standalone HTML/CSS/JS prototype, using `assets/html-prototype-template/` as the baseline when appropriate.
- **Existing app implementation**: if the workspace already contains a frontend project, follow its stack and design conventions instead of copying the standalone template.

For clickable HTML prototypes, produce usable screens as the first view. Avoid marketing landing pages unless the user specifically asks for one. Include realistic sample data, clickable navigation, visible states, and enough role/process coverage for business confirmation.

For management backend prototypes, apply `references/admin-backend-ui-interaction.md` by default. Management backends should feel quiet, dense, efficient, and work-focused: prioritize navigation clarity, table/list operations, filter/query ergonomics, permission-aware actions, form validation, approval flows, audit trails, and repeat-use workflows over decorative presentation.

## Draft Persistence

When the workflow needs to persist a draft, write or update Markdown files in the user's chosen workspace location. Recommended default:

- `prototype-generation/<project-name>-prototype-spec.md`
- `prototype-generation/<project-name>-prototype/` for HTML artifacts

Perform completeness checks manually against `references/prototype-spec.md`.

## Completion Standard

Before claiming completion:

- Check that every confirmed page has purpose, primary user, displayed business information, available actions, empty/loading/error states when relevant, and navigation entry/exit.
- Check that every critical workflow has a Mermaid flowchart or clickable path.
- Check that role-specific differences and data ranges are explicit.
- Check that `[待确认]` items are listed in an appendix or confirmation list.
- For HTML prototypes, start a local server when needed and provide the URL; if it is a static file that works directly, provide the absolute file path.

## Boundaries

This skill can help with prototype exploration, prototype specs, page maps, interaction states, demo data, Mermaid process diagrams, HTML prototype generation, and handoff notes.

This skill does not replace formal requirements analysis, technical architecture, database schema design, API contract design, or production frontend engineering unless the user explicitly asks to extend the scope.
