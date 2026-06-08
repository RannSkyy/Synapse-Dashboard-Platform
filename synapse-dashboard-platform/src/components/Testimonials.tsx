import React from 'react';
import { Star, Quote, Shield, Smile } from 'lucide-react';
import { motion } from 'motion/react';

const REVIEWS = [
  {
    name: "Joshua Orlando",
    role: "Senior Project Contributor",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&auto=format&fit=crop&q=80",
    text: "Sistem Synapse merestrukturisasi cara kami mengorganisir lembaran kerja. Kolaborasi dokumen brief pdf di sidebar Spotlight sangat memangkas birokrasi komunikasi tim.",
    rating: 5
  },
  {
    name: "Chloe Carter",
    role: "Experience Design Head",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    text: "Pengalaman visual tabelnya sangat solid dan responsif. Pengiriman pesan langsung via Direct Messages di panel kiri sangat instan dan membantu koodinasi harian kami secara global.",
    rating: 5
  },
  {
    name: "Leo Vance",
    role: "Chief of Cyber Security",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    text: "Dasbor ini memecahkan masalah kebocoran data. Indikator kuota dokumen yang detail membantu tim sysops memonitor infrastruktur virtual dengan keandalan maksimal.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
            Tanggapan Pengguna
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight font-display">
            Apa Kata Mereka Tentang Synapse?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-md mx-auto">
            Ratusan manajer divisi dan staf operasional telah beralih ke masa depan kolaborasi digital yang lebih ringkas.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative"
            >
              <div className="absolute top-5 right-5 text-emerald-100">
                <Quote size={28} />
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-xs text-slate-500 italic leading-relaxed font-sans font-medium flex-1 mb-6">
                "{rev.text}"
              </p>

              {/* Reviewer Meta info */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">{rev.name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
