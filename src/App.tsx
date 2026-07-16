import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import PublicExperience from './components/PublicExperience';
import PortalExperience from './components/PortalExperience';

type Screen = 'welcome' | 'public' | 'portal';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [transitioning, setTransitioning] = useState(false);

  // Smoothly switch screens with a brief fade.
  const switchTo = (next: Screen) => {
    if (next === screen) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 220);
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ease-smooth ${
        transitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {screen === 'welcome' && <Welcome onEnter={(e) => switchTo(e)} />}
      {screen === 'public' && (
        <PublicExperience
          onPortal={() => switchTo('portal')}
          onHome={() => switchTo('welcome')}
        />
      )}
      {screen === 'portal' && (
        <PortalExperience
          onExit={() => switchTo('welcome')}
          onPublic={() => switchTo('public')}
        />
      )}
    </div>
  );
}

export default App;
