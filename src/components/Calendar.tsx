import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarEvents, eventTypeMap, type CalendarEvent } from '../lib/data';
import { useReveal } from '../hooks/useReveal';

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar() {
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<Date | null>(today);

  useReveal();

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    calendarEvents.forEach((e) => {
      const key = e.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });
    return map;
  }, []);

  const grid = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const selectedEvents = selected ? eventsByDate.get(iso(selected)) ?? [] : [];

  const move = (dir: number) => {
    setView((v) => {
      const m = v.m + dir;
      if (m < 0) return { y: v.y - 1, m: 11 };
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { ...v, m };
    });
  };

  return (
    <section id="calendar" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col items-start gap-3 mb-10">
          <span className="section-eyebrow">
            <span className="h-px w-6 bg-brand-400/60" />
            Kalender
          </span>
          <h2 className="section-title">Rencanakan dari awal, jangan lewatkan deadline.</h2>
          <p className="section-sub">
            Ujian, libur, acara, dan deadline — semuanya berkode warna di kalender
            bulanan. Klik tanggal apa pun untuk melihat kegiatan.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Calendar panel */}
          <div className="lg:col-span-2 card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-semibold text-ink-50">
                {monthNames[view.m]} {view.y}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(-1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10 transition"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView({ y: today.getFullYear(), m: today.getMonth() })}
                  className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-ink-200 hover:bg-white/10 transition"
                >
                  Hari ini
                </button>
                <button
                  onClick={() => move(1)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ink-200 hover:bg-white/10 transition"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {dayNames.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] uppercase tracking-wider text-ink-400 py-1"
                >
                  {d}
                </div>
              ))}
              {grid.map((cell, i) => {
                if (!cell) return <div key={`e${i}`} className="h-16 rounded-2xl" />;
                const key = iso(cell);
                const events = eventsByDate.get(key) ?? [];
                const isToday = sameDay(cell, today);
                const isSelected = selected && sameDay(cell, selected);
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(cell)}
                    className={`relative h-16 rounded-2xl border p-2 text-left transition-all duration-300 ease-smooth ${
                      isSelected
                        ? 'border-brand-400/50 bg-brand-500/10 ring-2 ring-brand-400/30'
                        : 'border-white/5 bg-ink-800/40 hover:bg-ink-800/80 hover:border-white/10'
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        isToday ? 'text-brand-300' : 'text-ink-200'
                      }`}
                    >
                      {cell.getDate()}
                    </span>
                    {isToday && (
                      <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
                    )}
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 flex flex-wrap gap-1">
                      {events.slice(0, 3).map((e) => (
                        <span
                          key={e.id}
                          className={`h-1.5 w-1.5 rounded-full ${eventTypeMap[e.type].dot}`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap gap-3">
              {Object.entries(eventTypeMap).map(([k, v]) => (
                <span key={k} className="inline-flex items-center gap-1.5 text-xs text-ink-300">
                  <span className={`h-2 w-2 rounded-full ${v.dot}`} />
                  {v.label}
                </span>
              ))}
            </div>
          </div>

          {/* Side panel */}
          <div className="card-surface p-5 sm:p-6 flex flex-col">
            <h3 className="font-display text-lg font-semibold text-ink-50">
              {selected
                ? selected.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Pilih tanggal'}
            </h3>
            <p className="text-xs text-ink-400 mt-1">
              {selectedEvents.length} acara
            </p>

            <div className="mt-4 space-y-2 flex-1">
              {selectedEvents.length === 0 ? (
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-ink-300">
                  Tidak ada kegiatan. Hari yang baik untuk fokus bekerja.
                </div>
              ) : (
                selectedEvents.map((e) => {
                  const v = eventTypeMap[e.type];
                  return (
                    <div
                      key={e.id}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-3"
                    >
                      <span className={`mt-1 h-2 w-2 rounded-full ${v.dot}`} />
                      <div>
                        <div className="text-sm font-medium text-ink-50">
                          {e.title}
                        </div>
                        <span
                          className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${v.chip}`}
                        >
                          {v.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Upcoming list */}
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mb-2">
                Akan datang
              </div>
              <div className="space-y-1.5 max-h-44 overflow-auto pr-1">
                {[...calendarEvents]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .slice(0, 6)
                  .map((e) => (
                    <button
                      key={e.id}
                      onClick={() => {
                        const d = new Date(e.date + 'T00:00:00');
                        setSelected(d);
                        setView({ y: d.getFullYear(), m: d.getMonth() });
                      }}
                      className="w-full text-left rounded-xl px-3 py-2 hover:bg-white/5 transition flex items-center gap-2"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${eventTypeMap[e.type].dot}`} />
                      <span className="text-xs text-ink-200 flex-1 truncate">
                        {e.title}
                      </span>
                      <span className="text-[10px] text-ink-400 tabular-nums">
                        {new Date(e.date + 'T00:00:00').toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
