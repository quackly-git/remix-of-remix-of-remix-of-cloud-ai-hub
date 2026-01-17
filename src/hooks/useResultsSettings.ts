import { useState, useEffect } from "react";
import { ResultsTimerDisplaySettings } from "@/components/ResultsSettingsModal";

export type Session = "oct2025" | "jan2026";
export type Subject = "Chemistry" | "Biology" | "Human Bio";
export type MarkMode = "raw" | "ums";

export interface UnitPrediction {
  unit: number;
  marks: number;
  letterGrade?: string;
}

export interface SubjectPrediction {
  subject: Subject;
  mode: MarkMode;
  units: UnitPrediction[];
}

export interface ResultsSettings {
  session: Session | null;
  resultsDate: Date;
  hasSelectedSession: boolean;
  predictions: SubjectPrediction[];
  displaySettings: ResultsTimerDisplaySettings;
}

const getResultsDate = (session: Session): Date => {
  if (session === "oct2025") {
    return new Date(2026, 0, 22, 9, 0, 0); // 22 Jan 2026, 9 AM
  }
  return new Date(2026, 2, 5, 9, 0, 0); // 5 March 2026, 9 AM
};

const defaultDisplaySettings: ResultsTimerDisplaySettings = {
  backgroundColor: "#14b8a6",
  fontColor: "#ffffff",
  fontFamily: "Sora, sans-serif",
  fontSize: 48,
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  showProgressBar: true,
  isFullscreen: false,
};

const defaultSettings: ResultsSettings = {
  session: null,
  resultsDate: new Date(2026, 0, 22, 9, 0, 0),
  hasSelectedSession: false,
  predictions: [],
  displaySettings: defaultDisplaySettings,
};

export const useResultsSettings = () => {
  const [settings, setSettings] = useState<ResultsSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("resultsSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.resultsDate) {
          parsed.resultsDate = new Date(parsed.resultsDate);
        }
        // Merge with defaults to ensure new fields exist
        setSettings({ 
          ...defaultSettings, 
          ...parsed,
          displaySettings: {
            ...defaultDisplaySettings,
            ...parsed.displaySettings,
          }
        });
      } catch (error) {
        console.error("Failed to parse results settings:", error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<ResultsSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      const toSave = {
        ...updated,
        resultsDate: updated.resultsDate.toISOString(),
      };
      localStorage.setItem("resultsSettings", JSON.stringify(toSave));
      return updated;
    });
  };

  const updateDisplaySettings = (newDisplaySettings: Partial<ResultsTimerDisplaySettings>) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        displaySettings: { ...prev.displaySettings, ...newDisplaySettings },
      };
      const toSave = {
        ...updated,
        resultsDate: updated.resultsDate.toISOString(),
      };
      localStorage.setItem("resultsSettings", JSON.stringify(toSave));
      return updated;
    });
  };

  const setSession = (session: Session) => {
    const resultsDate = getResultsDate(session);
    updateSettings({
      session,
      resultsDate,
      hasSelectedSession: true,
    });
  };

  const updatePredictions = (predictions: SubjectPrediction[]) => {
    updateSettings({ predictions });
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("resultsSettings");
  };

  return {
    settings,
    updateSettings,
    updateDisplaySettings,
    setSession,
    updatePredictions,
    resetToDefaults,
  };
};

// Helper functions for max marks
export const getMaxMarks = (unit: number, mode: MarkMode, subject: Subject): number => {
  if (subject === "Human Bio") {
    return 180;
  }
  if (mode === "raw") {
    return [3, 6].includes(unit) ? 50 : 90;
  }
  return [3, 6].includes(unit) ? 60 : 120;
};

export const getLetterGrades = (unit: number, subject: Subject): string[] => {
  if (subject === "Human Bio") {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  if ([4, 5, 6].includes(unit)) {
    return ["A*", "A", "B", "C", "D", "E", "U"];
  }
  return ["A", "B", "C", "D", "E", "U"];
};
