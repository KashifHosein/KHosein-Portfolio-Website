// --- Scroll reveal ---
const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.2 }
);
sections.forEach(s => io.observe(s));

// --- Theme handling ---
const root = document.documentElement; // <html>
const btn = document.getElementById('theme-toggle');
const THEME_KEY = 'kh-theme';

function systemPrefersLight() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  btn.textContent = theme === 'light' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  // Update mobile address bar color
  const meta = document.querySelector('meta[name="theme-color"]');
  meta && (meta.content = getComputedStyle(document.body).backgroundColor);
}

// Initialize: saved preference > system preference > dark
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const initial = saved || (systemPrefersLight() ? 'light' : 'dark');
  applyTheme(initial);
})();

// Toggle
btn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Optional: keep in sync if user changes OS theme while on page
window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  const saved = localStorage.getItem(THEME_KEY);
  if (!saved) applyTheme(e.matches ? 'light' : 'dark');
});

