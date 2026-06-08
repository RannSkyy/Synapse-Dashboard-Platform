import React from 'react';
import { 
  FolderSearch, Users, Landmark, MessageSquareText, ShieldAlert, BadgeInfo,
  Layers, AppWindow, Database, Sliders, Smartphone, CheckSquare
} from 'lucide-react';
import { motion } from 'motion/react';

// Six core pillars matching original app layout context
const SERVICES = [
  {
    icon: Landmark,
    title: "Struktur Departemen Dinamis",
    desc: "Kelola, pantau, dan petakan anggaran budget bulanan serta manajer kepala untuk setiap departemen korporasi Anda secara transparan.",
    color: "bg-purple-50 text-purple-700 border-purple-100"
  },
  {
    icon: Users,
    title: "Manajemen Karyawan Presisi",
    desc: "Akses profil lengkap staff, status kehadiran real-time, sisa cuti, email kontak, serta tanggal bergabung hanya dengan sekali klik.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    icon: Database,
    title: "Indikator Utilitas Dokumen",
    desc: "Pantau penggunaan ruang penyimpanan berkas digital perusahaan secara instan melalui bar indikator visual yang intuitif.",
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    icon: MessageSquareText,
    title: "Obrolan Instan Kolaboratif",
    desc: "Kirim pesan, bagikan lampiran berkas penting, serta diskusikan tugas harian langsung dalam dashboard tanpa aplikasi pihak ketiga.",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100"
  },
  {
    icon: CheckSquare,
    title: "Daftar Tugas Terintegrasi",
    desc: "Organisasikan prioritas harian tim Anda melalui papan penugasan pintar yang terindeks langsung pada metrik pencapaian mingguan.",
    color: "bg-amber-50 text-amber-700 border-amber-100"
  },
  {
    icon: ShieldAlert,
    title: "Keamanan Tingkat Tinggi",
    desc: "Perlindungan data end-to-end terenkripsi yang memastikan semua kerahasiaan dokumen korporat Anda terjaga dengan sangat aman.",
    color: "bg-rose-50 text-rose-700 border-rose-100"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with subtle accent */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm shadow-emerald-500/5">
            Ekosistem Solusi Kerja
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight font-display">
            Satu Dasbor Cerdas, Beragam Fungsi Operasional
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 max-w-md mx-auto">
            Singkirkan tumpukan tab browser dan beralihlah ke pengalaman pengelolaan sentral kerja modern yang sangat mulus dan efisien.
          </p>
        </div>

        {/* Dynamic Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((serv, index) => {
            const IconComponent = serv.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 md:p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left"
              >
                <span className={`p-3 rounded-xl border mb-5 shrink-0 ${serv.color}`}>
                  <IconComponent size={20} />
                </span>
                
                <h3 className="text-sm font-bold text-slate-950 font-display leading-tight">
                  {serv.title}
                </h3>
                
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans font-medium">
                  {serv.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Stats Panel to highlight numbers */}
        <div className="mt-16 md:mt-24 rounded-2xl bg-slate-900 p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-around gap-6 text-center">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-indigo-700/20 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-extrabold font-display leading-none">99.99%</h4>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold mt-2 block">Downtime-Free SLA</span>
          </div>

          <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-extrabold font-display leading-none">2.4M+</h4>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold mt-2 block">Tugas Diselesaikan</span>
          </div>

          <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

          <div className="relative z-10">
            <h4 className="text-2xl md:text-3xl font-extrabold font-display leading-none">250+</h4>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold mt-2 block">Perusahaan Global</span>
          </div>
        </div>

      </div>
    </section>
  );
}
