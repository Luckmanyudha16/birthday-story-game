// Audio Manager with dual support: Real MP3 files with seamless Web Audio API Synthesizer fallback
// Ensures 100% reliable romantic background music and birthday music box song out-of-the-box

class AudioManager {
  constructor() {
    this.ctx = null;
    this.bgAudio = null;
    this.birthdayAudio = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentTrack = null; // 'background' | 'birthday' | null
    this.volume = 0.25;
    this.synthInterval = null;
    this.synthTimeout = null;
    this.synthGain = null;
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.useSynthFallback = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.synthGain = this.ctx.createGain();
        this.synthGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.synthGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.hasUserInteracted = true;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) =>
      fn({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        currentTrack: this.currentTrack,
        volume: this.volume,
        usingFallback: this.useSynthFallback
      })
    );
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    if (this.birthdayAudio) this.birthdayAudio.volume = this.isMuted ? 0 : this.volume;
    if (this.synthGain && this.ctx) {
      this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.bgAudio) this.bgAudio.volume = 0;
      if (this.birthdayAudio) this.birthdayAudio.volume = 0;
      if (this.synthGain && this.ctx) {
        this.synthGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (!this.isPlaying && this.hasUserInteracted) {
        this.playTrack(this.currentTrack || 'background');
      } else {
        if (this.bgAudio) this.bgAudio.volume = this.volume;
        if (this.birthdayAudio) this.birthdayAudio.volume = this.volume;
        if (this.synthGain && this.ctx) {
          this.synthGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }
    }
    this.notify();
    return this.isMuted;
  }

  // Smooth fade out helper
  async fadeOutAudio(audioElement, durationMs = 800) {
    if (!audioElement) return;
    return new Promise((resolve) => {
      const startVol = audioElement.volume;
      const steps = 16;
      const stepTime = durationMs / steps;
      let currentStep = 0;

      const fadeTimer = setInterval(() => {
        currentStep++;
        const factor = Math.max(0, 1 - currentStep / steps);
        audioElement.volume = startVol * factor;
        if (currentStep >= steps) {
          clearInterval(fadeTimer);
          audioElement.pause();
          audioElement.volume = this.isMuted ? 0 : this.volume;
          resolve();
        }
      }, stepTime);
    });
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
  }

  // Synthesized Dreamy Lofi Chords & Soft Twinkles
  playRomanticSynth() {
    this.stopSynth();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});

    // Chords: Cmaj7, Am7, Fmaj7, G7 in warm frequencies
    const chordProgressions = [
      [261.63, 329.63, 392.0, 493.88], // C E G B
      [220.0, 261.63, 329.63, 392.0],  // A C E G
      [174.61, 220.0, 261.63, 329.63], // F A C E
      [196.0, 246.94, 293.66, 349.23]  // G B D F
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (this.isMuted || !this.isPlaying) return;
      const chord = chordProgressions[chordIdx % chordProgressions.length];
      chordIdx++;

      // Play soft pad chord
      chord.forEach((freq, i) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          const noteVol = (this.isMuted ? 0 : this.volume) * 0.12;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(noteVol, now + 0.8 + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

          osc.connect(gain);
          gain.connect(this.synthGain || this.ctx.destination);
          osc.start(now);
          osc.stop(now + 3.5);
        } catch (_) {}
      });

      // Play gentle twinkle note
      setTimeout(() => {
        if (this.isMuted || !this.isPlaying || !this.ctx) return;
        const twinkles = [523.25, 659.25, 783.99, 987.77, 1046.5];
        const pick = twinkles[Math.floor(Math.random() * twinkles.length)];
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pick, this.ctx.currentTime);
          const now = this.ctx.currentTime;
          const twVol = (this.isMuted ? 0 : this.volume) * 0.15;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(twVol, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.connect(gain);
          gain.connect(this.synthGain || this.ctx.destination);
          osc.start(now);
          osc.stop(now + 1.3);
        } catch (_) {}
      }, 1200);
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 3600);
  }

  // Synthesized Music Box "Happy Birthday To You"
  playHappyBirthdaySynth() {
    this.stopSynth();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});

    // Melody: Note frequencies (Hz) and beat durations (s)
    // C4 D4 C4 F4 E4 | C4 D4 C4 G4 F4 | C4 C5 A4 F4 E4 D4 | Bb4 Bb4 A4 F4 G4 F4
    const notes = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.55 }, { f: 261.63, d: 0.55 }, { f: 349.23, d: 0.55 }, { f: 329.63, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.55 }, { f: 261.63, d: 0.55 }, { f: 392.00, d: 0.55 }, { f: 349.23, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.2 }, { f: 523.25, d: 0.55 }, { f: 440.00, d: 0.55 }, { f: 349.23, d: 0.55 }, { f: 329.63, d: 0.55 }, { f: 293.66, d: 1.0 },
      { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.2 }, { f: 440.00, d: 0.55 }, { f: 349.23, d: 0.55 }, { f: 392.00, d: 0.55 }, { f: 349.23, d: 1.5 }
    ];

    let noteIndex = 0;
    const playNextNote = () => {
      if (this.isMuted || !this.isPlaying || this.currentTrack !== 'birthday') return;
      if (noteIndex >= notes.length) {
        // loop after pause
        noteIndex = 0;
        this.synthTimeout = setTimeout(playNextNote, 2000);
        return;
      }

      const note = notes[noteIndex];
      noteIndex++;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        // Music box bell chime overtone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        const bVol = (this.isMuted ? 0 : this.volume) * 0.22;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(bVol, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.d * 1.3);

        osc.connect(gain);
        gain.connect(this.synthGain || this.ctx.destination);
        osc.start(now);
        osc.stop(now + note.d * 1.4);
      } catch (_) {}

      this.synthTimeout = setTimeout(playNextNote, note.d * 1000);
    };

    playNextNote();
  }

  async playTrack(trackType = 'background', customUrl = null) {
    this.init();
    this.isPlaying = true;
    this.currentTrack = trackType;

    if (this.isMuted) {
      this.notify();
      return;
    }

    // Handle background audio
    if (trackType === 'background') {
      if (this.birthdayAudio) {
        await this.fadeOutAudio(this.birthdayAudio);
      }
      this.stopSynth();

      const url = customUrl || '/music/background.mp3';
      if (!this.bgAudio) {
        this.bgAudio = new Audio(url);
        this.bgAudio.loop = true;
        this.bgAudio.volume = this.volume;

        this.bgAudio.addEventListener('error', () => {
          // File missing/error -> switch gracefully to dreamy synth
          this.useSynthFallback = true;
          if (this.currentTrack === 'background') {
            this.playRomanticSynth();
          }
          this.notify();
        });
      }

      try {
        await this.bgAudio.play();
        this.useSynthFallback = false;
      } catch (err) {
        // Fallback to dreamy web audio synth
        this.useSynthFallback = true;
        this.playRomanticSynth();
      }
    } else if (trackType === 'birthday') {
      if (this.bgAudio) {
        await this.fadeOutAudio(this.bgAudio);
      }
      this.stopSynth();

      const url = customUrl || '/music/happy-birthday.mp3';
      if (!this.birthdayAudio) {
        this.birthdayAudio = new Audio(url);
        this.birthdayAudio.loop = true;
        this.birthdayAudio.volume = this.volume;

        this.birthdayAudio.addEventListener('error', () => {
          this.useSynthFallback = true;
          if (this.currentTrack === 'birthday') {
            this.playHappyBirthdaySynth();
          }
          this.notify();
        });
      }

      try {
        await this.birthdayAudio.play();
        this.useSynthFallback = false;
      } catch (err) {
        this.useSynthFallback = true;
        this.playHappyBirthdaySynth();
      }
    }

    this.notify();
  }

  stopAll() {
    this.isPlaying = false;
    this.stopSynth();
    if (this.bgAudio) this.bgAudio.pause();
    if (this.birthdayAudio) this.birthdayAudio.pause();
    this.notify();
  }

  // Play a soft cute UI feedback chime
  playSfx(type = 'success') {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.15); // A5
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.2);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.15, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (_) {}
  }
}

export const globalAudio = new AudioManager();
