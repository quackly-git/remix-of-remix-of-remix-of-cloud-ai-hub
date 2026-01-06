import { Question } from "@/data/biologyQuestions.data";

/* =========================================================
   GRADING TYPES
========================================================= */

export type GradeResult = "correct" | "partial" | "incorrect";

export const XP_MULTIPLIER: Record<GradeResult, number> = {
  correct: 1,
  partial: 0.5,
  incorrect: 0,
};

/* =========================================================
   SYNONYMS
========================================================= */

const SYNONYMS: Record<string, string[]> = {
  energy: ["biomass", "chemical energy"],
  producer: ["plant", "autotroph"],
  respiration: ["respired", "respiratory losses"],
  trophic: ["consumer", "food level"],
  absorb: ["absorption"],
  excite: ["excited", "excitation"],
  wavelengths: ["range"],
  photolysis: ["water"],
  species: ["organism"],
  habitat: ["environment", "area"],
};

/* =========================================================
   NORMALIZATION
========================================================= */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   LEVENSHTEIN (TYPO TOLERANCE)
========================================================= */

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, () =>
    Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[0][i] = i;
  for (let j = 0; j <= b.length; j++) dp[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      dp[j][i] =
        b[j - 1] === a[i - 1]
          ? dp[j - 1][i - 1]
          : Math.min(dp[j - 1][i] + 1, dp[j][i - 1] + 1, dp[j - 1][i - 1] + 1);
    }
  }

  return dp[b.length][a.length];
}

/* =========================================================
   KEYWORD MATCHING
========================================================= */

function containsConcept(text: string, keyword: string): boolean {
  const words = text.split(" ");
  const targets = [keyword, ...(SYNONYMS[keyword] ?? [])];

  return targets.some((target) =>
    words.some((word) => {
      const limit = target.length > 6 ? 2 : 1; // typo tolerance
      return word === target || levenshtein(word, target) <= limit;
    })
  );
}

/* =========================================================
   MAIN GRADING FUNCTION
========================================================= */

export function gradeAnswer(
  userAnswer: string,
  question: Question
): {
  grade: GradeResult;
  scoreRatio: number;
  earnedXP: number;
  matchedPoints: number;
  totalPoints: number;
} {
  const text = normalize(userAnswer);

  let matchedPoints = 0;

  question.markingPoints.forEach((group) => {
    if (group.some((keyword) => containsConcept(text, keyword))) {
      matchedPoints++;
    }
  });

  const totalPoints = question.markingPoints.length;
  const scoreRatio = matchedPoints / totalPoints;

  let grade: GradeResult;
  if (scoreRatio >= 0.75) grade = "correct";
  else if (scoreRatio >= 0.4) grade = "partial";
  else grade = "incorrect";

  const earnedXP = Math.round(question.baseXP * XP_MULTIPLIER[grade]);

  return {
    grade,
    scoreRatio,
    earnedXP,
    matchedPoints,
    totalPoints,
  };
}
