import { useEffect, useState } from 'react';
import { useLenis }      from './hooks/useLenis';
import { useAnimations } from './hooks/useAnimations';

import Cursor         from './components/Cursor';
import FluidCanvas    from './components/FluidCanvas';
import ScrollProgress from './components/ScrollProgress';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import Stats         from './components/Stats';
import About         from './components/About';
import ForLearners   from './components/ForLearners';
import ForInstructors from './components/ForInstructors';
import Skills        from './components/Skills';
import HowItWorks    from './components/HowItWorks';
import CTA           from './components/CTA';
import Footer        from './components/Footer';

/* ── Theme persistence ──────────────────────────────────── */
function getInitialTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem('develoopini-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  } catch (_) { /* SSR guard */ }
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  /* Apply theme to document root */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('develoopini-theme', theme); } catch (_) {}
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  /* Init premium features */
  useLenis();
  useAnimations();

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Fluid particle canvas (60fps, pointer-events: none) */}
      <FluidCanvas />

      {/* Fixed navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* Page sections */}
      <main>
        <Hero />
        <Stats />
        <About />
        <ForLearners />
        <ForInstructors />
        <Skills />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
