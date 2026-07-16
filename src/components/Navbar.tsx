import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { navItems } from '../lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full px-3 sm:px-4 py-2.5 transition-all duration-500 ease-smooth ${
            scrolled
              ? 'glass-strong shadow-card'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => handleNav('#home')}
            className="group flex items-center gap-2.5 pl-1.5 pr-2"
            aria-label="Beranda Kavitwo"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-cream-50 shadow-glow">
              <Sparkles className="h-4 w-4" />
              <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-ink-50">
                Kavitwo
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
                XI DKV 2
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ease-smooth ${
                      isActive
                        ? 'text-ink-50'
                        : 'text-ink-300 hover:text-ink-50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-inset ring-white/10" />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav('#about')}
              className="hidden sm:inline-flex btn-primary !px-4 !py-2 text-xs"
            >
              Tentang Kelas
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-100 hover:bg-white/10 transition"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            <ul className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      active === item.href
                        ? 'bg-white/10 text-ink-50'
                        : 'text-ink-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
