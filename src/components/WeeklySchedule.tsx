import { useMemo, useState } from 'react';
import { Clock, MapPin, User, CircleDot } from 'lucide-react';
import { schedule, subjectColorMap, type ScheduleSlot } from '../lib/data';
import { useReveal } from '../hooks/useReveal';

const days: ScheduleSlot['day'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const dayFull: Record<string, string> = {
  Mon: 'Senin',
  Tue: 'Selasa',
  Wed: 'Rabu',
  Thu: 'Kamis',
  Fri: 'Jumat',
};

function currentDayKey(): ScheduleSlot['day'] | null {
  const d = new Date().getDay();
  const map: Record<number, ScheduleSlot['day'] | null> = {
    0: null, 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: null,
  };
  return map[d] ?? null;
}

function isNow(slot: ScheduleSlot): boolean {
  const now = new Date();
  const day = currentDayKey();
  if (day !== slot.day) return false;
  const [sh, sm] = slot.start.split(':').map(Number);
  const [eh, em] = slot.end.split(':').map(Number);
  const s = sh * 60 + sm;
  const e = eh * 60 + em;
  const n = now.getHours() * 60 + now.getMinutes();
  return n >= s && n <= e;
}

export default function WeeklySchedule() {
  const today = currentDayKey();
  const [active, setActive] = useState<ScheduleSlot['day']>(today ?? 'Mon');

  const slots = useMemo(
    () => schedule.filter((s) => s.day === active).sort((a, b) => a.start.localeCompare(b.start)),
    [active]
  );

  useReveal();

  return (
    <section id="schedule" className="relative py-20 sm:py-28">
      {/* subtle bg accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Jadwal Mingguan
          </span>
          <h2 className="section-title">Jadwal yang selalu mengikuti.</h2>
          <p className="section-sub">
            Pindah antar hari, lihat mapel dengan kode warna, dan jangan kehilangan
            ruang kelas. Pelajaran yang sedang berlangsung disorot otomatis.
          </p>
        </div>

        {/* Day switcher */}
        <div className="reveal flex flex-wrap gap-2 mb-6">
          {days.map((d) => {
            const isActive = active === d;
            const isToday = today === d;
            return (
              <button
                key={d}
                onClick={() => setActive(d)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-smooth ${
                  isActive
                    ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-cream-50 shadow-glow'
                    : 'bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  {dayFull[d]}
                  {isToday && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'bg-cream-100' : 'bg-brand-400'
                      } animate-pulse-soft`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slots */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {slots.map((slot, i) => {
            const c = subjectColorMap[slot.color];
            const now = isNow(slot);
            return (
              <div
                key={slot.id}
                data-reveal-delay={i * 50}
                className={`reveal group relative overflow-hidden rounded-3xl border p-4 transition-all duration-500 ease-smooth hover:-translate-y-1 ${
                  now
                    ? `border-brand-400/40 ${c.bg} ring-2 ${c.ring} shadow-glow`
                    : 'border-white/5 bg-ink-800/50 hover:border-white/10'
                }`}
              >
                {now && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-200 ring-1 ring-inset ring-brand-400/40">
                    <CircleDot className="h-3 w-3 animate-pulse-soft" />
                    Now
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                  <span className={`text-[11px] uppercase tracking-wider ${c.text}`}>
                    {slot.start}–{slot.end}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold text-ink-50">
                  {slot.subject}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-ink-300">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-ink-400" />
                    {slot.teacher}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-ink-400" />
                    Ruang {slot.room}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-ink-400" />
                    {slot.start} – {slot.end}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
