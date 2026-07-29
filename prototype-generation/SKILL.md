---
name: prototype-generation
description: Generate clickable business prototypes through staged Chinese product exploration. Use when the user asks to create, generate, plan, or refine a software prototype, HTML prototype, clickable prototype, product demo, requirement-validation prototype, presales demo, or R&D handoff prototype from raw business requirements or an existing requirements document.
---

# Prototype Generation

Use this skill to turn raw business needs or a confirmed requirements document into a clickable prototype. Default to Chinese output unless the user asks otherwise.

This skill mirrors the staged style of `requirement-exploration`, but its scope is different: it may cover page structure, content layout, interaction states, sample data, and clickable navigation. It must not drift into database design, API design, deployment architecture, or detailed implementation planning unless the user explicitly changes scope.

## Delivery Principle

Default to producing a deliverable prototype in one run. Unless the user explicitly asks for a skeleton, quick draft, outline, low-fidelity wireframe, or reduced scope, do not downgrade the output to a framework, menu shell, sample page, or partial flow. The prototype must be suitable for customer confirmation, presales demonstration, requirement validation, or R&D handoff after the current workflow completes.

Do not silently cut scope. If the confirmed scope is too large to complete at full fidelity, ask the user to approve a reduced scope before generating. Without that approval, generate all confirmed modules and core button flows.

A clickable HTML prototype is not deliverable if it only contains first-level pages, placeholder content, menu-only modules, query-only pages, or buttons that do not open the expected page, dialog, sheet, state, or feedback. Every primary action on generated pages should either be clickable or explicitly marked as out of scope with user confirmation.

For high-fidelity prototypes, visible UI must read like a real product, not a design document. Do not place visible annotations, design notes, specification notes, "prototype" labels, "state demo" labels, "Back behavior" notes, or implementation explanations inside the product interface. Put delivery notes, interaction rationale, and acceptance details in a separate Markdown handoff note or final response, not in the rendered UI.

中文硬约束：高保真原型界面只出现真实产品文案，不得在界面中加入“原型说明、设计注解、规范提示、状态演示、Back 行为、点击演示、实现说明”等可见注解；这些内容只能放在交付说明、需求文档或验收清单中，不能影响原型效果。

For APP/mobile high-fidelity prototypes, abnormal states such as weak network, empty data, no permission, validation failure, and retry failure should not be exposed as top-level "demo" controls. If concentrated state previews are needed for validation, place them behind a realistic deep business entry such as message center, help center, service status, task detail, operation record, or diagnostics, and use product-facing labels and copy.

中文硬约束：APP/移动端的弱网、空数据、无权限、校验失败、重试失败等异常效果，不得集中摆在首页或主 Tab 作为“状态演示”按钮；如需集中展示，必须放到真实业务深入口中，例如消息中心、帮助中心、服务状态、任务详情、操作记录或诊断页，并使用真实产品文案。

For APP/mobile prototypes with multiple user roles, provide a realistic login or identity-selection entry when appropriate. Each selected role should enter a different home/workbench and see role-specific navigation, data scope, primary actions, and restricted operations. Do not expose another role's pages as a casual shortcut inside the current role's main screen unless that cross-role action exists in the real product.

中文硬约束：移动端如涉及多角色，优先在登录/身份选择时选择角色；不同角色进入不同首页，看到不同导航、数据范围和可操作动作。不得只在页面里放一个“教师视图/管理员视图”快捷按钮来代表多角色，也不得让学生首页直接混入教师、辅导员等其他角色工作台。

中文硬约束：默认一轮产出可交付原型；不得擅自降级为骨架、菜单壳、占位稿、局部样例页或低保真草稿；阶段二确认的模块必须全部兑现；主要按钮必须有后续页面、弹窗、抽屉、底部弹层、结果状态或反馈提示；如果需要减少范围，必须先征得用户同意。

## Startup Prompt

At the start of the workflow, explicitly tell the user they can provide either:

- a one-sentence or short raw requirement description, or
- an existing requirement document path, such as `.md`, `.txt`, `.docx`, `.pdf`, or another readable project file.

Immediately after naming the two input options, tell the user the workflow will include several short interaction rounds and name what each round checks: prototype goal/scope/terminal/output, users and demo scenarios, page/module/navigation structure, page content/actions/states/sample data, roles/permissions/data visibility/process differences, then completeness and artifact generation.

If the user provides a requirement file path, read the file first and use it as the primary source for Stage 0. Do not ask the user to restate information already present in the document. Instead, extract the prototype scope, users, workflows, business objects, roles, permissions, and open questions, then ask the user to confirm only the inferred scope and any missing B-class details.

Recommended first prompt in Chinese:

```text
你可以用一句话描述要做的系统，也可以直接输入已有需求文件路径（如 .md/.txt/.docx/.pdf）。收到需求后，我会分几轮和你确认：1）原型目标、范围、终端类型和输出形式；2）用户角色、业务目标和演示场景；3）页面/模块结构与导航；4）页面内容、操作、状态和样例数据；5）角色权限、数据范围和流程差异；6）完整性检查并生成原型说明或可点击 HTML 原型。
```

