import { Leaderboard } from "@/components/discussions/Leaderboard";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import QuizWidget from "@/components/discussions/QuizWidget";

const DiscussionsLeaderboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <KawaiiMascot character="planet" mood="excited" size={60} />
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See who's earning the most XP!
          </p>
        </div>
      </div>

      <Leaderboard />

      {/* Boost XP Widget */}
      <div className="max-w-sm mx-auto">
        <QuizWidget />
      </div>
    </div>
  );
};

export default DiscussionsLeaderboard;
