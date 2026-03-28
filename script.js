// =============================================
//   ROMANTIC WEBSITE — script.js
// =============================================

// ========== PAGE NAVIGATION ==========
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const content = target.querySelector('.fade-in');
    if (content) {
      content.style.animation = 'none';
      content.offsetHeight; // reflow
      content.style.animation = '';
    }

    // Initialize galleries
    if (pageId === 'page6') {
      currentHerIndex = 0;
      updateHerPhoto();
    }
    if (pageId === 'page5') {
      initUsGrid();
    }

    // Trigger chat animation
    if (pageId === 'page3') {
      animateChatMessages();
    }

    // Reset birthday animation if going to page 8
    if (pageId === 'page8') {
      const bdayMsg = document.getElementById('birthdayMsg');
      if (bdayMsg) {
        bdayMsg.style.animation = 'none';
        bdayMsg.offsetHeight;
        bdayMsg.style.animation = '';
      }
    }
  }
  tryPlayMusic();
}

// ========== CHAT ANIMATION ==========
function animateChatMessages() {
  const messages = document.querySelectorAll('#chatBody .hidden-chat');
  const chatBody = document.getElementById('chatBody');
  const continueBtn = document.getElementById('chatContinueBtn');
  
  if (!chatBody) return;

  // Initial state: Hide everything and stay at top
  chatBody.style.overflowY = 'hidden';
  chatBody.scrollTop = 0;
  if (continueBtn) continueBtn.classList.add('hidden');

  messages.forEach((msg, index) => {
    msg.classList.remove('show-chat');
    
    setTimeout(() => {
      msg.classList.add('show-chat');
      
      // Auto-scroll only if needed, and after first few messages
      if (index > 2) {
        chatBody.scrollTo({
          top: chatBody.scrollHeight,
          behavior: 'smooth'
        });
      }

      // If it's the last message
      if (index === messages.length - 1) {
        setTimeout(() => {
          chatBody.style.overflowY = 'auto';
          if (continueBtn) {
            continueBtn.classList.remove('hidden');
            continueBtn.classList.add('fade-in');
          }
        }, 1000);
      }
    }, index * 1200);
  });
}

// ========== HER ANIMATED GALLERY ==========
const herPhotos = [
  { src: "images/her/my cuto.jpg", word: "Adorable 🥰", line: "The cutest person I've ever met." },
  { src: "images/her/fugga.jpg", word: "Joyful 🎈", line: "Your smile makes everything better." },
  { src: "images/her/IMG_3418.jpg", word: "Radiant 🌟", line: "You shine brighter than any star." },
  { src: "images/her/IMG_5513.jpg", word: "Graceful 🌸", line: "Beauty in every single move you make." },
  { src: "images/her/IMG_5635.jpg", word: "Stunning ✨", line: "I lose my breath every time I see you." },
  { src: "images/her/IMG_6253.jpg", word: "Elegant 💎", line: "You carry yourself with such class." },
  { src: "images/her/IMG_6653.jpg", word: "Breathtaking 🌹", line: "A vision that I never want to stop seeing." },
  { src: "images/her/IMG_8744.jpg", word: "Sweetness 🍭", line: "You're the sweetest part of my life." },
  { src: "images/her/IMG-20260101-WA0720.jpg", word: "Lovely 🌷", line: "Simply lovely in every single way." },
  { src: "images/her/IMG-20260125-WA0106.jpg", word: "Ethereal 🌙", line: "You're like a dream I never want to wake from." },
  { src: "images/her/IMG-20260320-WA0019.jpg", word: "Classic 🕊️", line: "Timeless beauty that never fades." },
  { src: "images/her/IMG-20260321-WA0022.jpg", word: "Vibrant 🌈", line: "You bring so much color to my world." },
  { src: "images/her/Snapchat-1514051596.jpg", word: "cutest 🎉", line: "Life is a party when I'm with you!", rotate: '270' },
  { src: "images/her/Snapchat-847825617.jpg", word: "Candid 📸", line: "Perfect even when you aren't trying." },
  { src: "images/her/white.png", word: "Pure 🤍", line: "A heart as pure as the driven snow." }
];

let currentHerIndex = 0;

