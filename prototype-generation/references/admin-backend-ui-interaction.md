# PigX 管理后台 UI 与交互规范提取

> 适用场景：基于当前 `pigx-ui` 管理后台，为新项目制作中高保真原型、后台信息架构、CRUD 页面、首页工作台与登录页。
> 来源目录：`E:\pigx\pigx-ui`

## 1. 产品气质

PigX 后台整体是典型企业级管理系统风格：密集、克制、效率优先。系统内页强调“左侧导航 + 顶部导航 + 多标签页 + 白色工作区 + 表格操作”的可扫描结构，登录页和首页工作台则允许更强的品牌化和卡片感。

新项目原型应遵循：

- 业务内页少装饰，优先表格、筛选、树、弹窗、抽屉等工作型组件。
- 视觉层级靠间距、边框、淡背景、主色按钮表达，不依赖大面积插画或营销式 Hero。
- 交互反馈轻量但明确：hover 微位移、focus 光晕、loading、确认弹窗、消息提示都要完整。
- 支持浅色/深色、中文/英文、桌面/移动端的基础切换。

## 2. 技术与组件基线

- 前端框架：Vue 3.5、Vite、TypeScript、Pinia。
- UI 组件：Element Plus 2.5.5。
- 图标：`@element-plus/icons-vue`、项目内 `SvgIcon`、`iconfont`、Font Awesome。
- 表格模式：原生 `el-table` + 自定义 `useTable` hook。
- 首页拖拽：`vuedraggable`。
- 布局：Element Plus `el-container`、`el-aside`、`el-header`、`el-main`、`el-scrollbar`。

原型工具中建议把 Element Plus 作为组件命名基准：Button、Input、Select、Table、Pagination、Dialog、Tree、Tag、Switch、Tooltip、Dropdown。

## 3. 设计令牌

### 3.1 字体

- 全局字体：`Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif`
- 全局字号：14px。
- 顶部/菜单/表格正文：14px。
- TagsView：12px。
- Dialog 标题：16px，600。
- Logo/系统标题：约 21.5px，700。
- 登录页品牌标题：约 36px，700。

### 3.2 色彩

浅色模式基础色：

| 用途 | 色值 |
|---|---|
| 默认主色变量 | `#409EFF` |
| 当前主题主色 | `#2E5CF6` |
| 登录页渐变蓝 | `#618EFF` -> `#0058FF` |
| 成功 | `#67C23A` |
| 警告 | `#E6A23C` |
| 危险 | `#F56C6C` |
| 信息 | `#909399` |
| 主文本 | `#303133` |
| 常规文本 | `#606266` |
| 次级文本 | `#909399` |
| 占位文本 | `#A8ABB2` |
| 页面背景 | `#F5F7FA` / `#F0F2F5` |
| 工作区背景 | `#FFFFFF` |
| 边框 | `#DCDFE6` / `#E4E7ED` / `#EBEEF5` |
| 表头背景 | `#FAFAFA` |

默认后台主题：

| 区域 | 背景 | 文本/激活 |
|---|---|---|
| 顶栏 | `#2E5CF6` | `#FFFFFF` |
| 侧栏 | `#FFFFFF` | `#505968` |
| 菜单激活背景 | `rgba(242,243,245,1)` | 600 字重 |

深色模式：

| 用途 | 色值 |
|---|---|
| 页面背景 | `#15202B` |
| 面板背景 | `#1E2732` |
| 深色卡片/输入 | `#273340` |
| 主文本 | `#E7E9EA` |
| 常规文本 | `#8B98A5` |
| 占位文本 | `#536471` |
| 边框 | `#38444D` |
| 深色主蓝 | `#1D9BF0` |
| hover 背景 | `#1D2A35` 或 `rgba(239,243,244,.1)` |

### 3.3 圆角

- 小圆角：4px。
- 默认圆角：8px。
- 弹窗/工作台卡片：12px。
- 大圆角：16px。
- 胶囊/圆形：9999px。

原型建议：

- 表单、按钮、菜单项、分页按钮默认 8px。
- 弹窗和首页卡片可用 12px。
- TagsView 使用 2px 或项目的页签造型。

### 3.4 阴影

- `shadow-xs`: 轻微容器阴影。
- `shadow-sm`: hover、侧栏、普通按钮浮起。
- `shadow-lg`: Message、下拉、较高层级浮层。
- `shadow-xl`: Dialog。

