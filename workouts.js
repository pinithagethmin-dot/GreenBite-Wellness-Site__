const DB = {
  'Full Body': [
    {name:'Jumping Jacks', duration:30}, {name:'Bodyweight Squats', duration:40}, {name:'Push-ups', duration:30}
  ],
  'Arms': [
    {name:'Bicep Curls', duration:30, equip:'Dumbbells'}, {name:'Tricep Dips', duration:30}
  ],
  'Legs': [
    {name:'Lunges', duration:40}, {name:'Glute Bridges', duration:40}
  ],
  'Core': [
    {name:'Plank', duration:40}, {name:'Mountain Climbers', duration:30}
  ],
  'Back': [
    {name:'Superman', duration:30}, {name:'Bent-over Rows', duration:30, equip:'Dumbbells'}
  ]
};

const formW = document.getElementById('workoutForm');
const plan = document.getElementById('plan');
const timerBox = document.getElementById('timer');
const currentExercise = document.getElementById('currentExercise');
const count = document.querySelector('#timer .count');
let seq = []; let idx = 0; let remaining = 0; let running = false; let rafId=null;

function pickExercises(part, equip){
  const list = DB[part].filter(e=>!e.equip || e.equip===equip);
  const shuffled=[...list].sort(()=>Math.random()-0.5);
  return shuffled.slice(0, Math.min(4, shuffled.length));
}

formW?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const part = document.getElementById('bodyPart').value;
  const equip = document.getElementById('equipment').value;
  seq = pickExercises(part, equip);
  plan.innerHTML = seq.map((e,i)=>`<article class="exercise"><h3>${i+1}. ${e.name}</h3><p>${e.duration}s</p></article>`).join('') || '<p>No matches for this equipment. Try "None".</p>';
  if(seq.length){ timerBox.hidden=false; idx=0; setExercise(0); }
});

function beep(){
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination); o.frequency.value = 880; g.gain.value=0.05; o.start(); setTimeout(()=>{o.stop(); ctx.close();}, 150);
}

function setExercise(i){
  const ex = seq[i]; if(!ex) return; currentExercise.textContent = ex.name; remaining = ex.duration; count.textContent = remaining; 
}

function tick(){
  if(!running) return; remaining -= 1; count.textContent = remaining; if(remaining<=0){ beep(); idx++; if(idx<seq.length){ setExercise(idx);} else { running=false; alert('Workout complete!'); return;} }
  rafId = setTimeout(()=>tick(), 1000);
}

const startBtn = document.getElementById('startTimer');
const pauseBtn = document.getElementById('pauseTimer');
const resetBtn = document.getElementById('resetTimer');

startBtn?.addEventListener('click',()=>{ if(!seq.length) return; if(!running){ running=true; tick(); }});
pauseBtn?.addEventListener('click',()=>{ running=false; if(rafId) clearTimeout(rafId); });
resetBtn?.addEventListener('click',()=>{ running=false; if(rafId) clearTimeout(rafId); idx=0; setExercise(0); });




function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}