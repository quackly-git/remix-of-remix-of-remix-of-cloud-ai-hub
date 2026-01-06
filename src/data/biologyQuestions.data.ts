/* =========================================================
   TYPES
========================================================= */

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: number;
  topic: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  markingPoints: string[][]; // Each group = 1 mark
  baseXP: number;
}

/* =========================================================
   XP CONFIG
========================================================= */

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 5,
  Hard: 8,
};

/* =========================================================
   QUESTIONS
========================================================= */

export const biologyQuestions: Question[] = [
  {
    id: 1,
    topic: "Photosynthesis",
    difficulty: "Medium",
    question: "Why do thylakoid membranes contain many types of pigments?",
    answer:
      "To absorb light over a wide range of wavelengths, maximizing photosynthesis.",
    markingPoints: [
      ["absorb", "absorption"],
      ["light"],
      ["wavelengths", "range"],
      ["photosynthesis"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 2,
    topic: "Photosynthesis",
    difficulty: "Hard",
    question: "Explain the role of light energy in photosynthesis.",
    answer:
      "Light excites electrons in chlorophyll, producing ATP and NADPH and enabling photolysis of water.",
    markingPoints: [
      ["light"],
      ["excite", "excited", "excitation"],
      ["electron", "electrons"],
      ["ATP"],
      ["NADPH"],
      ["photolysis", "water"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 3,
    topic: "Ecosystems",
    difficulty: "Hard",
    question: "What is net primary productivity (NPP)?",
    answer:
      "Energy stored by producers after respiration, available to the next trophic level.",
    markingPoints: [
      ["energy", "biomass", "chemical energy"],
      ["producer", "plant", "autotroph"],
      ["respiration", "respired", "respiratory"],
      ["trophic", "consumer", "food level"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 4,
    topic: "Ecology",
    difficulty: "Medium",
    question: "Why does ecological succession occur in stages?",
    answer:
      "Each stage improves the habitat, allowing new species to colonize.",
    markingPoints: [
      ["habitat"],
      ["improve", "modify", "change"],
      ["species", "colonize", "appear"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 5,
    topic: "Climate Change",
    difficulty: "Easy",
    question: "What type of radiation is trapped by greenhouse gases?",
    answer: "Infrared radiation.",
    markingPoints: [["infrared"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
];
