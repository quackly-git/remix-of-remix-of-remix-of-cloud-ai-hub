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
    <div className="min-h-screen bg-background flex flex-col items-center justify-start py-6 px-4 relative overflow-hidden">
      <StarsBackground className="pointer-events-none" />
      <ShootingStars className="pointer-events-none" />

      {/* Navigation Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-4 z-10">
        <Link to="/timer">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {settings.hasSelectedSession && (
          <div className="flex items-center gap-2">
            <Dialog open={showChangeSession} onOpenChange={setShowChangeSession}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Change Session</span>
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

            <Button variant="ghost" size="icon" onClick={handleFullscreen} title="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} title="Settings">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" onClick={resetToDefaults} title="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Session Selection Modal (First Visit) */}
      <SessionSelectionModal
        open={!settings.hasSelectedSession}
        onSelectSession={handleSelectSession}
      />

      {/* Main Content */}
      {settings.hasSelectedSession && settings.session && (
        <div className="w-full max-w-3xl flex flex-col items-center z-10">
          {/* Main Timer Section */}
          <div className="w-full py-8 md:py-12">
            <ResultsCountdownTimer
              resultsDate={settings.resultsDate}
              session={settings.session}
              displaySettings={settings.displaySettings}
            />
          </div>

          {/* Expected Grades Section */}
          <div className="w-full mt-4">
            <ExpectedGradesSection
              session={settings.session}
              predictions={settings.predictions}
              onSave={updatePredictions}
            />
          </div>

          <ResultsSettingsModal
            open={showSettings}
            onOpenChange={setShowSettings}
            settings={settings.displaySettings}
            updateSettings={updateDisplaySettings}
          />
        </div>
      )}
    </div>
  );
};

export default ResultsTimer;
