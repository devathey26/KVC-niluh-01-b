import { Sparkles, Instagram, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { navItems } from '../lib/data';

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[60rem] rounded-full bg-brand-700/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-cream-50 shadow-glow">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-ink-50">
                  Kavitwo
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
                  Class XI DKV 2
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-300 leading-relaxed">
              Rumah digital Kelas XI DKV 2, SMK TI Bali Global Denpasar.
              Dirancang dan dirawat oleh kelas sebagai portfolio hidup cara
              kami bekerja.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Mail, label: 'Email', href: '#' },
                { Icon: Globe, label: 'Website', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10 hover:text-brand-200 hover:-translate-y-0.5 transition-all duration-300 ease-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">
              Navigasi
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-3">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-ink-200 hover:text-brand-200 transition"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">
              Kontak
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-300 mt-0.5 shrink-0" />
                <span>
                  SMK TI Bali Global Denpasar
                  <br />
                  Jl. Kamboja No.12, Denpasar, Bali
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-300 shrink-0" />
                <span>(0361) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-300 shrink-0" />
                <a href="mailto:kavitwo@baliglobal.sch.id" className="hover:text-brand-200 transition">
                  kavitwo@baliglobal.sch.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Kavitwo · Kelas XI DKV 2. Hak cipta
            dilindungi.
          </p>
          <p className="text-xs text-ink-400">
            Dirancang &amp; dibuat dengan hati-hati di Denpasar.
          </p>
        </div>
      </div>
    </footer>
  );
}
