import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { LogOut, User, Trophy, Settings, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const GlobalProfileButton = () => {
  const { isAuthenticated, profile, logout } = useDiscussionAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: "Logged out successfully" });
    } catch (error) {
      toast({ title: "Error logging out", variant: "destructive" });
    }
  };

  // Only show if user is authenticated
  if (!isAuthenticated || !profile) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 px-2">
          <UserAvatar
            username={profile.username}
            displayName={profile.display_name}
            avatarUrl={profile.avatar_url}
            avatarType={profile.avatar_type}
            avatarEmoji={profile.avatar_emoji}
            avatarKawaii={profile.avatar_kawaii}
            size="sm"
          />
          <span className="hidden sm:inline font-medium text-xs">
            {profile.display_name || profile.username}
          </span>
          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            {profile.xp} XP
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate('/discussions')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Discussions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/p/${profile.username}`)}>
          <User className="mr-2 h-4 w-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/discussions/leaderboard')}>
          <Trophy className="mr-2 h-4 w-4" />
          Leaderboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/discussions/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
