const form = document.getElementById('calcForm');
const bmrEl = document.getElementById('bmr');
const tdeeEl = document.getElementById('tdee');
const results = document.getElementById('results');
const carbBar = document.getElementById('carbBar');
const proteinBar = document.getElementById('proteinBar');
const fatBar = document.getElementById('fatBar');
const carbG = document.getElementById('carbG');
const proteinG = document.getElementById('proteinG');
const fatG = document.getElementById('fatG');

function animateValue(el, start, end, duration=700){
  const startTime = performance.now();
  function tick(now){
    const p = Math.min((now - startTime)/duration, 1);
    el.textContent = Math.round(start + (end-start)*p);
    if (p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const age = +document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;
  const activity = +document.getElementById('activity').value;

  // BMR (Mifflin–St Jeor)
  let bmr = 10*weight + 6.25*height - 5*age + (gender==='Male'?5:-161);
  const tdee = bmr * activity;

  // Macros (50/20/30)
  const carbs = (tdee*0.50)/4;
  const protein = (tdee*0.20)/4;
  const fat = (tdee*0.30)/9;

  results.classList.remove('hidden');
  animateValue(bmrEl, 0, Math.round(bmr));
  animateValue(tdeeEl, 0, Math.round(tdee));

  carbBar.style.width = '50%'; proteinBar.style.width = '20%'; fatBar.style.width = '30%';
  carbG.textContent = Math.round(carbs); proteinG.textContent = Math.round(protein); fatG.textContent = Math.round(fat);
});




function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}