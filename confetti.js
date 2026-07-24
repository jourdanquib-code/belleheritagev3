// Lightweight confetti burst on hover for kids elements
(function () {
  const COLORS = ['#b8924a', '#6b2737', '#243a5e', '#d4b06a', '#e8d5a3', '#34507a'];

  function burst(el) {
    const rect = el.getBoundingClientRect();
    const count = 18;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 6;
      piece.style.width = size + 'px';
      piece.style.height = size * 0.6 + 'px';
      piece.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      // start near top center of the element
      const startX = rect.left + rect.width * (0.3 + Math.random() * 0.4);
      const startY = rect.top + rect.height * 0.25;
      piece.style.left = startX + 'px';
      piece.style.top = startY + 'px';
      // random trajectory
      const angle = (Math.random() - 0.5) * Math.PI;
      const dist = 60 + Math.random() * 120;
      const dx = Math.sin(angle) * dist;
      const dy = -Math.abs(Math.cos(angle)) * dist - 40;
      piece.style.setProperty('--dx', dx + 'px');
      piece.style.setProperty('--dy', dy + 'px');
      piece.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      document.body.appendChild(piece);
      piece.addEventListener('animationend', () => piece.remove());
    }
  }

  function attach() {
    const triggers = document.querySelectorAll('.kids-card, .kids-menu-item, .kids-confetti');
    triggers.forEach(el => {
      let cooldown = false;
      el.addEventListener('mouseenter', () => {
        if (cooldown) return;
        cooldown = true;
        burst(el);
        setTimeout(() => { cooldown = false; }, 900);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
