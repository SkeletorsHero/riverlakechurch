/* ============================================================
   LANDMARK NETWORK — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav: add .scrolled class on scroll ─────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    // Inner pages start scrolled (already have the class)
    const isInnerPage = nav.classList.contains('scrolled');

    if (!isInnerPage) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
          nav.classList.add('scrolled');
          const logo = document.getElementById('nav-logo');
          if (logo) logo.style.filter = 'none';
        } else {
          nav.classList.remove('scrolled');
          const logo = document.getElementById('nav-logo');
          if (logo) logo.style.filter = 'brightness(0) invert(1)';
        }
      }, { passive: true });
    }
  }

  /* ── Mobile Hamburger Menu ──────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Animate hamburger lines
      hamburger.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* ── Scroll-triggered fade-in ───────────────────────────── */
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply to cards and sections
  document.querySelectorAll(
    '.pillar, .church-card, .event-card, .tier-card, .event-feature, .split, .network-stats > div'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
  });

  // Add visible class handler
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);

  /* ── Smooth anchor scroll ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
