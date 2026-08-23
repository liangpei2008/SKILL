---
name: optimize-word-format
description: "Create, format, or optimize Word documents using a reusable Chinese report style profile. Use when the user asks to 优化Word文档格式, 新建Word并套版, 套用绩效报告格式, 统一标题/正文/表格/图片/图题格式, or format a Chinese验收/绩效/项目报告 without merging chapters. For multi-file report binding/组卷, use word-report-binder instead."
metadata:
  short-description: 优化 Word 文档格式
---

# 优化Word文档格式

Use this skill when a Chinese Word report needs the same formatting profile that was extracted from the comprehensive performance evaluation report, but the task is not primarily a multi-file binder/merge.

This skill covers three common cases:

- Create a new `.docx` report and apply the report format profile.
- Optimize an existing `.docx` without rewriting the content.
- Normalize headings, body text, tables, images, figure/table captions, blank paragraphs, and page setup in a single Word document.

If the user asks to assemble multiple chapter files into a master catalogue/report, route to `word-report-binder`; this skill can still supply the shared formatting rules.

## Format Profile

Read [references/format-profile.md](references/format-profile.md) before creating or formatting a report. The profile includes:

- page setup;
- Heading 1-4 typography and numbering convention;
- body paragraph typography;
- table text and table geometry rules;
- image width and image paragraph centering;
- figure/table caption recognition, leading-space cleanup, and centering.

## Workflow

For existing `.docx` formatting, prefer the helper script:

```bash
python scripts/apply_report_format.py --input input.docx --output output.docx
```

Use `--in-place` only when the user explicitly wants the same file overwritten or the target is already clear:

```bash
python scripts/apply_report_format.py --input report.docx --in-place
```

The script produces an adjacent `.format-audit.json` file. Inspect the audit before reporting completion.

For newly created reports, generate the Word document using normal document tooling, then run the same formatting pass before delivery.

## QA Gate

After formatting, check [references/qa-checklist.md](references/qa-checklist.md). Do not stop after applying styles only: direct run formatting, image paragraph alignment, caption leading spaces, and table geometry must also be checked.
