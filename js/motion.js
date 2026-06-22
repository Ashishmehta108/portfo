export function initMotion() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // Initialize GSAP
  if (!window.gsap) return;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Reveal
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
  heroTl
    .from('.hero-title', { y: 40, opacity: 0, delay: 0.2 })
    .from('.hero-copy', { y: 20, opacity: 0 }, '-=0.8')
    .from('.hero-actions', { y: 20, opacity: 0 }, '-=0.8')
    .from('.hero-proof', { x: 40, opacity: 0 }, '-=1')
    .from('.hero-trust li', { y: 10, opacity: 0, stagger: 0.1 }, '-=0.8');

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // Sticky Nav State
  const nav = document.querySelector('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === 1) {
          nav.classList.add('is-scrolled');
        } else if (self.scroll() < 80) {
          nav.classList.remove('is-scrolled');
        }
      },
    });
  }

  // Magnetic Buttons (Subtle)
  const magneticBtns = document.querySelectorAll('.btn-primary');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
}
