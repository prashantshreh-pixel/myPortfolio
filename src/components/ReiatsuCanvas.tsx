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
  const mousePos = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = isBankaiActive ? 180 : 80;

    const createParticle = (x?: number, y?: number, forceVelocity = false): Particle => {
      const pX = x !== undefined ? x : Math.random() * width;
      const pY = y !== undefined ? y : Math.random() * height;
      const speedMultiplier = isBankaiActive ? 2.5 : 1;

      return {
        x: pX,
        y: pY,
        vx: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        vy: -Math.random() * 2.2 * speedMultiplier - 0.5,
        size: Math.random() * (isBankaiActive ? 4 : 2.5) + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.2 ? '#dc2626' : '#ffffff',
        maxLife: Math.random() * 120 + 60,
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
      mousePos.current.lastX = mousePos.current.x;
      mousePos.current.lastY = mousePos.current.y;
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Spawn slash trail particles if moving fast
      if (dist > 8) {
        for (let i = 0; i < Math.min(Math.floor(dist / 4), 6); i++) {
          particles.push(createParticle(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20, true));
          if (particles.length > maxParticles + 40) {
            particles.shift();
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle red ambient gradient aura center
      const auraGradient = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.65
      );
      if (isBankaiActive) {
        auraGradient.addColorStop(0, 'rgba(220, 38, 38, 0.18)');
        auraGradient.addColorStop(0.5, 'rgba(127, 29, 29, 0.08)');
        auraGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      } else {
        auraGradient.addColorStop(0, 'rgba(185, 28, 28, 0.08)');
        auraGradient.addColorStop(0.5, 'rgba(50, 10, 10, 0.03)');
        auraGradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      }
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // Render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion / attraction effect
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * 1.5;
          p.y -= Math.sin(angle) * 1.5;
        }

        const lifeRatio = 1 - p.life / p.maxLife;
        const currentAlpha = p.alpha * Math.max(0, lifeRatio);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Respawn expired particles
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
