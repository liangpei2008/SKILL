---
name: enterprise-admin-backend
description: "Build enterprise-grade management backends, ERP demos, admin consoles, workflow systems, and operational dashboards. Use when designing or implementing Vue3/Element Plus or similar admin systems that need standard backend structure: top bar, sidebar, role switch, message notifications, todo/workbench, tickets/work orders, approval center, list/detail/form pages, import/export/print, permissions, audit logs, attachments, workflow configuration, and business document traceability."
---

# Enterprise Admin Backend

## Purpose

Use this skill to build business-facing management systems that feel like real enterprise software, not landing pages or thin demos. Prioritize operational density, predictable navigation, complete business objects, and reusable backend primitives.

Default to Chinese UI copy when the product is for Chinese enterprises.

## Core Principle

Keep business pages clean. Do not scatter explanatory notes, acceptance policy text, or implementation commentary across operational screens. Put explanation, configuration philosophy, acceptance mapping, and implementation guidance into a dedicated solution/configuration page.

## Standard Shell

Use this shell unless the existing project already has a stronger convention:

- Top bar: system name, global search, message notifications, todo count, help/solution entry, user menu.
- Left sidebar: module navigation grouped by business domain.
- Optional top role switch: decision maker, sales, purchasing, production, quality, finance, acceptance, admin.
- Breadcrumb: current module and page.
- Page header: keep breadcrumb-only when there is no status or action to show. If a title area is needed, make it compact and do not repeat the breadcrumb as a large bold heading.
- Content area: workbench, list pages, detail pages, forms, dashboards, configuration pages.

For Vue3 + Element Plus, prefer standard components: `el-container`, `el-menu`, `el-tabs`, `el-table`, `el-form`, `el-dialog`, `el-drawer`, `el-descriptions`, `el-steps`, `el-timeline`, `el-badge`, `el-alert`, `el-tag`, `el-dropdown`, `el-popover`, `el-date-picker`, `el-upload`.

## Required Backend Primitives

When building a management backend, include these baseline capabilities unless explicitly out of scope:

- Message notifications: system messages, business alerts, approval reminders.
- Todo center: pending approvals, pending tasks, overdue work, exceptions.
- Work orders/tickets: issue submission, assignment, handling status, attachments, comments.
- Approval center: pending, approved, rejected, delegated, approval logs.
- Personal workbench: my tasks, my approvals, my documents, recent records.
- Import/export/print: list export, template import, print documents.
- Advanced search: date range, status, owner, source, category, keyword.
- Column settings: show/hide columns, saved views when useful.
- Batch actions: assign, approve, export, print, delete, close, terminate.
- Draft box: save unfinished forms.
- Attachments: upload, preview, classify, link to business documents.
- Operation logs: creator, editor, status changes, approval, import/export.
- Permissions: view, create, edit, approve, close, export, configure.
- Configuration pages: categories, numbering rules, approval rules, custom fields, print templates.

## Page Patterns

### List Page

Every important business object should have a list page with:

- Compact search/filter bar.
- Status tabs or radio filters when status is central.
- Table with stable columns and realistic status labels.
- Row operations: details, edit, delete only where appropriate, plus domain actions.
- Batch operations for common management actions.
- Import, export, print where plausible.

Default list-page density:

- Keep the breadcrumb/header area shallow; avoid large blank bands above the query area.
- Build the query area as a compact single-row or wrapping toolbar, not a tall form card.
- Use restrained card padding around filters; avoid double padding from both card and form.
- Align labels, inputs, date ranges, and action buttons to the same control height.
- Keep table headers and toolbar rows compact so the first screen shows filters plus meaningful rows.

### Detail Page

Details should feel like an actual business document:

- Header: document number, title, status, key actions.
- Basic information section.
- Detail line table.
- Approval flow.
- Related documents.
- Attachments.
- Operation logs.
- Business-specific actions such as generate downstream document, assign, terminate, receive, inspect, putaway, invoice, collect payment.

### Form Page

Forms should include:

- Required fields with realistic defaults.
- Business number/date/category/owner fields.
- Source document selection where applicable.
- Detail line editing.
- Save draft, save, submit approval, cancel.
- Validation states and disabled fields when generated from upstream documents.

### Dashboard

Dashboards should summarize real operational objects, not decorative cards:

- KPI cards tied to business documents.
- Exception list or risk list.
- Trend/ratio visuals only when they support a decision.
- Drill-down path to the underlying list/detail page.

## ERP / Business Document Rules

For ERP-like demos, model business chains, not isolated pages.

Each module should identify:

- Upstream source documents.
- Downstream generated documents.
- Status transitions.
- Responsible roles.
- Business evidence for audit or acceptance.
- Configurable rules that let SMEs adapt process depth.

Prefer this chain style:

```text
source document -> application/request -> order/document -> approval -> execution -> inspection/acceptance -> warehouse/finance -> analysis
```

## Flexibility For SMEs

Do not force a single rigid process. When learning or building workflows, capture:

- Standard flow: recommended complete process.
- Lightweight flow: what can be skipped in phase 1.
- Configurable points: approval, categories, numbering, required fields, price rules, quality inspection, automatic generation, assignments.
- Manual fallback: where a business can continue semi-manual operation without blocking adoption.
- Upgrade path: how lightweight flow evolves to level 2/3/4 maturity.

In UI, show flexibility as configuration pages, status options, optional actions, and multiple source document paths. Avoid long explanatory text on operational pages.

## Visual And Interaction Style

Enterprise operational tools should be restrained and scannable:

- Use high information density with clear spacing.
- Prefer operational density over presentation spacing; avoid loose vertical whitespace on list pages.
- Avoid oversized hero sections, marketing copy, decorative cards, and one-note color palettes.
- Use tables, forms, tabs, drawers/dialogs, badges, and clear action buttons.
- Keep cards for repeated items, dashboard panels, modals, or genuinely framed tools.
- Do not put cards inside cards.
- Use status colors consistently: success, warning, danger, info.
- Keep text inside controls short and non-overlapping.

For Vue3 + Element Plus list pages, tune spacing explicitly when the default component spacing feels too loose:

- Reduce main content padding to a moderate shell padding.
- Set breadcrumb/page-head height to a compact value when no title is shown.
- Override filter-card body padding instead of adding padding to the outer card.
- Use flex-wrap and small row/column gaps for inline `el-form` filters.
- Remove default inline form item bottom margins in dense query bars.
- Use consistent 32px-36px control heights for filters and query buttons.
- Keep date range width fixed enough to avoid layout jumps, then allow wrapping on narrow screens.

## Reference Checklist

When the user asks for a full backend foundation, read `references/admin-checklist.md` and apply the checklist before editing or designing.