## Source Files

Read the relevant bundled references before running the workflow:

- `references/prototype-method.md` for the staged interview process, A/B confirmation rules, and interaction style.
- `references/prototype-spec.md` for the required prototype specification structure, completeness checklist, and HTML prototype acceptance criteria.
- Apply `frontend-design` as the top-level frontend quality standard when generating clickable UI artifacts, especially HTML/CSS/JS prototypes.
- `references/admin-backend-ui-interaction.md` when the requested prototype is a management backend, admin console, operations platform, internal system, CRM/ERP/OA-style back office, or data-management console.
- `references/mobile-ui-interaction.md` when the requested prototype is mobile-facing, including mini programs, H5/mobile web, native apps, or mobile business tools.
- `references/mini-program-ui-interaction.md` in addition to the mobile baseline when the prototype is a WeChat/Enterprise WeChat/mini program.
- `references/mobile-h5-ui-interaction.md` in addition to the mobile baseline when the prototype is mobile H5, mobile web, browser-based, campaign page, or public-account page.
- `references/native-app-ui-interaction.md` in addition to the mobile baseline when the prototype is an Android/native app. APP prototypes are Android / Material Design first unless the user explicitly asks for iOS.
- `assets/html-prototype-template/` when generating a standalone HTML prototype and the project does not already provide a better frontend stack.

## UI Standard Routing

Use `prototype-generation` as the orchestration skill and route UI standards like this:

```text
frontend-design
General frontend design quality standard
|
+-- PC management backend
|   +-- references/admin-backend-ui-interaction.md
|
+-- Mobile
    +-- references/mobile-ui-interaction.md
        +-- Mini program: references/mini-program-ui-interaction.md
        +-- Mobile H5: references/mobile-h5-ui-interaction.md
        +-- Native app / Android app: references/native-app-ui-interaction.md
```

Always apply the general `frontend-design` quality principles for visual hierarchy, responsive behavior, polished states, and production-grade interaction quality. Then apply exactly the terminal-specific reference files that match the prototype type. If the type is ambiguous, ask the user to confirm the terminal before generating the final clickable prototype.

## Workflow Contract

Follow the staged process in `references/prototype-method.md`:

1. Stage 0: receive raw prototype request or read the provided requirement file, then confirm overall understanding.
2. Stage 1: explore users, goals, and demo scenarios.
3. Stage 2: explore page/module map and navigation.
4. Stage 3: explore page content, actions, states, and sample data.
5. Stage 4: explore role differences, data visibility, and process flows.
6. Stage 5: perform completeness check and generate prototype artifacts.

Do not skip stages unless the user explicitly narrows the task. Ask business-specific B-class questions instead of inventing answers. Use `[AI自动补全]`, `[已确认]`, and `[待确认]` markers while drafting.

Stage 2 commitments are binding. Every page/module confirmed by the user or added with `[AI自动补全]` in Stage 2 must be represented in the final prototype specification and, for clickable HTML output, must have a corresponding navigable page/view/section. Do not collapse many confirmed modules into one sample page unless the user explicitly approves a reduced scope. If time or scope requires abbreviation, state the proposed reduction and get confirmation first.

## Output Modes

Choose one output mode based on the user request:

- **Prototype spec only**: create a Markdown prototype specification with page map, page details, flows, roles, and open questions.
- **Clickable HTML prototype**: create a standalone HTML/CSS/JS prototype, using `assets/html-prototype-template/` as the baseline when appropriate.
- **Existing app implementation**: if the workspace already contains a frontend project, follow its stack and design conventions instead of copying the standalone template.

For clickable HTML prototypes, produce usable screens as the first view. Avoid marketing landing pages unless the user specifically asks for one. Include realistic sample data, clickable navigation, visible states, and enough role/process coverage for business confirmation.

For clickable HTML prototypes, deep-build the confirmed product surface. For each generated module, include the expected second-level interaction depth: list/detail, create/edit, configuration save, enable/disable, publish/open/close, import/export, approval/rollback, permission restriction, logs, and state feedback where relevant. Do not stop at a single representative page unless the user has explicitly approved a simplified demo.

For multi-terminal prototypes, generate separate prototype entries for each terminal. Do not place a management backend and APP/mini-program/H5 prototype side by side in the same working screen. Use clear independent files or folders, such as `admin.html`, `app.html`, `mini-program.html`, or `h5.html`, with an optional lightweight `index.html` only for choosing which terminal to open.

For management backend prototypes, apply `references/admin-backend-ui-interaction.md` by default and follow its PigX layout tokens closely. Use the PigX-style management shell before adding business content: 50px blue topbar, 220px white sidebar, 34px TagsView, `#F5F7FA` main background, white 8px-radius work areas, Element Plus-style query forms, action bars, right toolbar icon buttons, bordered tables, tags, dialogs, pagination, and permission-aware operations. Do not invent an unrelated backend visual theme unless the user explicitly asks to depart from PigX.

