import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useThreadAuth } from "@/contexts/ThreadAuthContext";
import { ThreadAuthModal } from "@/components/ThreadAuthModal";
import { useToast } from "@/hooks/use-toast";
import { AbundancePoll } from "@/components/AbundancePoll";
import { DifficultyPoll } from "@/components/DifficultyPoll";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  user?: {
    display_name: string;
  };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user?: {
    display_name: string;
  };
}

const ThreadDetail = () => {
  const { slug } = useParams();
  const [community, setCommunity] = useState<any>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useThreadAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchCommunity();
      fetchPosts();
    }
  }, [slug]);

  const fetchCommunity = async () => {
    const { data, error } = await (supabase as any)
      .from("threads_communities")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching community:", error);
      setCommunity(null);
      return;
    }

    setCommunity(data);
  };

  const fetchPosts = async () => {
    const { data: communityData } = await (supabase as any)
      .from("threads_communities")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!communityData) return;

    const { data } = await (supabase as any)
      .from("threads_posts")
      .select("*")
      .eq("community_id", communityData.id)
      .order("created_at", { ascending: false });

    if (data) {
      // Fetch user profiles separately
      const userIds = [...new Set(data.map((p) => p.user_id))];
      const { data: profiles } = await (supabase as any)
        .from("threads_user_profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      const postsWithUsers = data.map((post) => ({
        ...post,
        user: profileMap.get(post.user_id),
      }));

      setPosts(postsWithUsers as any);
      data.forEach((post) => fetchComments(post.id));
    }
  };

  const fetchComments = async (postId: string) => {
    const { data } = await (supabase as any)
      .from("threads_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data && data.length > 0) {
      // Fetch user profiles separately
      const userIds = [...new Set(data.map((c) => c.user_id))];
      const { data: profiles } = await (supabase as any)
        .from("threads_user_profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

      const commentsWithUsers = data.map((comment) => ({
        ...comment,
        user: profileMap.get(comment.user_id),
      }));

      setComments((prev) => ({ ...prev, [postId]: commentsWithUsers as any }));
    }
  };

  const requireAuth = (action: () => void) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const { error } = await (supabase as any).from("threads_posts").insert({
      community_id: community.id,
      user_id: user!.id,
      title: newPost.title,
      content: newPost.content,
    });

    if (error) {
      toast({ title: "Error creating post", variant: "destructive" });
    } else {
      setNewPost({ title: "", content: "" });
      fetchPosts();
      toast({ title: "Post created!" });
    }
  };

  const handleAddComment = async (postId: string) => {
    const content = newComment[postId]?.trim();
    if (!content) return;

    const { error } = await (supabase as any).from("threads_comments").insert({
      post_id: postId,
      user_id: user!.id,
      content,
    });

    if (error) {
      toast({ title: "Error adding comment", variant: "destructive" });
    } else {
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
      toast({ title: "Comment added!" });
    }
  };

  const handleLike = async (postId: string, isLike: boolean) => {
    const { error } = await (supabase as any)
      .from("threads_post_likes")
      .upsert({
        post_id: postId,
        user_id: user!.id,
        is_like: isLike,
      });

    if (!error) {
      toast({ title: isLike ? "Liked!" : "Disliked!" });
      fetchPosts();
    }
  };

  if (community === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Community not found</p>
          <Link to="/threads">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Communities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (community === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/threads">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Communities
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {community.name}
          </h1>
          <p className="text-muted-foreground">{community.description}</p>
        </div>

        {community.objective_id && (
          <AbundancePoll objectiveId={community.objective_id} />
        )}

        {slug?.match(/^\d{4}(june|october|jan)$/) && (
          <div className="mb-8">
            <DifficultyPoll pastPaperId={slug} />
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <Textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              rows={4}
            />
            <Button onClick={() => requireAuth(handleCreatePost)}>
              Create Post
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {post.user?.display_name || "Anonymous"} •{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap">{post.content}</p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => requireAuth(() => handleLike(post.id, true))}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      requireAuth(() => handleLike(post.id, false))
                    }
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Dislike
                  </Button>
                </div>

                {comments[post.id]?.length > 0 && (
                  <div className="space-y-3 pl-4 border-l-2">
                    {comments[post.id].map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-secondary p-3 rounded-lg"
                      >
                        <p className="text-sm font-medium">
                          {comment.user?.display_name || "Anonymous"}
                        </p>
                        <p className="text-sm mt-1">{comment.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        [post.id]: e.target.value,
                      })
                    }
                  />
                  <Button
                    onClick={() => requireAuth(() => handleAddComment(post.id))}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ThreadAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default ThreadDetail;
