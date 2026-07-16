import { Users, BookOpen } from 'lucide-react';
import { stats } from '../lib/data';
import { useCountUp } from '../hooks/useCountUp';
import { useReveal } from '../hooks/useReveal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  book: BookOpen,
};

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const { ref, value } = useCountUp(stat.value, 1500);
  const Icon = iconMap[stat.icon];

  return (
    <div
      data-reveal-delay={index * 80}
      className="reveal group card-surface relative overflow-hidden p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-card"
    >
      <div className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/10 text-brand-300 ring-1 ring-inset ring-brand-400/30">
        <Icon className="h-5 w-5" />
      </div>
      <div className="relative mt-4 font-display text-4xl sm:text-5xl font-extrabold text-ink-50 tabular-nums">
        <span ref={ref}>{value}</span>
        <span className="text-brand-300">{stat.suffix ?? '+'}</span>
      </div>
      <div className="relative mt-1 text-xs uppercase tracking-wider text-ink-400">
        {stat.label}
      </div>
    </div>
  );
}

export default function Statistics() {
  useReveal();
  return (
    <section id="statistics" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Dalam Angka
          </span>
          <h2 className="section-title">Kelas yang terus berkarya.</h2>
          <p className="section-sub">
            Cuplikan skala dan hasil karya kami tahun ajaran ini — angka
            beranimasi saat kamu scroll ke bagian ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
