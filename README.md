# Simone Ragoni — academic website

A lightweight, responsive academic profile built for **GitHub Pages** at <https://siragoni.github.io/>.

## Deploy

1. Back up your current GitHub repository.
2. Replace **all existing website files** in the `siragoni.github.io` repository with the contents of this folder (rather than copying these files on top of the previous site). Keep your `.git` folder when updating locally.
3. Commit and push to the branch used by GitHub Pages, usually `main`. Make sure Pages is configured to publish from `main` → `/ (root)`.
4. The site is plain HTML/CSS/JavaScript: no Ruby, Jekyll theme, Node installation or build service is needed. The `.nojekyll` file lets GitHub Pages serve the static content directly.

**Important:** This package deliberately replaces the old menu, standalone posts, templates and code tutorials. Leaving legacy files in the repository will leave those old URLs accessible, so remove them when deploying.

## Update talks and presentations

1. Open `data/talks.json` and add an entry. Keep the title and event exactly as you would want them shown.
2. Run `python3 scripts/build.py`.
3. Commit both `data/talks.json` and the updated `index.html`.

Talks may be `Talk`, `Seminar`, `Poster`, or `Outreach`. Use an ISO date (`YYYY-MM-DD`) when available; otherwise just the year. The `url` field is optional. The build script uses only the Python standard library.

The archive currently has 37 entries, based on the supplied CV, earlier site, and public event listings through November 2026. The October 2026 Wuhan item is identified as an ALICE Masterclass, as confirmed by ALICE’s Physics Week event report. Presentations without a reliable online page are intentionally shown without a link.

## Update the academic profile

- Main profile, research themes, teaching, outreach and contact links are in `index.html`.
- Design and responsive styling: `assets/styles.css`.
- Search/filter interactions and the mobile menu: `assets/site.js`.
- Images: `assets/simone-ragoni-portrait-2026.jpg`, `assets/wuhan-alice-physics-week-2026.jpg`, `assets/science-communication-festival.jpg` and `assets/upc-photonuclear-diagram.webp` (all from images supplied for the update).
- The submitted application PDF was used as reference material but has **not** been published, because it refers to an earlier career stage and includes application-related content.

## Technology & privacy

No trackers, cookies, newsletter, forms, analytics, or third-party JavaScript. Google Fonts are used for typography, with system fallbacks if external fonts are unavailable. All profile and event links use HTTPS. The site can run from any static web host; canonical URLs assume the GitHub Pages domain.

## Updated positions (November 2026)

- University of Silesia: Assistant Professor (current).
- ALICE Outreach Coordinator (current).
- Former ALICE UPC Physics Analysis Group convener (October 2024–October 2026).
- The Wuhan outreach photo and event recap refer to ALICE Physics Week, 12–16 October 2026, at Central China Normal University.
- The Quarktastic link is to the public profile, not a specific Instagram post, because a particular Wuhan post was not independently retrieved.

The site's public content is strictly academic and science-communication-related.
