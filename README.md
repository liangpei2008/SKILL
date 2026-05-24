# SKILL 技能库

这个仓库用于集中管理 Codex 本地技能。仓库根目录不直接放单个技能文件，每个技能必须使用独立目录，并且目录名与技能名保持一致。

## 目录规范

```text
skill-name/
  SKILL.md
  agents/openai.yaml
  references/
  scripts/
  assets/
```

当前技能：

- `enterprise-admin-backend`：企业级管理后台、ERP、工单、待办、通知、审批、列表详情页面的通用构建规范。

## 命名规范

- 技能目录使用小写字母、数字和连字符。
- 技能目录名应与 `SKILL.md` frontmatter 中的 `name` 保持一致。
- 一个技能一个目录，后续新增技能不要放到仓库根目录。

## 安装方式

将需要使用的技能目录复制或同步到本机 Codex 技能目录，例如：

```powershell
Copy-Item -Recurse .\enterprise-admin-backend C:\Users\Administrator\.codex\skills\
```
