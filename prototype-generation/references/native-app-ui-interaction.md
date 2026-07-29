# 原生 APP UI 与交互补充规范（Android 优先）

## 定位

本规范叠加在 `mobile-ui-interaction.md` 之上，适用于 Android 原生 APP 或拟原生 APP 的高保真 HTML 原型。除非用户明确要求 iOS，本技能生成 APP 原型时默认按 Android / Material Design 3 的设计约束执行。

生成 APP 原型时，应同时遵守：

1. `frontend-design` 通用前端质量原则。
2. `mobile-ui-interaction.md` 移动端通用规范。
3. 本文件的 Android / Material Design 3 补充规范。

## 参考来源

- Android Developers：Material Design for Android（https://developer.android.com/develop/ui/views/theming/look-and-feel）
- Android Developers：Android Design & Plan（https://developer.android.com/design）
- Android Developers：Accessibility（https://developer.android.com/guide/topics/ui/accessibility/apps）
- Material Design 3：组件、导航、触摸目标与无障碍（https://m3.material.io/）

## 平台特征

- Android APP 适合高频、长期、复杂任务，允许比小程序/H5 更完整的信息架构。
- 应采用 Material Design 3 的组件和交互语言，包括 App bar、Navigation bar、Navigation drawer、FAB、Card、List、Dialog、Bottom sheet、Snackbar 等。
- 应尊重 Android 系统导航：Back、Home、Overview，以及手势导航。
- 应支持系统状态栏、导航栏、显示挖孔、边到边布局和安全 Insets。
- 应考虑深色模式、动态色、无障碍、系统字体缩放和 TalkBack。

## Android / Material 设计原则

- 使用 Material 主题建立颜色、字体、形状、组件状态和动效的一致性。
- 主操作优先使用明确的 Filled Button 或 FAB；FAB 只承载当前页面最核心的正向动作。
- 顶部 App bar 承载页面标题、搜索、返回和关键操作，不堆放过多按钮。
- 底部 Navigation bar 用于 3-5 个顶级目的地；不把二级功能放成底部导航。
- Navigation drawer 适合复杂模块或低频目的地，不和过多顶级导航模式混用。
- Card 用于承载一组相关信息，不把所有页面区块都卡片化。
- 动效必须表达状态变化和空间关系，避免纯装饰动画。

## 系统栏与边到边

- 原型应体现 Android 状态栏和底部系统导航区域，尤其是手势导航下的底部手势条。
- 支持 edge-to-edge 的视觉表达：背景和滚动内容可以延伸到系统栏下方，但文字、按钮和关键交互必须避开 Insets。
- 不要把可点击按钮、拖拽控件、底部主操作放到系统手势区域。
- 顶部内容要避开状态栏和挖孔；图片或背景可延伸，关键文本和按钮必须内缩。
- 底部固定操作区要给导航栏/手势条预留安全距离。

## 导航与返回

- Android 返回行为必须清楚：系统 Back 返回上一层、关闭弹层、退出选择模式或收起键盘。
- 表单未保存时，Back 应触发“放弃修改”确认。
- 弹窗、Bottom sheet、搜索页、筛选面板都必须定义 Back 后的关闭行为。
- 关键流程不要只依赖手势；必须有可见的返回、取消或关闭入口。
- 多层流程可使用 Top app bar 返回、步骤条、结果页或任务完成反馈。

## 常用组件约束

- Top app bar：标题简短；右侧只放搜索、筛选、更多等高价值动作。
- Bottom navigation：顶级模块 3-5 个；文字和图标都要清楚；当前项明确高亮。
- FAB：只用于新增、创建、扫描、主要提交等单一主操作。
- Bottom sheet：用于筛选、选择、更多操作、局部任务，不替代完整详情页。
- Dialog：用于危险确认、不可逆操作、权限说明和阻塞式决策。
- Snackbar：用于轻量反馈，可带一个撤销/查看动作。
- List：主标题、摘要、状态、时间/责任人清晰；必要时进入详情处理。
- Card：用于摘要指标、任务卡、内容分组，避免过度装饰。
- Switch/Checkbox/Radio：状态切换必须有即时反馈，高风险切换需确认。