function updateHerPhoto() {
  const container = document.getElementById('herAnimationContainer');
  if (!container) return;

  const photo = herPhotos[currentHerIndex];
  let rotateClass = '';
  if (photo.rotate === true) rotateClass = 'fun-rotate';
  else if (photo.rotate === '90') rotateClass = 'rotate-90';
  else if (photo.rotate === '270') rotateClass = 'rotate-270';
  
  container.innerHTML = `
    <div class="her-photo-frame ${rotateClass}">
      <img src="${photo.src}" alt="Her">
      <div class="her-word">${photo.word}</div>
      <div class="her-line">${photo.line}</div>
    </div>
  `;

  const toUsBtn = document.getElementById('toUsBtn');

  // Show "A Little Thought" button only on the last photo
  if (currentHerIndex === herPhotos.length - 1) {
    if (toUsBtn) toUsBtn.classList.remove('hidden');
  } else {
    if (toUsBtn) toUsBtn.classList.add('hidden');
  }
}

function showNextHerPhoto() {
  if (currentHerIndex < herPhotos.length - 1) {
    currentHerIndex++;
    updateHerPhoto();
  } else {
    goTo('page7');
  }
}

function showPrevHerPhoto() {
  if (currentHerIndex > 0) {
    currentHerIndex--;
  } else {
    currentHerIndex = herPhotos.length - 1; // Loop to end
  }
  updateHerPhoto();
}

// ========== US TOGETHER GRID ==========
const usPhotos = [
  { src: "images/us/us.JPG", word: "Us 💖", line: "The beginning of our beautiful forever." },
  { src: "images/us/us 2.jpg", word: "Together ✨", line: "Every moment with you is a treasure." },
  { src: "images/us/us (2).jpg", word: "Moments 🌸", line: "Building a lifetime of memories, one photo at a time." },
  { src: "images/us/cutie.jpg", word: "Cuties 🥰", line: "Just two kids in love with the world and each other." },
  { src: "images/us/mirror selfie.jpg", word: "Our Vibe 🤳", line: "Matching souls, matching smiles." },
  { src: "images/us/firstpic2.jpg", word: "First Times 💝", line: "Where the magic all began." },
  { src: "images/us/first trip.jpg", word: "Adventures 🌍", line: "Exploring the world, hand in hand." },
  { src: "images/us/first trip (2).jpg", word: "Travels ✈️", line: "To more trips and more sunsets together." },
  { src: "images/us/first time in saree.jpg", word: "Stunning 🌷", line: "I still remember how my heart skipped a beat." },
  { src: "images/us/ghiblii 1.png", word: "Anime Vibe 🎨", line: "Our love story feels like a movie." },
  { src: "images/us/menovi.png", word: "Special 💍", line: "A bond that's deeper than words can say." },
  { src: "images/us/IMG_6687.JPG", word: "Memories 📸", line: "Capturing the light in our eyes." },
  { src: "images/us/IMG_9576~2.jpg", word: "Always ♾️", line: "You and me, against the world, forever." },
  { src: "images/us/IMG-20260101-WA0558.jpg", word: "Smiles 😁", line: "You are the reason behind my happiest grins." },
  { src: "images/us/IMG-20260126-WA0110.jpg", word: "Warmth ☀️", line: "Your love is my favorite place to be." },
  { src: "images/us/gussa.jpg", word: "Cute Gussa 😤❤️", line: "Even when you're mad, you're the most beautiful.", rotate: true },
  { src: "images/us/heart.jpg", word: "Love 💖", line: "My heart belongs to you, always." }
];

function initUsGrid() {
  const container = document.getElementById('usGridContainer');
  if (!container) return;

  container.innerHTML = usPhotos.map((photo, index) => `
    <div class="us-grid-item" onclick="openMemory(${index})">
      <img src="${photo.src}" alt="Memory">
    </div>
  `).join('');
}

function openMemory(index) {
  const photo = usPhotos[index];
  const modal = document.getElementById('memoryModal');
  const img = document.getElementById('modalImg');
  const word = document.getElementById('modalWord');
  const line = document.getElementById('modalLine');

  if (!modal || !img || !word || !line) return;

  img.src = photo.src;
  word.textContent = photo.word;
  line.textContent = photo.line;

  // Handle rotation if needed
  img.parentElement.className = 'modal-image-wrap';
  if (photo.rotate === true) img.parentElement.classList.add('fun-rotate');
  else if (photo.rotate === '90') img.parentElement.classList.add('rotate-90');
  else if (photo.rotate === '270') img.parentElement.classList.add('rotate-270');

  modal.classList.add('active');
}

function closeMemory() {
  const modal = document.getElementById('memoryModal');
  if (modal) {
    modal.classList.remove('active');
  }
}


