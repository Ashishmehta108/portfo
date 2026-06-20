export function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap) return;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  if (reduceMotion) {
    gsap.globalTimeline.timeScale(50);
  }

  const heroLines = document.querySelectorAll('.hero-line');
  if (heroLines.length) {
    gsap.from(heroLines, {
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.05,
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (!reduceMotion && revealItems.length) {
    gsap.set(revealItems, { y: 24, opacity: 0 });
  }

  if (!reduceMotion && window.ScrollTrigger && revealItems.length) {
    ScrollTrigger.batch(revealItems, {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.fromTo(batch, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08, overwrite: true });
      },
      once: true,
    });
  } else if (reduceMotion && revealItems.length) {
    gsap.set(revealItems, { y: 0, opacity: 1 });
  }

  const cards = document.querySelectorAll('.work-card[data-status="live"]');
  cards.forEach((card) => {
    const img = card.querySelector('img');
    const arrow = card.querySelector('.project-arrow');
    if (!img || !arrow) return;
    const arrowX = gsap.quickTo(arrow, 'x', { duration: 0.3, ease: 'power2.out' });
    const arrowOpacity = gsap.quickTo(arrow, 'opacity', { duration: 0.3, ease: 'power2.out' });

    const enter = () => {
      gsap.to(img, { filter: 'grayscale(0) contrast(1.05)', duration: 0.35, ease: 'power2.out', overwrite: true });
      arrowX(0);
      arrowOpacity(1);
    };

    const leave = () => {
      gsap.to(img, { filter: 'grayscale(1) contrast(1.05)', duration: 0.3, ease: 'power2.out', overwrite: true });
      arrowX(-4);
      arrowOpacity(0);
    };

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
    card.addEventListener('focusin', enter);
    card.addEventListener('focusout', leave);
  });

  const nav = document.querySelector('.nav');
  if (nav) {
    let ticking = false;
    const updateNav = () => {
      const scrolled = window.scrollY > 80;
      nav.classList.toggle('is-scrolled', scrolled);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateNav);
      }
    }, { passive: true });
    updateNav();
  }
}
