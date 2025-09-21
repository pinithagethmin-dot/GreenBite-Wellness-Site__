// Function to navigate to a new page when a box is clicked
function navigateTo(page) {
  window.location.href = page; // Redirects to the specified page
}



function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}


// Home page: rotating slogans + Tip of the day
const slogans = [
  'Eat green. Live clean.',
  'Small steps, strong habits.',
  'Move daily, breathe deeply.',
  'Colour your plate with plants.',
  'Consistency beats intensity.'
];
const sloganEl = document.getElementById('slogan');
if(sloganEl){
  let idx = 0; setInterval(()=>{ idx=(idx+1)%slogans.length; sloganEl.textContent = slogans[idx]; }, 3000);
}

const tips = [
  'Start your day with two glasses of water.',
  'Aim for half your plate to be vegetables.',
  'Stand up and stretch for 2 minutes every hour.',
  '20-minute walk after meals helps digestion.',
  'Go to bed 30 minutes earlier tonight.'
];
const tipEl = document.getElementById('dailyTip');
if(tipEl){
  const day = new Date().getDate();
  tipEl.textContent = tips[day % tips.length];
}

// Register Service Worker for PWA (relative path for GitHub Pages)
if ('serviceWorker' in navigator){
  window.addEventListener('load', ()=> navigator.serviceWorker.register('service-worker.js'));
}
