import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { CommentThread } from "@/components/discussions/CommentThread";
import { PostComposer } from "@/components/discussions/PostComposer";
import { formatDistanceToNow } from "date-fns";
import {
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  User
} from "lucide-react";
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

interface Post {
  id: string;
  user_id: string;
  thread_id: string;
  title: string;
  content: string;
  question_number: number | null;
  images: string[];
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: string;
    avatar_emoji: string | null;
    avatar_kawaii: string | null;
  };
  tags?: { id: string; name: string; color: string }[];
  thread?: {
    paper_id: string;
    title: string;
  };
}

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useDiscussionAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId, user]);

  const fetchPost = async () => {
    if (!postId) return;

    const { data: postData, error } = await supabase
      .from('posts')
      .select('*, paper_threads(paper_id, title)')
      .eq('id', postId)
      .single();

    if (error || !postData) {
      setLoading(false);
      return;
    }

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii')
      .eq('user_id', postData.user_id)
      .single();

    // Fetch tags
    const { data: postTags } = await supabase
      .from('post_tags')
      .select('tags(id, name, color)')
      .eq('post_id', postId);

    const tags = postTags?.map(pt => pt.tags).filter(Boolean) || [];

    // Fetch user vote
    if (user) {
      const { data: vote } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('user_id', user.id)
        .eq('post_id', postId)
        .maybeSingle();

      if (vote) setUserVote(vote.vote_type as 'up' | 'down');
    }

    setPost({
      ...postData,
      profile,
      tags,
      thread: postData.paper_threads,
    });
    setUpvotes(postData.upvotes);
    setDownvotes(postData.downvotes);
    setLoading(false);
  };

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!user || !post) {
      toast({ title: "Please sign in to vote", variant: "destructive" });
      return;
    }

    try {
      if (userVote === voteType) {
        await supabase.from('votes').delete().match({ user_id: user.id, post_id: post.id });
        setUserVote(null);
        if (voteType === 'up') setUpvotes(prev => prev - 1);
        else setDownvotes(prev => prev - 1);
      } else if (userVote) {
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
    if (!post) return;
    
    try {
      await supabase.from('posts').delete().eq('id', post.id);
      toast({ title: "Post deleted" });
      navigate(`/discussion/${post.thread?.paper_id}`);
    } catch (error: any) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="cat" mood="sad" size={100} />
        <p className="mt-4 text-muted-foreground">Post not found</p>
        <Button asChild className="mt-4">
          <Link to="/discussions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Link>
        </Button>
      </div>
    );
  }

  const isOwner = user?.id === post.user_id;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button asChild variant="outline" size="sm">
        <Link to={`/discussion/${post.thread?.paper_id}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {post.thread?.title}
        </Link>
      </Button>

      {/* Post Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Vote buttons */}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={userVote === 'up' ? 'text-green-500' : ''}
                onClick={() => handleVote('up')}
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <span className="text-lg font-bold">{upvotes - downvotes}</span>
              <Button
                variant="ghost"
                size="icon"
                className={userVote === 'down' ? 'text-red-500' : ''}
                onClick={() => handleVote('down')}
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {post.question_number && (
                  <Badge variant="secondary">Q{post.question_number}</Badge>
                )}
                {post.tags?.map(tag => (
                  <Badge key={tag.id} variant="outline">{tag.name}</Badge>
                ))}
              </div>
              
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <UserAvatar
                    username={post.profile?.username}
                    displayName={post.profile?.display_name}
                    avatarUrl={post.profile?.avatar_url}
                    avatarType={post.profile?.avatar_type as any}
                    avatarEmoji={post.profile?.avatar_emoji}
                    avatarKawaii={post.profile?.avatar_kawaii}
                    size="sm"
                  />
                  <Link to={`/p/${post.profile?.username}`} className="hover:text-primary">
                    @{post.profile?.username}
                  </Link>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Actions */}
            {isOwner && (
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setShowEditModal(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {post.images.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt="" 
                  className="rounded-lg border max-w-full"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <CommentThread postId={post.id} />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <PostComposer
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          threadId={post.thread_id}
          onPostCreated={fetchPost}
          editPost={{
            id: post.id,
            title: post.title,
            content: post.content,
            question_number: post.question_number,
            images: post.images,
            tagIds: post.tags?.map(t => t.id) || [],
          }}
        />
      )}

      {/* Delete Dialog */}
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
    </div>
  );
};

export default PostDetail;
