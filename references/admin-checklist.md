# Enterprise Admin Backend Checklist

Use this checklist when building or reviewing a management backend, ERP demo, workflow console, or operational admin system.

## 1. Shell

- Top bar includes system name, global search, messages, todos, help/solution entry, user menu.
- Sidebar groups modules by business domain.
- Role switch exists when role-based demos are needed.
- Breadcrumb and page title are present.
- Main actions are placed consistently on the right side of the page header.

## 2. Global Foundation

- Message center: unread count, business alerts, approval reminders.
- Todo/workbench: pending approvals, pending tasks, overdue records, abnormal documents.
- Work orders/tickets: submit, assign, process, close, attachments, comments.
- Approval center: pending, approved, rejected, delegated, logs.
- Operation logs: visible on detail pages.
- Attachments: visible on detail pages and tickets.
- Permissions: at least role-level behavior is represented.

## 3. Standard Business Object

For each important object, provide:

- List page.
- Search/filter area.
- Status filters.
- Table columns with realistic fields.
- Row actions.
- Batch actions where useful.
- Detail page.
- Create/edit form.
- Approval flow when relevant.
- Related documents.
- Attachments.
- Operation logs.

## 4. List Page

- Date range filter.
- Category filter.
- Status filter.
- Owner/person filter.
- Keyword search.
- Advanced search entry.
- Import/export/print actions.
- Column setting entry when many columns exist.
- Batch actions.
- Pagination or fixed table height.

## 5. Detail Page

- Header with document number and status.
- Primary domain actions.
- Basic info section.
- Detail lines table.
- Approval timeline.
- Related documents.
- Attachments.
- Operation logs.
- Downstream generation actions.

## 6. Form Page

- Save draft.
- Save.
- Submit approval.
- Required fields.
- Source document selection.
- Detail line add/remove/import.
- Disabled generated fields where appropriate.
- Validation and empty states.

## 7. ERP Chain

Identify for each module:

- Upstream documents.
- Downstream documents.
- Responsible roles.
- Status transitions.
- Exceptions.
- Configurable rules.
- Evidence retained for audit/acceptance.

## 8. SME Flexibility

Represent flexibility through:

- Optional approval.
- Optional quality inspection.
- Configurable categories.
- Numbering rules.
- Custom fields.
- Source document conversion.
- Manual creation.
- Automatic generation.
- Assignment/delegation.
- Termination/close/rollback where plausible.

## 9. Visual Quality

- Looks like an operational tool, not a landing page.
- No explanatory paragraphs inside normal work pages.
- No large decorative hero blocks in business pages.
- Tables and forms are visually stable.
- Controls do not overlap on desktop or mobile.
- Status colors are consistent.
- Empty/loading/error states exist when relevant.

## 10. Demo Readiness

- Includes realistic sample data.
- Each role has a believable workbench or common task path.
- Primary demo path can be completed in 3-5 minutes.
- Each list has at least one row that opens to a meaningful detail page.
- Dashboard metrics drill conceptually into underlying documents.
- Solution/configuration explanation lives in a separate page.