## 触控与无障碍

- 触摸目标至少 48dp x 48dp，即使视觉图标本身更小。
- 正文不小于 12sp，常规业务正文建议 14-16sp，并支持系统字体缩放。
- 文本与背景对比度至少满足 4.5:1；图标、边框等非文本元素至少有清晰对比。
- 图标按钮必须有可理解的文字含义；原型中用 tooltip/说明或邻近文字表达。
- 不要让滑动手势成为唯一操作方式，必须提供可见按钮或菜单入口。
- 重要状态不能只靠颜色表达，必须配合文字、图标或标签。

## 权限与系统能力

需要相机、定位、通知、文件、通讯录、蓝牙等权限时，原型必须先说明业务用途，再展示系统授权或授权失败后的状态。

常见系统能力：

- 扫码/相机：扫码登录、扫码核验、拍照上传。
- 定位：签到、附近门店、外勤轨迹。
- 通知：待办提醒、审批结果、异常预警。
- 文件：上传附件、下载报告、分享文件。
- 离线/弱网：草稿、本地缓存、同步中、同步失败、重试。

## 状态与反馈

- Loading：列表、详情、提交、上传、同步都应有加载状态。
- Success：保存、提交、同步、上传成功要有明确反馈。
- Error：网络失败、权限失败、校验失败、系统异常要可恢复。
- Empty：无数据时给出下一步，例如新建、刷新、联系管理员。
- Offline：无网络或弱网时，说明可继续草稿还是必须联网。
- Partial success：批量上传/同步部分失败时，显示成功数量、失败数量和重试入口。

## 视觉与布局

- Android APP 原型优先使用 Material 3 风格：清晰层级、圆角、适度阴影、明确状态色。
- APP 原型默认采用 `mobile-ui-interaction.md` 中的“默认科技色与信息层级”配色：参考 PigX 蓝色主调，以 `#2E5CF6` 为主色，辅以 `#06B6D4` 青色和 `#6366F1` 靛紫，搭配 `#0F172A/#334155/#64748B` 冷灰文字层级、`#F6F9FF/#FFFFFF/#D8E6FF` 页面与卡片体系。除非业务品牌或用户明确指定其他风格，避免低饱和、发灰、偏土的绿色/棕色/米色/橙色作为默认主视觉。
- 使用 360/393/412px 等 Android 常见手机宽度进行原型展示。
- 支持深色模式的关键页面状态，至少保证主导航、列表、表单、弹窗在深色下可读。
- 避免 iOS 风格强烈的控件作为默认样式，例如 Cupertino 式导航、iOS 风格分段控件和 iOS 风格弹窗，除非用户明确要求跨平台或 iOS。
- 品牌化可以存在，但不能覆盖 Material 组件语义和 Android 导航习惯。

## 原型必须体现

- Android 手机容器或手机视口，包含状态栏和底部系统导航/手势区。
- Top app bar、Bottom navigation 或 Navigation drawer 中至少一种主导航模式。
- 一个完整高频核心流程：列表/详情/操作/结果。
- 至少一个 Material 反馈组件：Snackbar、Dialog、Bottom sheet 或 Result 状态。
- 权限、弱网、无权限、空数据、提交失败中的至少两个关键状态。
- Back 行为说明，尤其是表单未保存、弹层关闭、流程中断。

## iOS 差异处理

如果用户明确要求 iOS 或双端 APP：

- 保留本文件作为 Android 约束。
- 另行补充 iOS/Human Interface Guidelines 差异，不要混用为同一套控件。
- 原型说明中标注哪些页面是 Android 默认，哪些需要 iOS 适配。
