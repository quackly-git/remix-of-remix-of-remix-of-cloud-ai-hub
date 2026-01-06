import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { KawaiiMascot, getRandomCharacter } from "@/components/discussions/KawaiiMascot";
import { PostCard } from "@/components/discussions/PostCard";
import { PostComposer } from "@/components/discussions/PostComposer";
import { Plus, ArrowLeft, FileText } from "lucide-react";

interface Thread {
  id: string;
  paper_id: string;
  paper_year: number | null;
  paper_session: string | null;
  title: string;
  welcome_message: string | null;
}

interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  question_number: number | null;
  images: string[];
  upvotes: number;
  downvotes: number;
  created_at: string;
  profile?: any;
  tags?: any[];
  comment_count?: number;
}

const PaperThread = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const { user } = useDiscussionAuth();
  const navigate = useNavigate();
  
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);

  const mascotCharacter = getRandomCharacter();

  useEffect(() => {
    if (paperId) {
      fetchOrCreateThread();
    }
  }, [paperId, user]);

  const fetchOrCreateThread = async () => {
    if (!paperId) return;

    // Try to find existing thread
    let { data: existingThread } = await supabase
      .from('paper_threads')
      .select('*')
      .eq('paper_id', paperId)
      .maybeSingle();

    if (!existingThread && user) {
      // Parse paper ID to get year and session
      const match = paperId.match(/^(\d{4})-(\w+)$/);
      const year = match ? parseInt(match[1]) : null;
      const session = match ? match[2] : null;
      const title = year && session 
        ? `${year} ${session.charAt(0).toUpperCase() + session.slice(1)} Paper Discussion`
        : `${paperId} Discussion`;

      // Create new thread (only if user is authenticated)
      const { data: newThread, error } = await supabase
        .from('paper_threads')
        .insert({
          paper_id: paperId,
          paper_year: year,
          paper_session: session,
          title,
        })
        .select()
        .single();

      if (!error && newThread) {
        existingThread = newThread;
      }
    }

    if (existingThread) {
      setThread(existingThread);
      fetchPosts(existingThread.id);
    } else {
      // Thread doesn't exist and user not logged in - show empty state
      setLoading(false);
    }
  };

  const fetchPosts = async (threadId: string) => {
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .eq('thread_id', threadId)
      .eq('is_draft', false)
      .order('created_at', { ascending: false });

    if (!postsData) {
      setLoading(false);
      return;
    }

    // Fetch profiles
    const userIds = [...new Set(postsData.map(p => p.user_id))];
    const { data: profiles } = userIds.length > 0 ? await supabase
      .from('profiles')
      .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii')
      .in('user_id', userIds) : { data: [] };

    const profileMap = new Map(profiles?.map(p => [p.user_id, p] as [string, typeof p]));

    // Fetch tags for each post
    const postIds = postsData.map(p => p.id);
    const { data: postTags } = postIds.length > 0 ? await supabase
      .from('post_tags')
      .select('post_id, tags(id, name, color)')
      .in('post_id', postIds) : { data: [] };

    const tagsMap = new Map<string, any[]>();
    postTags?.forEach(pt => {
      if (!tagsMap.has(pt.post_id)) tagsMap.set(pt.post_id, []);
      if (pt.tags) tagsMap.get(pt.post_id)!.push(pt.tags);
    });

    // Fetch comment counts
    const { data: commentCounts } = postIds.length > 0 ? await supabase
      .from('post_comments')
      .select('post_id')
      .in('post_id', postIds) : { data: [] };

    const countMap = new Map<string, number>();
    commentCounts?.forEach(c => {
      countMap.set(c.post_id, (countMap.get(c.post_id) || 0) + 1);
    });

    const postsWithDetails = postsData.map(p => ({
      ...p,
      profile: profileMap.get(p.user_id),
      tags: tagsMap.get(p.id) || [],
      comment_count: countMap.get(p.id) || 0,
    }));

    setPosts(postsWithDetails);

    // Fetch user votes
    if (user) {
      const { data: votes } = await supabase
        .from('votes')
        .select('post_id, vote_type')
        .eq('user_id', user.id)
        .in('post_id', postIds);

      const votesMap: Record<string, 'up' | 'down'> = {};
      votes?.forEach(v => {
        if (v.post_id) votesMap[v.post_id] = v.vote_type as 'up' | 'down';
      });
      setUserVotes(votesMap);
    }

    setLoading(false);
  };

  const handleEditPost = (post: Post) => {
    setEditPost({
      id: post.id,
      title: post.title,
      content: post.content,
      question_number: post.question_number,
      images: post.images,
      tagIds: post.tags?.map(t => t.id) || [],
    });
    setShowComposer(true);
  };

  const handlePostClick = (postId: string) => {
    navigate(`/discussion/${paperId}/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading thread...</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="cat" mood="sad" size={100} />
        <p className="mt-4 text-muted-foreground">
          {user ? "Thread not found" : "Sign in to start this discussion!"}
        </p>
        <Button asChild className="mt-4">
          <Link to="/discussions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Thread Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <KawaiiMascot character={mascotCharacter} mood="happy" size={60} />
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {thread.title}
                </CardTitle>
                {thread.paper_year && thread.paper_session && (
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{thread.paper_year}</Badge>
                    <Badge variant="outline" className="capitalize">{thread.paper_session}</Badge>
                  </div>
                )}
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/discussions">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {thread.welcome_message || "Post any questions, comments, or discussions about this paper here! 📝"}
          </p>
        </CardContent>
      </Card>

      {/* Create Post Button */}
      {user && (
        <div className="flex justify-end">
          <Button onClick={() => { setEditPost(null); setShowComposer(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <KawaiiMascot character="speechBubble" mood="blissful" size={80} />
              <p className="mt-4 text-muted-foreground text-center">
                No posts yet. Be the first to start a discussion about this paper!
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              userVote={userVotes[post.id]}
              onEdit={() => handleEditPost(post)}
              onDelete={() => fetchPosts(thread.id)}
              onClick={() => handlePostClick(post.id)}
            />
          ))
        )}
      </div>

      {/* Post Composer Modal */}
      {thread && (
        <PostComposer
          isOpen={showComposer}
          onClose={() => { setShowComposer(false); setEditPost(null); }}
          threadId={thread.id}
          onPostCreated={() => fetchPosts(thread.id)}
          editPost={editPost}
        />
      )}
    </div>
  );
};

export default PaperThread;
