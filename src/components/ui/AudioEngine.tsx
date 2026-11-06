import React, { useEffect, useRef } from 'react';

// Global audio FX interface
declare global {
  interface Window {
    __playAudioFx?: (type: 'cannon' | 'click' | 'creak' | 'seal' | 'thunder' | 'page' | 'bell') => void;
  }
}

interface AudioEngineProps {
  isPlaying: boolean;
}

export const playAudioFx = (type: 'cannon' | 'click' | 'creak' | 'seal' | 'thunder' | 'page' | 'bell') => {
  if (typeof window !== 'undefined' && window.__playAudioFx) {
    window.__playAudioFx(type);
  }
};

export const AudioEngine: React.FC<AudioEngineProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const waveSourcesRef = useRef<any[]>([]);

  // Function to initialize AudioContext
  const getContext = (): AudioContext | null => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  // Sound FX Synthesizers
  const playSoundEffect = (type: 'cannon' | 'click' | 'creak' | 'seal' | 'thunder' | 'page' | 'bell') => {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'cannon') {
      // 1. Broadside Cannon Blast: Noise explosion + sub-bass punch
      const bufferSize = ctx.sampleRate * 1.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const blastFilter = ctx.createBiquadFilter();
      blastFilter.type = 'lowpass';
      blastFilter.frequency.setValueAtTime(800, now);
      blastFilter.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      const blastGain = ctx.createGain();
      blastGain.gain.setValueAtTime(1.0, now);
      blastGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      // Sub-bass thump oscillator
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.8, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      noiseSource.connect(blastFilter);
      blastFilter.connect(blastGain);
      blastGain.connect(ctx.destination);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      noiseSource.start(now);
      subOsc.start(now);
      noiseSource.stop(now + 1.5);
      subOsc.stop(now + 0.7);
    } else if (type === 'click') {
      // 2. Brass Nautical Compass Tick
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'seal') {
      // 3. Wax Seal Stamp Thud
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === 'page') {
      // 4. Parchment Unroll / Rustle
      const bufferSize = ctx.sampleRate * 0.25;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(2400, now + 0.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + 0.25);
    } else if (type === 'creak') {
      // 5. Galleon Oak Timber Creak
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(82, now + 0.2);
      osc.frequency.linearRampToValueAtTime(50, now + 0.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (type === 'thunder') {
      // 6. Distant Sea Thunder Rumble
      const bufferSize = ctx.sampleRate * 2.5;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.03 * white) / 1.03;
        data[i] = last * 2.5;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(40, now + 2.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + 2.5);
    } else if (type === 'bell') {
      // 7. Ship's Brass Bell Tone with harmonic ring
      const fundamental = ctx.createOscillator();
      fundamental.type = 'sine';
      fundamental.frequency.setValueAtTime(1174.66, now); // D6
      const fGain = ctx.createGain();
      fGain.gain.setValueAtTime(0.28, now);
      fGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      const overtone = ctx.createOscillator();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(2349.32, now); // D7
      const oGain = ctx.createGain();
      oGain.gain.setValueAtTime(0.14, now);
      oGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      fundamental.connect(fGain);
      fGain.connect(ctx.destination);
      overtone.connect(oGain);
      oGain.connect(ctx.destination);

      fundamental.start(now);
      overtone.start(now);
      fundamental.stop(now + 1.9);
      overtone.stop(now + 1.3);
    }
  };

  // Expose playSoundEffect globally for any component
  useEffect(() => {
    window.__playAudioFx = playSoundEffect;
    return () => {
      delete window.__playAudioFx;
    };
  }, []);

  // Ambient Ocean Surf Swell Controller
  useEffect(() => {
    if (!isPlaying) {
      if (ambientGainRef.current && audioCtxRef.current) {
        ambientGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
      }
      return;
    }

    const ctx = getContext();
    if (!ctx) return;

    if (!masterGainRef.current) {
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.01, ctx.currentTime);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const ambient = ctx.createGain();
      ambient.gain.setValueAtTime(0.01, ctx.currentTime);
      ambient.connect(master);
      ambientGainRef.current = ambient;

      // 1. Procedural Ocean Wave White/Pink Noise Generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Brown/pink noise
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter for surf sweep
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // LFO to modulate wave swell intensity (8-second swells)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.125, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(220, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.35, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(ambient);

      whiteNoise.start();
      lfo.start();

      // 2. High-seas Wind Breeze Synthesizer
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(450, ctx.currentTime);
      windFilter.Q.setValueAtTime(3.0, ctx.currentTime);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.15, ctx.currentTime);

      const windNoise = ctx.createBufferSource();
      windNoise.buffer = noiseBuffer;
      windNoise.loop = true;

      windNoise.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(ambient);
      windNoise.start();

      waveSourcesRef.current = [whiteNoise, lfo, windNoise];
    }

    if (ambientGainRef.current) {
      ambientGainRef.current.gain.setTargetAtTime(0.7, ctx.currentTime, 0.4);
    }
  }, [isPlaying]);

  return null;
};
