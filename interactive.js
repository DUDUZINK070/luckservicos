(() => {
  document.querySelectorAll('[data-message]').forEach(link => {
    link.href = 'https://wa.me/5524988410497?text=' + encodeURIComponent(link.dataset.message);
    link.target = '_blank'; link.rel = 'noopener noreferrer';
  });
  const menu = document.getElementById('navigation');
  const toggle = document.getElementById('menu-toggle');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }));
  const tabs = [...document.querySelectorAll('[data-service]')];
  function selectService(service, focus = false) {
    tabs.forEach(tab => {
      const selected = tab.dataset.service === service;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.dataset.service).hidden = !selected;
      if (selected && focus) tab.focus();
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectService(tab.dataset.service));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = (index + 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectService(tabs[next].dataset.service, true); }
    });
  });
  function applyHash() {
    if (location.hash === '#telegram' || location.hash === '#streaming') {
      selectService(location.hash.slice(1));
      requestAnimationFrame(() => document.getElementById('servicos').scrollIntoView({behavior:'auto'}));
    }
  }
  document.querySelectorAll('a[href="#telegram"]').forEach(a => a.addEventListener('click', () => selectService('telegram')));
  window.addEventListener('hashchange', applyHash); applyHash();
  const carousel = document.getElementById('carousel');
  const pause = document.getElementById('carousel-pause');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  let hovered = false; let focused = false;
  function syncPause() {
    pause.textContent = paused ? 'Reproduzir' : 'Pausar';
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Reproduzir carrossel automático' : 'Pausar carrossel automático');
  }
  syncPause();
  function move(direction) {
    const maximum = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    if (!maximum) return;
    const item = carousel.querySelector('.cinema-card');
    const step = item.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).gap || '18');
    let left = carousel.scrollLeft + direction * step;
    if (direction > 0 && carousel.scrollLeft >= maximum - 5) left = 0;
    if (direction < 0 && carousel.scrollLeft <= 5) left = maximum;
    carousel.scrollTo({left: Math.min(maximum, Math.max(0, left)), behavior: preference.matches ? 'auto' : 'smooth'});
  }
  document.getElementById('carousel-prev').addEventListener('click', () => move(-1));
  document.getElementById('carousel-next').addEventListener('click', () => move(1));
  pause.addEventListener('click', () => { paused = !paused; syncPause(); });
  carousel.addEventListener('mouseenter', () => {hovered = true;});
  carousel.addEventListener('mouseleave', () => {hovered = false;});
  carousel.addEventListener('focusin', () => {focused = true;});
  carousel.addEventListener('focusout', event => {focused = carousel.contains(event.relatedTarget);});
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  if (preference.addEventListener) preference.addEventListener('change', () => {paused = preference.matches; syncPause();});
  setInterval(() => {
    const box = carousel.getBoundingClientRect();
    if (!paused && !hovered && !focused && !document.hidden && box.bottom > 0 && box.top < window.innerHeight) move(1);
  }, 3000);
  if ('IntersectionObserver' in window && !preference.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
    }), { threshold:.08 });
    document.querySelectorAll('.section-heading,.plan,.step,.faq,.cta-panel').forEach(el => {el.classList.add('reveal');observer.observe(el);});
    document.body.classList.add('motion-ready');
  }
})();
