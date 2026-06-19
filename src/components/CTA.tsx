import { useRef } from 'react';
import { useMagnetic } from '../hooks/useAnimations';

export default function CTA() {
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(btn1Ref as React.RefObject<HTMLElement>);
  useMagnetic(btn2Ref as React.RefObject<HTMLElement>);

  return (
    <section className="cta-sec">
      <div className="cta-glow" aria-hidden="true" />
      <div className="cta-box">
        <div className="tag" style={{ marginBottom: '28px' }}>🚀 Join Now</div>
        <h2>
          Ready to start your <span className="accent">journey?</span>
        </h2>
        <p>
          Join the Algerian learning platform built by Algerians for Algerians.
          Whether you want to learn or earn, Develoopini is for you.
        </p>
        <div className="cta-btns">
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
      </div>
    </section>
  );
}
