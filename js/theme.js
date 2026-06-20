export function initThemeToggle() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const icon = document.querySelector('[data-theme-icon]');
  if (!toggle || !icon) return;

  const sync = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    icon.setAttribute('href', theme === 'dark' ? '#hi-sun-03' : '#hi-moon-02');
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  sync(document.documentElement.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch (err) {
      // Ignore storage failures in static contexts.
    }
    sync(next);
  });
}

export function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const icon = document.querySelector('[data-menu-icon]');
  const panel = document.getElementById('mobile-menu');
  if (!toggle || !icon || !panel) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    icon.setAttribute('href', open ? '#hi-cancel-01' : '#hi-menu-01');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  setOpen(false);

  toggle.addEventListener('click', () => {
    setOpen(panel.hidden);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}
