// Minimal JS for interactivity: nav toggle, filters, lightbox, modal, contact validation
document.addEventListener('DOMContentLoaded',()=>{
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // CTA scroll to contact
  document.getElementById('ctaContact')?.addEventListener('click',()=>{
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
  });

  // SHOWREEL MODAL
  const reelModal = document.getElementById('reelModal');
  document.getElementById('playReel')?.addEventListener('click',()=>{ reelModal.style.display='flex'; });
  document.getElementById('closeReel')?.addEventListener('click',()=>{ reelModal.style.display='none'; const v = reelModal.querySelector('video'); if(v){v.pause(); v.currentTime=0;} });
  reelModal?.addEventListener('click',(e)=>{ if(e.target===reelModal){ reelModal.style.display='none'; const v = reelModal.querySelector('video'); if(v){v.pause(); v.currentTime=0;} } });

  // FILTERS
  const filters = document.getElementById('filters');
  const grid = document.getElementById('portfolioGrid');
  filters?.addEventListener('click',(e)=>{
    const btn = e.target.closest('.filter'); if(!btn) return;
    filters.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    filterGrid(f);
  });

  function filterGrid(filter){
    const items = grid.querySelectorAll('.card');
    items.forEach(item=>{
      const cat = item.getAttribute('data-category');
      if(filter==='*' || cat.includes(filter)){
        item.style.display='block';
        setTimeout(()=> item.style.opacity=1,50);
      } else {
        item.style.opacity=0; setTimeout(()=> item.style.display='none',300);
      }
    });
  }

  // LIGHTBOX
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  grid.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click',()=>{
      const img = card.querySelector('img');
      lbImg.src = img.src;
      lbCaption.textContent = card.querySelector('h3')?.textContent || '';
      lb.style.display='flex';
      lb.setAttribute('aria-hidden','false');
    });
  });
  document.getElementById('lbClose')?.addEventListener('click',()=>{ lb.style.display='none'; lb.setAttribute('aria-hidden','true'); });
  lb?.addEventListener('click',(e)=>{ if(e.target===lb){ lb.style.display='none'; lb.setAttribute('aria-hidden','true'); } });

  // CONTACT FORM BASIC VALIDATION (no backend)
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    if(!name || !email || !message){
      alert('Please complete the form.'); return;
    }
    // Simulate send
    alert('Thanks! Message sent (demo). Replace with real backend endpoint or email integration.');
    form.reset();
  });

});