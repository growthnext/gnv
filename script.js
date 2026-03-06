/* ================================================
   GrowthNEXT Ventures — script.js
   Smooth, professional startup interactions
   ================================================ */

'use strict';

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

/* ===== HAMBURGER MENU ===== */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link:not(.nav-cta)');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === currentSection) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
      let delay = 0;
      siblings.forEach(sib => {
        if (sib === entry.target) {
          setTimeout(() => sib.classList.add('revealed'), delay);
        }
        delay += 80;
      });
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===== CARD STAGGER ANIMATIONS ===== */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll(
        '.adv-card, .rev-card, .bm-card, .txn-step-card, .founder-card, .market-highlight, .contact-card, .scf-party-card'
      );
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 100);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Set initial state for cards and observe containers
document.querySelectorAll(
  '.adv-grid, .revenue-cards, .bm-features, .txn-steps-row, .founders-grid, .market-content, .contact-info, .scf-parties, .scf-parties, .scf-parties, .scf-parties'
).forEach(container => {
  const cards = container.querySelectorAll(
    '.adv-card, .rev-card, .bm-card, .txn-step-card, .founder-card, .market-highlight, .contact-card, .scf-party-card'
  );
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s ease, border-color 0.35s ease';
  });
  cardObserver.observe(container);
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});

/* ===== PARALLAX HERO SHAPES ===== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, i) => {
    const speed = 0.08 + (i * 0.04);
    shape.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* ===== TRANSACTION FLOW ANIMATION ===== */
const txnObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nodes = entry.target.querySelectorAll('.txn-node');
      const arrows = entry.target.querySelectorAll('.txn-arrow');
      nodes.forEach((node, i) => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.85)';
        node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
          node.style.opacity = '1';
          node.style.transform = 'scale(1)';
        }, i * 200);
      });
      arrows.forEach((arrow, i) => {
        arrow.style.opacity = '0';
        arrow.style.transition = 'opacity 0.4s ease';
        setTimeout(() => { arrow.style.opacity = '1'; }, i * 200 + 100);
      });
      txnObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const txnFlow = document.querySelector('.txn-flow');
if (txnFlow) txnObserver.observe(txnFlow);

/* ===== STEP ITEMS ANIMATION ===== */
const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.step-item');
      steps.forEach((step, i) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(30px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
          step.style.opacity = '1';
          step.style.transform = 'translateX(0)';
        }, i * 120);
      });
      stepObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const tradingSteps = document.querySelector('.trading-steps');
if (tradingSteps) stepObserver.observe(tradingSteps);

/* ===== BENEFIT PILLS ANIMATION ===== */
const pillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pills = entry.target.querySelectorAll('.benefit-pill');
      pills.forEach((pill, i) => {
        pill.style.opacity = '0';
        pill.style.transform = 'scale(0.9)';
        pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
          pill.style.opacity = '1';
          pill.style.transform = 'scale(1)';
        }, i * 80);
      });
      pillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const tradingBenefits = document.querySelector('.trading-benefits');
if (tradingBenefits) pillObserver.observe(tradingBenefits);

/* ===== VISION PILLARS ANIMATION ===== */
const pillarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pillars = entry.target.querySelectorAll('.pillar');
      pillars.forEach((pillar, i) => {
        pillar.style.opacity = '0';
        pillar.style.transform = 'translateY(16px)';
        pillar.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
          pillar.style.opacity = '1';
          pillar.style.transform = 'translateY(0)';
        }, i * 100);
      });
      pillarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const visionPillars = document.querySelector('.vision-pillars');
if (visionPillars) pillarObserver.observe(visionPillars);

/* ===== ADVANAGE CARD ICON MICRO-INTERACTION ===== */
document.querySelectorAll('.adv-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.adv-icon');
    if (icon) {
      icon.style.transform = 'scale(1.2) rotate(5deg)';
      icon.style.transition = 'transform 0.3s ease';
    }
  });
  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.adv-icon');
    if (icon) {
      icon.style.transform = 'scale(1) rotate(0deg)';
    }
  });
});

/* ===== REVENUE ICON MICRO-INTERACTION ===== */
document.querySelectorAll('.rev-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.rev-icon');
    if (icon) {
      icon.style.transform = 'scale(1.15)';
      icon.style.transition = 'transform 0.3s ease';
    }
  });
  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.rev-icon');
    if (icon) icon.style.transform = 'scale(1)';
  });
});

/* ===== FOUNDER CARD TILT EFFECT ===== */
document.querySelectorAll('.founder-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * 6;
    const tiltY = -(x / rect.width) * 6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.35s ease';
  });
});

/* ===== HERO STATS COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text === '25+') animateCounter(num, 25, '+');
        else if (text === '100%') animateCounter(num, 100, '%');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===== LAZY IMAGE LOAD WITH FADE ===== */
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
      if (img.complete) img.style.opacity = '1';
      imgObserver.unobserve(img);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));

/* ===== SCROLL PROGRESS INDICATOR ===== */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
  background: linear-gradient(90deg, #1e3a6e, #5b8dee);
  width: 0%; transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLink();
  // Trigger reveal for elements already in view
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('revealed');
  });
});
