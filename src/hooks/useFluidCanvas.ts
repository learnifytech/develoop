import { useEffect, useRef, RefObject } from 'react';

interface Particle {
  x:       number;
  y:       number;
  vx:      number;
  vy:      number;
  life:    number;
  maxLife: number;
  size:    number;
  hue:     number;
  /* velocity-based ellipse stretch */
  angle:   number;
  stretch: number;
}

export function useFluidCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const rafRef       = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef     = useRef({ x: -2000, y: -2000, vx: 0, vy: 0, px: -2000, py: -2000 });
  const isMobileRef  = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isMobileRef.current = window.matchMedia('(pointer: coarse)').matches;

    /* ── Resize ─────────────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── Pointer tracking ────────────────────────────── */
    const track = (clientX: number, clientY: number) => {
      const m = mouseRef.current;
      m.vx = clientX - m.x;
      m.vy = clientY - m.y;
      m.px = m.x;
      m.py = m.y;
      m.x  = clientX;
      m.y  = clientY;
      spawnBurst(clientX, clientY, m.vx, m.vy);
    };

    const onMouseMove = (e: MouseEvent)  => track(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent)  => {
      const t = e.touches[0];
      track(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    /* ── Spawn burst ─────────────────────────────────── */
    const spawnBurst = (x: number, y: number, vx: number, vy: number) => {
      const speed    = Math.sqrt(vx * vx + vy * vy);
      const isMobile = isMobileRef.current;
      const count    = Math.min(
        isMobile ? Math.ceil(speed * 0.35) + 1 : Math.ceil(speed * 0.75) + 2,
        isMobile ? 5 : 10
      );

      const baseAngle = Math.atan2(vy, vx);

      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * (isMobile ? 1.5 : 1.8);
        const dir    = baseAngle + spread;
        const mag    = speed * (0.15 + Math.random() * 0.45);
        const sz     = isMobile
          ? 3 + Math.random() * 5
          : 5 + Math.random() * 10 + speed * 0.18;

        particlesRef.current.push({
          x,
          y,
          vx:      Math.cos(dir) * mag * 0.55,
          vy:      Math.sin(dir) * mag * 0.55,
          life:    1,
          maxLife: 0.55 + Math.random() * 0.5,
          size:    sz,
          hue:     18 + Math.random() * 28,  /* warm orange 18–46° */
          angle:   baseAngle,
          stretch: Math.min(speed * 0.06, 2.2),
        });
      }

      /* Pool cap */
      const max = isMobile ? 70 : 180;
      if (particlesRef.current.length > max) {
        particlesRef.current.splice(0, particlesRef.current.length - max);
      }
    };

    /* ── Render loop ────────────────────────────────── */
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];

        p.life -= 0.016;
        p.x    += p.vx;
        p.y    += p.vy;
        p.vx   *= 0.955;
        p.vy   *= 0.955;
        p.size *= 0.983;

        if (p.life <= 0 || p.size < 0.4) {
          ps.splice(i, 1);
          continue;
        }

        const t      = Math.max(p.life / p.maxLife, 0);
        const alpha  = Math.min(t * 1.8, 1) * 0.72;
        const sat    = 88 + (1 - t) * 12;
        const light  = 52 + t * 18;
        const rx     = p.size * (1 + p.stretch * t);   /* velocity stretch */
        const ry     = p.size * (1 / (1 + p.stretch * t * 0.4));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        /* Outer soft glow */
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
        grad.addColorStop(0,   `hsla(${p.hue}, ${sat}%, ${light}%, ${alpha})`);
        grad.addColorStop(0.45,`hsla(${p.hue}, ${sat}%, ${light - 8}%, ${alpha * 0.55})`);
        grad.addColorStop(1,   `hsla(${p.hue}, ${sat}%, ${light - 20}%, 0)`);

        ctx.scale(1, ry / rx);
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        /* Bright core */
        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 0.35);
        coreGrad.addColorStop(0,   `hsla(${p.hue + 10}, 100%, 85%, ${alpha * 0.6})`);
        coreGrad.addColorStop(1,   `hsla(${p.hue}, 100%, 65%, 0)`);

        ctx.beginPath();
        ctx.arc(0, 0, rx * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [canvasRef]);
}
