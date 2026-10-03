import React, { useRef, useState } from 'react';
import { Award, Download, Gift } from 'lucide-react';
import html2canvas from 'html2canvas';
import { globalAudio } from '../utils/audioManager';

export default function Certificate({ config, onComplete }) {
  const certRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const achievements = [
    { title: "Birthday Girl", icon: "❤️" },
    { title: "Pejuang Petualangan Cinta", icon: "🎂" },
    { title: "Paling Manis & Gemas", icon: "⭐" },
    { title: "Sejarawan Kisah Kita", icon: "💕" },
    { title: "Pacar Terbaik Sedunia", icon: "🏆" }
  ];

  const handleDownload = async () => {
    if (!certRef.current) return;
    setIsGenerating(true);
    globalAudio.playSfx('pop');

    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFDF8',
      });

      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Sertifikat-Ulang-Tahun-${config.recipientName.replace(/\s+/g, '_')}.png`;
      link.href = imgData;
      link.click();

      globalAudio.playSfx('success');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate certificate:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <span className="chapter-badge">
        <Award size={12} />
        Bab 07 • Kelulusan Misi
      </span>

      <h2 className="section-title">🏆 SELAMAT, SAYANG!</h2>
      <p className="section-subtitle">
        Kamu telah berhasil menyelesaikan seluruh babak misi di The Birthday Adventure dengan sempurna!
      </p>

      {/* Achievement Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {achievements.map((ach, idx) => (
          <span
            key={idx}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(244, 143, 177, 0.4)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--dark)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            {ach.icon} {ach.title}
          </span>
        ))}
      </div>

      {/* The Printable / Downloadable Certificate */}
      <div
        ref={certRef}
        className="certificate-preview-card"
        style={{
          background: '#FFFDF8',
          border: '6px double #D4AF37',
          borderRadius: '12px',
          padding: '24px 18px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          position: 'relative',
          marginBottom: '24px',
        }}
      >
        <div className="certificate-inner-border">
          <div className="certificate-seal">
            <Award size={32} />
          </div>

          <p style={{ fontFamily: 'var(--font-playful)', fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8D6E63', fontWeight: 700, marginBottom: '4px' }}>
            SERTIFIKAT DIGITAL RESMI
          </p>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', color: '#3E2723', fontStyle: 'italic', marginBottom: '8px' }}>
            {config.recipientName}
          </h3>

          <p style={{ color: '#5D4037', fontSize: '0.88rem', marginBottom: '14px', lineHeight: '1.5' }}>
            telah berhasil dengan penuh senyuman dan cinta menyelesaikan seluruh babak di
            <br />
            <strong>THE BIRTHDAY ADVENTURE</strong>
          </p>

          <div style={{ display: 'inline-block', background: '#FFF8E1', border: '1px dashed #FFB300', padding: '6px 16px', borderRadius: 'var(--radius-full)', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#E65100' }}>
              Predikat Akhir: 100/100 • Birthday Girl Bersertifikat Resmi ⭐
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(212, 175, 55, 0.3)', paddingTop: '14px', marginTop: '8px' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '0.72rem', color: '#8D6E63', display: 'block' }}>Tanggal Diberikan:</span>
              <strong style={{ fontSize: '0.82rem', color: '#4E342E' }}>{config.birthdayDate}</strong>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.4rem', color: '#D81B60', display: 'block', lineHeight: '1' }}>
                {config.senderName}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#8D6E63' }}>Disahkan Dengan Penuh Cinta ❤️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          className="btn-secondary"
          onClick={handleDownload}
          disabled={isGenerating}
          style={{ width: '100%' }}
          id="btn-download-cert"
        >
          <Download size={16} />
          {isGenerating ? 'Sedang membuat sertifikat PNG...' : '📸 SIMPAN SERTIFIKAT SEBAGAI GAMBAR (PNG)'}
        </button>

        {downloadSuccess && (
          <p style={{ color: '#2E7D32', fontSize: '0.85rem', fontWeight: 600 }}>
            ✅ Sertifikat berhasil disimpan ke perangkatmu!
          </p>
        )}

        <button className="btn-primary" onClick={onComplete} id="btn-proceed-final" style={{ marginTop: '8px' }}>
          <Gift size={18} />
          BUKA KEJUTAN UTAMA 🎁
        </button>
      </div>
    </div>
  );
}
