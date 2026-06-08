import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Building2, UserCheck, MessageSquareCode } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Listen to handles scroll changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section highlighters
      const sections = ['home', 'features', 'live-demo', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-nav bg-white/70 shadow-md py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand / Trademark */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-800 text-white shadow-md shadow-emerald-900/10 transition-transform group-hover:scale-105">
              <Sparkles size={18} className="text-white animate-pulse" />
            </span>
            <span className="font-display font-extrabold text-[15px] tracking-wider text-slate-800">
              SYNAPSE<span className="text-emerald-700">.</span>
            </span>
          </div>

          {/* Desktop Navigation Link Trail */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavClick('home')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSection === 'home' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('features')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSection === 'features' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Fitur Utama
            </button>
            <button 
              onClick={() => handleNavClick('live-demo')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSection === 'live-demo' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Live Demo
            </button>
            <button 
              onClick={() => handleNavClick('testimonials')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSection === 'testimonials' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Testimoni
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${activeSection === 'contact' ? 'text-emerald-800 font-extrabold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Kontak Kami
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-900 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Coba Gratis
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-slate-200/50 text-slate-500 hover:text-slate-800"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg px-4 py-3 space-y-2 mt-2">
          <button 
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeSection === 'home' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('features')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeSection === 'features' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}`}
          >
            Fitur Utama
          </button>
          <button 
            onClick={() => handleNavClick('live-demo')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeSection === 'live-demo' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}`}
          >
            Live Demo (Interactive App)
          </button>
          <button 
            onClick={() => handleNavClick('testimonials')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeSection === 'testimonials' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}`}
          >
            Testimoni
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${activeSection === 'contact' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'}`}
          >
            Kontak Kami
          </button>
          
          <div className="pt-2 border-t border-slate-100">
            <button 
              onClick={() => handleNavClick('contact')}
              className="w-full text-center px-4 py-2.5 bg-emerald-800 text-white rounded-lg text-sm font-bold shadow hover:bg-emerald-900 block"
            >
              Coba Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
