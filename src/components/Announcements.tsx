import { useMemo, useState } from 'react';
import { ArrowUpRight, X, CalendarDays, User } from 'lucide-react';
import {
  announcements,
  categoryColorMap,
  type Announcement,
  type AnnouncementCategory,
} from '../lib/data';
import { useReveal } from '../hooks/useReveal';

const categories: (AnnouncementCategory | 'Semua')[] = [
  'Semua',
  'Sekolah',
  'Kelas',
  'Acara',
  'Tugas',
];

export default function Announcements() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('Semua');
  const [open, setOpen] = useState<Announcement | null>(null);

  useReveal();

  const list = useMemo(() => {
    const sorted = [...announcements].sort((a, b) => b.date.localeCompare(a.date));
    if (filter === 'Semua') return sorted;
    return sorted.filter((a) => a.category === filter);
  }, [filter]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <section id="announcements" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Pengumuman
          </span>
          <h2 className="section-title">Kabar yang tidak tenggelam.</h2>
          <p className="section-sub">
            Saring berdasarkan kategori dan baca selengkapnya langsung di sini.
            Semuanya tetap tersimpan dan bisa dicari nanti.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap gap-2 mb-8">
          {categories.map((c) => {
            const isActive = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ease-smooth ${
                  isActive
                    ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-cream-50 shadow-glow'
                    : 'bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((a, i) => (
            <article
              key={a.id}
              data-reveal-delay={(i % 3) * 80}
              className="reveal group card-surface relative flex flex-col p-5 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColorMap[a.category]}`}
                >
                  {a.category}
                </span>
                <span className="text-[11px] text-ink-400">{fmt(a.date)}</span>
              </div>

              <h3 className="mt-3 font-display text-lg font-semibold text-ink-50 leading-snug">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-ink-300 line-clamp-3 flex-1">
                {a.preview}
              </p>

              <button
                onClick={() => setOpen(a)}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-300 hover:text-brand-200 transition"
              >
                Baca selengkapnya
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ann-title"
        >
          <button
            aria-label="Tutup"
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={() => setOpen(null)}
          />
          <div className="relative w-full max-w-xl glass-strong rounded-4xl p-6 sm:p-8 shadow-card animate-fade-up">
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10 transition"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColorMap[open.category]}`}
              >
                {open.category}
              </span>
              <span className="inline-flex items-center gap-1 chip">
                <CalendarDays className="h-3 w-3" />
                {fmt(open.date)}
              </span>
            </div>

            <h3
              id="ann-title"
              className="mt-4 font-display text-2xl font-bold text-ink-50 leading-tight"
            >
              {open.title}
            </h3>
            <p className="mt-4 text-sm text-ink-200 leading-relaxed">
              {open.body}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-ink-400">
              <User className="h-3.5 w-3.5" />
              {open.author}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
