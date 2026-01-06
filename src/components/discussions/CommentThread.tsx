import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { UserAvatar } from "./UserAvatar";
import { UserBadges } from "./UserBadges";
import { ImageUpload } from "./ImageUpload";
import { GifPickerButton } from "./GifPickerButton";
import { EmojiPickerButton } from "./EmojiPicker";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Edit,
  Trash2,
  Send,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Comment {
  id: string;
  user_id: string;
  content: string;
  images: string[];
  upvotes: number;
  downvotes: number;
  created_at: string;
  parent_id: string | null;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: string;
    avatar_emoji: string | null;
    avatar_kawaii: string | null;
  };
  replies?: Comment[];
}

interface CommentThreadProps {
  postId: string;
}

export const CommentThread = ({ postId }: CommentThreadProps) => {
  const { user, refreshProfile } = useDiscussionAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});

  useEffect(() => {
    fetchComments();
    if (user) fetchUserVotes();
  }, [postId, user]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    // Fetch profiles
    const userIds = [...new Set(data.map(c => c.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii')
      .in('user_id', userIds);

    const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

    // Build nested structure
    const commentsWithProfiles = data.map(c => ({
      ...c,
      profile: profileMap.get(c.user_id),
      replies: [] as Comment[]
    }));

    const topLevel: Comment[] = [];
    const byId = new Map<string, Comment>();
    
    commentsWithProfiles.forEach(c => byId.set(c.id, c));
    commentsWithProfiles.forEach(c => {
      if (c.parent_id && byId.has(c.parent_id)) {
        byId.get(c.parent_id)!.replies!.push(c);
      } else {
        topLevel.push(c);
      }
    });

    setComments(topLevel);
    setLoading(false);
  };

  const fetchUserVotes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('votes')
      .select('comment_id, vote_type')
      .eq('user_id', user.id)
      .not('comment_id', 'is', null);
    
    if (data) {
      const votes: Record<string, 'up' | 'down'> = {};
      data.forEach(v => {
        if (v.comment_id) votes[v.comment_id] = v.vote_type as 'up' | 'down';
      });
      setUserVotes(votes);
    }
  };

  const handleSubmit = async (parentId: string | null = null) => {
    const content = parentId ? editContent : newComment;
    const images = parentId ? [] : newImages;

    if (!user || !content.trim()) {
      toast({ title: "Please write something", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await supabase.from('post_comments').insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
        images,
        parent_id: parentId
      });

      toast({ title: "Comment posted! +1 XP 🎉" });
      setNewComment("");
      setNewImages([]);
      setReplyingTo(null);
      setEditContent("");
      fetchComments();
      refreshProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      await supabase.from('post_comments').update({ content: editContent.trim() }).eq('id', commentId);
      toast({ title: "Comment updated" });
      setEditingId(null);
      setEditContent("");
      fetchComments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await supabase.from('post_comments').delete().eq('id', commentId);
      toast({ title: "Comment deleted" });
      fetchComments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleVote = async (commentId: string, voteType: 'up' | 'down') => {
    if (!user) {
      toast({ title: "Please sign in to vote", variant: "destructive" });
      return;
    }

    try {
      const currentVote = userVotes[commentId];
      
      if (currentVote === voteType) {
        await supabase.from('votes').delete().match({ user_id: user.id, comment_id: commentId });
        const newVotes = { ...userVotes };
        delete newVotes[commentId];
        setUserVotes(newVotes);
      } else if (currentVote) {
        await supabase.from('votes').update({ vote_type: voteType }).match({ user_id: user.id, comment_id: commentId });
        setUserVotes({ ...userVotes, [commentId]: voteType });
      } else {
        await supabase.from('votes').insert({ user_id: user.id, comment_id: commentId, vote_type: voteType });
        setUserVotes({ ...userVotes, [commentId]: voteType });
      }
      
      fetchComments();
    } catch (error: any) {
      toast({ title: "Vote failed", variant: "destructive" });
    }
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReplies, setShowReplies] = useState(true);
    const isOwner = user?.id === comment.user_id;
    const isEditing = editingId === comment.id;
    const isReplying = replyingTo === comment.id;

    return (
      <div className={`${depth > 0 ? 'ml-6 border-l-2 border-muted pl-4' : ''}`}>
        <Card className="p-3 mb-2">
          <div className="flex gap-3">
            <UserAvatar
              username={comment.profile?.username}
              displayName={comment.profile?.display_name}
              avatarUrl={comment.profile?.avatar_url}
              avatarType={comment.profile?.avatar_type as any}
              avatarEmoji={comment.profile?.avatar_emoji}
              avatarKawaii={comment.profile?.avatar_kawaii}
              size="sm"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1">
                  {comment.profile?.username && <UserBadges username={comment.profile.username} size={12} />}
                  <span 
                    className="font-medium hover:text-primary cursor-pointer"
                    onClick={() => navigate(`/p/${comment.profile?.username}`)}
                  >
                    @{comment.profile?.username}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>

              {isEditing ? (
                <div className="mt-2 space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(comment.id)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-1 text-sm whitespace-pre-wrap">{comment.content}</p>
                  
                  {comment.images && comment.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {comment.images.map((url, i) => (
                        <img key={i} src={url} alt="" className="max-w-xs rounded border" />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 px-2 ${userVotes[comment.id] === 'up' ? 'text-green-500' : ''}`}
                  onClick={() => handleVote(comment.id, 'up')}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {comment.upvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 px-2 ${userVotes[comment.id] === 'down' ? 'text-red-500' : ''}`}
                  onClick={() => handleVote(comment.id, 'down')}
                >
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  {comment.downvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => {
                    setReplyingTo(isReplying ? null : comment.id);
                    setEditContent("");
                  }}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                {isOwner && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2"
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-destructive"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>

              {/* Reply input */}
              {isReplying && (
                <div className="mt-3 space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSubmit(comment.id)} disabled={submitting}>
                      <Send className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
              {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </Button>
            {showReplies && comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center text-muted-foreground py-4">Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      {/* New comment form */}
      {user && (
        <Card className="p-4">
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
            />
            <ImageUpload images={newImages} onImagesChange={setNewImages} />
            <div className="flex items-center gap-2">
              <EmojiPickerButton onEmojiSelect={(emoji) => setNewComment(prev => prev + emoji)} />
              <GifPickerButton onGifSelect={(url) => setNewImages([...newImages, url])} />
              <div className="flex-1" />
              <Button onClick={() => handleSubmit(null)} disabled={submitting}>
                <Send className="h-4 w-4 mr-2" />
                Comment (+1 XP)
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Comments list */}
      <div className="space-y-2">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};