内页不要堆叠重阴影，工作区主要靠白底、浅边框、轻阴影区分。

### 3.5 动效

- 快速：150ms。
- 标准：200ms。
- 慢速：300ms。
- 曲线：`cubic-bezier(0.4, 0, 0.2, 1)`。

常用动效：

- 按钮 hover：上移 1px + 小阴影。
- 菜单 hover：右移 2px。
- 横向菜单 hover：上移 2px。
- Dialog 打开：从上方 -30px、0.95 scale 到原位。
- Message：从上向下滑入。
- 支持 `prefers-reduced-motion`，减弱动画。

## 4. 页面骨架

### 4.1 标准后台布局

默认/经典布局结构：

1. 左侧菜单：220px，英文环境可到 250px；折叠后 64px。
2. 顶部栏：50px。
3. TagsView：34px。
4. 主内容区：背景 `#F5F7FA`，内部页面容器 12px padding。
5. 内容工作区：白底、8px 圆角、轻阴影，填满可用高度。

主内容高度规则：

- 有 TagsView 且非 classic 布局：主区域减 85px。
- 无 TagsView：主区域减 51px。
- 支持页面级全屏，隐藏侧栏/顶栏/TagsView。

### 4.2 响应式规则

- 小于 1000px：侧栏改为移动端抽屉式，宽 220px，叠加全屏遮罩。
- 小于 768px：隐藏面包屑，搜索弹窗宽度约 80%。
- 小于 576px：分页隐藏页码和跳转，仅保留核心翻页/大小信息，并居中。
- 小于 800px：Dialog 宽度调整为 90%，全屏 Dialog 为 100%。
- 移动端表单 label 改为顶部左对齐，内容区域取消左 margin。

## 5. 导航规范

### 5.1 顶栏

- 高度 50px。
- 左侧可显示 Logo、面包屑或横向菜单。
- 右侧为更多功能、用户菜单、设置等操作。
- 顶栏背景使用主题主色，文字白色。
- 顶栏图标按钮使用 40px 宽点击区，透明度 0.8，hover 到 1。

### 5.2 侧边菜单

菜单项：

- 一级菜单高度 48px。
- 二级及更深层菜单高度 40px。
- 横向内边距 16px。
- 外边距 4px 8px。
- 圆角 8px。
- 字号 14px。
- 图标 16px，固定 20px 宽，居中。
- hover：激活背景色 + 右移 2px。
- active：激活背景色 + 600 字重。

缩进：

- 二级：左 padding 32px。
- 三级：左 padding 48px。
- 四级及更深：左 padding 64px。

行为：

- 支持手风琴模式，默认只展开一个菜单组。
- 支持折叠，折叠后只保留图标。
- 移动端路由切换后自动收起侧栏。
- 外链菜单在新窗口/iframe 规则下打开。

### 5.3 面包屑

- 只在 defaults/columns 类布局显示，classic/transverse 中隐藏。
- 当前项不可点击，历史项可点击跳转。
- 可配置是否展示图标，默认不展示。
- 小屏隐藏面包屑文字。

### 5.4 TagsView 多标签

基础样式：

- 高度 34px。
- 标签高度 26px。
- 字号 12px。
- 默认边框 `#EBEEF5`，2px 圆角。
- 活跃标签：主色背景、白色文字。
- hover：浅主色背景，主色文字和边框。

功能：

- 访问页面自动加入标签。
- 支持固定标签，不允许关闭。
- 支持刷新当前、关闭当前、关闭其他、关闭全部、当前页全屏、收藏。
- 支持中键关闭。
- 支持右键上下文菜单。
- 支持拖拽排序，并写入 Session。
- 支持动态路由根据参数生成多标签。
- 支持滚轮横向滚动，切换路由后自动滚动到当前标签。

原型中建议把 TagsView 设计为后台标配，不要当作浏览器标签的完全复刻，而是“工作台任务上下文”。

## 6. 内容页模板

### 6.1 标准 CRUD 列表页

页面结构：

1. 外层 `.layout-padding`：绝对铺满主区域。
2. 内层 `.layout-padding-auto`：12px padding。
3. 工作区 `.layout-padding-view`：白底、8px 圆角、轻阴影、高度 100%。
4. 顶部搜索区：内联表单。
5. 操作栏：左侧新增/导入/删除，右侧工具栏。
6. 数据表格：带 loading、border、居中表头/内容、溢出 tooltip。
7. 分页：右下，顶部 16px 间距。

