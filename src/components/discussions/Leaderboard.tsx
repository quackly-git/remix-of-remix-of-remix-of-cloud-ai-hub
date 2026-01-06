import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { UserAvatar } from "./UserAvatar";
import { KawaiiMascot } from "./KawaiiMascot";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";

interface LeaderboardUser {
  id: string;
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  avatar_type: 'initials' | 'image' | 'kawaii' | 'emoji';
  avatar_emoji: string | null;
  avatar_kawaii: string | null;
  xp: number;
  papers_solved: number;
}

export const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_public', true)
      .order('xp', { ascending: false })
      .limit(50);

    if (!error && data) {
      setUsers(data as LeaderboardUser[]);
    }
    setLoading(false);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 text-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getKawaiiForRank = (rank: number) => {
    const characters = ['cat', 'ghost', 'iceCream'] as const;
    return characters[rank - 1] || null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <KawaiiMascot character="planet" mood="excited" size={50} />
        <div>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            XP Leaderboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">Top contributors this month</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer hover:bg-accent
                ${index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : ''}
                ${index === 1 ? 'bg-gray-500/10 border border-gray-500/20' : ''}
                ${index === 2 ? 'bg-amber-500/10 border border-amber-500/20' : ''}`}
              onClick={() => navigate(`/p/${user.username}`)}
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(index + 1)}
              </div>
              
              <UserAvatar
                username={user.username}
                displayName={user.display_name}
                avatarUrl={user.avatar_url}
                avatarType={user.avatar_type}
                avatarEmoji={user.avatar_emoji}
                avatarKawaii={user.avatar_kawaii}
                size="md"
              />
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {user.display_name || user.username}
                </p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>

              {index < 3 && (
                <div className="hidden sm:block">
                  <KawaiiMascot 
                    character={getKawaiiForRank(index + 1)!} 
                    mood="blissful" 
                    size={30} 
                  />
                </div>
              )}

              <div className="text-right">
                <p className="font-bold text-primary">{user.xp.toLocaleString()} XP</p>
                <p className="text-xs text-muted-foreground">{user.papers_solved} papers</p>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="flex flex-col items-center py-8">
              <KawaiiMascot character="ghost" mood="sad" size={80} />
              <p className="mt-4 text-muted-foreground">No users yet. Be the first!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