For mobile prototypes, apply `references/mobile-ui-interaction.md` first, then layer the platform supplement. Mobile prototypes should prioritize short task paths, thumb-friendly actions, strong feedback, focused screens, constrained data density, and platform-native navigation patterns.

For mobile HTML prototypes, treat the mobile standards as hard acceptance criteria, not visual suggestions. The prototype must look and behave like a mobile product rather than a desktop page inside a phone frame: use a phone viewport/device frame, top app bar, bottom navigation or platform-appropriate primary navigation, thumb-friendly primary actions, 44px minimum touch targets and 48px for high-frequency actions, card/list/detail/form/result patterns instead of dense desktop tables, safe-area aware bottom actions, and visible loading/success/error/empty/no-permission states.

For native APP prototypes, default to Android / Material Design 3 unless the user explicitly asks for iOS. The APP prototype must include Android status bar and bottom gesture/navigation area, Material-style app bar, navigation bar or drawer, at least one Material feedback component such as Snackbar/Dialog/Bottom Sheet/result state, explicit Back behavior for detail pages, sheets, dialogs, filters, and unfinished forms, and Android-safe spacing so controls do not sit in the system gesture area. Do not use iOS/Cupertino controls as the default APP style.

For all mobile terminals, including mini programs, mobile H5, mobile web, and native APP prototypes, default to the mobile technology palette in `references/mobile-ui-interaction.md` unless the user supplies brand colors or a different industry tone. Use a PigX-inspired blue primary (`#2E5CF6`), cyan support (`#06B6D4`), indigo extension (`#6366F1`), cool neutral text (`#0F172A/#334155/#64748B`), and light blue-white surfaces (`#F6F9FF/#FFFFFF/#D8E6FF`). Avoid muddy, low-saturation green/brown/beige/orange defaults that make the mobile prototype feel cheap or generic.

For mini program prototypes, ask during Stage 0 whether the user wants the default mobile technology palette or a WeChat-green / WeUI-native visual style. Recommend the default technology palette unless the user explicitly wants WeChat-native green, brand colors, or a scenario strongly tied to WeChat payment/authorization success semantics.

中文硬约束：移动端默认配色使用 `mobile-ui-interaction.md` 的“默认科技色与信息层级”，参考 PigX 蓝色主调：主色 `#2E5CF6`，辅助青 `#06B6D4`，扩展靛紫 `#6366F1`，文字使用冷灰层级，卡片/背景使用浅蓝白体系；热门/限制等普通状态用蓝/青标签，成功用绿色，警告用琥珀，失败/冲突/危险才用红色。不得默认使用土黄、棕橙、脏绿、米色等低质感色彩。

中文硬约束：如果终端类型是小程序，阶段零必须提示用户选择配色：1）默认移动端科技色（推荐）；2）微信绿/WeUI 原生风格。用户未选择前，默认建议科技色，但不得声称已确认微信绿。

## Draft Persistence

When the workflow needs to persist a draft, write or update Markdown files in the user's chosen workspace location. Recommended default:

- `prototype-generation/<project-name>-prototype-spec.md`
- `prototype-generation/<project-name>-prototype/` for HTML artifacts
- For multi-terminal HTML prototypes, create separate terminal entries inside the prototype folder, for example `admin.html` and `app.html`; keep `index.html` as an entry selector only if needed.

Perform completeness checks manually against `references/prototype-spec.md`.

## Completion Standard

Before claiming completion:

- Check that every confirmed page has purpose, primary user, displayed business information, available actions, empty/loading/error states when relevant, and navigation entry/exit.
- Check that every Stage 2 page/module has been generated as a real page/view/section. A module with only a menu item, only a query bar, or only a placeholder title does not count as generated.
- Check that generated buttons and primary actions open meaningful pages, dialogs, sheets, states, or feedback. Non-clickable primary actions must be listed as `[待确认]` or explicitly out of scope by user approval.
- Check that every critical workflow has a Mermaid flowchart or clickable path.
- Check that role-specific differences and data ranges are explicit.
- Check that `[待确认]` items are listed in an appendix or confirmation list.
- Check that the correct UI standard branch was loaded: management backend, mobile baseline, and any mini program/H5/native app supplement.
- For multi-terminal HTML prototypes, check that each terminal opens independently and is not visually merged with another terminal on the same screen.
- For mobile/APP HTML prototypes, check that the result satisfies the mobile hard criteria: phone viewport, platform navigation, touch target sizes, safe areas, Back behavior, mobile-appropriate list/card/detail/form/result patterns, and required states. If it resembles a desktop web page placed in a phone shell, revise it before delivery.
- For HTML prototypes, start a local server when needed and provide the URL; if it is a static file that works directly, provide the absolute file path.

## Boundaries

This skill can help with prototype exploration, prototype specs, page maps, interaction states, demo data, Mermaid process diagrams, HTML prototype generation, and handoff notes.

This skill does not replace formal requirements analysis, technical architecture, database schema design, API contract design, or production frontend engineering unless the user explicitly asks to extend the scope.
