import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import data from '../data.json';
import Hero from './components/Hero';
import BookingWizard from './components/BookingWizard';
import LangToggle from './components/LangToggle';
import Services from './components/Services';
import Fleet from './components/Fleet';
import Testimonials from './components/Testimonials';

function App() {
  const [lang, setLang] = useState("fr");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Custom Cursor Effect
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="bg-dark min-h-screen font-sans text-white selection:bg-primary selection:text-dark overflow-x-hidden">

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 border border-primary rounded-full pointer-events-none z-[100] hidden md:block mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] hidden md:block"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 1500, damping: 28 }}
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[90]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <LangToggle lang={lang} setLang={setLang} />

      <main>
        <Hero data={data.hero} lang={lang} />

        <section className="relative py-20">
          {/* Decorative background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
          <BookingWizard lang={lang} />
        </section>

        <Services data={data.services} lang={lang} />

        <Fleet lang={lang} />

        <Testimonials lang={lang} />

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/5 bg-dark-lighter relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-display font-bold text-white mb-2">JOSUÉ PRIVATE DRIVER</h3>
              <p className="text-gray-500 text-sm">Excellence in Motion.</p>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">WhatsApp</a>
            </div>

            <div className="text-center md:text-right text-gray-600 text-xs">
              <p>© 2025 Josué Private Driver.</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
