import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./UserAvatar";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  User, 
  Clock,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PostCardProps {
  post: {
    id: string;
    user_id: string;
    title: string;
    content: string;
    question_number: number | null;
    discussion_type?: string | null;
    discussion_id?: string | null;
    images: string[];
    upvotes: number;
    downvotes: number;
    created_at: string;
    profile?: {
      username: string;
      display_name: string | null;
      avatar_url: string | null;
      avatar_type: string;
      avatar_emoji: string | null;
      avatar_kawaii: string | null;
    };
    tags?: { id: string; name: string; color: string }[];
    comment_count?: number;
  };
  userVote?: 'up' | 'down' | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
  showActions?: boolean;
}

// Helper to get paper info display
const getPaperInfoDisplay = (discussionId: string | null | undefined, discussionType: string | null | undefined) => {
  if (discussionType !== 'paper' || !discussionId) return null;
  
  // Parse discussionId like "2024-june" or "2023-jan"
  const match = discussionId.match(/^(\d{4})-(\w+)$/);
  if (match) {
    const year = match[1];
    const session = match[2].charAt(0).toUpperCase() + match[2].slice(1);
    return `${year} ${session}`;
  }
  return discussionId;
};

export const PostCard = ({ 
  post, 
  userVote: initialVote, 
  onEdit, 
  onDelete,
  onClick,
  showActions = true 
}: PostCardProps) => {
  const { user } = useDiscussionAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(initialVote || null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleVote = async (voteType: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: "Please sign in to vote", variant: "destructive" });
      return;
    }

    try {
      if (userVote === voteType) {
        // Remove vote
        await supabase.from('votes').delete().match({ user_id: user.id, post_id: post.id });
        setUserVote(null);
        if (voteType === 'up') setUpvotes(prev => prev - 1);
        else setDownvotes(prev => prev - 1);
      } else if (userVote) {
        // Change vote
        await supabase.from('votes').update({ vote_type: voteType }).match({ user_id: user.id, post_id: post.id });
        setUserVote(voteType);
        if (voteType === 'up') {
          setUpvotes(prev => prev + 1);
          setDownvotes(prev => prev - 1);
        } else {
          setUpvotes(prev => prev - 1);
          setDownvotes(prev => prev + 1);
        }
      } else {
        // New vote
        await supabase.from('votes').insert({ user_id: user.id, post_id: post.id, vote_type: voteType });
        setUserVote(voteType);
        if (voteType === 'up') setUpvotes(prev => prev + 1);
        else setDownvotes(prev => prev + 1);
      }
    } catch (error: any) {
      toast({ title: "Vote failed", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      await supabase.from('posts').delete().eq('id', post.id);
      toast({ title: "Post deleted" });
      onDelete?.();
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
    setShowDeleteDialog(false);
  };

  const isOwner = user?.id === post.user_id;

  return (
    <>
      <Card 
        className="hover:border-primary/30 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Vote buttons */}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={userVote === 'up' ? 'text-green-500' : ''}
                onClick={(e) => handleVote('up', e)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{upvotes - downvotes}</span>
              <Button
                variant="ghost"
                size="icon"
                className={userVote === 'down' ? 'text-red-500' : ''}
                onClick={(e) => handleVote('down', e)}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Paper info badge */}
                    {getPaperInfoDisplay(post.discussion_id, post.discussion_type) && (
                      <Badge variant="default" className="text-xs">
                        📝 {getPaperInfoDisplay(post.discussion_id, post.discussion_type)}
                      </Badge>
                    )}
                    {post.discussion_type === 'university' && (
                      <Badge variant="secondary" className="text-xs">
                        🎓 University
                      </Badge>
                    )}
                    {post.discussion_type === 'custom' && (
                      <Badge variant="outline" className="text-xs">
                        👥 Community
                      </Badge>
                    )}
                    {post.question_number && (
                      <Badge variant="secondary" className="text-xs">
                        Q{post.question_number}
                      </Badge>
                    )}
                    {post.tags?.map(tag => (
                      <Badge key={tag.id} variant="outline" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold text-lg mt-1">{post.title}</h3>
                </div>

                {/* Actions dropdown */}
                {showActions && isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit?.(); }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); setShowDeleteDialog(true); }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {post.content}
              </p>

              {/* Images preview */}
              {post.images && post.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.images.slice(0, 3).map((url, i) => (
                    <img 
                      key={i} 
                      src={url} 
                      alt="" 
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                  {post.images.length > 3 && (
                    <div className="w-16 h-16 rounded border bg-muted flex items-center justify-center text-sm">
                      +{post.images.length - 3}
                    </div>
                  )}
                </div>
              )}

              {/* Meta info */}
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserAvatar
                    username={post.profile?.username}
                    displayName={post.profile?.display_name}
                    avatarUrl={post.profile?.avatar_url}
                    avatarType={post.profile?.avatar_type as any}
                    avatarEmoji={post.profile?.avatar_emoji}
                    avatarKawaii={post.profile?.avatar_kawaii}
                    size="xs"
                  />
                  <span 
                    className="hover:text-primary cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/p/${post.profile?.username}`);
                    }}
                  >
                    @{post.profile?.username}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {post.comment_count || 0} comments
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post and all its comments will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