搜索区规范：

- 使用 `el-form inline`。
- 每个字段宽 240px。
- 表单项右间距 12px。
- 支持回车查询。
- 查询按钮：primary + Search 图标。
- 重置按钮：default + Refresh 图标。
- 可通过右上工具栏隐藏/显示。

操作栏规范：

- 高度随按钮自然撑开，底部间距 8px。
- 主操作用 primary，如“新增”。
- 次级批量操作可用 plain primary，如“导入”“删除”。
- 危险动作在当前项目里仍常使用 primary text/按钮，但新项目建议删除按钮使用 danger 或二次确认增强风险感。
- 权限控制使用 `v-auth` 思路，原型中要体现“无权限则不显示按钮”。

表格规范：

- `el-table border`。
- loading 状态覆盖表格。
- 选择列宽 40px。
- 序号列宽 60px，常固定左侧。
- 关键标识列可固定左侧。
- 操作列固定右侧，宽度按按钮数量设置，如 200px。
- 表头和单元格默认居中。
- 长文本使用 `show-overflow-tooltip`。
- 状态使用 Switch、Tag、DictTag。
- 行内操作使用 text button + 图标。

分页规范：

- 默认：`total, sizes, prev, pager, next, jumper`。
- 页码按钮 32px，8px 圆角。
- 页码数量：5。
- 每页数量：`[1, 10, 20, 50, 100, 200]`。
- 背景分页开启。
- hover：浅主色底 + 主色文字。
- active：主色底 + 白字 + 小阴影。

### 6.2 左树右表页

用于组织、部门、分类、字典等：

- 使用可拖拽分栏 `splitpanes`。
- 左侧树默认 15%-30% 宽。
- 右侧列表占剩余空间。
- 分栏间距：8px。
- 左树工作区和右表工作区都使用 `.layout-padding-view` 白底圆角。
- 左侧树顶部放搜索框，宽度 90%，右侧可放展开/折叠菜单。
- 树默认展开全部，节点点击驱动右侧查询。
- 树节点可自定义：主标题 + 代码/描述 + hover 才出现的操作按钮。

### 6.3 首页工作台

首页不是 CRUD，而是可定制仪表盘：

- 使用多列布局，默认 `[7,7,10]` 或支持 `[12,6,6]`、`[24,16,8]`、`[24]`。
- 卡片白底/overlay 背景、12px 圆角、浅边框。
- 卡片之间间距较小，强调信息密度。
- 可进入“自定义”模式。
- 自定义模式中，卡片显示半透明遮罩、拖拽手柄和删除按钮。
- 右侧出现 360px 组件面板，可添加组件、选择布局、恢复默认。
- 小屏下组件面板覆盖底部区域。

### 6.4 登录页

登录页更品牌化：

- 整屏背景图片，根据浅色/深色、桌面/移动端切换。
- 登录卡片桌面宽约 560px，最小高 690px。
- 桌面卡片圆角 16px，移动端无圆角无阴影。
- 桌面卡片内边距约 120px 横向、80px 纵向。
- Logo 56x56，内部图标 36x36。
- 登录卡片动画：0.6s 从下方进入。
- 登录按钮全宽，蓝色渐变，hover 上移 1px。
- 输入框 focus 使用蓝色边框 + 3px 光晕。
- 支持密码、手机号、注册、忘记密码、过期密码、租户选择、社交登录。

## 7. 组件规范

### 7.1 Button

- 图标 + 文字之间 6px 间距。
- 常规按钮 8px 圆角。
- 非 text/link 按钮 hover 上移 1px、加阴影。
- primary/success/warning/danger 分别使用对应语义色阴影。
- text/link 按钮保持轻量，无阴影无位移。
- 小按钮图标 12px，常规图标 14px。
- 圆形图标按钮用于工具栏，如搜索开关、导出、刷新。

按钮语义：

- 主流程：primary。
- 次级流程：default 或 plain primary。
- 行内编辑：text primary。
- 删除：项目中多为 text primary + 确认弹窗；新原型建议 danger text 或 danger plain。
- 提交中：按钮 disabled 或 loading，避免重复点击。

### 7.2 Input / Textarea / Select

- 默认宽度在内联搜索中为 240px。
- 输入组件 8px 圆角。
- hover：边框变深。
- focus：主色边框 + 3px 浅蓝光晕。
- clearable 常用于搜索和表单输入。
- 文本域 focus 同样使用主色边框和光晕。
- 数字输入框宽度 100%。
- 日期输入宽度 100%。
- 下拉最大高度约 274px，自动完成建议最大 280px。

