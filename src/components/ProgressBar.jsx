import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

const CHAPTERS = [
  { id: 1, label: 'Intro' },
  { id: 2, label: 'Verification' },
  { id: 3, label: 'Quiz' },
  { id: 4, label: 'Wishes' },
  { id: 5, label: 'Memories' },
  { id: 6, label: 'Letter' },
  { id: 7, label: 'Certificate' },
  { id: 8, label: 'Surprise' },
];

export default function ProgressBar({ currentChapter, onSecretHeartTrigger }) {
  const [heartClicks, setHeartClicks] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const progressPercent = Math.min(100, Math.round(((currentChapter - 1) / (CHAPTERS.length - 1)) * 100));

  const handleHeartClick = () => {
    const nextCount = heartClicks + 1;
    setHeartClicks(nextCount);
    setIsPulsing(true);
    globalAudio.playSfx('pop');
    setTimeout(() => setIsPulsing(false), 250);

    if (nextCount >= 5) {
      setHeartClicks(0);
      onSecretHeartTrigger();
    }
  };

  return (
    <header className="top-header">
      <div className="header-inner">
        <div className="header-top-row">
          <button className="site-logo" onClick={handleHeartClick} title="A special heart for you ❤️">
            <Heart
              size={18}
              className={`logo-heart-icon ${isPulsing ? 'clicked' : ''}`}
              fill="var(--primary)"
            />
            <span className="logo-text">Birthday Adventure</span>
          </button>

          <div className="header-status-pill">
            <Sparkles size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Chapter {currentChapter} of 7
          </div>
        </div>

        {/* Progress track */}
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-fill" style={{ width: `${Math.max(5, progressPercent)}%` }}></div>
        </div>

        <div className="progress-steps-list">
          {CHAPTERS.map((ch) => (
            <span
              key={ch.id}
              className={`step-indicator ${currentChapter >= ch.id ? 'active' : ''}`}
            >
              •
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
