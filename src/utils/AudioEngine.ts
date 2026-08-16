// Web Audio API Synthesizer for Anime / Reiatsu Sound Effects

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a metallic sword slash / blade draw sound
  public playSlash() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.18);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Audio fallback
    }
  }

  // Play a deep sub-bass Reiatsu / Bankai energy burst sound
  public playBankaiBurst() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Sub-bass sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch {
      // Audio fallback
    }
  }

  // Soft hover click sound
  public playHover() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio fallback
    }
  }

  // Play Bleach Sonido / Shunpo high-speed teleportation sound effect
  private sonidoAudio: HTMLAudioElement | null = null;

  public playSonido() {
    if (this.isMuted) return;
    try {
      if (!this.sonidoAudio) {
        this.sonidoAudio = new Audio('/assets/sonido-sound.mp3');
        this.sonidoAudio.volume = 0.65;
        this.sonidoAudio.preload = 'auto';
      }
      this.sonidoAudio.currentTime = 0;
      const promise = this.sonidoAudio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Fallback to procedural slash if audio element playback is restricted
          this.playSlash();
        });
      }
    } catch {
      this.playSlash();
    }
  }
}

export const audioEngine = new AudioSynthesizer();
