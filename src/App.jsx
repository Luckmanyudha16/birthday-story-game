import React, { useState, useEffect } from 'react';
import { birthdayConfig } from './data/birthdayConfig';
import ProgressBar from './components/ProgressBar';
import MusicController from './components/MusicController';
import EasterEggsModal from './components/EasterEggsModal';
import PasswordGate from './components/PasswordGate';
import Landing from './components/Landing';
import Verification from './components/Verification';
import Quiz from './components/Quiz';
import WishForm from './components/WishForm';
import Gallery from './components/Gallery';
import LoveLetter from './components/LoveLetter';
import Certificate from './components/Certificate';
import FinalSurprise from './components/FinalSurprise';
import { globalAudio } from './utils/audioManager';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [activeEasterEgg, setActiveEasterEgg] = useState(null);
  const [wishResetKey, setWishResetKey] = useState(0);

  // Restore progress and unlock state from localStorage
  useEffect(() => {
    try {
      const unlocked = localStorage.getItem('birthday_unlocked');
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }

      const savedChapter = localStorage.getItem('birthday_current_chapter');
      if (savedChapter) {
        const parsed = parseInt(savedChapter, 10);
        if (parsed >= 1 && parsed <= 8) {
          setCurrentChapter(parsed);
        }
      }
    } catch (_) {}
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      localStorage.setItem('birthday_unlocked', 'true');
    } catch (_) {}
    goToChapter(1);
    globalAudio.playTrack('background', birthdayConfig.music.background);
  };

  const goToChapter = (chapterNum) => {
    setCurrentChapter(chapterNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      localStorage.setItem('birthday_current_chapter', chapterNum.toString());
    } catch (_) {}
  };

  const handleReplay = () => {
    try {
      localStorage.removeItem('birthday_wishes_draft');
      localStorage.removeItem('birthday_wishes_saved');
      localStorage.removeItem('birthday_current_chapter');
    } catch (_) {}
    setWishResetKey((prev) => prev + 1);
    goToChapter(1);
    globalAudio.playTrack('background', birthdayConfig.music.background);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('birthday_unlocked');
      localStorage.removeItem('birthday_current_chapter');
      localStorage.removeItem('birthday_wishes_draft');
      localStorage.removeItem('birthday_wishes_saved');
    } catch (_) {}
    window.location.reload();
  };

  return (
    <div className="app-container">
      {/* Ambient floating romantic background particles */}
      <div className="ambient-particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${(i * 8.5 + 4) % 94}%`,
              animationDelay: `${(i * 1.3) % 9}s`,
              animationDuration: `${10 + (i % 5) * 2}s`,
              fontSize: `${14 + (i % 4) * 8}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Show ProgressBar only when unlocked */}
      {isUnlocked && (
        <ProgressBar
          currentChapter={currentChapter}
          onSecretHeartTrigger={() => setActiveEasterEgg('secretHeart')}
        />
      )}

      {/* Main Chapter Content */}
      <main className="main-wrapper" style={!isUnlocked ? { minHeight: '85vh', justifyContent: 'center' } : {}}>
        {!isUnlocked ? (
          <PasswordGate
            config={birthdayConfig}
            onUnlock={handleUnlock}
          />
        ) : (
          <>
            {currentChapter === 1 && (
              <Landing
                config={birthdayConfig}
                onStartMission={() => goToChapter(2)}
                onTriggerEasterEgg={(type) => setActiveEasterEgg(type)}
              />
            )}

            {currentChapter === 2 && (
              <Verification
                config={birthdayConfig}
                onVerified={() => goToChapter(3)}
                onTriggerEasterEgg={(type) => setActiveEasterEgg(type)}
              />
            )}

            {currentChapter === 3 && (
              <Quiz
                onComplete={() => goToChapter(4)}
              />
            )}

            {currentChapter === 4 && (
              <WishForm
                key={wishResetKey}
                config={birthdayConfig}
                onComplete={() => goToChapter(5)}
              />
            )}

            {currentChapter === 5 && (
              <Gallery
                onComplete={() => goToChapter(6)}
              />
            )}

            {currentChapter === 6 && (
              <LoveLetter
                config={birthdayConfig}
                onComplete={() => goToChapter(7)}
              />
            )}

            {currentChapter === 7 && (
              <Certificate
                config={birthdayConfig}
                onComplete={() => goToChapter(8)}
              />
            )}

            {currentChapter === 8 && (
              <FinalSurprise
                config={birthdayConfig}
                onReplay={handleReplay}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </main>

      {/* Global Floating Music Controller */}
      <MusicController />

      {/* Easter Egg Modals */}
      <EasterEggsModal
        eggType={activeEasterEgg}
        onClose={() => setActiveEasterEgg(null)}
        config={birthdayConfig}
      />
    </div>
  );
}

