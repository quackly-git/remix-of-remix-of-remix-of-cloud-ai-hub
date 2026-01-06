import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserMinus, Clock, Check, X } from "lucide-react";

type FollowStatus = 'none' | 'pending' | 'accepted' | 'rejected';

interface FollowButtonProps {
  targetUserId: string;
  targetUsername: string;
  isPrivate?: boolean;
  size?: 'sm' | 'default';
  onFollowChange?: () => void;
}

export const FollowButton = ({ 
  targetUserId, 
  targetUsername, 
  isPrivate = false,
  size = 'default',
  onFollowChange 
}: FollowButtonProps) => {
  const { user, isAuthenticated } = useDiscussionAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<FollowStatus>('none');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && targetUserId !== user.id) {
      fetchFollowStatus();
    }
  }, [user, targetUserId]);

  const fetchFollowStatus = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('follows')
      .select('status')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .maybeSingle();

    if (!error && data) {
      setStatus(data.status as FollowStatus);
    }
  };

  const handleFollow = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .insert({
          follower_id: user.id,
          following_id: targetUserId,
          status: isPrivate ? 'pending' : 'accepted',
        });

      if (error) throw error;

      setStatus(isPrivate ? 'pending' : 'accepted');
      toast({ 
        title: isPrivate 
          ? `Follow request sent to @${targetUsername}` 
          : `You are now following @${targetUsername}` 
      });
      onFollowChange?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId);

      if (error) throw error;

      setStatus('none');
      toast({ title: `Unfollowed @${targetUsername}` });
      onFollowChange?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.id === targetUserId) {
    return null;
  }

  if (status === 'pending') {
    return (
      <Button variant="outline" size={size} disabled className="gap-2">
        <Clock className="h-4 w-4" />
        Requested
      </Button>
    );
  }

  if (status === 'accepted') {
    return (
      <Button 
        variant="outline" 
        size={size} 
        onClick={handleUnfollow} 
        disabled={loading}
        className="gap-2"
      >
        <UserMinus className="h-4 w-4" />
        Unfollow
      </Button>
    );
  }

  return (
    <Button 
      size={size} 
      onClick={handleFollow} 
      disabled={loading}
      className="gap-2"
    >
      <UserPlus className="h-4 w-4" />
      Follow
    </Button>
  );
};

interface FollowRequestActionsProps {
  requestId: string;
  followerUsername: string;
  onAction?: () => void;
}

export const FollowRequestActions = ({ requestId, followerUsername, onAction }: FollowRequestActionsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;
      toast({ title: `Accepted follow request from @${followerUsername}` });
      onAction?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('id', requestId);

      if (error) throw error;
      toast({ title: `Rejected follow request from @${followerUsername}` });
      onAction?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={handleAccept} disabled={loading}>
        <Check className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleReject} disabled={loading}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
