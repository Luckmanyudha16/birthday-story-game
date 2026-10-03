import React, { useState } from 'react';
import { Lock, CheckCircle2, XCircle, ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function Verification({ config, onVerified, onTriggerEasterEgg }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [attemptState, setAttemptState] = useState('idle'); // 'idle' | 'wrong' | 'verified'
  const [feedbackText, setFeedbackText] = useState('');

  const handleSelect = (opt) => {
    setSelectedOption(opt);
    if (opt.isCorrect) {
      globalAudio.playSfx('success');
      setAttemptState('verified');
      setFeedbackText(opt.feedback || 'Betul sekali!');
    } else {
      globalAudio.playSfx('wrong');
      setAttemptState('wrong');
      setFeedbackText(opt.feedback || 'Hmm... coba pikirkan lagi!');
    }
  };

  const handleReset = () => {
    setAttemptState('idle');
    setSelectedOption(null);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '520px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <span className="chapter-badge">
        <Lock size={12} />
        Chapter 02 • Security Check
      </span>

      <h2 className="section-title">
        {config.verification.title}
      </h2>

      <p className="section-subtitle">
        {config.verification.subtitle}
      </p>

      {attemptState === 'idle' && (
        <div style={{ textAlign: 'left', marginTop: '16px' }}>
          <div style={{
            background: 'rgba(252, 228, 236, 0.6)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '18px',
            border: '1px solid rgba(244, 143, 177, 0.3)'
          }}>
            <p style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.96rem' }}>
              ❓ {config.verification.question}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {config.verification.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(244, 143, 177, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  color: 'var(--dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.background = '#FFF5F8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(244, 143, 177, 0.3)';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                <span>{opt.text}</span>
                <Heart size={16} color="var(--primary)" opacity={0.6} />
              </button>
            ))}
          </div>
        </div>
      )}

      {attemptState === 'wrong' && (
        <div style={{ animation: 'scaleUp 0.3s ease', padding: '16px 8px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#FFEBEE',
            borderRadius: '50%',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#E53935'
          }}>
            <XCircle size={36} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#C62828', fontSize: '1.3rem', marginBottom: '8px' }}>
            ❌ Verification Incomplete
          </h3>

          <p style={{ color: 'var(--dark-muted)', fontSize: '0.95rem', marginBottom: '16px', lineHeight: '1.6' }}>
            {feedbackText}
          </p>

          <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--secondary)', marginBottom: '24px' }}>
            "Hmm... I think you need another try. Hari ini kamu dapet kesempatan tak terhingga! 😂"
          </p>

          <button className="btn-primary" onClick={handleReset}>
            TRY AGAIN ❤️
          </button>
        </div>
      )}

      {attemptState === 'verified' && (
        <div style={{ animation: 'scaleUp 0.3s ease', padding: '10px 0' }}>
          <div style={{
            width: '68px',
            height: '68px',
            background: '#E8F5E9',
            borderRadius: '50%',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2E7D32',
            boxShadow: '0 4px 16px rgba(46, 125, 50, 0.2)'
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#2E7D32', fontSize: '1.4rem', marginBottom: '4px' }}>
            ✅ VERIFIED ACCESS GRANTED
          </h3>

          <p style={{ color: 'var(--dark-muted)', fontSize: '0.92rem', marginBottom: '18px' }}>
            Identity confirmed with 100% highest clearance.
          </p>

          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #C8E6C9',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={20} color="#2E7D32" />
              <strong style={{ fontSize: '0.9rem', color: '#1B5E20' }}>
                Assigned Royal Privileges:
              </strong>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {config.verification.verifiedBadge.roles.map((role, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'var(--soft-pink)',
                    color: 'var(--dark)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(244, 143, 177, 0.4)'
                  }}
                >
                  ⭐ {role}
                </span>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={onVerified} id="btn-continue-quiz">
            CONTINUE TO CHAPTER 03 ❤️
          </button>
        </div>
      )}

      {/* Button to trigger Easter Egg 3 (Fake error) */}
      <button
        className="easter-egg-btn"
        onClick={() => onTriggerEasterEgg('systemError')}
      >
        ⚠️ Test Security Protocol
      </button>
    </div>
  );
}
