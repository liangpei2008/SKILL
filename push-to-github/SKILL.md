---
name: push-to-github
description: "Push local Codex skills to a GitHub-backed skill library. Use when the user asks to push a skill to GitHub, 推送技能到 GitHub, sync/upload/commit/release a newly created or updated skill, especially for repositories where each skill lives in its own directory with SKILL.md and optional agents/, references/, scripts/, or assets/ folders."
---

# Push To GitHub

## Overview

Use this skill to push a local Codex skill into a GitHub skill library safely and repeatably. The workflow validates the skill, syncs only the intended skill directory, reviews the diff, commits with a clear message, and pushes to the configured remote.

Default local paths for this machine:

- Installed skills root: `C:\Users\Administrator\.codex\skills`
- Skill library repo: `E:\gongxinju\skill-library`
- Skill validator: `C:\Users\Administrator\.codex\skills\.system\skill-creator\scripts\quick_validate.py`

## Workflow

1. Identify the skill name and source directory.
   - Use the folder name and the `name` field in `SKILL.md`.
   - Confirm they match exactly.
   - If the user only says "the new skill", inspect recently changed directories under the installed skills root and the skill library repo.

2. Validate the source skill before publishing.
   - Run the skill validator against the source skill directory.
   - Fix frontmatter, missing `SKILL.md`, naming, or metadata issues before syncing.

3. Sync the skill directory to the GitHub skill library.
   - The destination must be `<skill-library>/<skill-name>`.
   - Copy the whole skill folder, including `agents/`, `references/`, `scripts/`, and `assets/` when present.
   - Do not flatten files into the repository root.
   - Preserve existing skill files unless the source skill intentionally replaces them.

4. Review repository state.
   - Run `git status --short` in the skill library repo.
   - Run `git diff -- <skill-name>` before staging.
   - If unrelated files are dirty, leave them unstaged and mention them.

5. Stage only the intended skill files.
   - Stage `<skill-name>/` and, if needed, repository index files such as `README.md`.
   - Do not use broad staging if unrelated changes exist.

6. Commit and push.
   - Use a concise message such as `Add <skill-name> skill` or `Update <skill-name> skill`.
   - Push to the current branch unless the user asks for a different branch.
   - Report the commit hash and remote result.

## PowerShell Pattern

Adapt this pattern to the specific skill name and source path:

```powershell
$SkillName = "example-skill"
$Source = "C:\Users\Administrator\.codex\skills\$SkillName"
$Repo = "E:\gongxinju\skill-library"
$Dest = Join-Path $Repo $SkillName

python C:\Users\Administrator\.codex\skills\.system\skill-creator\scripts\quick_validate.py $Source

New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item -Path (Join-Path $Source "*") -Destination $Dest -Recurse -Force

git -C $Repo status --short
git -C $Repo diff -- $SkillName
git -C $Repo add $SkillName
git -C $Repo commit -m "Add $SkillName skill"
git -C $Repo push
```

When updating an existing destination, inspect both source and destination paths first. Avoid deleting destination files unless it is clear they were removed from the source skill intentionally.

## Safety Rules

- Never commit secrets, credentials, browser cookies, or local environment files.
- Never stage unrelated dirty files.
- Never overwrite user changes without inspecting the diff.
- Prefer explicit paths over wildcard commands.
- If the skill library has no remote or push fails, report the exact blocker and leave the local commit intact only if it was created successfully.

## Completion Checklist

- Source skill validates successfully.
- Destination skill validates successfully after sync.
- `git status --short` is clean or only unrelated pre-existing changes remain.
- Push succeeds and the final response includes the commit hash.
