
const links = document.querySelectorAll('a[href^="#"]');
for (const l of links){
  l.addEventListener('click', e => {
    const target = document.querySelector(l.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); document.querySelector('.navlinks').classList.remove('open'); }
  });
}
document.getElementById('menu')?.addEventListener('click', ()=>{ document.querySelector('.navlinks').classList.toggle('open'); });

// Dark mode toggle
const toggle = document.getElementById('color-toggle'); const root = document.documentElement; let dark=false;
toggle?.addEventListener('click', ()=>{
  dark=!dark;
  if(dark){ root.style.setProperty('--bg','#0b0b10'); root.style.setProperty('--panel','#12121a'); root.style.setProperty('--text','#e9e9ef'); root.style.setProperty('--muted','#b9b9c9'); root.style.setProperty('--border','#232334'); }
  else{ root.style.removeProperty('--bg'); root.style.removeProperty('--panel'); root.style.removeProperty('--text'); root.style.removeProperty('--muted'); root.style.removeProperty('--border'); }
});
document.getElementById('y')?.textContent = new Date().getFullYear();

// Lightbox for URA gallery
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const lbImg = lb.querySelector('img');
  const btn = lb.querySelector('.close');
  function openLB(src, alt){ lbImg.src = src; lbImg.alt = alt||''; lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); }
  function closeLB(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); }
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click', ()=> openLB(img.src, img.alt));
  });
  btn.addEventListener('click', closeLB);
  lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLB(); });
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLB(); });
})();
