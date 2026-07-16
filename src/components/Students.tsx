import { useMemo, useState } from 'react';
import { Search, BadgeCheck, Hash } from 'lucide-react';
import { students } from '../lib/data';
import { useReveal } from '../hooks/useReveal';

export default function Students() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string>('All');

  useReveal();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      const matchesQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nis.includes(q) ||
        s.bio.toLowerCase().includes(q);
      const matchesTag = tag === 'All' || s.tags.includes(tag);
      return matchesQ && matchesTag;
    });
  }, [query, tag]);

  return (
    <section id="students" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Siswa
          </span>
          <h2 className="section-title">Orang-orang di balik karyanya.</h2>
          <p className="section-sub">
            Direktori kelas kami — cari berdasarkan nama, saring berdasarkan
            fokus, dan kenali desainer yang membuat Kavitwo seperti sekarang.
          </p>
        </div>

        {/* Controls */}
        <div className="reveal flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, NIS, atau bio…"
              className="w-full rounded-full bg-ink-800/60 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-ink-50 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400/40 transition"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((t) => {
              const isActive = tag === t;
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-smooth ${
                    isActive
                      ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-cream-50 shadow-glow'
                      : 'bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="reveal card-surface p-10 text-center text-ink-300">
            Tidak ada siswa yang cocok dengan pencarianmu.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((s, i) => (
              <article
                key={s.id}
                data-reveal-delay={(i % 4) * 60}
                className="reveal group card-surface relative overflow-hidden p-4 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10">
                    <img
                      src={s.photo}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-display text-base font-semibold text-ink-50">
                        {s.name}
                      </h3>
                      {s.position && (
                        <BadgeCheck className="h-4 w-4 shrink-0 text-brand-300" />
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-400">
                      <Hash className="h-3 w-3" />
                      {s.nis}
                    </div>
                    {s.position && (
                      <span className="mt-1.5 inline-flex rounded-full bg-brand-500/10 border border-brand-400/30 px-2 py-0.5 text-[10px] font-medium text-brand-200">
                        {s.position}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs text-ink-300 leading-relaxed line-clamp-3">
                  {s.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
