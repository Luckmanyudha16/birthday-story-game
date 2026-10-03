import React, { useState } from 'react';
import { HelpCircle, Check, X, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { quizQuestions } from '../data/questions';
import { globalAudio } from '../utils/audioManager';

export default function Quiz({ onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, text: string }
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelect = (idx) => {
    if (feedback !== null) return; // Prevent double taps during feedback
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      globalAudio.playSfx('success');
      setCorrectCount((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: currentQ.correctFeedback || "🎉 CORRECT! Apparently you still remember us. I'm impressed. ❤️",
      });
    } else {
      globalAudio.playSfx('wrong');
      setFeedback({
        isCorrect: false,
        text: currentQ.wrongFeedback || "Hmm... Are you sure? I'll give you another chance because today is your birthday! 😂",
      });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);

    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetryQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '540px', width: '100%', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="chapter-badge">
          <HelpCircle size={12} />
          Chapter 03 • Memory Check
        </span>
        <h2 className="section-title">💕 DO YOU REMEMBER?</h2>
        <p className="section-subtitle">
          Mari kita tes seberapa kuat memorimu tentang perjalanan kita bersama!
        </p>
      </div>

      {!isFinished ? (
        <div>
          {/* Question Counter Pill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontFamily: 'var(--font-playful)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--primary-dark)' }}>
              Question {currentIdx + 1} of {quizQuestions.length}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '18px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i < currentIdx ? 'var(--primary)' : i === currentIdx ? 'var(--primary-dark)' : 'rgba(244,143,177,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(244, 143, 177, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              marginBottom: '18px',
              boxShadow: '0 4px 12px rgba(142, 108, 136, 0.06)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--dark)' }}>
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = {
                width: '100%',
                textAlign: 'left',
                padding: '13px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-body)',
                border: '1.5px solid rgba(244, 143, 177, 0.3)',
                background: '#FFFFFF',
                color: 'var(--dark)',
                cursor: feedback ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              };

              if (feedback && isSelected) {
                if (feedback.isCorrect) {
                  btnStyle.borderColor = '#4CAF50';
                  btnStyle.background = '#E8F5E9';
                  btnStyle.color = '#1B5E20';
                  btnStyle.fontWeight = '600';
                } else {
                  btnStyle.borderColor = '#EF5350';
                  btnStyle.background = '#FFEBEE';
                  btnStyle.color = '#B71C1C';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={feedback !== null}
                  style={btnStyle}
                >
                  <span>{opt}</span>
                  {feedback && isSelected && (
                    feedback.isCorrect ? <Check size={18} color="#2E7D32" /> : <X size={18} color="#C62828" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              style={{
                marginTop: '18px',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: feedback.isCorrect ? '#E8F5E9' : '#FFF3E0',
                border: feedback.isCorrect ? '1px solid #A5D6A7' : '1px solid #FFE082',
                animation: 'scaleUp 0.25s ease',
              }}
            >
              <p style={{
                color: feedback.isCorrect ? '#1B5E20' : '#E65100',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                marginBottom: '12px'
              }}>
                {feedback.text}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                {!feedback.isCorrect && (
                  <button
                    className="btn-secondary"
                    onClick={handleRetryQuestion}
                    style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                  >
                    <RotateCcw size={14} />
                    Try Again
                  </button>
                )}
                <button
                  className="btn-primary"
                  onClick={handleNext}
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
                >
                  {currentIdx + 1 < quizQuestions.length ? 'Next Question' : 'View Results'}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Result Screen */
        <div style={{ textAlign: 'center', animation: 'scaleUp 0.3s ease' }}>
          <div
            style={{
              width: '76px',
              height: '76px',
              background: 'radial-gradient(circle, #FFE082 0%, #FFCA28 100%)',
              borderRadius: '50%',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(255, 193, 7, 0.35)',
              color: '#5D4037',
            }}
          >
            <Award size={42} />
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '6px' }}>
            RELATIONSHIP MEMORY RESULT
          </h3>

          <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Answers Verified: {correctCount} / {quizQuestions.length}
          </p>

          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(244, 143, 177, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--secondary)' }}>Memory Accuracy</span>
              <span style={{ color: 'var(--primary-dark)' }}>98.5%</span>
            </div>

            <div style={{ width: '100%', height: '10px', background: 'rgba(244, 143, 177, 0.2)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ width: '98.5%', height: '100%', background: 'linear-gradient(90deg, #F48FB1, #E91E63)', borderRadius: '999px' }}></div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--cream)',
              border: '1px solid #FFE082',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              color: '#795548',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              🏆 ACHIEVEMENT UNLOCKED: RELATIONSHIP HISTORIAN
            </div>

            <div style={{ borderTop: '1px dashed rgba(244, 143, 177, 0.4)', paddingTop: '14px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 700, marginBottom: '4px' }}>
                Final Score: 100/100 ❤️
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--dark-muted)' }}>
                "Because today, the birthday girl always wins!"
              </p>
            </div>
          </div>

          <button className="btn-primary" onClick={onComplete} id="btn-quiz-proceed">
            CONTINUE TO CHAPTER 04 ❤️
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
