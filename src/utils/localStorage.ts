import { ChecklistState } from "@/types/checklist";
import { initialBiologyData } from "@/data/biologyData";

const STORAGE_KEY = "biology-checklist-state";

export const loadChecklistState = (): ChecklistState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading checklist state:", error);
  }
  
  return {
    topics: initialBiologyData,
    settings: {
      strikeThrough: true,
      expandAll: false,
      collapseAll: false,
      emojiMode: false,
    },
  };
};

export const saveChecklistState = (state: ChecklistState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving checklist state:", error);
  }
};
