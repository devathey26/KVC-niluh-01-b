import { useMemo, useState } from 'react';
import {
  FileText,
  FileArchive,
  Link as LinkIcon,
  File,
  Download,
  ArrowUpRight,
} from 'lucide-react';
import { resources, type ResourceItem } from '../lib/data';
import { useReveal } from '../hooks/useReveal';

const categories: (ResourceItem['category'] | 'Semua')[] = [
  'Semua',
  'Materi Belajar',
  'Tugas',
  'Jadwal',
  'Dokumen Sekolah',
];

function typeMeta(t: ResourceItem['type']) {
  switch (t) {
    case 'PDF':
      return { Icon: FileText, color: 'text-rose-300 bg-rose-500/15 ring-rose-400/30' };
    case 'DOC':
      return { Icon: File, color: 'text-sky-300 bg-sky-500/15 ring-sky-400/30' };
    case 'ZIP':
      return { Icon: FileArchive, color: 'text-cream-200 bg-cream-400/15 ring-cream-400/30' };
    case 'LINK':
      return { Icon: LinkIcon, color: 'text-brand-300 bg-brand-500/15 ring-brand-400/30' };
  }
}

export default function Resources() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('Semua');

  useReveal();

  const list = useMemo(() => {
    if (filter === 'Semua') return resources;
    return resources.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <section id="resources" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Resources
          </span>
          <h2 className="section-title">Semua yang kamu butuhkan, dalam satu rak.</h2>
          <p className="section-sub">
            Materi belajar, brief tugas, jadwal cetak, dan dokumen resmi sekolah
            — semuanya rapi dan siap diunduh.
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((r, i) => {
            const { Icon, color } = typeMeta(r.type);
            return (
              <a
                key={r.id}
                href={r.url}
                data-reveal-delay={(i % 3) * 70}
                className="reveal group card-surface relative flex items-start gap-4 p-5 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-card"
              >
                <div
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-ink-400">
                      {r.category}
                    </span>
                    <span className="text-[10px] text-ink-500">·</span>
                    <span className="text-[10px] text-ink-400">{r.size}</span>
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink-50 leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-300 line-clamp-2">
                    {r.description}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-300">
                    {r.type === 'LINK' ? (
                      <>
                        Buka tautan
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    ) : (
                      <>
                        Download
                        <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                      </>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
