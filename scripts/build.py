#!/usr/bin/env python3
"""Rebuild the static talk archive in index.html from data/talks.json.

No third-party dependencies. Run `python3 scripts/build.py` from any directory.
"""
from datetime import date
from html import escape
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
TALKS = ROOT / "data" / "talks.json"
PAGE = ROOT / "index.html"
START = "<!-- TALKS:START -->"
END = "<!-- TALKS:END -->"


def fmt_date(s: str) -> str:
    if len(s) == 4:
        return s
    try:
        dt = date.fromisoformat(s)
        return f"{dt.strftime('%b')} {dt.day}, {dt.year}"
    except ValueError as e:
        raise ValueError(f"Invalid talk date {s!r}") from e


def row(t: dict) -> str:
    for required in ("year", "date", "title", "event", "type", "place"):
        if not t.get(required):
            raise ValueError(f"Missing {required}: {t!r}")
    assert t["type"] in {"Talk", "Seminar", "Poster", "Outreach"}
    title = escape(t["title"])
    event = escape(t["event"])
    place = escape(t["place"])
    when = escape(fmt_date(t["date"]))
    typ = escape(t["type"])
    year = int(t["year"])
    href = t.get("url", "")
    if href and not href.startswith("https://"):
        raise ValueError(f"Only verified HTTPS resources may be linked: {href}")
    tag = "a" if href else "div"
    props = f' href="{escape(href, quote=True)}" target="_blank" rel="noopener noreferrer"' if href else ""
    klass = "talk-row" if href else "talk-row no-link"
    arrow = "↗" if href else "—"
    return (f'          <{tag} class="{klass}" data-year="{year}" data-type="{typ}"{props}>'
            f'<span class="talk-date">{when}</span>'
            f'<div class="talk-main"><h4>{title}</h4><p>{event} <span aria-hidden="true">·</span> {place}</p></div>'
            f'<span class="talk-type t-{typ.lower()}">{typ}</span>'
            f'<span class="talk-action" aria-hidden="true">{arrow}</span></{tag}>')


def main() -> None:
    talks = json.loads(TALKS.read_text(encoding="utf-8"))
    if not isinstance(talks, list):
        raise ValueError("Talk database must be a list")
    ordered = sorted(talks, key=lambda t: (t["year"], t["date"]), reverse=True)
    # Note: year-only entries are intentionally placed after precisely dated entries.
    html = PAGE.read_text(encoding="utf-8")
    if html.count(START) != 1 or html.count(END) != 1:
        raise ValueError("Cannot find unique talks insertion markers in index.html")
    before, rest = html.split(START, 1)
    _, after = rest.split(END, 1)
    output = "\n".join(row(t) for t in ordered)
    html = f"{before}{START}\n{output}\n          {END}{after}"
    # Update count labels in title, button and accessible helpers, if count changes.
    import re
    html = re.sub(r'(<span class="archive-total">)\d+ ENTRIES', rf'\g<1>{len(talks)} ENTRIES', html)
    html = re.sub(r'(>Show all )\d+( presentations)', rf'\g<1>{len(talks)}\g<2>', html)
    PAGE.write_text(html, encoding="utf-8")
    print(f"Built {PAGE.name}: {len(talks)} presentations spanning {min(x['year'] for x in talks)}–{max(x['year'] for x in talks)}")


if __name__ == "__main__":
    main()
