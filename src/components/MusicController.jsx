import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sliders } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function MusicController() {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
    currentTrack: null,
    volume: 0.25,
    usingFallback: false,
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = globalAudio.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsubscribe;
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    globalAudio.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    globalAudio.setVolume(val);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 120 }}>
      {/* Mini Volume Popover */}
      {showVolumeSlider && (
        <div
          style={{
            position: 'absolute',
            bottom: '54px',
            right: '0',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 143, 177, 0.35)',
            borderRadius: '16px',
            padding: '12px 16px',
            boxShadow: '0 10px 25px rgba(142, 108, 136, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '160px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)' }}>
            <span>Volume Suara</span>
            <span>{Math.round(audioState.volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={audioState.volume}
            onChange={handleVolumeChange}
            style={{
              width: '100%',
              accentColor: 'var(--primary)',
              cursor: 'pointer',
            }}
          />
          {audioState.usingFallback && (
            <span style={{ fontSize: '0.68rem', color: 'var(--primary-dark)', textAlign: 'center' }}>
              ✨ Mode Melodi Syahdu
            </span>
          )}
        </div>
      )}

      {/* Main Floating Button */}
      <div
        className="floating-music-btn"
        onClick={handleToggleMute}
        title={audioState.isMuted ? 'Nyalakan Musik' : 'Matikan Musik'}
      >
        <div className="music-icon-wrapper">
          {audioState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </div>

        <div className={`music-waves ${audioState.isMuted ? 'muted' : ''}`}>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>

        <span className="music-label">
          {audioState.isMuted ? 'Musik Mati' : audioState.currentTrack === 'birthday' ? 'Lagu Ultah 🎂' : 'Musik Nyala'}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowVolumeSlider(!showVolumeSlider);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--secondary)',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
          title="Atur Volume"
        >
          <Sliders size={13} />
        </button>
      </div>
    </div>
  );
}
