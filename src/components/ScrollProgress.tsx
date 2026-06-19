import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const tl = gsap.to(bar, {
      scaleX:    1,
      ease:      'none',
      scrollTrigger: {
        trigger:    document.body,
        start:      'top top',
        end:        'bottom bottom',
        scrub:      0.1,
      },
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        width:      '100%',
        height:     '3px',
        zIndex:     9999,
        background: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height:           '100%',
          width:            '100%',
          background:       'linear-gradient(90deg, #EA580C, #F97316, #FB923C)',
          transformOrigin:  'left center',
          transform:        'scaleX(0)',
          boxShadow:        '0 0 10px rgba(249, 115, 22, 0.7)',
        }}
      />
    </div>
  );
}
