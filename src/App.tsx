import { useEffect, useState } from 'react';
import Welcome from './components/Welcome';
import PublicExperience from './components/PublicExperience';
import PortalExperience from './components/PortalExperience';

type Screen = 'welcome' | 'public' | 'portal';

function App() {
  const [screen, setScreen] = useState<Screen>('welcome');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (screen === 'welcome') {
    return <Welcome onEnter={(e) => setScreen(e)} />;
  }

  if (screen === 'public') {
    return (
      <PublicExperience
        onPortal={() => setScreen('portal')}
        onHome={() => setScreen('welcome')}
      />
    );
  }

  return <PortalExperience onExit={() => setScreen('welcome')} />;
}

export default App;
