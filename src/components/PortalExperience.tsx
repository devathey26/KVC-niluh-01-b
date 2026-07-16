import { useEffect, useState } from 'react';
import PortalHeader, { type PortalView } from './portal/PortalHeader';
import JadwalPelajaran from './portal/JadwalPelajaran';
import JadwalPiket from './portal/JadwalPiket';
import TugasMingguIni from './portal/TugasMingguIni';
import ScrollProgress from './ScrollProgress';
import { useReveal } from '../hooks/useReveal';

export default function PortalExperience({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<PortalView>('schedule');
  useReveal();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <PortalHeader view={view} onView={setView} onExit={onExit} />

      <main>
        <JadwalPelajaran />
        <JadwalPiket />
        <TugasMingguIni />
      </main>
    </div>
  );
}
