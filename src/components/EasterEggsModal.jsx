import React from 'react';
import { AlertTriangle, Cat, Heart, Sparkles, X } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function EasterEggsModal({ eggType, onClose, config }) {
  if (!eggType) return null;

  const handleClose = () => {
    globalAudio.playSfx('pop');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {eggType === 'secretButton' && (
          <div>
            <div style={{ width: '56px', height: '56px', background: '#FFF0F5', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D81B60' }}>
              <Cat size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '10px' }}>
              Caught you! 🐱
            </h3>
            <p style={{ color: 'var(--dark-muted)', whiteSpace: 'pre-line', lineHeight: '1.6', marginBottom: '22px' }}>
              {config.easterEggs.secretButton.message}
            </p>
            <button className="btn-primary" onClick={handleClose}>
              Hehehe, oke ❤️
            </button>
          </div>
        )}

        {eggType === 'secretHeart' && (
          <div>
            <div style={{ width: '56px', height: '56px', background: '#FCE4EC', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E91E63' }}>
              <Sparkles size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '10px' }}>
              🔓 SECRET UNLOCKED!
            </h3>
            <p style={{ color: 'var(--dark-muted)', whiteSpace: 'pre-line', lineHeight: '1.6', marginBottom: '22px' }}>
              {config.easterEggs.secretHeartClick.message}
            </p>
            <button className="btn-primary" onClick={handleClose}>
              Aww, you're the sweetest! 💕
            </button>
          </div>
        )}

        {eggType === 'systemError' && (
          <div>
            <div style={{ width: '56px', height: '56px', background: '#FFF3E0', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F57C00' }}>
              <AlertTriangle size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', marginBottom: '10px', color: '#E65100' }}>
              ⚠️ SYSTEM ERROR 404
            </h3>
            <p style={{ color: 'var(--dark-muted)', lineHeight: '1.6', marginBottom: '22px' }}>
              <strong>Critical Alert:</strong> Too much cuteness detected! All servers are overheating from your gorgeous smile.
            </p>
            <button className="btn-primary" onClick={handleClose}>
              CONTINUE ANYWAY ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
