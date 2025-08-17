(function () {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = Array.from(document.querySelectorAll('.panel'));
  
    function activate(name) {
      // Tabs
      tabs.forEach(t => {
        const isActive = t.dataset.tab === name;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
      // Panels
      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === name);
      });
      // Hash
      const newHash = '#' + name;
      if (location.hash !== newHash) history.replaceState(null, '', newHash);
    }
  
    // Tab clicks
    tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
  
    // Links with data-tab-link (e.g., CTAs)
    document.querySelectorAll('[data-tab-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        activate(link.dataset.tabLink);
      });
    });
  
    // Hash routing
    function initFromHash() {
      const valid = new Set(tabs.map(t => t.dataset.tab));
      const name = (location.hash || '#home').slice(1);
      activate(valid.has(name) ? name : 'home');
    }
    window.addEventListener('hashchange', initFromHash);
    initFromHash();

    // Lightbox for photos
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-image');
    const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
    const closeSelectors = '[data-close]';

    function openLightbox(src, alt, title, date) {
      if (!lightbox || !lightboxImg || !lightboxCaption) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightboxCaption.textContent = [title, date].filter(Boolean).join(' • ');
      lightbox.removeAttribute('aria-hidden');
      document.documentElement.style.overflow = 'hidden';
      // focus close for accessibility
      const closeBtn = lightbox.querySelector('.lightbox-close');
      closeBtn && closeBtn.focus({ preventScroll: true });
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      // clear src to stop network if needed
      if (lightboxImg) lightboxImg.src = '';
    }

    // Delegate clicks on photos
    document.addEventListener('click', (e) => {
      const figure = e.target.closest && e.target.closest('.photo');
      if (figure && figure.querySelector('img')) {
        const img = figure.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || '';
        const title = figure.getAttribute('data-title') || '';
        const date = figure.getAttribute('data-date') || '';
        e.preventDefault();
        openLightbox(src, alt, title, date);
        return;
      }

      // Close targets
      const closeTarget = e.target.closest && e.target.closest(closeSelectors);
      if (closeTarget && lightbox && !lightbox.hasAttribute('aria-hidden')) {
        e.preventDefault();
        closeLightbox();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  })();