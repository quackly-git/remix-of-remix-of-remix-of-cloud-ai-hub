import React, { useState } from "react";
import { ArrowLeft, Settings, RotateCcw, Calendar, Maximize2 } from "lucide-react";
import rabbitClockGif from "@/assets/rabbit-clock.gif";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ResultsCountdownTimer } from "@/components/ResultsCountdownTimer";
import { FullscreenResultsCountdown } from "@/components/FullscreenResultsCountdown";
import { SessionSelectionModal } from "@/components/SessionSelectionModal";
import { ExpectedGradesSection } from "@/components/ExpectedGradesSection";
import { ResultsSettingsModal } from "@/components/ResultsSettingsModal";
import { useResultsSettings, Session } from "@/hooks/useResultsSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ResultsTimer: React.FC = () => {
  const { settings, setSession, updatePredictions, resetToDefaults, updateDisplaySettings } = useResultsSettings();
  const [showChangeSession, setShowChangeSession] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSelectSession = (session: Session) => {
    setSession(session);
  };

  const handleChangeSession = (session: Session) => {
    setSession(session);
    setShowChangeSession(false);
  };

  const handleFullscreen = () => {
    updateDisplaySettings({ isFullscreen: true });
  };

  const handleExitFullscreen = () => {
    updateDisplaySettings({ isFullscreen: false });
  };

  // Fullscreen mode
  if (settings.displaySettings.isFullscreen && settings.hasSelectedSession) {
    return (
      <FullscreenResultsCountdown
        resultsDate={settings.resultsDate}
        session={settings.session}
        displaySettings={settings.displaySettings}
        onExitFullscreen={handleExitFullscreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start py-8 px-4">
      <StarsBackground className="pointer-events-none" />
      <ShootingStars className="pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-2xl">
        <div className="flex items-center justify-between w-full">
          <Link to="/timer">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Exam Timer
            </Button>
          </Link>

          {settings.hasSelectedSession && (
            <div className="flex gap-2">
              <Dialog open={showChangeSession} onOpenChange={setShowChangeSession}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Change Session
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Session</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Button
                      variant={settings.session === "oct2025" ? "default" : "outline"}
                      className="h-auto py-4"
                      onClick={() => handleChangeSession("oct2025")}
                    >
                      October 2025 → Results 22 Jan 2026
                    </Button>
                    <Button
                      variant={settings.session === "jan2026" ? "default" : "outline"}
                      className="h-auto py-4"
                      onClick={() => handleChangeSession("jan2026")}
                    >
                      January 2026 → Results 5 Mar 2026
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" onClick={resetToDefaults}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <img 
            src={rabbitClockGif} 
            alt="Anxious rabbit with clock" 
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-3xl font-bold text-foreground text-center">
            Results Day Countdown
          </h1>
          <img 
            src={rabbitClockGif} 
            alt="Anxious rabbit with clock" 
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>

      {/* Session Selection Modal (First Visit) */}
      <SessionSelectionModal
        open={!settings.hasSelectedSession}
        onSelectSession={handleSelectSession}
      />

      {/* Main Content */}
      {settings.hasSelectedSession && settings.session && (
        <div className="w-full max-w-2xl space-y-8">
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
              <Button size="icon" onClick={() => setShowSettings(true)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {/* Countdown Timer */}
            <ResultsCountdownTimer
              resultsDate={settings.resultsDate}
              session={settings.session}
              displaySettings={settings.displaySettings}
            />

            <ResultsSettingsModal
              open={showSettings}
              onOpenChange={setShowSettings}
              settings={settings.displaySettings}
              updateSettings={updateDisplaySettings}
            />
          </div>

          {/* Expected Grades Section */}
          <ExpectedGradesSection
            session={settings.session}
            predictions={settings.predictions}
            onSave={updatePredictions}
          />
        </div>
      )}
    </div>
  );
};

export default ResultsTimer;
