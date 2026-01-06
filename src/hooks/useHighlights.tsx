import { useState, useEffect } from "react";

export interface HighlightData {
  id: string;
  text: string;
  lessonId: string;
  lessonTitle: string;
  color: string;
  position: {
    start: number;
    end: number;
  };
  elementPath: string;
  timestamp: string;
}

export function useHighlights() {
  const [activeHighlights, setActiveHighlights] = useState<
    Map<string, HighlightData>
  >(new Map());

  const loadHighlightsForLesson = (lessonId: string) => {
    try {
      const saved = localStorage.getItem(`highlights-${lessonId}`);
      if (saved) {
        const highlights = JSON.parse(saved) as HighlightData[];
        const highlightMap = new Map(highlights.map((h) => [h.id, h]));
        setActiveHighlights(highlightMap);
      } else {
        setActiveHighlights(new Map());
      }
    } catch (error) {
      console.error("Error loading highlights:", error);
      setActiveHighlights(new Map());
    }
  };

  const addHighlight = (highlight: Omit<HighlightData, "id" | "timestamp">) => {
    const newHighlight: HighlightData = {
      ...highlight,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };

    setActiveHighlights((prev) => {
      const updated = new Map(prev);
      updated.set(newHighlight.id, newHighlight);

      // Save to localStorage
      const highlightsArray = Array.from(updated.values());
      localStorage.setItem(
        `highlights-${highlight.lessonId}`,
        JSON.stringify(highlightsArray)
      );

      return updated;
    });
  };

  const removeHighlight = (highlightId: string) => {
    setActiveHighlights((prev) => {
      const updated = new Map(prev);
      const highlight = updated.get(highlightId);
      updated.delete(highlightId);

      // Save to localStorage
      if (highlight) {
        const highlightsArray = Array.from(updated.values());
        localStorage.setItem(
          `highlights-${highlight.lessonId}`,
          JSON.stringify(highlightsArray)
        );
      }

      return updated;
    });
  };

  const clearAllHighlights = (lessonId: string) => {
    setActiveHighlights(new Map());
    localStorage.removeItem(`highlights-${lessonId}`);
  };

  return {
    activeHighlights,
    loadHighlightsForLesson,
    addHighlight,
    removeHighlight,
    clearAllHighlights,
  };
}
