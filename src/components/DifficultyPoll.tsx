import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Smile, Meh, Frown } from "lucide-react";

interface DifficultyPollProps {
  pastPaperId: string;
}

export const DifficultyPoll = ({ pastPaperId }: DifficultyPollProps) => {
  const [votes, setVotes] = useState({ easy: 0, medium: 0, hard: 0 });
  const [userVote, setUserVote] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVotes();
    loadUserVote();
  }, [pastPaperId]);

  const loadUserVote = () => {
    const storageKey = `difficulty_vote_${pastPaperId}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setUserVote(saved);
    }
  };

  const fetchVotes = async () => {
    const { data } = await (supabase as any)
      .from("paper_difficulty_votes")
      .select("*")
      .eq("past_paper_id", pastPaperId);

    if (data) {
      const counts = { easy: 0, medium: 0, hard: 0 };
      data.forEach((vote) => {
        counts[vote.difficulty as keyof typeof counts]++;
      });
      setVotes(counts);
    }
  };

  const handleVote = (difficulty: "easy" | "medium" | "hard") => {
    const storageKey = `difficulty_vote_${pastPaperId}`;
    localStorage.setItem(storageKey, difficulty);
    setUserVote(difficulty);
    toast({ title: "Vote recorded!" });
  };

  const total = votes.easy + votes.medium + votes.hard;
  const getPercentage = (count: number) => (total > 0 ? Math.round((count / total) * 100) : 0);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4 text-center">How difficult is this paper?</h3>
        <div className="space-y-2">
          <Button
            variant={userVote === "easy" ? "default" : "outline"}
            className="w-full justify-between"
            onClick={() => handleVote("easy")}
          >
            <span className="flex items-center gap-2">
              <Smile className="h-4 w-4" /> Easy
            </span>
            <span>{getPercentage(votes.easy)}% ({votes.easy})</span>
          </Button>
          <Button
            variant={userVote === "medium" ? "default" : "outline"}
            className="w-full justify-between"
            onClick={() => handleVote("medium")}
          >
            <span className="flex items-center gap-2">
              <Meh className="h-4 w-4" /> Medium
            </span>
            <span>{getPercentage(votes.medium)}% ({votes.medium})</span>
          </Button>
          <Button
            variant={userVote === "hard" ? "default" : "outline"}
            className="w-full justify-between"
            onClick={() => handleVote("hard")}
          >
            <span className="flex items-center gap-2">
              <Frown className="h-4 w-4" /> Hard
            </span>
            <span>{getPercentage(votes.hard)}% ({votes.hard})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
