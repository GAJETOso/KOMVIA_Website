/* ===== script.js — KOMVIA Ecosystem Interactive Logic ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const scrollHandler = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('mobile-open');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on nav link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const activateNavLink = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', activateNavLink, { passive: true });

  // ===== INTERSECTION OBSERVER — SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, delay);
        animateObserver.unobserve(el);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animatableSelectors = [
    '.why-card', '.module-card', '.who-card', '.step-card',
    '.what-content', '.what-visual', '.cta-card',
    '.contact-info', '.contact-form-wrap'
  ];
  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.dataset.delay = (i % 4) * 100; // stagger by 4 columns max
      animateObserver.observe(el);
    });
  });

  // ===== COUNTER ANIMATION =====
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // ===== DEMO FORM SUBMISSION =====
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('demo-submit-btn');
      btn.innerHTML = '⏳ Submitting...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = '✅ Request Received!';
        btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
        showToast('🎉 Demo booked! We\'ll contact you within 24 hours.');
        
        setTimeout(() => {
          demoForm.reset();
          btn.innerHTML = 'Book My Free Demo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit-btn');
      btn.innerHTML = '⏳ Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = '✅ Message Sent!';
        showToast('✉️ Message sent! We\'ll get back to you soon.');
        
        setTimeout(() => {
          contactForm.reset();
          btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // ===== TOAST NOTIFICATION =====
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== FLOATING CARDS PARALLAX =====
  const floatingCards = document.querySelectorAll('.floating-card');
  let ticking = false;
  const parallaxHandler = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 20;
        const my = (e.clientY / window.innerHeight - 0.5) * 20;
        floatingCards.forEach((card, i) => {
          const factor = (i + 1) * 0.5;
          card.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  };
  const heroSection = document.getElementById('hero');
  if (heroSection) heroSection.addEventListener('mousemove', parallaxHandler, { passive: true });

  // ===== WHY CARDS — TILT EFFECT =====
  const tiltCards = document.querySelectorAll('.why-card, .module-card, .who-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.transform = `perspective(600px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  // ===== SCROLL PROGRESS INDICATOR =====
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #22c55e, #14b8a6, #3b82f6);
    z-index: 9999;
    transition: width 0.1s linear;
    width: 0%;
  `;
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  // ===== CHATBOT LOGIC =====
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');

  if (chatToggle) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });

    const addMessage = (text, isUser = false) => {
      const msg = document.createElement('div');
      msg.className = isUser ? 'user-msg' : 'bot-msg';
      msg.textContent = text;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleSend = () => {
      const text = chatInput.value.trim();
      if (text) {
        addMessage(text, true);
        chatInput.value = '';
        
        setTimeout(() => {
          const lowerText = text.toLowerCase();
          if (lowerText.includes('price') || lowerText.includes('cost')) {
            addMessage("Our pricing ranges from $2.5k/mo to custom Enterprise solutions. Would you like to see our licensing tiers?");
          } else if (lowerText.includes('ife') || lowerText.includes('erp')) {
            addMessage(`Excellent choice. Our ${text.toUpperCase()} suite is designed for institutional scale. I can route you to a technical advisor.`);
          } else {
            addMessage("I've received your query. One of our institutional advisors will respond shortly.");
          }
        }, 1000);
      }
    };

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // ===== PWA SERVICE WORKER REGISTRATION =====
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // ===== PWA INSTALL PROMPT =====
  let deferredPrompt;
  const installBtn = document.getElementById('pwa-install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
    }
    console.log('PWA Install Prompt available');
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
      }
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    if (installBtn) installBtn.style.display = 'none';
  });

  scrollHandler();
  console.log('%c KOMVIA Ecosystem Backend Ready ', 'background: #22c55e; color: #fff; padding: 4px; font-weight: bold;');
});
