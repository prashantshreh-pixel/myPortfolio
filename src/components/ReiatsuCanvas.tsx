import React, { useEffect, useRef } from 'react';

interface ReiatsuCanvasProps {
  isBankaiActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  maxLife: number;
  life: number;
}

export const ReiatsuCanvas: React.FC<ReiatsuCanvasProps> = ({ isBankaiActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const maxParticles = isMobile
      ? (isBankaiActive ? 70 : 35)
      : (isBankaiActive ? 140 : 65);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const particles: Particle[] = [];

    const createParticle = (x?: number, y?: number): Particle => {
      const pX = x !== undefined ? x : Math.random() * width;
      const pY = y !== undefined ? y : Math.random() * height;
      const speedMultiplier = isBankaiActive ? 2.2 : 1;

      return {
        x: pX,
        y: pY,
        vx: (Math.random() - 0.5) * 1.4 * speedMultiplier,
        vy: -Math.random() * 2.0 * speedMultiplier - 0.4,
        size: Math.random() * (isBankaiActive ? 3.5 : 2.2) + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.25 ? '#dc2626' : '#ffffff',
        maxLife: Math.random() * 100 + 50,
        life: 0
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mousePos.current.x;
      const dy = e.clientY - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mousePos.current.speed = dist;
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Spawn slash trail particles if moving fast
      if (dist > 12 && particles.length < maxParticles + 25) {
        for (let i = 0; i < Math.min(Math.floor(dist / 6), 3); i++) {
          particles.push(
            createParticle(
              e.clientX + (Math.random() - 0.5) * 16,
              e.clientY + (Math.random() - 0.5) * 16
            )
          );
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Render ambient gradient aura center only when Bankai is active
      if (isBankaiActive) {
        const auraGradient = ctx.createRadialGradient(
          width / 2, height / 2, 40,
          width / 2, height / 2, Math.max(width, height) * 0.6
        );
        auraGradient.addColorStop(0, 'rgba(220, 38, 38, 0.12)');
        auraGradient.addColorStop(0.5, 'rgba(127, 29, 29, 0.04)');
        auraGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
        ctx.fillStyle = auraGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Render particles
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Interactive mouse repulsion
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 10000 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        const lifeRatio = 1 - p.life / p.maxLife;
        const currentAlpha = p.alpha * Math.max(0, lifeRatio);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Respawn expired or out of bounds particles
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
          if (particles.length > maxParticles) {
            particles.splice(i, 1);
            i--;
          } else {
            particles[i] = createParticle();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBankaiActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: isBankaiActive ? 0.95 : 0.6 }}
    />
  );
};