// ========== INTERACTIVE QUOTES ZOOM ==========
function zoomQuote(card) {
  const overlay = document.getElementById('quoteOverlay');
  
  // Add zoom class to card
  card.classList.add('zoomed');
  if (overlay) overlay.classList.add('active');
  
  // Remove after 3 seconds
  setTimeout(() => {
    card.classList.remove('zoomed');
    if (overlay) overlay.classList.remove('active');
  }, 3000);
}

// ========== PASSWORD CHECK ==========
function checkPassword() {
  const input = document.getElementById('passInput');
  const error = document.getElementById('passError');
  const pass = input.value.toLowerCase().trim();

  if (pass === 'iloveyou') {
    goTo('page2');
  } else {
    error.textContent = "say that magical words";
    input.value = "";
    input.focus();
  }
}

function handlePassKey(event) {
  if (event.key === "Enter") {
    checkPassword();
  }
}

// Special transition for the final page reveal
function finalReveal() {
  const questionPart = document.getElementById('finalQuestion');
  const revealPart = document.getElementById('finalRevealContent');
  
  if (questionPart && revealPart) {
    questionPart.classList.add('hidden');
    revealPart.classList.remove('hidden');
    revealPart.classList.add('fade-in');
    
    // Massive shower of hearts
    for (let i = 0; i < 40; i++) {
      setTimeout(createFloatingHeart, i * 150);
    }
    
    // Confetti burst
    showConfetti();
  }
}

// ========== MUSIC ==========
let musicPlaying = false;
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

function tryPlayMusic() {
  if (!musicPlaying && music) {
    music.volume = 0.35;
    music.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🎵';
    }).catch(() => { });
  }
}

function toggleMusic() {
  if (!music) return;
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicBtn.textContent = '🔇';
  } else {
    music.volume = 0.35;
    music.play();
    musicPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.textContent = '🎵';
  }
}

// ========== NO BUTTON MOVEMENT ==========
function moveNoBtn() {
  const btn = document.getElementById('noBtn');
  if (!btn) return;
  const randomX = (Math.random() * 400 - 200);
  const randomY = (Math.random() * 200 - 100);
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btn.style.transition = 'transform 0.2s ease';
  const msgEl = document.getElementById('funnyText');
  if (msgEl) msgEl.textContent = "Nice try! 😂";
}

function moveNoBtn2() {
  const btn = document.getElementById('noBtn2');
  if (!btn) return;
  const randomX = (Math.random() * 400 - 200);
  const randomY = (Math.random() * 200 - 100);
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btn.style.transition = 'transform 0.2s ease';
}

function moveNoBtn3() {
  const btn = document.getElementById('noBtn3');
  if (!btn) return;
  const randomX = (Math.random() * 400 - 200);
  const randomY = (Math.random() * 200 - 100);
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btn.style.transition = 'transform 0.2s ease';
}

// ========== CONFETTI ==========
const confettiColors = ['#ff6b8a', '#ffb6c1', '#c084fc', '#ffd4e0', '#ff9fb8', '#e879f9', '#f472b6', '#fbbf24', '#ffffff'];

function showConfetti() {
  const overlay = document.getElementById('confettiOverlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  overlay.innerHTML = ''; // Clear previous

  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const size = Math.random() * 10 + 6;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      piece.style.cssText = `
        background: ${color};
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation: confetti-fall ${duration}s linear forwards;
      `;
      overlay.appendChild(piece);
    }, i * 15);
  }

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 6000);
}

// ========== LIVE PRECISION COUNTER ==========
// 🔧 START DATE: 6 January 2023
const START_DATE = new Date(2023, 0, 6, 0, 0, 0);

function updatePrecisionCounter() {
  const now = new Date();
  const diffMs = now - START_DATE;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('minutes');
  const sEl = document.getElementById('seconds');

  if (dEl) dEl.textContent = days;
  if (hEl) hEl.textContent = hours;
  if (mEl) mEl.textContent = minutes;
  if (sEl) sEl.textContent = seconds;
}

// Run counter every second
setInterval(updatePrecisionCounter, 1000);

// ========== FLOATING HEARTS ==========
const heartEmojis = ['💖', '💕', '💗', '💓', '💞', '💘', '🌸', '✨', '🌷', '💝', '🫶', '💫'];
function createFloatingHeart() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  const left = Math.random() * 100;
  const size = Math.random() * 1 + 0.7;
  const duration = Math.random() * 8 + 8;
  heart.style.cssText = `left: ${left}%; font-size: ${size}rem; animation-duration: ${duration}s;`;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(createFloatingHeart, 1500);

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  updatePrecisionCounter();
  document.addEventListener('click', tryPlayMusic, { once: true });
});
