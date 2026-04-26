/* ===== main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ── HEADER SCROLL ──────────────────────────────────────────────
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── HAMBURGER ──────────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '';
      hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ── NEWSLETTER POPUP ────────────────────────────────────────────
  const popup = document.getElementById('newsletter-popup');
  if (popup) {
    const closePopup = () => {
      popup.style.opacity = '0';
      popup.style.transition = 'opacity 0.4s ease';
      setTimeout(() => popup.remove(), 400);
    };
    document.getElementById('popup-close')?.addEventListener('click', closePopup);
    document.getElementById('popup-skip')?.addEventListener('click', closePopup);
    popup.addEventListener('click', e => { if (e.target === popup) closePopup(); });
    document.getElementById('popup-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      btn.textContent = 'Subscribed ✓';
      btn.style.background = '#4CAF50';
      setTimeout(closePopup, 1200);
    });
  }

  // ── HERO IMAGE SLIDESHOW ────────────────────────────────────────
  const heroImgs = document.querySelectorAll('.hero-image-frame img');
  const heroDots = document.querySelectorAll('.hero-image-dots button');
  if (heroImgs.length > 0) {
    let current = 0;
    const showSlide = (i) => {
      heroImgs.forEach((img, idx) => img.classList.toggle('active', idx === i));
      heroDots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
    };
    showSlide(0);
    heroDots.forEach((dot, i) => dot.addEventListener('click', () => { current = i; showSlide(i); }));
    setInterval(() => { current = (current + 1) % heroImgs.length; showSlide(current); }, 4000);
  }

  // ── HORIZONTAL DRAG SCROLL ──────────────────────────────────────
  const initDragScroll = (track) => {
    let isDown = false, startX = 0, scrollLeft = 0;
    track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; track.style.userSelect = 'none'; });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => { isDown = false; track.style.userSelect = ''; });
    track.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; track.scrollLeft = scrollLeft - (x - startX) * 1.4; });
    // Touch
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; scrollLeft = track.scrollLeft; }, { passive: true });
    track.addEventListener('touchmove', e => { track.scrollLeft = scrollLeft - (e.touches[0].clientX - touchX) * 1.4; }, { passive: true });
  };

  // ── CASE STUDY SLIDER ───────────────────────────────────────────
  const csTrack = document.querySelector('.case-studies-track');
  if (csTrack) {
    const csWrap = csTrack.parentElement;
    csWrap.style.overflowX = 'auto';
    csWrap.style.scrollBehavior = 'smooth';
    initDragScroll(csWrap);
    const prevBtn = document.getElementById('cs-prev');
    const nextBtn = document.getElementById('cs-next');
    const cards = csTrack.querySelectorAll('.case-study-card');
    let csIndex = 0;
    const cardW = () => cards[0] ? cards[0].offsetWidth + 28 : 500;
    const updateNav = () => {
      document.getElementById('cs-cur').textContent = String(csIndex + 1).padStart(2, '0');
      document.getElementById('cs-total').textContent = String(cards.length).padStart(2, '0');
    };
    prevBtn?.addEventListener('click', () => { csIndex = Math.max(0, csIndex - 1); csWrap.scrollLeft = csIndex * cardW(); updateNav(); });
    nextBtn?.addEventListener('click', () => { csIndex = Math.min(cards.length - 1, csIndex + 1); csWrap.scrollLeft = csIndex * cardW(); updateNav(); });
    updateNav();
  }

  // ── PUBLICATIONS SLIDER ─────────────────────────────────────────
  const pubTrack = document.querySelector('.pub-track');
  if (pubTrack) {
    const pubWrap = pubTrack.parentElement;
    pubWrap.style.overflowX = 'auto';
    pubWrap.style.scrollBehavior = 'smooth';
    initDragScroll(pubWrap);
    const pubPrev = document.getElementById('pub-prev');
    const pubNext = document.getElementById('pub-next');
    const pubCards = pubTrack.querySelectorAll('.pub-card');
    let pubIdx = 0;
    const pubW = () => pubCards[0] ? pubCards[0].offsetWidth + 24 : 384;
    pubPrev?.addEventListener('click', () => { pubIdx = Math.max(0, pubIdx - 1); pubWrap.scrollLeft = pubIdx * pubW(); });
    pubNext?.addEventListener('click', () => { pubIdx = Math.min(pubCards.length - 1, pubIdx + 1); pubWrap.scrollLeft = pubIdx * pubW(); });
  }

  // ── SHOP TABS ───────────────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + target)?.classList.add('active');
    });
  });

  // ── CONTACT FORM ────────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit .btn');
      const orig = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.borderColor = ''; contactForm.reset(); }, 2500);
    });
  }

  // ── SERVICE CTA AUTO-FILL ────────────────────────────────────────
  document.querySelectorAll('[data-service-cta]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.serviceCta;
      const msg = btn.dataset.msg || '';
      // Navigate to contact or scroll
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const select = document.querySelector('#contact-form select[name="service"]');
          const textarea = document.querySelector('#contact-form textarea[name="message"]');
          if (select) select.value = service;
          if (textarea && msg) textarea.value = msg;
        }, 800);
      } else {
        window.location.href = 'index.html#contact';
        sessionStorage.setItem('serviceIntent', JSON.stringify({ service, msg }));
      }
    });
  });

  // ── SHOP GET-NOW AUTO-FILL ──────────────────────────────────────
  document.querySelectorAll('[data-shop-product]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.dataset.shopProduct;
      window.location.href = 'index.html#contact';
      sessionStorage.setItem('serviceIntent', JSON.stringify({ service: 'shop', msg: `I'm interested in: ${product}` }));
    });
  });

  // ── RESTORE SESSION INTENT ──────────────────────────────────────
  const intent = sessionStorage.getItem('serviceIntent');
  if (intent) {
    sessionStorage.removeItem('serviceIntent');
    const { service, msg } = JSON.parse(intent);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const sel = document.querySelector('#contact-form select[name="service"]');
          const ta = document.querySelector('#contact-form textarea[name="message"]');
          if (sel) sel.value = service;
          if (ta && msg) ta.value = msg;
        }, 800);
      }, 400);
    }
  }

  // ── NEWSLETTER FORMS ────────────────────────────────────────────
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Done ✓';
      setTimeout(() => { btn.textContent = 'Subscribe'; form.reset(); }, 2000);
    });
  });

  // ── SCROLL REVEAL ────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => ro.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ── CURSOR GLOW (subtle) ─────────────────────────────────────────
  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(200,169,110,0.04) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.8s ease,top 0.8s ease;top:-200px;left:-200px;';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

});
