import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { UserAvatar } from "./UserAvatar";
import { FollowButton, FollowRequestActions } from "./FollowButton";
import { KawaiiMascot } from "./KawaiiMascot";

interface FollowUser {
  user_id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  avatar_type: 'initials' | 'image' | 'kawaii' | 'emoji';
  avatar_emoji: string | null;
  avatar_kawaii: string | null;
  is_public: boolean;
}

interface FollowRecord {
  id: string;
  follower_id: string;
  following_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  follower?: FollowUser;
  following?: FollowUser;
}

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  initialTab?: 'followers' | 'following' | 'requests';
  isOwnProfile?: boolean;
}

export const FollowListModal = ({ 
  isOpen, 
  onClose, 
  userId, 
  username,
  initialTab = 'followers',
  isOwnProfile = false
}: FollowListModalProps) => {
  const [followers, setFollowers] = useState<FollowRecord[]>([]);
  const [following, setFollowing] = useState<FollowRecord[]>([]);
  const [requests, setRequests] = useState<FollowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchFollowData();
    }
  }, [isOpen, userId]);

  const fetchFollowData = async () => {
    setLoading(true);

    // Fetch followers
    const { data: followersData } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        status
      `)
      .eq('following_id', userId)
      .eq('status', 'accepted');

    // Fetch following
    const { data: followingData } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        status
      `)
      .eq('follower_id', userId)
      .eq('status', 'accepted');

    // Fetch pending requests (only for own profile)
    const { data: requestsData } = await supabase
      .from('follows')
      .select(`
        id,
        follower_id,
        following_id,
        status
      `)
      .eq('following_id', userId)
      .eq('status', 'pending');

    // Get profiles for all users
    const allUserIds = new Set<string>();
    followersData?.forEach(f => allUserIds.add(f.follower_id));
    followingData?.forEach(f => allUserIds.add(f.following_id));
    requestsData?.forEach(f => allUserIds.add(f.follower_id));

    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii, is_public')
      .in('user_id', Array.from(allUserIds));

    const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

    // Map profiles to follow records
    setFollowers(followersData?.map(f => ({
      ...f,
      follower: profileMap.get(f.follower_id) as FollowUser
    })) || []);

    setFollowing(followingData?.map(f => ({
      ...f,
      following: profileMap.get(f.following_id) as FollowUser
    })) || []);

    setRequests(requestsData?.map(f => ({
      ...f,
      follower: profileMap.get(f.follower_id) as FollowUser
    })) || []);

    setLoading(false);
  };

  const handleUserClick = (username: string) => {
    navigate(`/p/${username}`);
    onClose();
  };

  const renderUserItem = (user: FollowUser | undefined, followId: string, showRequest = false, showFollowButton = true) => {
    if (!user) return null;

    return (
      <div 
        key={followId}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent"
      >
        <div 
          className="flex items-center gap-3 flex-1 cursor-pointer"
          onClick={() => handleUserClick(user.username)}
        >
          <UserAvatar
            username={user.username}
            displayName={user.display_name}
            avatarUrl={user.avatar_url}
            avatarType={user.avatar_type}
            avatarEmoji={user.avatar_emoji}
            avatarKawaii={user.avatar_kawaii}
            size="md"
          />
          <div>
            <p className="font-medium">{user.display_name || user.username}</p>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        
        {showRequest ? (
          <FollowRequestActions 
            requestId={followId} 
            followerUsername={user.username}
            onAction={fetchFollowData}
          />
        ) : showFollowButton ? (
          <FollowButton 
            targetUserId={user.username} 
            targetUsername={user.username}
            isPrivate={!user.is_public}
            size="sm"
            onFollowChange={fetchFollowData}
          />
        ) : null}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>@{username}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={initialTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="followers">
              Followers ({followers.length})
            </TabsTrigger>
            <TabsTrigger value="following">
              Following ({following.length})
            </TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="requests">
                Requests ({requests.length})
              </TabsTrigger>
            )}
          </TabsList>

          {loading ? (
            <div className="flex flex-col items-center py-8">
              <KawaiiMascot character="ghost" mood="shocked" size={60} />
              <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <>
              <TabsContent value="followers">
                <ScrollArea className="h-[300px]">
                  {followers.length === 0 ? (
                    <div className="flex flex-col items-center py-8">
                      <KawaiiMascot character="cat" mood="sad" size={60} />
                      <p className="mt-2 text-sm text-muted-foreground">No followers yet</p>
                    </div>
                  ) : (
                    followers.map(f => renderUserItem(f.follower, f.id))
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="following">
                <ScrollArea className="h-[300px]">
                  {following.length === 0 ? (
                    <div className="flex flex-col items-center py-8">
                      <KawaiiMascot character="cat" mood="sad" size={60} />
                      <p className="mt-2 text-sm text-muted-foreground">Not following anyone yet</p>
                    </div>
                  ) : (
                    following.map(f => renderUserItem(f.following, f.id))
                  )}
                </ScrollArea>
              </TabsContent>

              {isOwnProfile && (
                <TabsContent value="requests">
                  <ScrollArea className="h-[300px]">
                    {requests.length === 0 ? (
                      <div className="flex flex-col items-center py-8">
                        <KawaiiMascot character="ghost" mood="happy" size={60} />
                        <p className="mt-2 text-sm text-muted-foreground">No pending requests</p>
                      </div>
                    ) : (
                      requests.map(f => renderUserItem(f.follower, f.id, true, false))
                    )}
                  </ScrollArea>
                </TabsContent>
              )}
            </>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