### 7.3 Form

- 弹窗表单常用 label-width 90px。
- 表单网格：`el-row gutter=20`，两列 `el-col span=12`。
- 表单项底部间距常用 20px。
- 校验触发主要为 blur，邮箱可 blur/change。
- 提交前设置 loading，校验失败取消 loading。
- 新增成功/编辑成功后关闭弹窗并刷新列表。
- 编辑模式下不可编辑字段 disabled，如用户名。
- 对脱敏字段使用占位值时，提交前清除占位字段。

### 7.4 Dialog

- 居中显示。
- 遮罩带 4px blur。
- Dialog 圆角 12px，`shadow-xl`，浅边框。
- Header padding 16px 20px，标题 16px/600。
- Body padding 24px，最大高度 `calc(90vh - 150px)`，超出纵向滚动。
- Footer padding 12px 20px。
- Footer 按钮最小宽度 88px，padding 10px 24px。
- 关闭按钮 hover 旋转 90deg 并变主色。
- 表单弹窗禁止点击遮罩关闭：`close-on-click-modal=false`。
- 支持 draggable。
- 小于 800px 宽度 90%。

### 7.5 Table

- 表头背景浅灰，字重 600。
- 表格文本使用主文本色。
- 固定列阴影弱化。
- text button 在表格中 padding 为 0。
- 操作按钮横向排列，必要时用 tooltip 解释禁用原因。
- 批量选择时需要禁选规则，如 admin 不可选。
- Switch 改变状态后立即请求接口，成功后提示并刷新。

### 7.6 Tree

- 默认节点高在深色模式中约 32px。
- 支持搜索。
- 支持展开/折叠菜单。
- 当前节点高亮。
- 节点 hover 可显示操作按钮。
- 对无权限节点用锁图标 + tooltip 说明。

### 7.7 Message / MessageBox

Message：

- 默认持续 3000ms。
- error 持续 2000ms。
- 显示关闭按钮。
- 距顶部 offset 20px。
- 14px 内容，1.5 行高。
- padding 14px 20px。
- 8px 圆角。
- 带边框、阴影、背景轻透明、blur。
- success/warning/error/info 使用对应语义色文字，500 字重。

MessageBox：

- 标题使用统一 i18n 文案。
- confirm/cancel 使用统一按钮文案。
- 删除等破坏性操作必须先 confirm，类型 warning。
- 小屏宽度 80%。

### 7.8 Toolbar

右上工具栏为圆形图标按钮组：

- 搜索区显隐。
- 导出。
- 刷新。
- 可插槽扩展。
- 每个按钮必须有 tooltip。
- 导出按钮根据权限判断显示。

### 7.9 Tag / Switch / Tooltip

- 字典值统一用 `dict-tag` 显示。
- 多角色、多岗位等数组信息用多个 `el-tag`。
- Switch 用于状态即时切换，需接口成功提示。
- 禁用操作需要 tooltip 解释原因。

## 8. 关键交互流程

### 8.1 查询

1. 用户输入筛选条件。
2. 点击查询或按 Enter。
3. 当前页重置为 1。
4. 表格 loading。
5. 请求返回后更新 records 和 total。
6. loading 结束。

### 8.2 重置

1. 调用表单 `resetFields`。
2. 清空额外筛选字段，如树节点 id。
3. 重新查询第一页。

### 8.3 删除

1. 点击删除。
2. 弹出 warning confirm。
3. 取消则直接返回。
4. 确认后请求删除。
5. 成功提示。
6. 刷新列表。
7. 失败显示错误消息。

### 8.4 新增/编辑

1. 点击新增/编辑。
2. 打开 Dialog。
3. 新增：重置表单，加载字典/角色/部门等基础数据，可设置默认选项。
4. 编辑：设置 id，加载详情，映射复杂字段，如角色列表转 id 数组。
5. 点击确认：先锁定 loading，防重复点击。
6. 表单校验。
7. 请求新增或编辑。
8. 成功关闭 Dialog。
9. 通知父页面刷新，编辑通常保持当前页。

### 8.5 状态切换

1. 用户切换 Switch。
2. 清除不应提交的脱敏字段。
3. 调用更新接口。
4. 成功提示。
5. 刷新列表。

### 8.6 导入/导出

