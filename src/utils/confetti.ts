import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#6366f1'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fb7185', '#fbbf24', '#38bdf8', '#a855f7'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireSideCannons() {
  const end = Date.now() + 1500;
  const colors = ['#f43f5e', '#fbbf24', '#60a5fa', '#34d399', '#a78bfa'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.75 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.75 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function fireHeartConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x, y },
    colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6'],
    shapes: ['circle'],
    zIndex: 9999,
    scalar: 1.1,
  });
}
