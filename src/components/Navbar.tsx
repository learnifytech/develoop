import { useEffect, useRef, useState } from 'react';
import { useMagnetic } from '../hooks/useAnimations';

interface NavbarProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

const NAV_LINKS = [
  { href: '#about',       label: 'About'           },
  { href: '#learners',    label: 'For Learners'    },
  { href: '#instructors', label: 'For Instructors' },
  { href: '#skills',      label: 'Skills'          },
  { href: '#how',         label: 'How It Works'    },
];

export default function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(ctaRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Sync body scroll lock */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  /* Close menu on link click */
  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        {/* Logo */}
        <a className="logo" href="#">
          <span className="logo-l">Learnify</span>
          <span className="logo-t">Tech</span>
          <span className="logo-badge">BETA</span>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => { e.preventDefault(); handleLinkClick(l.href); }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label="Toggle dark/light mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a
            ref={ctaRef}
            href="https://docs.google.com/forms/d/e/1FAIpQLSeSJl2ibyn5rt079TjeF23-bgQoYKKX6WsAuaSF650Q5bacdA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Get Started →
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={e => { e.preventDefault(); handleLinkClick(l.href); }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeSJl2ibyn5rt079TjeF23-bgQoYKKX6WsAuaSF650Q5bacdA/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--orange)', marginTop: '16px' }}
          onClick={() => setMenuOpen(false)}
        >
          🎓 Get Started
        </a>
      </div>
    </>
  );
}
