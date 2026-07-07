---
description: "Demo 9 — Site updater: weekly agent that tracks gh-aw news and refreshes the demo site's What's New section"
on:
  schedule:
    - cron: "0 7 * * 1"
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
engine: copilot
network:
  allowed: [defaults]
tools:
  edit:
  bash: ["grep:*", "cat:*", "diff:*", "date:*"]
  github:
    toolsets: [default]
safe-outputs:
  create-pull-request:
    title-prefix: "[site-updater] "
    labels: [docs, automated]
    draft: false
timeout-minutes: 20
---

# Weekly Site Updater

You maintain the "What's New" section of this repository's hosted demo site.
The site lives in TWO synchronized copies:

- `docs/index.html` (published via GitHub Pages)
- `demo.html` (in-repo copy)

Inside each file there is a `<script type="application/json" id="whatsnew-data">`
block containing a JSON array of update entries. That JSON is the ONLY thing you
are allowed to edit. Do not touch any HTML, CSS, or JavaScript.

## Your task

1. Read the current `whatsnew-data` JSON from `docs/index.html` and note the most
   recent `date` among entries tagged with a release version (tags like `vX.Y.Z`).

2. Using the GitHub tools, list recent releases of the `githubnext/gh-aw`
   repository. Identify any releases published AFTER that date.

3. For each new release found (up to 3, newest first), read its release notes and
   write ONE entry:
   - `date`: the release's published date (YYYY-MM-DD)
   - `tag`: the release tag (e.g. "v0.83.0")
   - `title`: a short headline naming the 1–2 most significant changes
   - `summary`: 2–3 sentences summarizing the highlights that matter to workflow
     authors (new safe outputs, frontmatter fields, engines, security changes,
     CLI commands). Plain text only — no markdown, no HTML tags, no double quotes
     inside values (use single quotes).
   - `link`: the release page URL

4. Insert the new entries at the START of the JSON array in BOTH files, keeping
   the arrays byte-identical. Trim the array to at most 15 entries (drop the
   oldest release-tagged entries first; keep entries tagged "lab").

5. Verify the edited JSON is still valid (e.g. extract the block and check it
   parses). Preserve the existing indentation style.

6. If you added at least one entry, create a pull request titled with the newest
   release tag and a body that lists each entry you added, with links.

## Rules

- If there are NO new releases since the newest recorded date, make no changes
  and do not create a pull request — simply finish.
- Never remove or rewrite existing entries other than trimming per rule 4.
- The site renders a "NEW" badge automatically for entries younger than 14 days;
  you do not need to add any badge markup — accurate `date` values are enough.
- Keep your diff limited strictly to the two `whatsnew-data` JSON blocks.
