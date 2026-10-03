import React, { useState, useEffect } from 'react';
import { Cake, Sparkles, Heart, RotateCcw, Volume2, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { globalAudio } from '../utils/audioManager';

export default function FinalSurprise({ config, onReplay, onReset }) {
  const [stage, setStage] = useState('teaser'); // 'teaser' | 'countdown' | 'celebration'
  const [countdown, setCountdown] = useState(3);
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Trigger high intensity romantic confetti
  const launchCelebrationConfetti = () => {
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#F48FB1', '#EC407A', '#FFD54F', '#FFF8FA', '#BA68C8'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const startCountdown = () => {
    setStage('countdown');
    globalAudio.playSfx('pop');

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        globalAudio.playSfx('pop');
      } else {
        clearInterval(interval);
        setStage('celebration');

        // Transition background music -> Birthday song
        globalAudio.playTrack('birthday', config.music.birthday);

        // Fire celebration confetti
        launchCelebrationConfetti();
      }
    }, 1000);
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    globalAudio.playSfx('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFE082', '#F48FB1', '#FFF'],
    });
  };

  return (
    <div className="glass-card" style={{ maxWidth: '580px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      {stage === 'teaser' && (
        <div style={{ padding: '30px 16px', animation: 'scaleUp 0.3s ease' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--soft-pink)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
            <Sparkles size={32} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '12px' }}>
            WAIT A SECOND...
          </h3>

          <p style={{ color: 'var(--dark-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '28px' }}>
            I almost forgot the most important part of this journey.
            <br />
            There is actually <strong>ONE MORE THING</strong> waiting for you...
          </p>

          <button className="btn-primary" onClick={startCountdown} id="btn-start-countdown">
            READY TO SEE IT? ❤️
          </button>
        </div>
      )}

      {stage === 'countdown' && (
        <div style={{ padding: '60px 16px', animation: 'fadeIn 0.2s ease' }}>
          <p style={{ fontFamily: 'var(--font-playful)', fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '16px' }}>
            Get ready...
          </p>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '6rem',
              fontWeight: 700,
              color: 'var(--primary-dark)',
              textShadow: '0 8px 30px rgba(244, 143, 177, 0.5)',
              animation: 'scaleUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
              lineHeight: '1',
            }}
          >
            {countdown}
          </div>
        </div>
      )}

      {stage === 'celebration' && (
        <div style={{ animation: 'scaleUp 0.4s ease', padding: '10px 0' }}>
          {/* Confetti button re-trigger */}
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '1.8rem', marginRight: '6px' }}>🎉</span>
            <span style={{ fontSize: '1.8rem', marginRight: '6px' }}>🎂</span>
            <span style={{ fontSize: '1.8rem', marginRight: '6px' }}>✨</span>
            <span style={{ fontSize: '1.8rem', marginRight: '6px' }}>💖</span>
            <span style={{ fontSize: '1.8rem' }}>🎉</span>
          </div>

          <p style={{ fontFamily: 'var(--font-playful)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--secondary)' }}>
            HAPPY BIRTHDAY TO MY WHOLE WORLD
          </p>

          <h1 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', margin: '8px 0 4px' }}>
            {config.recipientName}
          </h1>

          <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.6rem', color: 'var(--secondary)', marginBottom: '24px' }}>
            Today is all about celebrating you ❤️
          </p>

          {/* Interactive Birthday Cake */}
          <div
            onClick={handleBlowCandles}
            style={{
              background: '#FFFFFF',
              border: '2px dashed rgba(244, 143, 177, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px 16px',
              marginBottom: '26px',
              cursor: candlesBlown ? 'default' : 'pointer',
              boxShadow: '0 8px 24px rgba(142, 108, 136, 0.12)',
              position: 'relative',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => !candlesBlown && (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => !candlesBlown && (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <Flame size={24} color={candlesBlown ? '#BDBDBD' : '#FF9800'} style={{ animation: candlesBlown ? 'none' : 'wavePulse 0.6s infinite' }} />
              <Flame size={24} color={candlesBlown ? '#BDBDBD' : '#FF9800'} style={{ animation: candlesBlown ? 'none' : 'wavePulse 0.7s 0.2s infinite' }} />
              <Flame size={24} color={candlesBlown ? '#BDBDBD' : '#FF9800'} style={{ animation: candlesBlown ? 'none' : 'wavePulse 0.5s 0.1s infinite' }} />
            </div>

            <Cake size={60} color="#D81B60" style={{ margin: '0 auto 8px' }} />

            <p style={{ fontFamily: 'var(--font-playful)', fontSize: '0.85rem', fontWeight: 600, color: candlesBlown ? '#2E7D32' : 'var(--primary-dark)' }}>
              {candlesBlown ? '✨ You made a wish! May all your dreams come true! ✨' : '🕯️ Click the cake to make a wish & blow out the candles!'}
            </p>
          </div>

          {/* Personalized Closing Wishes */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1.5px solid rgba(244, 143, 177, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '24px 20px',
              marginBottom: '26px',
              textAlign: 'center',
              lineHeight: '1.8',
            }}
          >
            {config.finalSurprise.wishes.map((w, idx) => (
              <p key={idx} style={{ color: 'var(--dark)', fontSize: '0.98rem', marginBottom: '12px' }}>
                {w}
              </p>
            ))}

            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 700, marginTop: '16px' }}>
              {config.finalSurprise.closing}
            </p>

            <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: 'var(--dark-muted)', marginTop: '8px' }}>
              — {config.senderName} ❤️
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn-secondary" onClick={launchCelebrationConfetti} style={{ width: '100%' }}>
              <Sparkles size={16} />
              More Confetti! 🎉
            </button>

            <button className="btn-primary" onClick={onReplay} id="btn-replay">
              <RotateCcw size={16} />
              Replay Birthday Experience 🔄
            </button>
          </div>

          {/* Hidden reset button for developer/testing */}
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={onReset}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(142, 108, 136, 0.4)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset saved progress (testing only)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
