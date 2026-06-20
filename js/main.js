import { projects } from './projects-data.js';
import { initThemeToggle, initMobileMenu } from './theme.js';
import { initMotion } from './motion.js';

function createWorkCard(project) {
  const card = document.createElement('article');
  card.className = `work-card ${project.status === 'soon' ? 'work-card-empty' : ''}`;
  card.dataset.span = String(project.span);
  card.dataset.status = project.status;

  if (project.status === 'live') {
    card.innerHTML = `
      <div class="thumb">
        <img src="${project.image}" alt="${project.title} homepage preview" loading="lazy">
        <span class="thumb-badge mono-label">Live preview</span>
      </div>
      <div class="project-meta">
        <div class="mono-label">${project.tag}</div>
        <div class="project-head">
          <h3>${project.title}</h3>
          <svg class="icon project-arrow" aria-hidden="true" width="20" height="20"><use href="#hi-arrow-up-right-01"></use></svg>
        </div>
        <p class="project-desc">${project.desc}</p>
        <a class="btn btn-secondary project-link" href="${project.link}" target="_blank" rel="noreferrer">Open live site
          <svg class="icon" aria-hidden="true" width="18" height="18"><use href="#hi-arrow-up-right-01"></use></svg>
        </a>
      </div>
    `;
  } else {
    card.innerHTML = `
      <div class="thumb" aria-hidden="true">
        <svg class="icon" width="28" height="28"><use href="#hi-clock-01"></use></svg>
      </div>
      <div class="project-meta">
        <div class="mono-label">${project.tag}</div>
        <div class="project-head">
          <h3>${project.title}</h3>
        </div>
        <p class="project-desc">Coming soon. Same footprint, no link yet.</p>
      </div>
    `;
  }

  return card;
}

function renderWorkGrid() {
  const grid = document.querySelector('[data-work-grid]');
  if (!grid) return;
  projects.forEach((project) => grid.appendChild(createWorkCard(project)));
}

function initBackToTop() {
  const footerLink = document.querySelector('a[href="#top"]');
  if (!footerLink) return;
  footerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function init() {
  renderWorkGrid();
  initThemeToggle();
  initMobileMenu();
  initBackToTop();
  initContactForm();
  initMotion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
