import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollToDemo = () => {
    const el = document.getElementById('live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden flex flex-col items-center bg-slate-50"
    >
      {/* Absolute Decorative Backgrows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-emerald-150/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-slate-200/20 blur-[130px] pointer-events-none" />

      {/* Main landing container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100 mb-6 shadow-sm shadow-emerald-900/5 cursor-pointer"
        >
          <Sparkles size={11} className="text-emerald-700 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-extrabold font-mono">
            New Version 4.2 Is Live
          </span>
        </motion.div>

        {/* Elegant Display Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display max-w-3xl"
        >
          Workspace Masa Depan untuk <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-600 block sm:inline">Efisiensi Tanpa Batas</span>
        </motion.h1>

        {/* Detailed Persuasive Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed font-sans"
        >
          Kelola struktur departemen, tim karyawan, chat komunikasi, dan file dokumen legal perusahaan Anda dalam satu platform dasbor minimalis yang super responsif dan instan.
        </motion.p>

        {/* Dynamic CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button 
            onClick={handleScrollToDemo}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Uji Coba Live Demo </span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            Pelajari Fitur
          </button>
        </motion.div>

        {/* Top core characteristics summary tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid grid-cols-3 gap-3 md:gap-8 border-t border-slate-200/70 pt-8 w-full max-w-2xl text-left"
        >
          <div className="flex items-start gap-2.5">
            <span className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
              <Zap size={15} />
            </span>
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest font-display">Instan & Cepat</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Beban halaman cepat & performa mulus.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
              <ShieldCheck size={15} />
            </span>
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest font-display">Aman Terenkripsi</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Standar sekuritas data internal mutakhir.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
              <Layers size={15} />
            </span>
            <div>
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest font-display font-semibold">Desain Bersih</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">UX minimalis yang ramah di mata pengguna.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
