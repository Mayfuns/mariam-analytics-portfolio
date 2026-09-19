document.addEventListener('DOMContentLoaded',()=>{
  const b=document.querySelector('.menu-btn');
  const n=document.querySelector('.navlinks');
  if(b&&n){
    const close=()=>{
      b.setAttribute('aria-expanded','false');
      b.setAttribute('aria-label','Open navigation');
      n.classList.remove('open');
    };
    b.addEventListener('click',()=>{
      const open=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',String(!open));
      b.setAttribute('aria-label',open?'Open navigation':'Close navigation');
      n.classList.toggle('open',!open);
    });
    n.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&n.classList.contains('open')){
        close();
        b.focus();
      }
    });
    document.addEventListener('click',e=>{
      if(!n.contains(e.target)&&!b.contains(e.target))close();
    });
    window.addEventListener('resize',()=>{
      if(window.innerWidth>760)close();
    });
  }

  document.querySelectorAll('.actions .btn[href="index.html#work"]').forEach(a=>a.textContent='Back to portfolio');
  document.querySelectorAll('.side-links .btn[href="index.html#work"]').forEach(a=>a.textContent='View other projects');
  document.querySelectorAll('.repo-status').forEach(el=>{
    if(el.tagName!=='A' || !el.getAttribute('href')) el.textContent='GitHub repository — coming soon';
  });

  const stack=document.querySelector('.stack');
  if(stack){
    let panels=[...stack.children].filter(el=>el.classList&&el.classList.contains('panel'));
    const question=panels.find(p=>/question/i.test(p.querySelector('h2')?.textContent||''))||panels[0];
    if(question)question.classList.add('question-panel');

    const preview=panels.find(p=>p.querySelector('.dashboard'));
    if(preview){
      preview.classList.add('preview-panel');
      if(question&&question.nextElementSibling!==preview)question.insertAdjacentElement('afterend',preview);
    }

    panels=[...stack.children].filter(el=>el.classList&&el.classList.contains('panel'));
    panels.forEach((p,index)=>{
      const h2=p.querySelector('h2');
      if(!h2)return;
      const heading=(h2.textContent||'').toLowerCase();
      if(heading.includes('analytical approach'))p.classList.add('approach-panel');
      if(heading.includes('what the analysis covers')||heading.includes('sql capabilities demonstrated'))p.classList.add('coverage-panel');
      if(heading.includes('key findings')||heading.includes('sql techniques demonstrated')||heading.includes('skills demonstrated')||heading.includes('what this project demonstrates'))p.classList.add('highlight-panel');
      if(heading.includes('decision-support perspective'))p.classList.add('decision-panel');

      let label=`${String(index+1).padStart(2,'0')} • Case study`;
      if(p.classList.contains('question-panel'))label=`${String(index+1).padStart(2,'0')} • Business question`;
      else if(p.classList.contains('preview-panel'))label=`${String(index+1).padStart(2,'0')} • Project preview`;
      else if(p.classList.contains('approach-panel'))label=`${String(index+1).padStart(2,'0')} • Analytical approach`;
      else if(p.classList.contains('coverage-panel'))label=`${String(index+1).padStart(2,'0')} • Analysis scope`;
      else if(p.classList.contains('highlight-panel'))label=`${String(index+1).padStart(2,'0')} • Evidence & findings`;
      else if(p.classList.contains('decision-panel'))label=`${String(index+1).padStart(2,'0')} • Decision support`;
      h2.dataset.step=label;
    });
  }

  document.querySelectorAll('.preview-panel .dashboard').forEach(dashboard=>{
    const dashboardImage=dashboard.querySelector('img');
    if(!dashboardImage)return;
    dashboard.classList.add('zoomable-dashboard');
    dashboard.setAttribute('role','button');
    dashboard.setAttribute('tabindex','0');
    dashboard.setAttribute('aria-label','View '+(dashboardImage.alt||'dashboard')+' full size');

    if(!dashboard.querySelector('.dashboard-zoom-hint')){
      const hint=document.createElement('span');
      hint.className='dashboard-zoom-hint';
      hint.textContent='View full size ↗';
      dashboard.appendChild(hint);
    }

    const lightbox=document.createElement('div');
    lightbox.className='dashboard-lightbox';
    lightbox.setAttribute('role','dialog');
    lightbox.setAttribute('aria-modal','true');
    lightbox.setAttribute('aria-label','Full-size dashboard preview');
    const caption=dashboard.querySelector('.caption')?.textContent?.trim()||dashboardImage.alt||'Dashboard preview';
    const inner=document.createElement('div');
    inner.className='dashboard-lightbox-inner';
    const lbImg=document.createElement('img');
    lbImg.src=dashboardImage.src;
    lbImg.alt=dashboardImage.alt||'Dashboard preview';
    const closeButton=document.createElement('button');
    closeButton.className='dashboard-lightbox-close';
    closeButton.type='button';
    closeButton.setAttribute('aria-label','Close full-size preview');
    closeButton.textContent='×';
    const label=document.createElement('div');
    label.className='dashboard-lightbox-label';
    label.textContent=caption;
    inner.append(lbImg,closeButton,label);
    lightbox.appendChild(inner);
    document.body.appendChild(lightbox);

    let previousFocus=null;
    const openLightbox=()=>{
      previousFocus=document.activeElement;
      lightbox.classList.add('open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    };
    const closeLightbox=()=>{
      if(!lightbox.classList.contains('open'))return;
      lightbox.classList.remove('open');
      document.body.classList.remove('lightbox-open');
      if(previousFocus&&typeof previousFocus.focus==='function')previousFocus.focus();
    };

    dashboard.addEventListener('click',openLightbox);
    dashboard.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        openLightbox();
      }
    });
    closeButton.addEventListener('click',e=>{
      e.stopPropagation();
      closeLightbox();
    });
    lightbox.addEventListener('click',e=>{
      if(e.target===lightbox)closeLightbox();
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&lightbox.classList.contains('open'))closeLightbox();
    });
  });

  const cases=[
    ['vitalcare.html','VitalCare Health Group'],
    ['talent-pulse.html','Talent Pulse Solutions'],
    ['global-hiv.html','Global HIV Analytics'],
    ['lumina.html','Lumina'],
    ['toy-store.html','Toy Store E-Commerce'],
    ['motivaautos.html','MotivaAutos']
  ];
  const current=(location.pathname.split('/').pop()||'').toLowerCase();
  const i=cases.findIndex(([file])=>file===current);
  const footer=document.querySelector('.footer');
  if(i>-1&&footer){
    const prev=cases[(i-1+cases.length)%cases.length];
    const next=cases[(i+1)%cases.length];
    const section=document.createElement('section');
    section.className='case-nav-section';
    section.setAttribute('aria-label','Browse case studies');
    section.innerHTML=`<div class="wrap"><div class="case-nav-label">Continue exploring</div><div class="case-nav-grid"><a class="case-nav-card prev" href="${prev[0]}"><span class="case-arrow">←</span><span><small>Previous case study</small><strong>${prev[1]}</strong></span></a><a class="case-nav-card next" href="${next[0]}"><span><small>Next case study</small><strong>${next[1]}</strong></span><span class="case-arrow">→</span></a></div></div>`;
    footer.parentNode.insertBefore(section,footer);
  }
});