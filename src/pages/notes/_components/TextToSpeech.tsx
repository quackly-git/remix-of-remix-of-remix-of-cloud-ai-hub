import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextToSpeechProps {
  text: string;
  disabled?: boolean;
}

export function TextToSpeech({ text, disabled = false }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const startReading = () => {
    if (!text || disabled) return;

    // Cancel any existing speech
    speechSynthesis.cancel();

    // Create new speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechRef.current = utterance;

    // Configure speech settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set up event listeners
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    // Start speaking
    speechSynthesis.speak(utterance);
  };

  const pauseReading = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleClick = () => {
    if (!isPlaying) {
      startReading();
    } else if (isPaused) {
      resumeReading();
    } else {
      pauseReading();
    }
  };

  if (!text || disabled) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <X className="h-4 w-4" />
        <span className="hidden sm:inline">Listen</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={isPlaying ? "default" : "outline"}
        size="sm"
        onClick={handleClick}
        className="gap-2"
        title={
          isPlaying
            ? isPaused
              ? "Resume reading"
              : "Pause reading"
            : "Start reading lesson"
        }
      >
        {isPlaying ? (
          isPaused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {isPlaying ? (isPaused ? "Resume" : "Pause") : "Listen"}
        </span>
      </Button>

      {isPlaying && (
        <Button
          variant="ghost"
          size="sm"
          onClick={stopReading}
          title="Stop reading"
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
