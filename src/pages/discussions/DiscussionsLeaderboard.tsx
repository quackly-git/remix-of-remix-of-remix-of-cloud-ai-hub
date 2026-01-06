import { Leaderboard } from "@/components/discussions/Leaderboard";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";

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
    </div>
  );
};

export default DiscussionsLeaderboard;
