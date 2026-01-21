import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { FileText, Award, Clock } from "lucide-react";
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

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[50vh] rounded-2xl p-8 transition-all duration-300"
      style={{
        backgroundColor: displaySettings.backgroundColor,
        color: displaySettings.fontColor,
        fontFamily: displaySettings.fontFamily,
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-8 w-8" />
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Results Day Countdown
        </h2>
        <Award className="h-8 w-8" />
      </div>

      <p className="opacity-80 mb-6 text-center">
        {session === "oct2025" ? "October 2025" : "January 2026"} Session
      </p>

      {/* Progress Bar */}
      {displaySettings.showProgressBar && (
        <div className="w-full max-w-lg mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Waiting for results...</span>
          </div>
          <Progress value={progressData.progress} className="h-3 bg-white/20" />
          <p className="text-center text-sm mt-2 opacity-70">
            {Math.round(progressData.progress)}% of wait time passed
          </p>
        </div>
      )}

      {!isResultsDay ? (
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div 
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[100px] text-center border border-white/30"
              >
                <span 
                  className="font-bold"
                  style={{ fontSize: `${displaySettings.fontSize}px` }}
                >
                  {formatNumber(unit.value)}
                </span>
              </div>
              <p className="mt-2 text-sm md:text-base opacity-80 font-medium">
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center animate-pulse">
          <p 
            className="font-bold mb-2"
            style={{ fontSize: `${displaySettings.fontSize}px` }}
          >
            🎉 Results Day! 🎉
          </p>
          <p className="text-lg opacity-80">
            Check your results now!
          </p>
        </div>
      )}

      <p className="mt-8 opacity-60 text-sm">
        Results expected: {resultsDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
};
