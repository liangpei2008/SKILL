# Manifest Format

Use a JSON manifest to keep binder assembly deterministic.

The simplest manifest can rely on catalogue-driven auto matching:

```json
{
  "master": "E:/path/组卷目录页.docx",
  "output": "E:/path/组卷目录页.docx",
  "chapter_dir": "E:/path/组卷文件",
  "cache_root": "E:/path/组卷文件/.binder-cache",
  "recursive": true,
  "backup": true,
  "backup_strategy": "once",
  "renumber_headings": true
}
```

In this mode, the helper reads Heading 1-4 entries from `master` in order and matches each node to a same-name `.docx`, `.pdf`, `.png`, `.jpg`, or `.jpeg` file in `chapter_dir`. Numbering prefixes and file extensions are ignored during matching. PDF files are rendered page by page into cached images and inserted under the matching heading.

For full explicit control, provide `top_headings` and `chapters`:

```json
{
  "master": "E:/path/目录页.docx",
  "output": "E:/path/目录页.docx",
  "format_profile": "E:/path/格式规范.md",
  "backup": true,
  "backup_strategy": "once",
  "renumber_headings": true,
  "top_headings": [
    "一、总体进展情况",
    "二、项目主要内容的完成情况"
  ],
  "image_width_cm": 16.13,
  "table_profiles": [
    {
      "contains": ["序号", "考核指标", "完成情况", "是否已完成"],
      "widths_cm": [0.94, 2.89, 4.17, 1.74, 2.55, 2.73],
      "border": {"style": "none", "size": 0, "color": "auto"}
    }
  ],
  "chapters": [
    {
      "title": "一、总体进展情况",
      "source": "E:/path/总体进展情况.docx"
    },
    {
      "title": "二、项目主要内容的完成情况",
      "source": "E:/path/项目主要内容的完成情况.docx"
    }
  ]
}
```

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| `master` | yes | Catalogue/master Word file used as the style and destination skeleton. |
| `output` | yes | Final report path. May equal `master`; create backup first when overwriting. |
| `chapter_dir` | no | Directory for automatic same-name chapter matching. Defaults to the `master` file's directory. |
| `cache_root` | no | Cache directory for rendered PDF page images. Defaults to `.binder-cache` beside the output file. |
| `recursive` | no | Defaults to true. Recursively search `chapter_dir` for same-name chapter and attachment files. |
| `format_profile` | no | Markdown/JSON format authority. Current helper uses the default Chinese绩效报告 profile unless extended. |
| `backup` | no | Defaults to true when output equals master. |
| `backup_strategy` | no | `once` by default: create/reuse one `_原始备份.docx`; `timestamp`: create a new timestamped backup each run; `none`: do not backup. |
| `renumber_headings` | no | When true, normalize Heading 2-4 numbering to the default Chinese report pattern. |
| `image_width_cm` | no | Inline image width after assembly. The helper also centers every paragraph containing an image. |
| `table_profiles` | no | Optional table profiles matched by header keywords. Each profile can set `widths_cm` and `border`; built-in defaults are based on the extracted comprehensive performance report format. |
| `top_headings` | no | Final Heading 1 list. If omitted, infer from the master catalogue/report document's Heading 1 entries. |
| `chapters` | no | Each item maps one source file to one top-level destination heading. If omitted, auto-match same-name Word/PDF/image files by inferred catalogue tree. |

`chapters[].title` should match one entry in `top_headings`.
