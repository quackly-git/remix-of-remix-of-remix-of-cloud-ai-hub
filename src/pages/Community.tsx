import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useThreadAuth } from "@/contexts/ThreadAuthContext";
import { ThreadAuthModal } from "@/components/ThreadAuthModal";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user: { username: string };
  likes: number;
  dislikes: number;
  userLike: boolean | null;
  commentCount: number;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: { username: string };
  likes: number;
  dislikes: number;
  userLike: boolean | null;
}

const Community = () => {
  const { slug } = useParams<{ slug: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<() => void>(() => {});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const { user } = useThreadAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadCommunity();
    loadPosts();
  }, [slug]);

  const requireAuth = (action: () => void) => {
    if (!user) {
      setAuthAction(() => action);
      setShowAuthModal(true);
    } else {
      action();
    }
  };

  const loadCommunity = async () => {
    const { data } = await (supabase as any)
      .from("threads_communities")
      .select("*")
      .eq("slug", slug)
      .single();
    setCommunity(data);
  };

  const loadPosts = async () => {
    if (!slug) return;

    const { data: communityData } = await (supabase as any)
      .from("threads_communities")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!communityData) return;

    const { data: postsData } = await (supabase as any)
      .from("threads_posts")
      .select(`
        *,
        threads_users(username),
        threads_post_likes(is_like, user_id),
        threads_comments(count)
      `)
      .eq("community_id", communityData.id)
      .order("created_at", { ascending: false });

    if (postsData) {
      const formattedPosts = postsData.map((post: any) => {
        const likes = post.threads_post_likes?.filter((l: any) => l.is_like).length || 0;
        const dislikes = post.threads_post_likes?.filter((l: any) => !l.is_like).length || 0;
        const userLikeObj = post.threads_post_likes?.find((l: any) => l.user_id === user?.id);
        
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          created_at: post.created_at,
          user: { username: post.threads_users?.username || "Anonymous" },
          likes,
          dislikes,
          userLike: userLikeObj ? userLikeObj.is_like : null,
          commentCount: post.threads_comments?.[0]?.count || 0,
        };
      });
      setPosts(formattedPosts);
    }
  };

  const loadComments = async (postId: string) => {
    const { data } = await (supabase as any)
      .from("threads_comments")
      .select(`
        *,
        threads_users(username),
        threads_comment_likes(is_like, user_id)
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data) {
      const formattedComments = data.map((comment: any) => {
        const likes = comment.threads_comment_likes?.filter((l: any) => l.is_like).length || 0;
        const dislikes = comment.threads_comment_likes?.filter((l: any) => !l.is_like).length || 0;
        const userLikeObj = comment.threads_comment_likes?.find((l: any) => l.user_id === user?.id);
        
        return {
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          user: { username: comment.threads_users?.username || "Anonymous" },
          likes,
          dislikes,
          userLike: userLikeObj ? userLikeObj.is_like : null,
        };
      });
      setComments((prev) => ({ ...prev, [postId]: formattedComments }));
    }
  };

  const createPost = async () => {
    if (!user || !community) return;

    const { error } = await (supabase as any).from("threads_posts").insert({
      community_id: community.id,
      user_id: user.id,
      title: newPostTitle,
      content: newPostContent,
    });

    if (error) {
      toast({ title: "Error creating post", variant: "destructive" });
    } else {
      toast({ title: "Post created!" });
      setNewPostTitle("");
      setNewPostContent("");
      loadPosts();
    }
  };

  const togglePostLike = async (postId: string, isLike: boolean) => {
    if (!user) return;

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.userLike === isLike) {
      // Remove like/dislike
      await (supabase as any)
        .from("threads_post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
    } else {
      // Add or update like/dislike
      await (supabase as any).from("threads_post_likes").upsert({
        post_id: postId,
        user_id: user.id,
        is_like: isLike,
      });
    }

    loadPosts();
  };

  const toggleCommentLike = async (commentId: string, isLike: boolean) => {
    if (!user) return;

    const allComments = Object.values(comments).flat();
    const comment = allComments.find((c) => c.id === commentId);
    if (!comment) return;

    if (comment.userLike === isLike) {
      await (supabase as any)
        .from("threads_comment_likes")
        .delete()
        .eq("comment_id", commentId)
        .eq("user_id", user.id);
    } else {
      await (supabase as any).from("threads_comment_likes").upsert({
        comment_id: commentId,
        user_id: user.id,
        is_like: isLike,
      });
    }

    // Reload comments for the post
    const postId = Object.keys(comments).find((key) =>
      comments[key].some((c) => c.id === commentId)
    );
    if (postId) loadComments(postId);
  };

  const addComment = async (postId: string) => {
    if (!user || !newComment[postId]?.trim()) return;

    const { error } = await (supabase as any).from("threads_comments").insert({
      post_id: postId,
      user_id: user.id,
      content: newComment[postId],
    });

    if (error) {
      toast({ title: "Error adding comment", variant: "destructive" });
    } else {
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      loadComments(postId);
      loadPosts();
    }
  };

  const toggleComments = (postId: string) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
      if (!comments[postId]) {
        loadComments(postId);
      }
    }
  };

  if (!community) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/threads">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Communities
          </Button>
        </Link>

        <div className="mb-8" style={{ borderLeft: `4px solid ${community.color}`, paddingLeft: "1rem" }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">{community.name}</h1>
          <p className="text-muted-foreground">{community.description}</p>
        </div>

        {/* Create Post */}
        <Card className="mb-8">
          <CardHeader className="font-semibold">Create a Post</CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
            />
            <Button
              onClick={() => requireAuth(createPost)}
              disabled={!newPostTitle.trim() || !newPostContent.trim()}
            >
              Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      by {post.user.username} • {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{post.content}</p>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => requireAuth(() => togglePostLike(post.id, true))}
                    className={post.userLike === true ? "text-green-500" : ""}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => requireAuth(() => togglePostLike(post.id, false))}
                    className={post.userLike === false ? "text-red-500" : ""}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {post.dislikes}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleComments(post.id)}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {post.commentCount}
                  </Button>
                </div>

                {/* Comments Section */}
                {expandedPost === post.id && (
                  <div className="mt-4 space-y-4 pt-4 border-t">
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="pl-4 border-l-2 space-y-2">
                        <div className="text-xs text-muted-foreground">
                          {comment.user.username} • {new Date(comment.created_at).toLocaleDateString()}
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => requireAuth(() => toggleCommentLike(comment.id, true))}
                            className={comment.userLike === true ? "text-green-500" : ""}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => requireAuth(() => toggleCommentLike(comment.id, false))}
                            className={comment.userLike === false ? "text-red-500" : ""}
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {comment.dislikes}
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex gap-2 mt-4">
                      <Input
                        placeholder="Write a comment..."
                        value={newComment[post.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                      />
                      <Button
                        size="sm"
                        onClick={() => requireAuth(() => addComment(post.id))}
                        disabled={!newComment[post.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ThreadAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => authAction()}
      />
    </div>
  );
};

export default Community;
