import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveCake } from './components/InteractiveCake';
import { WishesMural } from './components/WishesMural';
import { BalloonsGame } from './components/BalloonsGame';
import { GiftBox } from './components/GiftBox';
import { PhotoAlbum } from './components/PhotoAlbum';
import { Footer } from './components/Footer';
import { MusicProvider } from './components/BackgroundMusic';
import { fireCelebrationConfetti } from './utils/confetti';

export const AppContent: React.FC = () => {
  useEffect(() => {
    // Welcome celebration burst
    const timer = setTimeout(() => {
      fireCelebrationConfetti();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleTriggerGlobalConfetti = () => {
    fireCelebrationConfetti();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-stone-900 selection:bg-rose-200 selection:text-rose-900">
      <Navbar onTriggerConfetti={handleTriggerGlobalConfetti} />
      <main className="flex-1">
        <Hero />
        <InteractiveCake />
        <PhotoAlbum />
        <WishesMural />
        <BalloonsGame />
        <GiftBox />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
};

export default App;
