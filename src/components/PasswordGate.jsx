import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, KeyRound, Eye, EyeOff, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { globalAudio } from '../utils/audioManager';

export default function PasswordGate({ config, onUnlock }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: '' });
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Normalisasi input agar ramah typo dan variasi teks santai
  const checkPasswordValidity = (input) => {
    if (!input) return false;
    let str = input.toLowerCase().trim().replace(/\s+/g, ' ');
    // Handle variasi: "pacar kamu" -> "pacarmu"
    str = str.replace(/\bpacar kamu\b/g, 'pacarmu');
    // Handle variasi: "yg" -> "yang"
    str = str.replace(/\byg\b/g, 'yang');
    // Handle variasi: "lukman" -> "luckman"
    str = str.replace(/\blukman\b/g, 'luckman');
    // Handle variasi: "yang paling ganteng" -> "yang ganteng"
    str = str.replace(/yang paling ganteng/g, 'yang ganteng');

    return str === 'pacarmu yang ganteng luckman';
  };

  const getFunnyWrongMessage = (input) => {
    const raw = (input || '').toLowerCase().trim();
    if (raw.includes('luckman') && !raw.includes('ganteng')) {
      return "Tuh kan udah sebut Luckman... tapi jangan lupa dipuji 'ganteng' dong sayang! 😜";
    }
    if (raw.includes('ganteng') && !raw.includes('luckman')) {
      return "Hihi makasih dibilang ganteng! Tapi pacarmu yang ganteng itu namanya siapa hayo? 😉";
    }
    if (raw.includes('herlin') || raw.includes('bibiy')) {
      return "Itu kan nama bidadarinya! Passwordnya tentang pacarmu yang beruntung dong! 😂";
    }
    const funResponses = [
      "Tetoooot! Salah sayang! 😝 Masa lupa sama pacar sendiri?",
      "Kurang tepat nih... Coba puji pacarmu dulu dong! 😂",
      "Eitss hampir! Cluenya ada di tombol bocoran di bawah ya cantik!",
      "Hmm... kayaknya ada yang belum ngakuin pacarnya ganteng nih! 🤭"
    ];
    return funResponses[Math.floor(Math.random() * funResponses.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkPasswordValidity(passwordInput)) {
      // Benar!
      setIsSuccess(true);
      setFeedback({
        type: 'success',
        message: 'Awww pinter banget bidadariku! Password 100% diterima dengan penuh cinta ❤️'
      });

      globalAudio.playSfx('success');

      // Tembakkan confetti meriah
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F48FB1', '#EC407A', '#FFD54F', '#FFF8FA']
      });

      // Beri jeda manis sebelum melanjutkan ke semua sesi petualangan
      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      // Salah!
      setIsShaking(true);
      globalAudio.playSfx('wrong');
      const errorMsg = getFunnyWrongMessage(passwordInput);
      setFeedback({ type: 'error', message: errorMsg });

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const handleAutoFill = () => {
    setPasswordInput('pacarmu yang ganteng Luckman');
    globalAudio.playSfx('pop');
    setFeedback({
      type: 'info',
      message: '✨ Password sudah otomatis terisi! Tinggal klik tombol Buka Gerbang Cinta ya sayang!'
    });
  };

  return (
    <div
      className={`glass-card ${isShaking ? 'shake-animation' : ''}`}
      style={{
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        padding: '36px 22px',
        position: 'relative'
      }}
    >
      <span className="chapter-badge">
        <KeyRound size={12} />
        Gerbang Rahasia • Verifikasi Cinta
      </span>

      {/* Lock Avatar Animated */}
      <div
        style={{
          width: '78px',
          height: '78px',
          background: isSuccess
            ? 'radial-gradient(circle, #E8F5E9 0%, #C8E6C9 100%)'
            : 'radial-gradient(circle, #FFE4E6 0%, #FCE4EC 100%)',
          border: `2px solid ${isSuccess ? '#81C784' : 'rgba(244, 143, 177, 0.4)'}`,
          borderRadius: '50%',
          margin: '12px auto 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isSuccess
            ? '0 8px 24px rgba(76, 175, 80, 0.3)'
            : '0 8px 24px rgba(244, 143, 177, 0.35)',
          transition: 'all 0.3s ease'
        }}
      >
        {isSuccess ? (
          <Unlock size={38} color="#2E7D32" style={{ animation: 'scaleUp 0.3s ease' }} />
        ) : (
          <Lock size={36} color="#D81B60" />
        )}
      </div>

      <h2
        className="section-title"
        style={{
          fontSize: '1.75rem',
          marginBottom: '6px',
          color: isSuccess ? '#2E7D32' : 'var(--dark)'
        }}
      >
        {isSuccess ? 'GERBANG RESMI TERBUKA! 🎉' : 'EITSS, MASUKKAN PASSWORD DULU! 🔐'}
      </h2>

      <p className="section-subtitle" style={{ marginBottom: '22px' }}>
        {isSuccess
          ? 'Identitas bidadari terkonfirmasi. Menyiapkan seluruh petualangan indahmu...'
          : 'Website spesial ini dikunci khusus. Cuma kesayangan Luckman yang tau password rahasianya!'}
      </p>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ textAlign: 'left' }}>
            <label
              style={{
                display: 'block',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: 'var(--dark)',
                marginBottom: '6px'
              }}
            >
              Kata Sandi Lucu-lucuan:
            </label>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (feedback.type === 'error') {
                    setFeedback({ type: null, message: '' });
                  }
                }}
                placeholder="Ketik password di sini..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: feedback.type === 'error' ? '1.5px solid #E53935' : '1.5px solid rgba(244, 143, 177, 0.4)',
                  background: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary-dark)')}
                onBlur={(e) => {
                  if (feedback.type !== 'error') {
                    e.target.style.borderColor = 'rgba(244, 143, 177, 0.4)';
                  }
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--secondary)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Feedback message banner */}
          {feedback.message && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.88rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background:
                  feedback.type === 'error'
                    ? '#FFEBEE'
                    : feedback.type === 'info'
                    ? '#FFF8E1'
                    : '#E8F5E9',
                color:
                  feedback.type === 'error'
                    ? '#C62828'
                    : feedback.type === 'info'
                    ? '#F57F17'
                    : '#2E7D32',
                border: `1px solid ${
                  feedback.type === 'error'
                    ? '#FFCDD2'
                    : feedback.type === 'info'
                    ? '#FFE082'
                    : '#C8E6C9'
                }`
              }}
            >
              <span>{feedback.message}</span>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '6px' }}>
            BUKA GERBANG CINTA ❤️
          </button>

          {/* Clue button & content */}
          <div style={{ marginTop: '8px' }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setShowHint(!showHint)}
              style={{ fontSize: '0.85rem' }}
            >
              <Sparkles size={14} color="var(--primary-dark)" />
              {showHint ? 'Tutup Bocoran Clue' : '💡 Butuh bocoran clue? (Klik di sini)'}
            </button>

            {showHint && (
              <div
                style={{
                  marginTop: '10px',
                  background: '#FFF0F5',
                  border: '1px dashed rgba(244, 143, 177, 0.6)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  textAlign: 'left',
                  animation: 'fadeIn 0.2s ease'
                }}
              >
                <p style={{ fontSize: '0.86rem', color: 'var(--dark)', marginBottom: '8px', lineHeight: '1.5' }}>
                  <strong>Petunjuk Rahasia:</strong> Siapa cowok paling ganteng di dunia yang jadi pacarmu? 😉
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--dark-muted)', marginBottom: '10px' }}>
                  Ketik persis kata kuncinya:{' '}
                  <strong style={{ color: 'var(--primary-dark)' }}>pacarmu yang ganteng Luckman</strong>
                </p>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary-dark)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Heart size={13} fill="var(--primary)" />
                  Bantu Isi Password Otomatis ❤️
                </button>
              </div>
            )}
          </div>
        </form>
      ) : (
        /* Unlocked State View */
        <div style={{ animation: 'scaleUp 0.3s ease', padding: '10px 0' }}>
          <div
            style={{
              background: '#E8F5E9',
              border: '1.5px solid #A5D6A7',
              borderRadius: 'var(--radius-md)',
              padding: '18px 16px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: '#2E7D32' }}>
              <CheckCircle2 size={22} />
              <strong style={{ fontSize: '1rem' }}>AKSES RESMI DITERIMA 100%</strong>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#1B5E20', lineHeight: '1.6' }}>
              Hihi pinter banget pacarku! Memang Luckman pacar paling ganteng sedunia buat bidadari Herlin. 
              Selamat menikmati perjalanan indah ini sayang! ❤️
            </p>
          </div>

          <button className="btn-primary" onClick={onUnlock}>
            MULAI PETUALANGAN SEKARANG 💖
          </button>
        </div>
      )}
    </div>
  );
}