- 导入通过 UploadExcel 弹窗，支持模板下载与上传完成刷新。
- 导出从右上工具栏触发，根据当前 queryForm 和选中 ids 下载文件。
- 导出权限不满足时按钮不显示。

### 8.7 TagsView

- 路由进入后自动添加标签。
- 点击标签跳转。
- 当前标签可刷新。
- 标签关闭后自动跳到相邻标签。
- 固定标签不能关闭。
- 右键菜单根据当前标签状态隐藏部分动作。
- 动态路由以参数区分标签实例。

### 8.8 工作台自定义

1. 点击“自定义”。
2. 工作台进入拖拽状态。
3. 卡片出现遮罩和删除按钮。
4. 右侧打开组件面板。
5. 用户添加、删除、拖拽、切换布局。
6. 点击完成后保存到 LocalStorage。
7. 恢复默认会清除缓存并刷新页面。

## 9. 原型页面清单建议

为新项目制作原型时，建议至少覆盖：

- 登录页：租户/账号密码/手机号/社交登录入口。
- 首页工作台：快捷入口、待办、图表、日志、公告。
- 标准列表页：搜索、操作栏、表格、分页、右上工具栏。
- 左树右表页：组织/分类管理。
- 新增编辑弹窗：两列表单、校验、loading、确认取消。
- 详情页或抽屉：只读信息、流程记录、操作日志。
- 字典/状态管理页：树节点 hover 操作、右侧明细。
- 权限敏感页：按钮权限隐藏、禁用 tooltip、不可选择行。
- 移动端关键态：侧栏抽屉、表单单列、分页简化、Dialog 90%。
- 深色模式关键态：列表、弹窗、表单、菜单、分页。

## 10. 新项目落地建议

- 先建立主题令牌：颜色、圆角、阴影、动效、布局尺寸。
- 原型中保留 TagsView 和右上工具栏，这是该后台的核心交互习惯。
- CRUD 页面优先统一模板，不要每个页面重新设计搜索区和操作栏。
- 表单弹窗优先两列，字段超过 12 个时考虑分组、Tabs 或抽屉。
- 删除、批量删除、状态切换都必须有明确确认/反馈。
- 对权限场景在原型中直接表现：无权限隐藏，禁用需说明原因。
- 移动端不追求完整表格体验，优先保障导航、查询、详情、审批类关键任务可完成。
- 深色模式不是简单反色，要单独定义背景、边框、文本、hover 和高亮。

## 11. 可直接复用的尺寸速查

| 项目 | 规格 |
|---|---|
| 顶栏高度 | 50px |
| TagsView 高度 | 34px |
| TagsView 标签高度 | 26px |
| 侧栏展开宽度 | 220px |
| 英文侧栏宽度 | 250px |
| 侧栏折叠宽度 | 64px |
| 移动端侧栏宽度 | 220px |
| 内容区 padding | 12px |
| 页面工作区圆角 | 8px |
| 菜单项高度 | 48px |
| 子菜单项高度 | 40px |
| 内联搜索控件宽度 | 240px |
| Dialog body padding | 24px |
| Dialog footer 按钮最小宽 | 88px |
| 分页按钮 | 32x32px |
| 左树右表间距 | 8px |
| 首页自定义面板宽度 | 360px |
| 登录卡桌面宽度 | 560px |
| 登录卡桌面最小高 | 690px |

## 12. 主要源码参考

- 全局主题：`src/theme/app.scss`
- Element Plus 覆盖：`src/theme/element.scss`
- 深色模式：`src/theme/dark.scss`
- 布局容器：`src/layout/component/main.vue`、`src/layout/component/aside.vue`、`src/layout/navBars/index.vue`
- 菜单：`src/layout/navMenu/vertical.vue`
- TagsView：`src/layout/navBars/tagsView/tagsView.vue`、`contextmenu.vue`
- 主题配置：`src/stores/themeConfig.ts`
- 表格 hook：`src/hooks/table.ts`
- 分页组件：`src/components/Pagination/index.vue`
- 右上工具栏：`src/components/RightToolbar/index.vue`
- 树查询组件：`src/components/QueryTree/index.vue`
- 用户列表/表单样例：`src/views/admin/system/user/index.vue`、`form.vue`
- 字典树样例：`src/views/admin/dict/index.vue`
- 登录页：`src/views/login/index.vue`、`src/theme/login.scss`
- 首页工作台：`src/views/home/widgets/index.vue`
