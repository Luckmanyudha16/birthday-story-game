import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, ArrowRight, Eye, FastForward } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function LoveLetter({ config, onComplete }) {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [displayedParagraphs, setDisplayedParagraphs] = useState([]);
  const [currentPIdx, setCurrentPIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  const paragraphs = config.letter.paragraphs;

  const handleOpenLetter = () => {
    globalAudio.playSfx('pop');
    setIsLetterOpened(true);
  };

  const handleRevealAll = () => {
    globalAudio.playSfx('pop');
    setDisplayedParagraphs(paragraphs);
    setIsFullyRevealed(true);
  };

  useEffect(() => {
    if (!isLetterOpened || isFullyRevealed) return;

    if (currentPIdx < paragraphs.length) {
      const currentFullP = paragraphs[currentPIdx];
      if (charIdx < currentFullP.length) {
        const timer = setTimeout(() => {
          setCharIdx((prev) => prev + 1);
        }, 16); // Gentle typewriter speed
        return () => clearTimeout(timer);
      } else {
        // Current paragraph completed
        setDisplayedParagraphs((prev) => [...prev, currentFullP]);
        setCurrentPIdx((prev) => prev + 1);
        setCharIdx(0);
      }
    } else {
      setIsFullyRevealed(true);
    }
  }, [isLetterOpened, currentPIdx, charIdx, isFullyRevealed, paragraphs]);

  return (
    <div className="glass-card" style={{ maxWidth: '580px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <span className="chapter-badge">
        <Mail size={12} />
        Chapter 06 • Personal Message
      </span>

      <h2 className="section-title">💌 {config.letter.title}</h2>
      <p className="section-subtitle" style={{ marginBottom: '20px' }}>
        {config.letter.opening}
      </p>

      {!isLetterOpened ? (
        <div style={{ padding: '30px 16px', animation: 'scaleUp 0.3s ease' }}>
          {/* Animated Wax Seal Envelope Card */}
          <div
            onClick={handleOpenLetter}
            style={{
              width: '180px',
              height: '130px',
              background: 'linear-gradient(135deg, #FFF0F5 0%, #FCE4EC 100%)',
              border: '2px dashed var(--primary)',
              borderRadius: '12px',
              margin: '0 auto 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 12px 28px rgba(244, 143, 177, 0.3)',
              position: 'relative',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                background: '#D81B60',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(216, 27, 96, 0.4)',
                color: '#FFFFFF',
              }}
            >
              <Heart size={22} fill="#FFFFFF" />
            </div>
            <span style={{ marginTop: '10px', fontSize: '0.8rem', fontFamily: 'var(--font-playful)', fontWeight: 700, color: 'var(--primary-dark)' }}>
              CLICK TO OPEN 💌
            </span>
          </div>

          <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--dark-muted)', marginBottom: '24px' }}>
            "A letter written just for you, from the deepest corner of my heart."
          </p>

          <button className="btn-primary" onClick={handleOpenLetter} id="btn-open-envelope">
            Buka Surat Cintamu ❤️
          </button>
        </div>
      ) : (
        /* Unfolded Letter Content */
        <div style={{ animation: 'fadeIn 0.4s ease', textAlign: 'left' }}>
          <div
            style={{
              background: '#FFFDF9',
              border: '1.5px solid rgba(244, 143, 177, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '28px 22px',
              boxShadow: '0 8px 30px rgba(142, 108, 136, 0.1)',
              position: 'relative',
              marginBottom: '20px',
              lineHeight: '1.8',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(244, 143, 177, 0.25)', paddingBottom: '12px', marginBottom: '18px' }}>
              <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                Dearest {config.recipientName},
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--secondary)' }}>
                {config.birthdayDate}
              </span>
            </div>

            {/* Displayed paragraphs */}
            {displayedParagraphs.map((p, idx) => (
              <p key={idx} style={{ color: 'var(--dark)', fontSize: '0.95rem', marginBottom: '16px' }}>
                {p}
              </p>
            ))}

            {/* Currently typing paragraph */}
            {!isFullyRevealed && currentPIdx < paragraphs.length && (
              <p style={{ color: 'var(--dark)', fontSize: '0.95rem', marginBottom: '16px' }}>
                {paragraphs[currentPIdx].slice(0, charIdx)}
                <span style={{ display: 'inline-block', width: '2px', height: '14px', background: 'var(--primary-dark)', marginLeft: '2px', animation: 'wavePulse 0.8s infinite' }} />
              </p>
            )}

            {/* Signoff */}
            {isFullyRevealed && (
              <div style={{ marginTop: '24px', textAlign: 'right', borderTop: '1px dashed rgba(244, 143, 177, 0.3)', paddingTop: '16px' }}>
                <p style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--secondary)' }}>
                  {config.letter.signoff}
                </p>
                <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.6rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                  {config.senderName} ❤️
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!isFullyRevealed && (
              <button className="btn-secondary" onClick={handleRevealAll} style={{ width: '100%', fontSize: '0.85rem' }}>
                <FastForward size={15} />
                Tampilkan Seluruh Isi Surat Langsung
              </button>
            )}

            <button className="btn-primary" onClick={onComplete} id="btn-proceed-certificate">
              CLAIM YOUR OFFICIAL CERTIFICATE 🎓
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
