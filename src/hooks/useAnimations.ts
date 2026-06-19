import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────
   Manual char-split helper (no Club GSAP needed)
   ────────────────────────────────────────────────────────── */
function splitToChars(el: HTMLElement): HTMLSpanElement[] {
  const raw  = el.textContent || '';
  const frag = document.createDocumentFragment();
  const chars: HTMLSpanElement[] = [];

  for (const ch of raw) {
    const span = document.createElement('span');
    span.textContent      = ch === ' ' ? '\u00A0' : ch;
    span.className        = 'char';
    span.style.display    = 'inline-block';
    span.style.willChange = 'transform, opacity';
    frag.appendChild(span);
    chars.push(span);
  }

  el.innerHTML = '';
  el.appendChild(frag);
  return chars;
}

/* ──────────────────────────────────────────────────────────
   Main animation orchestrator — runs once on mount
   ────────────────────────────────────────────────────────── */
export function useAnimations() {
  useEffect(() => {
    /* Short tick to ensure React has painted the DOM */
    const timer = setTimeout(() => {

      /* ── 1. Hero kinetic text reveal ───────────────────── */
      const heroLines = document.querySelectorAll<HTMLElement>('.hero-h1-line');
      if (heroLines.length > 0) {
        const allChars: HTMLSpanElement[] = [];
        heroLines.forEach(line => {
          const chars = splitToChars(line);
          allChars.push(...chars);
        });

        gsap.fromTo(
          allChars,
          { y: '120%', opacity: 0, rotateX: -80, transformOrigin: '50% 100%' },
          {
            y: '0%', opacity: 1, rotateX: 0,
            duration:   1,
            ease:       'power4.out',
            stagger:    0.032,
            delay:      0.25,
          }
        );
      }

      /* ── 2. Badge fade-down ──────────────────────────────── */
      gsap.fromTo('.badge',
        { opacity: 0, y: -28, scale: 0.9 },
        { opacity: 1, y: 0,   scale: 1, duration: 0.75, ease: 'power3.out', delay: 0.1 }
      );

      /* ── 3. Hero sub, buttons, scroll-hint ──────────────── */
      gsap.fromTo(
        ['.hero-sub', '.hero-btns', '.scroll-hint'],
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0,  duration: 0.85, ease: 'power3.out', stagger: 0.14, delay: 0.65 }
      );

      /* ── 4. Stats bar stagger ───────────────────────────── */
      gsap.utils.toArray<HTMLElement>('.stat-item').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start:   'top 88%',
          once:    true,
          onEnter: () =>
            gsap.fromTo(el,
              { opacity: 0, y: 28, scale: 0.85 },
              { opacity: 1, y: 0,  scale: 1, duration: 0.65, ease: 'back.out(1.5)', delay: i * 0.07 }
            ),
        });
      });

      /* ── 5. Generic fade-up elements ────────────────────── */
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 54 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease:     'power3.out',
            scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' },
          }
        );
      });

      /* ── 6. Section tags ────────────────────────────────── */
      gsap.utils.toArray<HTMLElement>('.tag').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start:   'top 90%',
          once:    true,
          onEnter: () =>
            gsap.fromTo(el,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
            ),
        });
      });

      /* ── 7. Section titles ──────────────────────────────── */
      gsap.utils.toArray<HTMLElement>('.sec-title').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start:   'top 88%',
          once:    true,
          onEnter: () =>
            gsap.fromTo(el,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
            ),
        });
      });

      /* ── 8. Section descriptions ────────────────────────── */
      gsap.utils.toArray<HTMLElement>('.sec-desc').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start:   'top 88%',
          once:    true,
          onEnter: () =>
            gsap.fromTo(el,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 }
            ),
        });
      });

      /* ── 9. Staggered card grids ────────────────────────── */
      document.querySelectorAll<HTMLElement>('.cards-3, .skills-grid, .steps-grid').forEach(grid => {
        const children = Array.from(grid.children) as HTMLElement[];
        gsap.set(children, { opacity: 0, y: 48, scale: 0.94 });

        ScrollTrigger.create({
          trigger: grid,
          start:   'top 86%',
          once:    true,
          onEnter: () =>
            gsap.to(children, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.7,
              ease:    'power3.out',
              stagger: 0.09,
            }),
        });
      });

      /* ── 10. Feature lists slide-in from left ───────────── */
      document.querySelectorAll<HTMLElement>('.feat-list').forEach(list => {
        const items = Array.from(list.children) as HTMLElement[];
        gsap.set(items, { opacity: 0, x: -32 });

        ScrollTrigger.create({
          trigger: list,
          start:   'top 86%',
          once:    true,
          onEnter: () =>
            gsap.to(items, {
              opacity: 1, x: 0,
              duration: 0.6,
              ease:    'power3.out',
              stagger: 0.1,
            }),
        });
      });

      /* ── 11. Visual boxes scale-in ──────────────────────── */
      gsap.utils.toArray<HTMLElement>('.vis-box').forEach(box => {
        ScrollTrigger.create({
          trigger: box,
          start:   'top 86%',
          once:    true,
          onEnter: () =>
            gsap.fromTo(box,
              { opacity: 0, scale: 0.86, y: 44 },
              { opacity: 1, scale: 1,    y: 0, duration: 0.95, ease: 'power3.out' }
            ),
        });
      });

      /* ── 12. CTA box dramatic reveal ────────────────────── */
      ScrollTrigger.create({
        trigger: '.cta-box',
        start:   'top 85%',
        once:    true,
        onEnter: () =>
          gsap.fromTo('.cta-box',
            { opacity: 0, y: 56, scale: 0.94 },
            { opacity: 1, y: 0,  scale: 1, duration: 1.1, ease: 'power3.out' }
          ),
      });

      /* ── 13. CTA box ambient glow pulse ─────────────────── */
      gsap.to('.cta-glow', {
        scale:    1.2,
        opacity:  0.6,
        duration: 3.5,
        ease:     'sine.inOut',
        yoyo:     true,
        repeat:   -1,
      });

      /* ── 14. Footer fade-up ─────────────────────────────── */
      ScrollTrigger.create({
        trigger: 'footer',
        start:   'top 92%',
        once:    true,
        onEnter: () =>
          gsap.fromTo('footer',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          ),
      });

    }, 120);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}

/* ──────────────────────────────────────────────────────────
   Magnetic button hook (per-element)
   ────────────────────────────────────────────────────────── */
export function useMagnetic(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Touch devices: skip */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const STRENGTH = 0.38;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const radius = Math.max(rect.width, rect.height) * 1.4;
      const dist   = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = 1 - dist / radius;
        gsap.to(el, {
          x:        dx * STRENGTH * force,
          y:        dy * STRENGTH * force,
          duration: 0.45,
          ease:     'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.75,
        ease:     'elastic.out(1, 0.45)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref]);
}
