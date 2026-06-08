import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import BackToTop from './components/BackToTop';
import { Sparkles, ArrowRight, Github, Twitter, Linkedin, Building2, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans select-none antialiased">
      
      {/* 1. Header/Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Live Demo / Interactive Floating Applet Presentation */}
      <section 
        id="live-demo" 
        className="py-16 md:py-20 bg-slate-100 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Subtle decorative grid lines to look like product mock stage */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        
        {/* Animated Background blur balls */}
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-100/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
          
          {/* Accent Header */}
          <div className="text-center max-w-xl mb-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F172A] font-extrabold bg-[#F1F5F9] px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              Live Showcase Playground
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-4 font-display leading-tight">
              Rasakan Kemudahan Dasbor Interaktif Kami
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Uji coba langsung! Klik tab, lakukan pencarian departemen, kirim pesan obrolan di menu kiri, atau klik "+ Create" untuk menambahkan data baru secara real-time.
            </p>
          </div>

          {/* Premium mock-macOS Container containing the actual exact dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-300/40"
          >
            {/* Window title bar header */}
            <div className="bg-white/95 px-4 py-3 border-b border-slate-200/60 flex items-center justify-between z-10 relative select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
              </div>
              <div className="flex items-center gap-1 px-4 py-0.5 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-500 font-bold max-w-xs truncate shadow-inner">
                <Terminal size={11} className="text-slate-400" />
                <span>app.synapse-workspace.com/directories/overview</span>
              </div>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Embed the majestic Dashboard applet inside */}
            <Dashboard />
          </motion.div>

          {/* Mini Interactive Tip Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <p>Interaktivitas aktif penuh: data lokal sinkron instan.</p>
          </div>
        </div>
      </section>

      {/* 4. Core Features Lists */}
      <Features />

      {/* 5. Team Testimonials / Client User Reviews */}
      <Testimonials />

      {/* 6. Form Kontak */}
      <ContactForm />

      {/* 7. Beautiful Landing Page Modern Footer */}
      <footer className="bg-[#0F172A] text-slate-400 text-xs py-12 md:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo brand and legal description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-700 text-white shadow">
                <Sparkles size={16} />
              </span>
              <span className="font-display font-extrabold text-[14px] tracking-wider text-white">
                SYNAPSE<span className="text-emerald-500">.</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Satu-satunya sistem manajemen internal pintar yang dikembangkan khusus untuk mendukung pertumbuhan berkesinambungan divisi korporat modern di seluruh dunia.
            </p>
          </div>

          {/* Quick links map */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-display">Tautan Navigasi</h4>
            <ul className="space-y-1.5 text-[11px] font-semibold text-slate-400">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home Screen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Daftar Fitur Solusi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Live Interactive Demo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Kontak Konsultan Kami
                </button>
              </li>
            </ul>
          </div>

          {/* Platform and products listings */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-display">Paket Lisensi</h4>
            <ul className="space-y-1.5 text-[11px] font-medium text-slate-400">
              <li>Premium Starter <span className="text-[9px] text-emerald-400 font-bold ml-1 font-mono hover:underline">Sesuai Demo</span></li>
              <li>Pro Division Suite</li>
              <li>Global Enterprise Cloud</li>
              <li>Custom Security Sandbox</li>
            </ul>
          </div>

          {/* Social connections and newsletters */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-display">Hubung Kami di Media Sosial</h4>
            <div className="flex gap-2.5">
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-transform hover:-translate-y-0.5">
                <Twitter size={14} />
              </a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-transform hover:-translate-y-0.5">
                <Linkedin size={14} />
              </a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-transform hover:-translate-y-0.5">
                <Github size={14} />
              </a>
            </div>
            
            <p className="text-[9px] text-slate-500 font-mono">
              Designed with professional workspace integrity. Proudly hosted on Cloud Run via Port 3000.
            </p>
          </div>

        </div>

        {/* Lower copyrights bounds */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-semibold font-mono">
          <p>© {new Date().getFullYear()} Synapse Technologies Inc. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <a href="#" className="hover:text-slate-300">SLA Agreement</a>
          </div>
        </div>
      </footer>

      {/* 8. Back-to-Top Screen Floating Arrow Button */}
      <BackToTop />
    </div>
  );
}
