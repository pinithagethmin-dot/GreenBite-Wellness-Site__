// ==============================
// 🌬️ Breathing Animation
// ==============================

// Get the breathing circle element
const circle = document.getElementById('breathCircle');

// Variables to control the animation
let breathInterval = null;
let phase = 'Inhale';

// Start the breathing animation
function startBreath() {
  circle.textContent = 'Inhale';          // Show "Inhale"
  circle.style.transform = 'scale(1.2)';  // Slightly enlarge the circle

  // Switch between inhale and exhale every 4 seconds
  breathInterval = setInterval(() => {
    if (phase === 'Inhale') {
      phase = 'Exhale';
      circle.textContent = 'Exhale';
      circle.style.transform = 'scale(0.9)'; // Shrink the circle
    } else {
      phase = 'Inhale';
      circle.textContent = 'Inhale';
      circle.style.transform = 'scale(1.2)'; // Enlarge again
    }
  }, 4000);
}

// Stop the breathing animation
function stopBreath() {
  clearInterval(breathInterval);          // Stop the interval
  circle.style.transform = 'scale(1)';    // Reset size
  circle.textContent = 'Inhale';          // Reset text
}

// Add click listeners to start/stop buttons
document.getElementById('startBreath')?.addEventListener('click', startBreath);
document.getElementById('stopBreath')?.addEventListener('click', stopBreath);


// ==============================
// 🧘 Meditation Timer + Sessions
// ==============================

// Timer and session tracking variables
let medTimer = null;
let medLeft = 0;
let sessions = +localStorage.getItem('doneSessions') || 0;

// Get display elements
const medCount = document.getElementById('medCount');
const doneSessions = document.getElementById('doneSessions');

// Show how many sessions have been completed
doneSessions.textContent = sessions;

// Format and display time as MM:SS
function renderTime() {
  const m = Math.floor(medLeft / 60).toString().padStart(2, '0');
  const s = (medLeft % 60).toString().padStart(2, '0');
  medCount.textContent = `${m}:${s}`;
}

// Start the meditation timer
function startMed() {
  // If timer hasn't started, get minutes from input
  if (medLeft <= 0) {
    const min = Math.max(1, +document.getElementById('medMin').value || 5);
    medLeft = min * 60;
  }

  // If timer is already running, do nothing
  if (medTimer) return;

  // Start countdown every second
  medTimer = setInterval(() => {
    medLeft--;
    renderTime();

    // When time runs out
    if (medLeft <= 0) {
      clearInterval(medTimer);
      medTimer = null;
      sessions++;
      localStorage.setItem('doneSessions', sessions); // Save session count
      doneSessions.textContent = sessions;
      notify('Session complete!'); // Show notification
      beep();                      // Play sound
    }
  }, 1000);
}

// Pause the timer
function pauseMed() {
  clearInterval(medTimer);
  medTimer = null;
}

// Reset the timer
function resetMed() {
  pauseMed();
  medLeft = 0;
  renderTime();
}

// Add click listeners to timer buttons
document.getElementById('startMed')?.addEventListener('click', startMed);
document.getElementById('pauseMed')?.addEventListener('click', pauseMed);
document.getElementById('resetMed')?.addEventListener('click', resetMed);


// ==============================
// 🎧 Ambient Sounds (Demo Tones)
// ==============================

// Variables for sound context and oscillator
let soundCtx = null, soundOsc = null;
let soundType = 'rain';

function play(type) {
  soundType = type;

  // Stop any existing sound
  if (soundCtx) stop();

  // Create audio context and oscillator
  soundCtx = new (window.AudioContext || window.webkitAudioContext)();
  const o = soundCtx.createOscillator();
  const g = soundCtx.createGain();

  o.connect(g);
  g.connect(soundCtx.destination);

  o.type = 'sine'; // Smooth tone

  // Set frequency and volume based on sound type
  if (type === 'rain') {
    o.frequency.value = 220;
    g.gain.value = 0.01;
  } else if (type === 'waves') {
    o.frequency.value = 440; // clearer mid-range tone
    g.gain.value = 0.015;
  } else if (type === 'forest') {
    o.frequency.value = 330; // gentle tone
    g.gain.value = 0.012;
  } else {
    o.frequency.value = 200; // fallback
    g.gain.value = 0.01;
  }

  o.start();
  soundOsc = o;
}


// Stop the sound
function stop() {
  if (soundOsc) {
    soundOsc.stop();
    soundCtx.close();
    soundOsc = null;
    soundCtx = null;
  }
}

// Add click listeners to sound buttons
for (const btn of document.querySelectorAll('.sounds .btn[data-sound]')) {
  btn.addEventListener('click', () => play(btn.dataset.sound));
}

// Add click listener to stop sound button
document.getElementById('stopSound')?.addEventListener('click', stop);


// ==============================
// 🔔 Helpers (Beep + Notification)
// ==============================

// Play a short beep sound
function beep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.connect(g);
  g.connect(ctx.destination);

  o.frequency.value = 660; // Beep tone
  g.gain.value = 0.05;

  o.start();
  setTimeout(() => {
    o.stop();
    ctx.close();
  }, 150); // Stop after 150ms
}

// Show a browser notification
function notify(msg) {
  if (window.Notification && Notification.permission === 'granted') {
    new Notification(msg);
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission();
  }
}


// ==============================
// 📱 Mobile Navigation Toggle
// ==============================

// Show/hide the mobile menu when hamburger is clicked
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}
