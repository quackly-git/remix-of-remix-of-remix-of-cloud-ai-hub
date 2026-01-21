import { useRef, useCallback, useEffect, useState } from "react";

// Heartbeat sound using Web Audio API oscillators
export const useHeartbeatSound = (anxietyLevel: number, enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get heartbeat interval based on anxiety level (in ms)
  const getHeartbeatInterval = useCallback((level: number) => {
    switch (level) {
      case 1: return 1000;  // 60 BPM - calm
      case 2: return 750;   // 80 BPM - slightly nervous
      case 3: return 545;   // 110 BPM - anxious
      case 4: return 400;   // 150 BPM - very anxious
      case 5: return 300;   // 200 BPM - panic!
      default: return 1000;
    }
  }, []);

  // Create a heartbeat sound using oscillators
  const playHeartbeat = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const ctx = audioContextRef.current;
    const masterGain = gainNodeRef.current;

    // Create "lub" sound (first beat)
    const lubOsc = ctx.createOscillator();
    const lubGain = ctx.createGain();
    lubOsc.type = "sine";
    lubOsc.frequency.setValueAtTime(80, ctx.currentTime);
    lubOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    lubGain.gain.setValueAtTime(0.5, ctx.currentTime);
    lubGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    lubOsc.connect(lubGain);
    lubGain.connect(masterGain);
    lubOsc.start(ctx.currentTime);
    lubOsc.stop(ctx.currentTime + 0.15);

    // Create "dub" sound (second beat) - slightly delayed
    const dubOsc = ctx.createOscillator();
    const dubGain = ctx.createGain();
    dubOsc.type = "sine";
    dubOsc.frequency.setValueAtTime(60, ctx.currentTime + 0.12);
    dubOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.22);
    dubGain.gain.setValueAtTime(0, ctx.currentTime);
    dubGain.gain.setValueAtTime(0.3, ctx.currentTime + 0.12);
    dubGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    dubOsc.connect(dubGain);
    dubGain.connect(masterGain);
    dubOsc.start(ctx.currentTime + 0.12);
    dubOsc.stop(ctx.currentTime + 0.25);
  }, []);

  const start = useCallback(() => {
    if (isPlaying) return;

    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.3; // Master volume
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    setIsPlaying(true);
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Update heartbeat interval when anxiety level or playing state changes
  useEffect(() => {
    if (!isPlaying || !enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Play immediately and set up new interval
    playHeartbeat();
    const interval = getHeartbeatInterval(anxietyLevel);
    intervalRef.current = setInterval(playHeartbeat, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [anxietyLevel, isPlaying, enabled, playHeartbeat, getHeartbeatInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return { isPlaying, start, stop, toggle: isPlaying ? stop : start };
};
