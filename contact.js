const formC = document.getElementById('feedbackForm');
const msg = document.getElementById('formMsg');

formC?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(name.length<2){ msg.textContent='Please enter your name.'; return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ msg.textContent='Enter a valid email.'; return; }
  if(message.length<10){ msg.textContent='Message should be at least 10 characters.'; return; }

  const entry = {name,email,message,date:new Date().toISOString()};
  const list = JSON.parse(localStorage.getItem('feedback')||'[]');
  list.push(entry); localStorage.setItem('feedback', JSON.stringify(list));
  msg.textContent='Thanks! Your feedback was received.';
  formC.reset();
});

for (const btn of document.querySelectorAll('.acc')){
  btn.addEventListener('click', ()=>{
    const panel = btn.nextElementSibling; const open = panel.style.display==='block';
    document.querySelectorAll('.panel').forEach(p=>p.style.display='none');
    document.querySelectorAll('.acc').forEach(b=>b.setAttribute('aria-expanded','false'));
    if(!open){ panel.style.display='block'; btn.setAttribute('aria-expanded','true'); }
  });
}


// ==============================
// 📱 Mobile Navigation Toggle
// ==============================

// Show/hide the mobile menu when hamburger is clicked
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}
