(() => {
  const plans = [
    { label: '1 mês', price: '19,90', payment: 'https://app.syncpayments.com.br/payment-link/a0e91723-a4d3-4a51-be39-38cf84521bbd', image: 'plano-1.webp', saving: 'Conheça o plano de 1 mês.' },
    { label: '2 meses', price: '34,90', payment: 'https://link.syncpayments.com.br/r1XTcP', image: 'plano-2.webp', saving: 'Economize R$ 4,90 em relação a dois planos de 1 mês.' },
    { label: '3 meses', price: '46,90', payment: 'https://link.syncpayments.com.br/HL8xbA', image: 'plano-3.webp', saving: 'Economize R$ 12,80 em relação a três planos de 1 mês.' }
  ];
  let current = 0;
  let transitionTimer;
  const banner = document.getElementById('selected-banner');
  const buttons = [...document.querySelectorAll('[data-plan]')];
  const cta = document.getElementById('selected-cta');
  function choose(index) {
    current = (index + plans.length) % plans.length;
    const plan = plans[current];
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    document.getElementById('selected-price').textContent = plan.price;
    document.getElementById('selected-duration').textContent = 'Valor total para ' + plan.label;
    document.getElementById('selected-saving').textContent = plan.saving;
    cta.textContent = 'Comprar ' + plan.label + ' ↗';
    cta.dataset.message = `Olá! Quero contratar o plano Luck Serviços de ${plan.label} por R$ ${plan.price} (valor total).`;
    cta.href = plan.payment;
    clearTimeout(transitionTimer);
    banner.classList.add('switching');
    transitionTimer = setTimeout(() => {
      banner.src = plan.image;
      banner.alt = `Plano Luck Serviços de ${plan.label} por R$ ${plan.price}`;
      banner.classList.remove('switching');
    }, 140);
  }
  buttons.forEach(button => button.addEventListener('click', () => choose(Number(button.dataset.plan))));
  document.getElementById('previous-plan').addEventListener('click', () => choose(current - 1));
  document.getElementById('next-plan').addEventListener('click', () => choose(current + 1));
  plans.forEach(plan => { const image = new Image(); image.src = plan.image; });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduced) {
    const elements = document.querySelectorAll('.hero-top, .facts .fact, .section-head, .showcase, .steps > div, .faq-layout, .closing');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => { element.classList.add('reveal'); observer.observe(element); });
    document.body.classList.add('motion-ready');
  }
  const progress = document.querySelector('.scroll-progress');
  const nav = [...document.querySelectorAll('.navlinks > a[href^="#"]')];
  let scheduled = false;
  function updateScroll() {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (maximum > 0 ? Math.min(100, window.scrollY / maximum * 100) : 0) + '%';
    let active = '';
    nav.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section && section.getBoundingClientRect().top <= 150) active = link.getAttribute('href');
    });
    nav.forEach(link => link.classList.toggle('active', link.getAttribute('href') === active));
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();
})();


(() => {
 const images=[{src:'hero.webp',alt:'Luck Serviços: entretenimento e teste grátis de 6 horas'},{src:'plano-1.webp',alt:'Plano Luck Serviços: 1 mês por R$ 19,90'},{src:'plano-3.webp',alt:'Plano Luck Serviços: 3 meses por R$ 46,90'}];
 const hero=document.querySelector('.hero-art'),pause=document.getElementById('art-pause'),dots=[...document.querySelectorAll('[data-art]')];
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');let index=0,paused=motion.matches,hover=false;
 function show(i){index=(i+images.length)%images.length;hero.src=images[index].src;hero.alt=images[index].alt;dots.forEach((d,k)=>d.setAttribute('aria-current',String(k===index)));}
 function sync(){pause.textContent=paused?'Reproduzir':'Pausar';pause.setAttribute('aria-pressed',String(paused));}
 document.getElementById('art-prev').addEventListener('click',()=>show(index-1));document.getElementById('art-next').addEventListener('click',()=>show(index+1));dots.forEach(d=>d.addEventListener('click',()=>show(Number(d.dataset.art))));pause.addEventListener('click',()=>{paused=!paused;sync();});
 const box=document.querySelector('.art-gallery');box.addEventListener('mouseenter',()=>hover=true);box.addEventListener('mouseleave',()=>hover=false);
 images.forEach(item=>{const img=new Image();img.src=item.src;});sync();setInterval(()=>{const r=box.getBoundingClientRect();if(!paused&&!hover&&!document.hidden&&r.bottom>0&&r.top<window.innerHeight)show(index+1);},5500);
})();
