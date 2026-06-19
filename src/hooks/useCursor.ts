import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* Hide on mobile/touch */
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -1000, mouseY = -1000;
    let ringX  = -1000, ringY  = -1000;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    /* Smooth ring follow via RAF */
    let rafId: number;
    const followRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(followRing);
    };
    rafId = requestAnimationFrame(followRing);

    /* Hover states on interactive elements */
    const onEnter = () => {
      dot?.classList.add('hovering');
      ring?.classList.add('hovering');
    };
    const onLeave = () => {
      dot?.classList.remove('hovering');
      ring?.classList.remove('hovering');
    };

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .card, .skill-card, .step-card').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Wait a tick for DOM
    const t = setTimeout(addListeners, 500);

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button, [role="button"], .card, .skill-card, .step-card').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return { dotRef, ringRef };
}
