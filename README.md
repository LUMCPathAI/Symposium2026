# LUMC Computational Pathology Symposium — Booklet 2026

Static site for the **digital abstract booklet** (GitHub Pages).

## 🚀 Deploy (GitHub Pages)

### Option A — Use the LUMCPathAI organization (recommended)
1. In the `LUMCPathAI` org, create a repo named **`booklet2026`**.
2. Upload the contents of this folder (or unzip `booklet2026.zip` and push).
3. In **Settings → Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (root)
4. Your URL will be: `https://lumcpathai.github.io/booklet2026`

### Option B — Use a dedicated account to hit the exact URL
If you require **`https://lumc-path-ai-symposium.github.io/booklet2026`** exactly,
create an organization or user named `lumc-path-ai-symposium`, then create a repo
named `booklet2026` and enable Pages as above.

> Note: When hosting under a project path (e.g., `/booklet2026`), the site is already configured to use relative paths.

## 🛠 Edit content

Most content lives in `/data` as JSON:
- `program.json` — agenda items in chronological order
- `speakers.json` — people cards (name, affiliation, role, links)
- `projects.json` — project cards, each with a short abstract and optional links
- `internships.json` — internship opportunities with supervisors and contact

No build step is required. Commit changes and GitHub Pages will serve the update.

## 🧾 Printing
Open the page and print to PDF for a clean booklet. Navigation and buttons are hidden in print view.

## 🔗 QR code
The **Get QR Code** button points to a public API to generate a QR for the site URL.
If you change the path (e.g., not `/booklet2026`), update `SHARE_PATH` in `assets/app.js`.

## 📁 Structure

```
booklet2026/
  assets/
    app.js
    style.css
  data/
    speakers.json
    projects.json
    internships.json
    program.json
  index.html
  README.md
```

## ✅ License
CC BY 4.0 unless noted otherwise.
