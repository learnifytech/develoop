import { useRef } from 'react';
import { useMagnetic } from '../hooks/useAnimations';

export default function Hero() {
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(btn1Ref as React.RefObject<HTMLElement>);
  useMagnetic(btn2Ref as React.RefObject<HTMLElement>);

  return (
    <section className="hero" id="hero">
      {/* Grid background */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Glow orbs */}
      <div className="glow-orb glow-orb-1" aria-hidden="true" />
      <div className="glow-orb glow-orb-2" aria-hidden="true" />

      <div className="hero-content">
        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" aria-hidden="true" />
          🇩🇿 Algeria's Real Learning Platform
        </div>

        {/* Main Heading */}
        <h1 className="hero-h1">
          {/* Line 1: "Learn. Grow." — white chars */}
          <span className="hero-h1-line">Learn. Grow.</span>
          {/* Line 2: "Earn." — orange gradient */}
          <span className="hero-h1-line grad">Earn.</span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub">
          <strong>Develoopini</strong> connects expert Algerian instructors
          with motivated learners who want to master&nbsp;
          real job‑ready skills fast.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns">
          <div className="magnetic-wrap">
            <a
              ref={btn1Ref}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSJl2ibyn5rt079TjeF23-bgQoYKKX6WsAuaSF650Q5bacdA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              <span>🎓 Start Learning</span>
            </a>
          </div>
          <div className="magnetic-wrap">
            <a
              ref={btn2Ref}
              href="https://docs.google.com/forms/d/e/1FAIpQLSdemqpjMjuWgqQDjDpMWREHxwCCh5mA_1Zve0mIm0gB5XTPEg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              💼 Become Instructor
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-line" />
          Scroll to explore
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
