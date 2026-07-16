import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import WeeklySchedule from './components/WeeklySchedule';
import Announcements from './components/Announcements';
import Gallery from './components/Gallery';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Resources from './components/Resources';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import About from './components/About';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';

function App() {
  useReveal();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <WeeklySchedule />
        <Announcements />
        <Gallery />
        <Students />
        <Teachers />
        <Resources />
        <Calendar />
        <Statistics />
        <About />
      </main>

      <Footer />
    </div>
  );
}

export default App;
