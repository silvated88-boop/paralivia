// Web Audio API synthesizer for birthday sounds and melody

class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private isPlayingMelody: boolean = false;
  private melodyTimeout: any = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cheerful pop sound when popping a balloon
  playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore audio errors
    }
  }

  // Blowing sound when candles are blown
  playBlow() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Wind whoosh effect
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Followed by a magic chime
      setTimeout(() => {
        this.playChime();
      }, 350);
    } catch {
      // Ignore
    }
  }

  // Cheerful celebration chime
  playChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  // Party horn sound
  playHorn() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(420, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignore
    }
  }

  // Play "Parabéns a você / Happy Birthday" melody
  playHappyBirthday(onComplete?: () => void) {
    if (this.isPlayingMelody) {
      this.stopMelody();
      return;
    }
    const ctx = this.getContext();
    if (!ctx) return;

    this.isPlayingMelody = true;

    // Melody notes (freq in Hz, duration in seconds)
    // "Parabéns pra você, nesta data querida..."
    const notes = [
      { f: 261.63, d: 0.3 }, // C4  Pa-
      { f: 261.63, d: 0.3 }, // C4  ra-
      { f: 293.66, d: 0.6 }, // D4  béns
      { f: 261.63, d: 0.6 }, // C4  pra
      { f: 349.23, d: 0.6 }, // F4  vo-
      { f: 329.63, d: 1.0 }, // E4  cê,
      
      { f: 261.63, d: 0.3 }, // C4  nes-
      { f: 261.63, d: 0.3 }, // C4  ta
      { f: 293.66, d: 0.6 }, // D4  da-
      { f: 261.63, d: 0.6 }, // C4  ta
      { f: 392.00, d: 0.6 }, // G4  que-
      { f: 349.23, d: 1.0 }, // F4  ri-da,
      
      { f: 261.63, d: 0.3 }, // C4  mui-
      { f: 261.63, d: 0.3 }, // C4  tas
      { f: 523.25, d: 0.6 }, // C5  fe-
      { f: 440.00, d: 0.6 }, // A4  li-
      { f: 349.23, d: 0.6 }, // F4  ci-
      { f: 329.63, d: 0.6 }, // E4  da-
      { f: 293.66, d: 0.8 }, // D4  des,
      
      { f: 466.16, d: 0.3 }, // Bb4 mui-
      { f: 466.16, d: 0.3 }, // Bb4 tos
      { f: 440.00, d: 0.6 }, // A4  a-
      { f: 349.23, d: 0.6 }, // F4  nos
      { f: 392.00, d: 0.6 }, // G4  de
      { f: 349.23, d: 1.2 }, // F4  vi-da!
    ];

    let currentTime = ctx.currentTime + 0.1;

    notes.forEach((note) => {
      if (this.isMuted) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Music-box chime tone
      osc.frequency.setValueAtTime(note.f, currentTime);

      // Add warmth with soft harmonics
      gain.gain.setValueAtTime(0.22, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.d * 0.95);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(currentTime);
      osc.stop(currentTime + note.d);

      currentTime += note.d * 1.05;
    });

    const totalDuration = (currentTime - ctx.currentTime) * 1000;
    this.melodyTimeout = setTimeout(() => {
      this.isPlayingMelody = false;
      if (onComplete) onComplete();
    }, totalDuration);
  }

  stopMelody() {
    this.isPlayingMelody = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlayingMelody;
  }
}

export const soundManager = new SoundManager();
