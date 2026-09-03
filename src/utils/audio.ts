// Web Audio API Sound Synthesizer for romantic acoustic chimes
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChime(frequencies: number[] = [523.25, 659.25, 783.99, 1046.50]) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.85);
    });
  } catch {
    // Audio might be restricted until user interaction
  }
}

export function playKissSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // ignore
  }
}

class RomanticMusicSynth {
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;

  // Romantic gentle music-box notes based on Floricienta / acoustic theme (F#, G#, A#, B, C#)
  private melody = [
    { notes: [440, 554.37, 659.25], dur: 0.8 },      // A major
    { notes: [493.88, 622.25, 739.99], dur: 0.8 },    // B
    { notes: [554.37, 659.25, 830.61], dur: 0.8 },    // C#m
    { notes: [440, 554.37, 659.25, 880], dur: 1.2 },  // A high
    { notes: [392.00, 493.88, 587.33], dur: 0.8 },    // G
    { notes: [440, 659.25], dur: 0.8 },
    { notes: [554.37, 739.99], dur: 0.8 },
    { notes: [659.25, 880], dur: 1.4 },
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playNext = () => {
    if (!this.isPlaying) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const item = this.melody[this.step % this.melody.length];
    this.step++;

    item.notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + i * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.04 + item.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + i * 0.04 + item.dur);
    });

    this.timerId = window.setTimeout(this.playNext, item.dur * 1000 * 0.95);
  };
}

export const musicSynth = new RomanticMusicSynth();
