import { useEffect, useState } from 'react';
import { Sun, Moon, Coffee, Sunset } from 'lucide-react';

function greetingFor(h: number): { text: string; Icon: React.ComponentType<{ className?: string }> } {
  if (h >= 5 && h < 11) return { text: 'Selamat Pagi', Icon: Sun };
  if (h >= 11 && h < 15) return { text: 'Selamat Siang', Icon: Coffee };
  if (h >= 15 && h < 18) return { text: 'Selamat Sore', Icon: Sunset };
  return { text: 'Selamat Malam', Icon: Moon };
}

export default function PortalGreeting() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const h = now.getHours();
  const { text, Icon } = greetingFor(h);
  const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="relative pt-24 pb-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal is-visible flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 ring-1 ring-inset ring-brand-400/30">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink-100">
                {text}, warga Kavitwo.
              </p>
              <p className="text-xs text-ink-400">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft" />
            <span className="font-display text-base font-semibold text-ink-50 tabular-nums">{time}</span>
            <span className="text-xs text-ink-400">WITA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
