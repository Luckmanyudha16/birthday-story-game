import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Heart, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { photoMemories } from '../data/memories';
import { globalAudio } from '../utils/audioManager';

export default function Gallery({ onComplete }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  const openLightbox = (idx) => {
    globalAudio.playSfx('pop');
    setActivePhotoIdx(idx);
  };

  const closeLightbox = () => {
    globalAudio.playSfx('pop');
    setActivePhotoIdx(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    globalAudio.playSfx('pop');
    setActivePhotoIdx((prev) => (prev + 1) % photoMemories.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    globalAudio.playSfx('pop');
    setActivePhotoIdx((prev) => (prev - 1 + photoMemories.length) % photoMemories.length);
  };

  const activePhoto = activePhotoIdx !== null ? photoMemories[activePhotoIdx] : null;

  return (
    <div className="glass-card" style={{ maxWidth: '640px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="chapter-badge">
          <Camera size={12} />
          Chapter 05 • Polaroid Memories
        </span>
        <h2 className="section-title">📸 OUR LITTLE UNIVERSE</h2>
        <p className="section-subtitle">
          A few cherished moments that became our favorite memories.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="polaroid-grid">
        {photoMemories.map((item, idx) => (
          <div
            key={item.id}
            className="polaroid-card"
            onClick={() => openLightbox(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
          >
            <div className="polaroid-img-container">
              <img
                src={item.image}
                alt={item.caption}
                className="polaroid-img"
                loading="lazy"
                onError={(e) => {
                  // Fallback cute placeholder if user custom image has broken link
                  e.target.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <span className="polaroid-date-badge">
                {item.year} • {item.title}
              </span>
              <p className="polaroid-caption">
                "{item.caption}"
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--secondary)', marginBottom: '18px' }}>
          Tap any polaroid to view the story behind the snapshot ✨
        </p>

        <button className="btn-primary" onClick={onComplete} id="btn-proceed-letter">
          CONTINUE TO CHAPTER 06 • LOVE LETTER ❤️
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close photo">
              <X size={20} />
            </button>

            {/* Photo display */}
            <div style={{ width: '100%', maxHeight: '420px', overflow: 'hidden', borderRadius: 'var(--radius-sm)', background: '#F8BBD0' }}>
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                style={{ width: '100%', height: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Story Details */}
            <div style={{ marginTop: '16px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                  <Calendar size={13} /> {activePhoto.year}
                </span>
                {activePhoto.location && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--secondary)' }}>
                    <MapPin size={13} /> {activePhoto.location}
                  </span>
                )}
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '6px', color: 'var(--dark)' }}>
                {activePhoto.title}
              </h4>

              <p style={{ color: 'var(--dark-muted)', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '10px' }}>
                {activePhoto.caption}
              </p>

              {activePhoto.note && (
                <div style={{ background: 'var(--soft-pink)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary-dark)' }}>
                  <p style={{ fontFamily: 'var(--font-script)', fontSize: '1.15rem', color: 'var(--dark)' }}>
                    💭 "{activePhoto.note}"
                  </p>
                </div>
              )}
            </div>

            {/* Navigation arrows */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid rgba(244, 143, 177, 0.2)', paddingTop: '12px' }}>
              <button className="btn-ghost" onClick={showPrev}>
                <ChevronLeft size={16} /> Prev
              </button>
              <span style={{ fontSize: '0.78rem', color: 'var(--secondary)' }}>
                {activePhotoIdx + 1} of {photoMemories.length}
              </span>
              <button className="btn-ghost" onClick={showNext}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
