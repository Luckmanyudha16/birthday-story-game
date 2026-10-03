import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Sparkles, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { globalAudio } from '../utils/audioManager';

export default function WishForm({ config, onComplete }) {
  const [formData, setFormData] = useState({
    wish1: '',
    wish2: '',
    wish3: '',
    personToBecome: '',
    wishTogether: '',
    dreamGift: '',
    dreamDestination: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Restore saved draft if any
  useEffect(() => {
    try {
      const saved = localStorage.getItem('birthday_wishes_draft');
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    try {
      localStorage.setItem('birthday_wishes_draft', JSON.stringify(updated));
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      localStorage.setItem('birthday_wishes_saved', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }));
    } catch (_) {}

    const payload = {
      name: config.recipientName,
      quizScore: "100/100",
      ...formData
    };

    if (config.googleAppsScriptUrl && config.googleAppsScriptUrl.startsWith('http')) {
      try {
        await fetch(config.googleAppsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        globalAudio.playSfx('success');
        setStatus('success');
      } catch (err) {
        console.error('Submission error:', err);
        globalAudio.playSfx('success');
        setStatus('success');
      }
    } else {
      setTimeout(() => {
        globalAudio.playSfx('success');
        setStatus('success');
      }, 1200);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '560px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="chapter-badge">
          <Sparkles size={12} />
          Bab 04 • Kotak Harapanmu
        </span>
        <h2 className="section-title">🌱 BABAK BARU USIA INDAHMU</h2>
        <p className="section-subtitle">
          Satu tahun penuh kebaikan sedang menantimu. Nah... apa saja harapan terbesarmu?
        </p>
      </div>

      {status !== 'success' ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pertanyaan 1: 3 Harapan */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 143, 177, 0.3)' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--dark)', marginBottom: '10px', fontSize: '0.94rem' }}>
              ✨ Sebutkan 3 hal yang paling kamu harapkan di tahun ini?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="text"
                placeholder="Harapan #1 (Kesehatan, impian, karier...)"
                value={formData.wish1}
                onChange={(e) => handleChange('wish1', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #E0E0E0',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="text"
                placeholder="Harapan #2 (Kebahagiaan, rezeki, ketenangan hati...)"
                value={formData.wish2}
                onChange={(e) => handleChange('wish2', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #E0E0E0',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
              />
              <input
                type="text"
                placeholder="Harapan #3 (Harapan rahasia terindahmu...)"
                value={formData.wish3}
                onChange={(e) => handleChange('wish3', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #E0E0E0',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>

          {/* Pertanyaan 2: Pribadi yang ingin dicapai */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 143, 177, 0.3)' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontSize: '0.94rem' }}>
              💭 Ingin menjadi pribadi seperti apa kamu di tahun ini?
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan versi terbaik dari dirimu yang ingin kamu capai..."
              value={formData.personToBecome}
              onChange={(e) => handleChange('personToBecome', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E0E0E0',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Pertanyaan 3: Momen bersama */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 143, 177, 0.3)' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontSize: '0.94rem' }}>
              ❤️ Satu hal apa yang paling ingin kita jalani dan alami bersama?
            </label>
            <textarea
              rows={2}
              placeholder="Hal baru, rencana kencan seru, atau petualangan bersama..."
              value={formData.wishTogether}
              onChange={(e) => handleChange('wishTogether', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E0E0E0',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Pertanyaan 4: Hadiah impian */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 143, 177, 0.3)' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontSize: '0.94rem' }}>
              🎁 Kalau aku bisa mewujudkan satu hal/kado untukmu tahun ini, apa yang kamu inginkan?
            </label>
            <textarea
              rows={2}
              placeholder="Boleh barang impian, janji manis, atau waktu luang bersama..."
              value={formData.dreamGift}
              onChange={(e) => handleChange('dreamGift', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E0E0E0',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Pertanyaan 5: Destinasi impian */}
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 143, 177, 0.3)' }}>
            <label style={{ display: 'block', fontWeight: 600, color: 'var(--dark)', marginBottom: '8px', fontSize: '0.94rem' }}>
              🌎 Apakah ada tempat impian yang sangat ingin kamu kunjungi bersamaku?
            </label>
            <input
              type="text"
              placeholder="Kota impian, pantai tenang, atau tempat estetik..."
              value={formData.dreamDestination}
              onChange={(e) => handleChange('dreamDestination', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #E0E0E0',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
              }}
            />
          </div>

          {status === 'error' && (
            <div style={{ background: '#FFEBEE', padding: '12px 16px', borderRadius: 'var(--radius-sm)', color: '#C62828', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <AlertCircle size={18} />
              <span>{errorMessage || "Harapanmu tetap tersimpan aman di perangkat ini. Coba lagi yuk!"}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={status === 'submitting'}
            id="btn-submit-wishes"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sedang mengirimkan harapanmu... Tunggu ya sayang ❤️
              </>
            ) : (
              <>
                <Send size={18} />
                KIRIM HARAPANKU DENGAN CINTA 💌
              </>
            )}
          </button>
        </form>
      ) : (
        /* Tampilan Berhasil */
        <div style={{ textAlign: 'center', animation: 'scaleUp 0.3s ease', padding: '10px 0' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              background: '#E8F5E9',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2E7D32',
              boxShadow: '0 6px 20px rgba(46, 125, 50, 0.2)',
            }}
          >
            <CheckCircle2 size={42} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', color: '#2E7D32', fontSize: '1.45rem', marginBottom: '8px' }}>
            💌 PESAN HARAPAN TELAH DITERIMA
          </h3>

          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #C8E6C9',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--dark-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '10px' }}>
              Seluruh harapan manismu sudah tersimpan rapi dan aman di lubuk hatiku!
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
              "Tenang saja... aku akan membaca setiap kata dengan teliti dan berusaha mewujudkannya bersamamu. ❤️"
            </p>
          </div>

          <button className="btn-primary" onClick={onComplete} id="btn-proceed-memories">
            LANJUT KE BAB 05 • KENANGAN KITA ❤️
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
