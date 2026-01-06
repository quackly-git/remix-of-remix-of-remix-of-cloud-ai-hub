import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useThreadAuth } from "@/contexts/ThreadAuthContext";
import { useToast } from "@/hooks/use-toast";
import { TrendingDown, TrendingUp, Zap } from "lucide-react";

interface AbundancePollProps {
  objectiveId: string;
}

export const AbundancePoll = ({ objectiveId }: AbundancePollProps) => {
  const [votes, setVotes] = useState({ rare: 0, common: 0, always: 0 });
  const [userVote, setUserVote] = useState<string | null>(null);
  const { user } = useThreadAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchVotes();
  }, [objectiveId]);

  const fetchVotes = async () => {
    const { data } = await (supabase as any)
      .from("objective_abundance_votes")
      .select("*")
      .eq("objective_id", objectiveId);

    if (data) {
      const counts = { rare: 0, common: 0, always: 0 };
      data.forEach((vote) => {
        counts[vote.abundance as keyof typeof counts]++;
        if (user && vote.user_id === user.id) {
          setUserVote(vote.abundance);
        }
      });
      setVotes(counts);
    }
  };

  const handleVote = async (abundance: "rare" | "common" | "always") => {
    if (!user) {
      toast({ title: "Please login to vote", variant: "destructive" });
      return;
    }

    const { error } = await (supabase as any)
      .from("objective_abundance_votes")
      .upsert({
        user_id: user.id,
        objective_id: objectiveId,
        abundance,
      });

    if (error) {
      toast({ title: "Error voting", variant: "destructive" });
    } else {
      setUserVote(abundance);
      fetchVotes();
      toast({ title: "Vote recorded!" });
    }
  };

  const total = votes.rare + votes.common + votes.always;
  const getPercentage = (count: number) => (total > 0 ? Math.round((count / total) * 100) : 0);

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h3 className="font-semibold mb-4 text-center text-sm">How common is this in exams?</h3>
        <div className="space-y-2">
          <Button
            variant={userVote === "rare" ? "default" : "outline"}
            size="sm"
            className="w-full justify-between"
            onClick={() => handleVote("rare")}
          >
            <span className="flex items-center gap-2">
              <TrendingDown className="h-3 w-3" /> Rare
            </span>
            <span className="text-xs">{getPercentage(votes.rare)}% ({votes.rare})</span>
          </Button>
          <Button
            variant={userVote === "common" ? "default" : "outline"}
            size="sm"
            className="w-full justify-between"
            onClick={() => handleVote("common")}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3" /> Common
            </span>
            <span className="text-xs">{getPercentage(votes.common)}% ({votes.common})</span>
          </Button>
          <Button
            variant={userVote === "always" ? "default" : "outline"}
            size="sm"
            className="w-full justify-between"
            onClick={() => handleVote("always")}
          >
            <span className="flex items-center gap-2">
              <Zap className="h-3 w-3" /> Always
            </span>
            <span className="text-xs">{getPercentage(votes.always)}% ({votes.always})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
