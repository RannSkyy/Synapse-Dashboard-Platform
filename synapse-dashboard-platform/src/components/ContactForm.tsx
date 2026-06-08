import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Building, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactFormInput } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Workspace Demo Account');
  const [message, setMessage] = useState('');
  
  // Interaction states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Semua kolom wajib diisi dengan benar.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Alamat email Anda tidak valid.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Clear values if needed
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden">
      {/* Visual glowing patterns background */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[55%] rounded-full bg-emerald-100/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-100/10 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm shadow-emerald-500/5">
            Mulai Transformasi Kerja 
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight font-display">
            Hubungi Konsultan Workspace Kami
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-md mx-auto">
            Apakah Anda memiliki pertanyaan atau ingin demo kustomisasi untuk korporasi skala besar? Tim spesialis Synapse siap melayani Anda.
          </p>
        </div>

        {/* Dual column: Infobox + Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Info Details Left Column */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[350px]">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold font-display tracking-tight">Synapse Technologies Inc.</h3>
                <p className="text-[11px] text-slate-400 mt-1">Platform Manajemen Workspace & Organisasi Korporat.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-lg text-emerald-400 shrink-0 mt-0.5">
                    <Building size={14} />
                  </span>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Office HQ</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Graha Solusi Integrasi, Lantai 18, SCBD, Jakarta (12190)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-lg text-emerald-400 shrink-0 mt-0.5">
                    <Mail size={14} />
                  </span>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Email</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono font-medium">enquiry@synapse-workspace.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="p-2 bg-white/10 rounded-lg text-emerald-400 shrink-0 mt-0.5">
                    <MessageSquare size={14} />
                  </span>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Real-time Support</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Senin - Jumat | 09:00 - 18:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-6">
              <span className="text-[9px] text-slate-500 block uppercase tracking-widest font-mono font-bold">Trusted Network Security</span>
              <p className="text-[10px] text-slate-400 mt-1">Didukung enkripsi file 256-bit AES standard militer.</p>
            </div>
          </div>

          {/* Form Area Right Column */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-md flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                >
                  {errorMsg && (
                    <div className="p-3 bg-rose-50 text-rose-700 rounded-xl flex items-center gap-2 text-xs font-semibold border border-rose-100">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap</label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                          <User size={13} />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Budi Setiawan"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Alamat Email</label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none font-mono">
                          @
                        </span>
                        <input 
                          type="email" 
                          placeholder="budi@perusahaan.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-slate-800 font-mono font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tujuan Kontak</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-1 block w-full bg-slate-50 p-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all text-slate-800 font-semibold"
                    >
                      <option value="Workspace Demo Account">Request Demo Produk</option>
                      <option value="Enterprise Solution Enquiry">Penawaran Paket Enterprise Kustom</option>
                      <option value="Partnership Proposal">Kemitraan & Partnership</option>
                      <option value="Technical Support">Bantuan Teknis / Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pesan Anda</label>
                    <textarea 
                      placeholder="Tuliskan kebutuhan workspace digital tim Anda disini..."
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 w-full p-2.5 bg-slate-50 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 paths focus:bg-white transition-all text-slate-800 font-medium leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Kirim Pesan Anda </span>
                        <Send size={12} className="mr-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-screen"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="text-center py-6 flex flex-col items-center"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-4 border border-emerald-100 shadow-sm animate-bounce">
                    <CheckCircle2 size={24} />
                  </span>
                  
                  <h3 className="text-base font-bold text-slate-900 font-display">Pesan Berhasil Terkirim!</h3>
                  
                  <p className="text-xs text-slate-500 mt-2.5 max-w-sm leading-relaxed mx-auto font-medium">
                    Terima kasih telah menghubungi kami. Pesan Anda telah diterima oleh konsultan Synapse dan sistem auto-responder kami telah meneruskannya ke tim utama. Kami akan menghubungi Anda kembali dalam kurun waktu kurang dari 24 jam kerja.
                  </p>

                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
