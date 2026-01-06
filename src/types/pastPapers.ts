export interface PastPaper {
  id: string;
  year: number;
  season: "june" | "jan" | "october";
  pdf_url?: string;
  created_at: string;
}

export interface PastPaperObjective {
  id: string;
  past_paper_id: string;
  text: string;
  objective_number: number;
  completed: boolean;
  hidden: boolean;
  created_at: string;
}

export interface MarksLog {
  id: string;
  user_id: string;
  past_paper_id: string;
  marks: number;
  created_at: string;
}

export interface DifficultyVote {
  id: string;
  user_id: string;
  past_paper_id: string;
  difficulty: "easy" | "medium" | "hard";
  created_at: string;
}

export interface AbundanceVote {
  id: string;
  user_id: string;
  objective_id: string;
  abundance: "rare" | "common" | "always";
  created_at: string;
}

export interface ThreadUserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}
