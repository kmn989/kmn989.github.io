// Cursor trail
(function () {
  const canvas = document.getElementById('trail');
  if (!canvas || window.matchMedia('(hover: none)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    if (particles.length > 120) return;
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX + (Math.random() - .5) * 8,
        y: e.clientY + (Math.random() - .5) * 8,
        r: Math.random() * 2 + .7,
        a: .28 + Math.random() * .12,
        vx: (Math.random() - .5) * .5,
        vy: (Math.random() - .5) * .5,
      });
    }
  });

  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.globalAlpha = p.a;
      ctx.fillStyle = '#1c1a17';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      p.a *= .88; p.r *= .97;
      if (p.a < .01) particles.splice(i, 1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  };
  tick();
})();

// Mark active nav link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(a => {
  if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
});
