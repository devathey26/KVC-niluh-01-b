import { useState } from 'react';
import { Sparkles, Home, CalendarDays, ClipboardList, BookOpen } from 'lucide-react';
import { useScrolled, scrollTo } from '../../hooks/useReveal';

type View = 'schedule' | 'piket' | 'tugas';

const views: { key: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'schedule', label: 'Jadwal Pelajaran', icon: CalendarDays },
  { key: 'piket', label: 'Jadwal Piket', icon: ClipboardList },
  { key: 'tugas', label: 'Tugas Minggu Ini', icon: BookOpen },
];

export default function PortalHeader({
  view,
  onView,
  onExit,
}: {
  view: View;
  onView: (v: View) => void;
  onExit: () => void;
}) {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-3 sm:px-4 py-2.5 transition-all duration-500 ease-smooth ${
            scrolled ? 'glass-strong shadow-card' : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Brand */}
          <button onClick={onExit} className="group flex items-center gap-2.5 pl-1.5 pr-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-cream-50 shadow-glow">
              <Sparkles className="h-4 w-4" />
              <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-ink-50">Kavitwo</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400">Portal Siswa</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {views.map((v) => {
              const isActive = view === v.key;
              const Icon = v.icon;
              return (
                <li key={v.key}>
                  <button
                    onClick={() => {
                      onView(v.key);
                      scrollTo(`#${v.key}`);
                    }}
                    className={`relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-smooth ${
                      isActive ? 'text-ink-50 bg-white/8 ring-1 ring-inset ring-white/10' : 'text-ink-300 hover:text-ink-50 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {v.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExit}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-ink-100 hover:bg-white/10 hover:border-brand-400/30 transition-all duration-300 ease-smooth"
            >
              <Home className="h-3.5 w-3.5" />
              Beranda
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-100 hover:bg-white/10 transition"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
            >
              <span className="text-sm font-semibold">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-smooth ${
            open ? 'max-h-[32rem] mt-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-strong rounded-3xl p-3 shadow-card">
            <ul className="grid grid-cols-1 gap-1.5">
              {views.map((v) => {
                const Icon = v.icon;
                return (
                  <li key={v.key}>
                    <button
                      onClick={() => {
                        onView(v.key);
                        setOpen(false);
                        scrollTo(`#${v.key}`);
                      }}
                      className={`w-full inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        view === v.key ? 'bg-white/10 text-ink-50' : 'text-ink-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {v.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => {
                setOpen(false);
                onExit();
              }}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-cream-50"
            >
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export type { View as PortalView };
