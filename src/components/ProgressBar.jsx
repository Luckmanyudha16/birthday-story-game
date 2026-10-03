import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

const CHAPTERS = [
  { id: 1, label: 'Pembuka' },
  { id: 2, label: 'Verifikasi' },
  { id: 3, label: 'Kuis' },
  { id: 4, label: 'Harapan' },
  { id: 5, label: 'Kenangan' },
  { id: 6, label: 'Surat' },
  { id: 7, label: 'Sertifikat' },
  { id: 8, label: 'Kejutan' },
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
          <button className="site-logo" onClick={handleHeartClick} title="Hati spesial untuk Herlin ❤️">
            <Heart
              size={18}
              className={`logo-heart-icon ${isPulsing ? 'clicked' : ''}`}
              fill="var(--primary)"
            />
            <span className="logo-text">Petualangan Ulang Tahun</span>
          </button>

          <div className="header-status-pill">
            <Sparkles size={11} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Bab {currentChapter} dari 7
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
