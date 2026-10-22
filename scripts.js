/* ============================================
   MUHAMMAD SYAKIR ADAM — PORTFOLIO SCRIPTS
   Clean, Modern JS — No unnecessary libraries
   Uses Intersection Observer for scroll animations
   ============================================ */

(function () {
  'use strict';

  /* ---------- DOM Elements ---------- */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  /* ---------- Navbar Scroll Effect ---------- */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---------- Mobile Menu Toggle ---------- */
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ---------- Intersection Observer — Scroll Animations ---------- */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback: show all elements immediately
      animatedElements.forEach(el => el.classList.add('visible'));
    }
  }
  // Run after DOM is fully parsed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

  /* ---------- Skills Tabs ---------- */
  function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skills-tabs .tab-btn');
    const grids = document.querySelectorAll('.skills-grid');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        grids.forEach(grid => {
          grid.classList.remove('active');
          if (grid.getAttribute('data-tab') === target) {
            grid.classList.add('active');
            // Re-trigger animations for the newly visible grid
            grid.querySelectorAll('.fade-in').forEach(item => {
              item.classList.remove('visible');
              void item.offsetWidth; // force reflow
              item.classList.add('visible');
            });
          }
        });
      });
    });
  }
  initSkillsTabs();

  /* ---------- Certification Slider ---------- */
  function initCertSlider() {
    const track = document.querySelector('.cert-track');
    const prevBtn = document.querySelector('.cert-prev');
    const nextBtn = document.querySelector('.cert-next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 340;

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
  initCertSlider();

  /* ---------- Swiper Init (for project.html) ---------- */
  function initSwipers() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.project-swiper').forEach(el => {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev'),
        },
      });
    });
  }
  // Init swipers after page load to ensure Swiper library is ready
  window.addEventListener('load', initSwipers);

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Project Detail Nav Active State (project.html) ---------- */
  function initProjectDetailNav() {
    const projectNavLinks = document.querySelectorAll('.project-detail-nav a');
    if (projectNavLinks.length === 0) return;

    const projectSections = document.querySelectorAll('.project-section[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 150;

      projectSections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          projectNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }
  initProjectDetailNav();

  /* ---------- Futuristic Animated Network Background ---------- */
  function initNetworkBackground() {
    const canvas = document.getElementById('network-canvas');

    // Stop safely if the canvas is not present on this page
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let animationId;
    let particles = [];

    const mouse = { x: null, y: null };
    const particleCount = window.innerWidth < 768 ? 35 : 75;
    const connectionDistance = 130;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.8 + 0.6
      }));

      drawFrame();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, i) => {
        if (!reducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
          }

          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
          }
        }

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.35;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Highlight particles near the mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle =
              `rgba(0, 220, 255, ${(1 - distance / 150) * 0.5})`;
            ctx.stroke();
          }
        }

        // Draw glowing cyan particles
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00c8ff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00c8ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!reducedMotion && !document.hidden) {
        animationId = requestAnimationFrame(drawFrame);
      }
    }

    function handleMouseMove(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else if (!reducedMotion) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(drawFrame);
      } else {
        drawFrame();
      }
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', (event) => {
      if (!event.relatedTarget) handleMouseLeave();
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resizeCanvas();
  }

  initNetworkBackground();

/* ===== CONTACT FORM: OPEN EMAIL APPLICATION ===== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const recipient = "syakiradam88@gmail.com";

        const emailBody = [
            `Name: ${name}`,
            `Reply email: ${email}`,
            "",
            "Project / Work Details:",
            message
        ].join("\n");

        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoLink;
    });
}

})();