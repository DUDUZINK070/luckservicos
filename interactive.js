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


(() => {
  const view=document.querySelector('.catalog-viewport'),set=view.querySelector('.catalog-set'),pause=document.getElementById('catalog-pause');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=motion.matches,hover=false,last=0,manualUntil=0,visible=false;
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(view);
  function sync(){pause.textContent=paused?'Reproduzir':'Pausar';pause.setAttribute('aria-pressed',String(paused));}
  pause.addEventListener('click',()=>{paused=!paused;sync();});sync();
  view.addEventListener('mouseenter',()=>hover=true);view.addEventListener('mouseleave',()=>hover=false);view.addEventListener('focusin',()=>hover=true);view.addEventListener('focusout',()=>hover=false);
  ['touchstart','pointerdown','wheel','keydown'].forEach(event=>view.addEventListener(event,()=>{manualUntil=performance.now()+5000;},{passive:true}));
  function move(direction){manualUntil=performance.now()+5000;view.scrollBy({left:direction*view.clientWidth*.7,behavior:motion.matches?'instant':'smooth'});}
  document.getElementById('catalog-prev').addEventListener('click',()=>move(-1));document.getElementById('catalog-next').addEventListener('click',()=>move(1));
  function frame(now){const delta=Math.min(now-last,50);last=now;const period=set.offsetWidth+parseFloat(getComputedStyle(view.firstElementChild).gap);if(!paused&&!hover&&!document.hidden&&visible&&now>manualUntil){view.scrollLeft+=delta*.035;if(view.scrollLeft>=period)view.scrollLeft-=period;}requestAnimationFrame(frame);}requestAnimationFrame(frame);
  motion.addEventListener('change',event=>{paused=event.matches;sync();});
})();

(() => {
  // Promotional information only. Never infer a paid purchase from a click.
  const messages=[['Seu próximo play começa aqui','Plano de 1 mês por R$ 19,90.'],['Mais tempo para maratonar','2 meses por R$ 34,90 no total.'],['Escolha 3 meses de entretenimento','Plano completo por R$ 46,90 no total.'],['Conheça antes de contratar','Peça seu teste grátis de 6 horas pelo WhatsApp.']];
  const box=document.getElementById('purchase-notice');let index=0,hideTimer;
  function hide(){clearTimeout(hideTimer);box.classList.remove('shown');}
  function show(){if(document.hidden)return;const [title,copy]=messages[index++%messages.length];document.getElementById('notice-title').textContent=title;document.getElementById('notice-copy').textContent=copy;box.classList.add('shown');hideTimer=setTimeout(hide,4000);}
  box.querySelector('button').addEventListener('click',hide);document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});setInterval(show,20000);
})();
