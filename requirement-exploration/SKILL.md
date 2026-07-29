---
name: requirement-exploration
description: Interactive Chinese requirements-exploration workflow for turning raw business requirements into a complete software requirements document for later ontology/modeling work. Use when the user explicitly asks for "requirement-exploration", "需求探索技能包", "需求探索", or wants a staged requirements interview that distinguishes AI-autofilled common knowledge from business-specific confirmations, explores relevant reverse and business-exception flows, produces Mermaid process diagrams, checks completeness, and optionally exports Markdown/Word documents.
license: custom
metadata:
  version: "1.0.1"
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

1. Stage 0: receive raw requirements, confirm overall understanding, and confirm client/access endpoints.
2. Stage 1: explore business objects.
3. Stage 2: explore business functions, rules, relevant reverse actions, business exceptions, collaboration needs, information-push needs, and content moderation needs for user-generated content.
4. Stage 3: explore scenarios and processes, including client/access endpoint per flow step, material reverse/exception branches, and Mermaid flowcharts.
5. Stage 4: explore roles, usable client/access endpoints, and data-permission scopes.
6. Stage 5: perform completeness check, produce final Markdown, then ask whether Word export is needed.

Do not skip stages unless the user explicitly asks to narrow the task. Ask business-specific B-class questions instead of inventing answers. Use `[AI自动补全]`, `[已确认]`, and `[待确认]` markers as defined by the source prompt.

For any PC management backend, admin console, internal operations platform, CRM/ERP/OA-style system, or project that mentions system administration, permissions, organization, tenant, configuration, audit, or logs, Stage 2 must include a `系统管理` top-level menu unless the user explicitly excludes it. Mark inferred groups as `[AI自动补全]`, and ask the user to confirm whether they are in scope. Business-domain capabilities should be grouped under a `业务平台` top-level menu.

Default top-level menu: `系统管理`.

Expandable submenu 1: `权限管理`. Include these sub-functions:

- 用户管理: account list/search, create/edit, enable/disable, reset password, assign roles, bind department and post, set primary department where applicable, and record user status.
- 角色管理: role list/search, create/edit, enable/disable, assign menu tree, assign button permissions, configure data scope, and handle multiple-role permission aggregation where applicable.
- 菜单管理: directory/menu/button hierarchy, route or component identifier, permission code, icon, sort order, visibility, cache, enable/disable status, and route/menu protection.
- 部门管理: organization tree, parent department, department owner, department members, create/edit, enable/disable, and department status.
- 岗位管理: post list/search, post code, name, sort order, applicable department, associated users, create/edit, and enable/disable.

Expandable submenu 2: `日志管理`. Include these sub-functions:

- 审计日志: permission changes, role-menu/button/data-scope changes, user status changes, system configuration changes, export/download traces, actor, object, before/after values, time, result, IP/device when relevant, query, detail, and export.
- 操作日志: login/logout or login-failure records when applicable, business operations, CRUD actions, import/export actions, request result, exception summary, actor, object, time, IP/device, query, detail, and export.

Direct functions under `系统管理`:

- 令牌管理: token/session list with username, client, token, expiration time, status, offline/logout row action, offline reason, and operation/audit trace. Do not default to a batch-offline or "offline selected token" action unless the user explicitly confirms it.
- 敏感词管理: sensitive-word list with sensitive word, type, remark, and row operations. Type must be whitelist or blacklist. Do not default to advanced columns such as rule name, applicable scope, handling strategy, or status unless the user explicitly asks for advanced sensitive-word rules.
- 参数管理: system-rule and business-rule parameter list with name, key, value, status, system identifier, modify row action, modification reason, and audit trace. Do not default to a "modify selected parameter" action.
- 消息推送: message push list/search, create/edit, title, content, message type, receiver scope, receiver users/roles/departments, channel selection, SMS, email, internal message, announcement where applicable, scheduled/immediate sending, send status, failure reason, retry/resend, revoke/withdraw where allowed, read status for internal messages, delivery log, and operation/audit traces.
- 消息推送页面结构需求: when PC management backend message-push capability is in scope, record that the page should be under `系统管理` and use three tabs instead of a left-right split: `站内信`, `短信`, `邮件`. Confirm or draft the tab fields and actions as follows: `站内信` includes `ID`, `分类`, `标题`, `全部通知`, `已发送`, `排序`, with actions `详情`, `删除`, `接收情况`; `短信` includes `业务名称`, `业务编码`, `平台`, `启动状态`, with actions `测试`, `修改`, `删除`, `日志`; `邮件` includes `业务名称`, `业务编码`, `服务地址`, `启动状态`, with actions `测试`, `修改`, `删除`, `日志`. SMS/email logs must describe sending history.

Default top-level menu: `业务平台`. Business system functions should be grouped here. If collaborative office is in scope, include these sub-functions under `业务平台 / 协同办公`:

