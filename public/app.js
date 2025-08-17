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
  })();