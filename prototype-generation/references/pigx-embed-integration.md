# PIGX 双模式嵌入规范

本规范适用于可独立运行、后续可能通过 iframe 归并到 PIGX/PigX 的 PC 管理后台 HTML 原型。目标是保留完整独立演示能力，同时避免嵌入 PIGX 后出现两套顶部栏、两套左侧菜单或人工拆分页面。

## 交付契约

同一份静态产物必须支持两个入口形态：

```text
# 独立演示：显示原型顶部栏、侧栏、TagsView 和内容
index.html

# PIGX 嵌入：隐藏原型外壳，只显示业务内容
index.html?embed=1
```

如果原型使用 Hash 路由，查询参数必须放在 `#` 之前：

```text
index.html?embed=1#/resource/person
```

如果使用普通查询参数定位页面，可采用：

```text
index.html?embed=1&view=person-list
```

不得写成 `index.html#/resource/person?embed=1`，因为此时 `URLSearchParams(location.search)` 无法读取 Hash 后的参数。

## 实现规则

1. 在页面初始化早期读取 `embed` 参数，并在 `html` 或 `body` 上添加稳定状态，例如 `data-embed="1"` 或 `.is-embedded`，避免加载完成后才隐藏外壳造成闪烁。
2. 为原型外壳使用明确选择器，例如 `.prototype-topbar`、`.prototype-sidebar`、`.prototype-tags`、`.prototype-breadcrumb`；不要用宽泛选择器误隐藏业务页面自己的工具栏或页签。
3. 嵌入模式仅隐藏全局外壳。查询区、操作栏、业务页签、表格、分页、详情、弹窗、抽屉、Toast、角色差异和样例数据必须保留。
4. 嵌入模式下主内容取消侧栏占位和外层固定宽度，填满 iframe 视口。检查横向溢出、双重滚动、固定定位弹层和 Toast 的位置。
5. 独立模式与嵌入模式必须复用同一份页面、状态和交互代码。不得复制右侧 DOM 形成第二套页面，不得为嵌入而删除独立模式菜单。
6. 所有 CSS、JS、图片使用相对路径或明确的部署基路径；从 PIGX iframe 打开深层页面时不能依赖宿主页面的相对路径。
7. 如果 PIGX 为不同菜单配置不同页面入口，每个入口必须能直接定位到对应业务视图，刷新后仍停留在该视图。
8. 现有前端项目已有布局/路由机制时，在原布局上增加嵌入状态；不要为了套用静态模板重写项目架构。

最小实现示例：

```html
<script>
  if (new URLSearchParams(location.search).get('embed') === '1') {
    document.documentElement.dataset.embed = '1';
  }
</script>
```

```css
html[data-embed="1"] .prototype-topbar,
html[data-embed="1"] .prototype-sidebar,
html[data-embed="1"] .prototype-tags,
html[data-embed="1"] .prototype-breadcrumb {
  display: none;
}

html[data-embed="1"] .prototype-main {
  width: 100%;
  margin: 0;
  min-height: 100vh;
}
```

## 菜单映射清单

PIGX-ready 原型交付目录必须包含 `manifest.json`。最小结构：

```json
{
  "projectId": "customer-a",
  "name": "客户业务原型",
  "version": "1.0.0",
  "standaloneEntry": "index.html",
  "embedParameter": "embed=1",
  "menus": [
    {
      "parent": "资源管理",
      "name": "人员列表",
      "entry": "index.html?embed=1&view=person-list",
      "sort": 1
    }
  ]
}
```

`manifest.json` 只描述建议的菜单映射，不替代 PIGX 的角色授权。归并时仍需在 PIGX 菜单管理中创建菜单、配置“嵌入”，并在角色管理中分配菜单/按钮权限。

默认部署约定：

```text
prototype-host/apps/<project-id>/<version>/pc/
```

## 交付说明

最终回复或原型交付说明中必须同时列出：

- 独立演示 URL。
- 带 `?embed=1` 的 PIGX 嵌入 URL。
- `manifest.json` 路径。
- 建议的 PIGX 菜单层级。
- 哪些权限或数据范围仍需在 PIGX 中配置。

## 验收

- 无 `embed` 参数：顶部栏、侧栏、导航和内容均正常。
- `?embed=1`：顶部栏、侧栏、TagsView、外层面包屑均隐藏，业务内容正常铺满。
- 两种模式的核心按钮、路由、弹窗、抽屉、Toast、筛选、分页和样例数据一致可用。
- 嵌入深链接刷新后仍能打开目标业务视图。
- iframe 中无重复导航、横向滚动、资源 404 或弹层被裁切。
- `manifest.json` 中的每个菜单入口都能打开对应页面。