- 待办任务: pending approvals or workflow tasks assigned to the current user, task title, source process, initiator, current node, arrival time, deadline, priority, approve/reject/transfer actions, comments, attachments, and process trace.
- 我的发起: workflow instances started by the current user, process title, business object, current node, current handler, status, submit time, withdraw or urge actions where applicable, detail, and process trace.
- 抄送给我: workflow or task copies sent to the current user, source process, initiator, copy reason, copy time, read/unread status, mark-read action, detail, and trace.
- 我的已办: tasks already processed by the current user, process title, handled node, action result, handled time, opinion, next node or final status, detail, and trace.

Default top-right basic function: `消息提醒`. For PC management backends, include a notification bell in the page top-right area unless the user explicitly excludes it. It should expose unread count. Clicking the bell should first open a small dropdown window with recent reminders and a top-right `全部` link/button; clicking `全部` should open a right-side drawer with the full message list. Record read/unread state, message type, source business object, trigger time, priority, click-to-detail or jump target, mark-read/clear actions, and audit/log needs. It should be able to surface workflow tasks, copied workflow messages, system notices, approval results, import/export results, and business warnings.

Default top-right basic function: `登录账号菜单`. For PC management backends, include the current login account avatar and display name in the top-right area unless the user explicitly excludes it. Clicking it should open a dropdown with `个人中心` and `退出登录`. `个人中心` should be recorded as a right-side drawer interaction, not a left-sidebar menu page. It should include two tabs: `基本信息` for username, real name/display name, mobile phone, email, department/post read-only fields where relevant, and update-personal-info action; `安全信息` for changing the login password with old password, new password, confirm password, password policy feedback, and operation/logging needs.

When these functions are included, record their requirement scope, primary actors, data-permission range, audit/log needs, acceptance criteria, and whether they are based on a common platform such as PIGX/PigX. Do not treat these foundational functions as implementation detail only; they affect scope, quotation, acceptance, role permissions, notification reachability, message-channel cost, compliance retention, and prototype coverage.

When using PIGX/PigX as a reference, ground the functional description in official PIG documentation where available: `系统权限管理基础` supports RBAC with user-role-menu/button permission relations; `系统数据权限使用` supports data scopes such as all, current department, current department and children, custom departments, and self; `系统按钮权限使用` supports button permission marks and front/back permission checks; `前端组件路由管理` supports menu-route/component conventions; `前端组织架构组件` supports selecting users, departments, roles, and posts; `Flowable 协同办公模块使用` supports workflow initiation, approval, rejection, process groups, process creation, form design, and workflow designer concepts; `Flowable 自定义业务表单` supports binding complex business forms to workflow instances; `信息推送功能使用` supports information-push management, internal messages, announcements, receiver scope, top-right notification bell visibility, and `RemoteMessageService` for SMS, email, hook messages, and internal messages/announcements; `登录短信验证码发送` supports SMS-channel maintenance; `整合邮件发送` supports email integration; `common-sse 模块使用` and `common-websocket 模块使用` support real-time server push where needed. PIG official search may not expose a complete standalone page template for `审计日志`, `操作日志`, `令牌管理`, `敏感词管理`, `参数管理`, `待办任务`, `我的发起`, `抄送给我`, `我的已办`, or every message-channel configuration detail; in that case, keep the PIG-supported concepts and complete the requirement fields from common admin-platform practice, while clearly marking business-specific details as `[待确认]`.

For each state-changing core function or process, check whether withdrawal, rejection, cancellation, voiding, pause/resume, correction, reopening, or business-rule failure applies. Record actor, allowed pre-state, action, post-state, downstream/object/metric impact, approval/audit needs, and acceptance outcome. Permit explicit `不适用`. Draw material branches; keep simple validation failures in rule tables.

During function and process exploration, ask whether collaboration-office capabilities or information-push capabilities are needed. Collaboration may include task co-processing, comments, attachments, to-dos, handoff, and internal coordination. Information push may include top-right message reminders, internal messages, SMS, email, announcements, Enterprise WeChat/DingTalk, or other channels. If needed, record trigger scenario, receiver role, channel, template/content, receiver scope, immediate/scheduled sending, retry/failure handling, read status, channel cost or third-party dependency, and audit/log requirements. If not needed, record `不适用`.

For applications where users can upload, publish, comment, leave messages, edit rich text, or submit attachment descriptions, ask whether sensitive-word management or content moderation is required. If needed, record covered content, dictionary maintenance role, hit handling, manual review, appeal/recheck, audit logs, and acceptance criteria. If not needed, record `不适用`.

## Boundaries

This skill can help with software requirements exploration, requirements-document drafting, business reverse/exception flow exploration, process diagrams, completeness checks, and Markdown output.

Do not treat it as a UI/UX design, technical architecture, database schema, API design, transaction rollback, retry, idempotency, or infrastructure compensation workflow unless the user explicitly changes scope.
