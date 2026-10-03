import React, { useState, useEffect } from 'react';
import { Cake, Sparkles, Heart, Music, ArrowRight } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function Landing({ config, onStartMission, onTriggerEasterEgg }) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const statusLogs = [
    "Memeriksa status hari ulang tahun...",
    "Mengukur tingkat keimutan Herlin...",
    "Memeriksa kadar kebahagiaan hati...",
    "Menghitung cinta tak terhingga...",
    "Birthday Girl terdeteksi! ❤️"
  ];

  useEffect(() => {
    // Intro loader animation sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setLoadingStep(0);
    else if (progress < 50) setLoadingStep(1);
    else if (progress < 75) setLoadingStep(2);
    else if (progress < 99) setLoadingStep(3);
    else {
      setLoadingStep(4);
      setTimeout(() => setIsIntroComplete(true), 500);
    }
  }, [progress]);

  const handleEnterExperience = () => {
    // Inisialisasi audio dan jalankan background musik romantis
    globalAudio.playTrack('background', config.music.background);
    globalAudio.playSfx('success');
    onStartMission();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
      {!isIntroComplete ? (
        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '36px 24px' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--soft-pink)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)' }}>
            <Sparkles size={30} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>
            Menyiapkan Petualangan Manis...
          </h3>

          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            {statusLogs[loadingStep]}
          </p>

          {/* Loader bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(244, 143, 177, 0.2)', borderRadius: '999px', overflow: 'hidden', marginBottom: '14px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F48FB1, #EC407A)',
                borderRadius: '999px',
                transition: 'width 0.1s linear',
              }}
            ></div>
          </div>

          <span style={{ fontFamily: 'var(--font-playful)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
            {progress}%
          </span>
        </div>
      ) : (
        <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '40px 24px' }}>
          <span className="chapter-badge">
            <Sparkles size={13} />
            Bab 01 • Penjelasan Misi
          </span>

          <div style={{
            width: '84px',
            height: '84px',
            background: 'radial-gradient(circle, #FFE4E6 0%, #FCE4EC 100%)',
            border: '2px solid rgba(244, 143, 177, 0.4)',
            borderRadius: '50%',
            margin: '12px auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(244, 143, 177, 0.35)'
          }}>
            <Cake size={44} color="#D81B60" />
          </div>

          <p style={{ fontFamily: 'var(--font-playful)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--secondary)' }}>
            ✨ SEBUAH MISI SANGAT PENTING ✨
          </p>

          <h1 className="section-title" style={{ marginTop: '6px', marginBottom: '4px', fontSize: '2.2rem' }}>
            SELAMAT ULANG TAHUN
          </h1>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.75rem',
            color: 'var(--primary-dark)',
            fontStyle: 'italic',
            marginBottom: '16px'
          }}>
            {config.recipientName} ❤️
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed rgba(244, 143, 177, 0.4)',
            marginBottom: '26px'
          }}>
            <p style={{ color: 'var(--dark-muted)', fontSize: '0.98rem', lineHeight: '1.6' }}>
              "Sebelum kamu membuka kejutan spesial ulang tahunmu, ada beberapa misi kecil penuh cinta yang harus kamu selesaikan terlebih dahulu."
            </p>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            color: 'var(--secondary)',
            marginBottom: '20px',
            fontFamily: 'var(--font-playful)'
          }}>
            <Music size={14} color="var(--primary-dark)" />
            Alunan musik romantis untuk menemani perjalananmu
          </div>

          <button className="btn-primary" onClick={handleEnterExperience} id="btn-start-mission">
            MULAI PETUALANGAN CINTA ❤️
            <ArrowRight size={18} />
          </button>

          {/* Secret Easter Egg 1 Button */}
          <button
            className="easter-egg-btn"
            onClick={() => onTriggerEasterEgg('secretButton')}
            style={{ marginTop: '24px' }}
          >
            {config.easterEggs.secretButton.label}
          </button>
        </div>
      )}
    </div>
  );
}
