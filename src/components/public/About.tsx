import { MapPin, School, Target, Heart } from 'lucide-react';
import { useReveal } from '../../hooks/useReveal';

const features = [
  {
    icon: School,
    title: 'Fokus vokasi',
    body: 'Design Communication Visual di SMK TI Bali Global Denpasar — tempat karya bertemu industri.',
  },
  {
    icon: Target,
    title: 'Dibuat agar rapi',
    body: 'Jadwal, pengumuman, resources, dan acara dalam satu tempat — kejelasan jadi prioritas.',
  },
  {
    icon: Heart,
    title: 'Dibuat oleh kelas',
    body: 'Dirancang dan dirawat oleh siswa XI DKV 2 sebagai portfolio hidup cara kami bekerja.',
  },
];

export default function About() {
  useReveal();
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <span className="section-eyebrow">
              <span className="h-px w-6 bg-brand-400/60" />
              Tentang
            </span>
            <h2 className="section-title mt-3">Rumah digital, bukan tugas sekolah.</h2>
            <p className="section-sub">
              Kavitwo adalah rumah digital Kelas XI DKV 2 — kelas vokasi Design
              Communication Visual di SMK TI Bali Global Denpasar. Kami membangun
              ruang ini untuk mencerminkan cara kami bekerja: rapi, tenang, dan
              sedikit berpendapat tentang tipografi.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-200">
                <MapPin className="h-3.5 w-3.5" />
                Denpasar, Bali
              </span>
              <span className="chip">Berdiri sejak 2024</span>
              <span className="chip">30 siswa</span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="card-surface p-4 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-400/30"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-inset ring-brand-400/30">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-ink-50">{f.title}</h3>
                    <p className="mt-1 text-xs text-ink-300 leading-relaxed">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual side */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <div className="card-surface relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                    <span className="h-3 w-3 rounded-full bg-cream-300/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-ink-400">kavitwo.id</span>
                </div>

                <div className="mt-6">
                  <div className="font-display text-3xl font-bold text-ink-50">Kavitwo</div>
                  <div className="text-sm text-ink-300">Kelas XI DKV 2 · DKV</div>
                </div>

                <div className="mt-6 space-y-2">
                  {[
                    { k: 'Sekolah', v: 'SMK TI Bali Global Denpasar' },
                    { k: 'Program', v: 'Design Communication Visual' },
                    { k: 'Kelas', v: 'XI (Sebelas) — Section 2' },
                    { k: 'Tahun Ajaran', v: '2026/2027' },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
                    >
                      <span className="text-xs uppercase tracking-wider text-ink-400">{row.k}</span>
                      <span className="text-sm font-medium text-ink-50 text-right">{row.v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-700/10 border border-brand-400/20 px-4 py-3">
                  <span className="text-xs text-brand-200">Dirancang &amp; dibuat oleh Kelas XI DKV 2</span>
                  <span className="text-[10px] uppercase tracking-wider text-brand-300">v1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
