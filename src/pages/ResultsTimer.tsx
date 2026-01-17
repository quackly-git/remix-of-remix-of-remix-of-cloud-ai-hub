import React, { useState } from "react";
import { ArrowLeft, Settings, RotateCcw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ResultsCountdownTimer } from "@/components/ResultsCountdownTimer";
import { SessionSelectionModal } from "@/components/SessionSelectionModal";
import { ExpectedGradesSection } from "@/components/ExpectedGradesSection";
import { useResultsSettings, Session } from "@/hooks/useResultsSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ResultsTimer: React.FC = () => {
  const { settings, setSession, updatePredictions, resetToDefaults } = useResultsSettings();
  const [showChangeSession, setShowChangeSession] = useState(false);

  const handleSelectSession = (session: Session) => {
    setSession(session);
  };

  const handleChangeSession = (session: Session) => {
    setSession(session);
    setShowChangeSession(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-teal-950 dark:to-cyan-950 flex flex-col items-center justify-start py-8 px-4">
      <StarsBackground className="pointer-events-none opacity-30" />
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

        <h1 className="text-3xl font-bold text-foreground text-center bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          📊 Results Day Countdown
        </h1>
      </div>

      {/* Session Selection Modal (First Visit) */}
      <SessionSelectionModal
        open={!settings.hasSelectedSession}
        onSelectSession={handleSelectSession}
      />

      {/* Main Content */}
      {settings.hasSelectedSession && settings.session && (
        <div className="w-full max-w-2xl space-y-8">
          {/* Countdown Timer */}
          <ResultsCountdownTimer settings={settings} />

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
