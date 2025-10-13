// Small client-side router to connect internal pages without full reload.
// Graceful fallback: if fetch fails or JS disabled, links still work.

(function () {
  const SELECTOR = 'a[data-internal]';
  const mainId = 'main-content';

  // Update which nav link is active based on current URL
  function refreshActiveNav() {
    const links = document.querySelectorAll(SELECTOR);
    const current = location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === current) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  // Replace main content with the fetched page's main content
  async function loadIntoMain(url, replaceState = false) {
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Network error');
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const newMain = doc.getElementById(mainId);
      if (!newMain) {
        // If no main content found, navigate normally
        window.location.href = url;
        return;
      }
      document.getElementById(mainId).innerHTML = newMain.innerHTML;
      // update title
      document.title = doc.title || document.title;
      if (replaceState) {
        history.replaceState({ url }, '', url);
      } else {
        history.pushState({ url }, '', url);
      }
      // re-run any necessary page init (e.g., refresh nav active state)
      refreshActiveNav();
      // focus main for accessibility
      const main = document.getElementById(mainId);
      if (main) main.setAttribute('tabindex', '-1'), main.focus();
    } catch (err) {
      // fallback to full navigation on error
      window.location.href = url;
    }
  }

  // Link click handler
  document.addEventListener('click', function (e) {
    const link = e.target.closest(SELECTOR);
    if (!link) return;
    const href = link.getAttribute('href');
    // only handle same-origin relative links (simple heuristic)
    if (!href || href.startsWith('http')) return;
    e.preventDefault();
    loadIntoMain(href);
  });

  // Handle back/forward navigation
  window.addEventListener('popstate', function (e) {
    const url = location.pathname.split('/').pop() || 'index.html';
    loadIntoMain(url, true);
  });

  // On first load, set active nav
  document.addEventListener('DOMContentLoaded', function () {
    refreshActiveNav();
  });
})();