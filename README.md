```markdown
# Asha Setu — Simple Two-Page Website (connected navigation)

This update connects the About and Objectives pages with a small client-side router while keeping full-link fallback.

Files added/updated:
- index.html — About page (now contains main-content wrapper and data-internal nav links)
- objectives.html — Objectives page (same structure)
- styles.css — Shared styles (no major change)
- nav.js — Client-side router that loads page main content via fetch and updates history
- README.md — This file

How it works:
- With JavaScript enabled: clicking the nav loads the other page's main content with fetch, updates the URL and document.title, and updates the active nav link — the result is a faster, SPA-like feel.
- Without JavaScript: links work normally and do a full page reload.

How to add to repo and preview locally:
1. Place files in your project root (index.html, objectives.html, styles.css, nav.js, README.md).
2. Serve locally:
   python3 -m http.server 8000
   Open http://localhost:8000
3. Test navigation by clicking the About / Objectives links. Try browser back/forward buttons.

If you want:
- I can push these changes to a new branch and open a PR once your repository is initialized and writable.
- Or I can instead implement server-side templating/includes to remove duplication, or integrate into a static site generator.

```