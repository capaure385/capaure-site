/* ═══════════════════════════════════════════
   CAPAURE DATA — main.js
   Scripts partagés toutes pages
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL SHADOW ──
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r => revealObserver.observe(r));

  // ── ACTIVE NAV LINK (page courante) ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── CONTACT : SÉLECTION OFFRE ──
  document.querySelectorAll('.offer-choice').forEach(choice => {
    choice.addEventListener('click', () => {
      document.querySelectorAll('.offer-choice').forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
    });
  });

  // ── CONTACT : ENVOI FORMULAIRE ──
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const prenom  = document.getElementById('prenom')?.value;
      const email   = document.getElementById('email')?.value;
      const message = document.getElementById('message')?.value;
      if (!prenom || !email || !message) {
        alert('Merci de remplir les champs obligatoires (*)');
        return;
      }
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    });
  }

  // ── LOGO FALLBACK ──
  document.querySelectorAll('.nav-logo img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback) fallback.style.display = 'block';
    });
  });

  // ── MENU BURGER MOBILE ──
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav-links');
  if (navBurger && navLinks) {
    navBurger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navBurger.classList.toggle('active');
    });
    // Fermer le menu quand on clique sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navBurger.classList.remove('active');
      });
    });
  }

});

  // ── FILTRAGE CAS CLIENTS ──
  const filterButtons = document.querySelectorAll(".filter-btn");
  const caseCards = document.querySelectorAll(".case-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      caseCards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
