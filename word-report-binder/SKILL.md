---
name: word-report-binder
description: "Merge Chinese Word report chapter files into a master catalogue/report document, normalize heading hierarchy and numbering, apply a report format profile, clean blank paragraphs/pages, and produce an audit for acceptance/performance-report binders. Use when the user asks to 组卷, 合并章节, 输出到目录页, 套用格式规范, or assemble Chinese验收/绩效/测试/项目报告 Word files."
metadata:
  short-description: 中文 Word 组卷、标题映射、套版和审计
---

# Word Report Binder

Use this skill for Chinese Word report binders where multiple chapter/page files must be assembled into a master report or catalogue document.

This skill treats the master catalogue/report document as the structure source. By default, read its Heading 1-4 entries in order, then automatically attach same-name content files. Do not hard-code a specific project's headings into the skill. Treat chapter and attachment files as content sources; the master catalogue/report structure controls final heading hierarchy, numbering, and formatting.

For a single Word document that only needs creation or formatting optimization, use `optimize-word-format` instead. This binder skill keeps the merge/title-mapping workflow; the reusable Chinese report formatting profile is also maintained there for non-binder tasks.

## Required Inputs

Before assembling, identify:

- Master/catalogue Word file, for example `目录页.docx`.
- Chapter/page Word files and attachment files. If explicit mapping is not provided, match files by the master catalogue's heading text after removing numbering and the file extension.
- Final output path. If overwriting the master/catalogue file, create one original backup and reuse it on reruns; do not create repeated backup files unless the user asks for per-run backups.
- Format authority, preferably a Markdown or JSON format profile extracted from a reference report.
- Master top-level headings supplied by the user, such as `一、...`, `二、...`, or inferred from the master catalogue document.

If the user does not provide the top-level headings, infer them from the master catalogue file first. Ask only if the catalogue has no usable headings or same-name files cannot be matched unambiguously.

## Assembly Rules

Read [references/binder-rules.md](references/binder-rules.md) before performing a merge. The non-negotiable rules are:

- Final Heading 1 entries come from the master top-level heading list.
- When mapping is not explicitly supplied, infer a Heading 1-4 catalogue tree from the master catalogue/report document and match each node to a same-name `.docx`, `.pdf`, `.png`, `.jpg`, or `.jpeg` file in catalogue order.
- Heading 1 nodes normally match same-name `.docx` chapter files. If a Heading 1 node has child nodes but no same-name file, keep it as a directory heading, such as `附件`.
- Once a catalogue node matches a same-name source file, treat that file as the complete content source for that node and do not process its child nodes by default.
- Heading 2-4 nodes can match Word, PDF, or image attachments. PDF files are rendered page by page into cached images and inserted under the matching heading.
- If a chapter file starts with a Heading 1 that matches or is semantically equivalent to its destination Heading 1, skip that repeated heading and insert its child content without demoting levels.
- If a chapter file starts with a Heading 1 that is a child section rather than the destination Heading 1, demote that heading to Heading 2 and demote its descendants accordingly.
- Final numbering and heading style must follow the master report/catalogue convention, not the source chapter convention.
- Preserve正文, tables, and images unless the user asks for rewriting. Only adjust hierarchy, numbering, formatting, duplicate headings, blank lines, and pagination issues.

## Format And QA Gate

After assembly, do not stop at content merging. Always run a format and structure check:

- Apply page setup, Heading 1-4, Normal正文, table text, figure captions, and image sizing from the format authority.
- Normalize direct run formatting, not only paragraph styles. Body text must not retain bold, italic, underline, color, or source character-style residue unless the format authority explicitly allows it.
- Center every paragraph that contains an inline image after assembly. Do not rely on image size alone; the image paragraph itself must be centered, and figure captions remain centered.
- For PDF attachments, render each PDF page as an image, cache by file hash, insert pages in source order, and center every inserted page image.
- Normalize table geometry as well as table text: align tables to the center, match known table profiles by header text, set table width, column widths, borders, header-row repeat, cell margins, vertical alignment, and table run fonts.
- Clean consecutive blank paragraphs, trailing empty paragraphs, and manual page breaks that create blank pages.
- Check Heading 1 count and titles against the supplied master heading list.
- Check heading-level drift, duplicate Heading 1 entries,正文 mistaken as headings, and nonconforming heading numbering.
- Check tables and images for centering, width/geometry conformance, and page overflow where rendering is available.
- Export to PDF when Word/LibreOffice is available and inspect page count and tail page text.
- Produce an audit result that states what was corrected and what remains unresolved.
- Keep formatting rules maintainable. If the user revises font, heading, paragraph, image, table, blank-line, or backup behavior, update this skill or its references/scripts instead of treating the correction as a one-off instruction.

For the detailed checklist, read [references/qa-checklist.md](references/qa-checklist.md).

## Automation

Prefer the helper script when the task fits a manifest-driven merge:

```bash
python scripts/bind_word_report.py --manifest manifest.json
```

When PDF attachments need to be rendered, prefer the Codex bundled Python runtime if available because it includes PDF rendering dependencies such as `pypdfium2`. The script also supports PyMuPDF (`fitz`) when installed.

See [references/manifest-format.md](references/manifest-format.md) for the manifest schema.

If the helper cannot preserve a complex document feature, use Word automation or direct OOXML editing, then still run the same QA gate.
