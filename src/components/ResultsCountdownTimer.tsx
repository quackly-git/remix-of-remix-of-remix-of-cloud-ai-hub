import React, { useState, useEffect, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import rabbitClockGif from "@/assets/rabbit-clock.gif";
import { ResultsTimerDisplaySettings } from "./ResultsSettingsModal";
import { Session } from "@/hooks/useResultsSettings";

interface ResultsCountdownTimerProps {
  resultsDate: Date;
  session: Session | null;
  displaySettings: ResultsTimerDisplaySettings;
}

export const ResultsCountdownTimer: React.FC<ResultsCountdownTimerProps> = ({
  resultsDate,
  session,
  displaySettings,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const [progressData, setProgressData] = useState({
    progress: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const resultsTime = new Date(resultsDate).getTime();
      const difference = resultsTime - now;

      if (difference > 0) {
        let totalSeconds = Math.floor(difference / 1000);
        
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        if (displaySettings.showDays) {
          days = Math.floor(totalSeconds / (60 * 60 * 24));
          totalSeconds %= 60 * 60 * 24;
        }
        if (displaySettings.showHours) {
          hours = Math.floor(totalSeconds / (60 * 60));
          totalSeconds %= 60 * 60;
        }
        if (displaySettings.showMinutes) {
          minutes = Math.floor(totalSeconds / 60);
          totalSeconds %= 60;
        }
        if (displaySettings.showSeconds) {
          seconds = totalSeconds;
        }

        setTimeLeft({ 
          days, 
          hours, 
          minutes, 
          seconds, 
          totalSeconds: Math.floor(difference / 1000) 
        });

        // Calculate progress (from exam date to results date)
        const examDate = session === "oct2025" 
          ? new Date(2025, 9, 23).getTime() 
          : new Date(2026, 0, 15).getTime();
        const totalTime = resultsTime - examDate;
        const elapsed = now - examDate;
        const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));

        setProgressData({ progress });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });
        setProgressData({ progress: 100 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [resultsDate, session, displaySettings]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const isResultsDay = timeLeft.totalSeconds <= 0;

  const timeUnits = [];
  if (displaySettings.showDays) timeUnits.push({ value: timeLeft.days, label: "Days" });
  if (displaySettings.showHours) timeUnits.push({ value: timeLeft.hours, label: "Hours" });
  if (displaySettings.showMinutes) timeUnits.push({ value: timeLeft.minutes, label: "Minutes" });
  if (displaySettings.showSeconds) timeUnits.push({ value: timeLeft.seconds, label: "Seconds" });

  // Calculate anxiety level based on progress (0-100)
  // Higher progress = closer to results = more anxiety
  const anxietyLevel = useMemo(() => {
    const progress = progressData.progress;
    if (progress < 25) return 1; // Calm
    if (progress < 50) return 2; // Slightly anxious
    if (progress < 75) return 3; // Anxious
    if (progress < 90) return 4; // Very anxious
    return 5; // Maximum panic!
  }, [progressData.progress]);

  // Get animation style based on anxiety level
  const getAnxietyAnimation = () => {
    switch (anxietyLevel) {
      case 1:
        return "animate-[gentle-float_4s_ease-in-out_infinite]";
      case 2:
        return "animate-[wobble_2s_ease-in-out_infinite]";
      case 3:
        return "animate-[shake_1s_ease-in-out_infinite]";
      case 4:
        return "animate-[shake-intense_0.5s_ease-in-out_infinite]";
      case 5:
        return "animate-[panic_0.2s_ease-in-out_infinite]";
      default:
        return "";
    }
  };

  const getGlowIntensity = () => {
    const baseOpacity = 0.2 + (anxietyLevel * 0.15);
    return `rgba(var(--primary), ${baseOpacity})`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Main Rabbit Section */}
      <div className="relative mb-8">
        {/* Glowing ring behind rabbit - intensifies with anxiety */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`w-48 h-48 md:w-64 md:h-64 rounded-full blur-xl transition-all duration-1000 ${
              anxietyLevel >= 4 ? "animate-pulse" : ""
            }`}
            style={{
              background: `radial-gradient(circle, hsl(var(--primary) / ${0.2 + anxietyLevel * 0.1}) 0%, hsl(var(--primary) / ${0.1 + anxietyLevel * 0.08}) 50%, transparent 70%)`,
              transform: `scale(${1 + anxietyLevel * 0.1})`,
            }}
          />
        </div>
        
        {/* The anxious rabbit */}
        <img 
          src={rabbitClockGif} 
          alt="Anxious rabbit watching the clock" 
          className={`relative z-10 w-40 h-40 md:w-56 md:h-56 rounded-full border-4 shadow-2xl transition-all duration-500 ${getAnxietyAnimation()}`}
          style={{
            borderColor: `hsl(var(--primary) / ${0.3 + anxietyLevel * 0.15})`,
            boxShadow: `0 0 ${20 + anxietyLevel * 10}px ${5 + anxietyLevel * 3}px hsl(var(--primary) / ${0.2 + anxietyLevel * 0.1})`,
          }}
        />
        
        {/* Anxiety level indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 text-xs font-medium">
            {anxietyLevel === 1 && "😌 Calm"}
            {anxietyLevel === 2 && "😐 Slightly nervous"}
            {anxietyLevel === 3 && "😰 Getting anxious"}
            {anxietyLevel === 4 && "😱 Very anxious!"}
            {anxietyLevel === 5 && "🤯 MAXIMUM PANIC!"}
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 
        className="text-2xl md:text-4xl font-bold text-center mb-2"
        style={{ 
          color: displaySettings.fontColor,
          fontFamily: displaySettings.fontFamily 
        }}
      >
        {isResultsDay ? "🎉 Results Day! 🎉" : "Waiting for Results..."}
      </h2>

      <p 
        className="text-lg md:text-xl opacity-70 mb-6 text-center"
        style={{ color: displaySettings.fontColor }}
      >
        {session === "oct2025" ? "October 2025" : "January 2026"} Session
      </p>

      {/* Countdown Timer */}
      {!isResultsDay ? (
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <div 
                  className="bg-card/80 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] text-center border border-primary/30 shadow-lg"
                >
                  <span 
                    className="font-bold text-primary"
                    style={{ 
                      fontSize: `${displaySettings.fontSize}px`,
                      fontFamily: displaySettings.fontFamily 
                    }}
                  >
                    {formatNumber(unit.value)}
                  </span>
                </div>
                <p 
                  className="mt-2 text-sm md:text-base font-medium opacity-70"
                  style={{ color: displaySettings.fontColor }}
                >
                  {unit.label}
                </p>
              </div>
              {index < timeUnits.length - 1 && (
                <span 
                  className="hidden md:flex items-center text-4xl font-bold opacity-50 -mt-6"
                  style={{ color: displaySettings.fontColor }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="text-center mb-8">
          <p 
            className="text-2xl md:text-4xl font-bold animate-bounce"
            style={{ 
              color: displaySettings.fontColor,
              fontFamily: displaySettings.fontFamily 
            }}
          >
            Check your results now!
          </p>
        </div>
      )}

      {/* Progress Bar */}
      {displaySettings.showProgressBar && (
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center justify-between mb-2 text-sm" style={{ color: displaySettings.fontColor }}>
            <span className="opacity-60">Exams done</span>
            <span className="font-semibold">{Math.round(progressData.progress)}%</span>
            <span className="opacity-60">Results day</span>
          </div>
          <Progress value={progressData.progress} className="h-3 bg-muted/30" />
        </div>
      )}

      {/* Results Date */}
      <p 
        className="text-sm opacity-50"
        style={{ color: displaySettings.fontColor }}
      >
        Expected: {resultsDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })} at 9:00 AM
      </p>
    </div>
  );
};
