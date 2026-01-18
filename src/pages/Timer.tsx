import React, { useState } from "react";
import { Settings, Maximize2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullscreenCountdown } from "@/components/Fullscreencountdowntimer";
import { CountdownTimer } from "@/components/CountDownTimer";
import { SandTimer } from "@/components/SandTimer";
import { TimerSettings } from "@/components/TimerSettings";
import { useTimerSettings } from "@/hooks/useTimerSettings";
import { Link } from "react-router-dom";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

const Planner: React.FC = () => {
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const timerSettings = useTimerSettings();

  const handleFullscreen = () => {
    timerSettings.updateSettings({ isFullscreen: true });
  };

  const handleExitFullscreen = () => {
    timerSettings.updateSettings({ isFullscreen: false });
  };

  if (timerSettings.settings.isFullscreen) {
    return (
      <FullscreenCountdown
        settings={timerSettings.settings}
        onExitFullscreen={handleExitFullscreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4 max-w-full w-full">
        {/* Header */} <StarsBackground className="pointer-events-none" />
        <ShootingStars className="pointer-events-none" />
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <Link to="/timer/results">
              <Button variant="outline" size="sm" className="flex items-center">
                Results Countdown
                <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground text-center">
            IAL Bio U4 Exam Countdown
          </h1>
        </div>
        {/* Timer Controls */}
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              title="Fullscreen"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button size="icon" onClick={() => setShowTimerSettings(true)}>
              <Settings className="h-10 w-10" />
            </Button>
          </div>

          {timerSettings.settings.timerStyle === "digital" ? (
            <CountdownTimer settings={timerSettings.settings} />
          ) : (
            <SandTimer settings={timerSettings.settings} />
          )}

          <TimerSettings
            open={showTimerSettings}
            onOpenChange={setShowTimerSettings}
            settings={timerSettings.settings}
            updateSettings={timerSettings.updateSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default Planner;
