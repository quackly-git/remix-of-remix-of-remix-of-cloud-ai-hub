import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { PostCard } from "@/components/discussions/PostCard";
import { PostComposer } from "@/components/discussions/PostComposer";
import { ArrowLeft, Plus, Users, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CustomDiscussion {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_by: string;
  created_at: string;
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

const CustomThread = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useDiscussionAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [discussion, setDiscussion] = useState<CustomDiscussion | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({});
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const [editPost, setEditPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      fetchDiscussion();
    }
  }, [slug, user]);

  const fetchDiscussion = async () => {
    if (!slug) return;

    // Try to find existing custom discussion
    const { data: existingDiscussion } = await supabase
      .from('custom_discussions')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (existingDiscussion) {
      setDiscussion(existingDiscussion);
      fetchPosts(existingDiscussion.slug);
    } else {
      setLoading(false);
    }
  };

  const fetchPosts = async (discussionSlug: string) => {
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .eq('discussion_type', 'custom')
      .eq('discussion_id', discussionSlug)
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
    navigate(`/discussion/${slug}/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading discussion...</p>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="cat" mood="sad" size={100} />
        <p className="mt-4 text-muted-foreground">
          Discussion not found
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
      {/* Discussion Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <KawaiiMascot character="speechBubble" mood="happy" size={60} />
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {discussion.name}
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">Custom Discussion</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                  </span>
                </div>
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
            {discussion.description || "A community discussion space"}
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
                No posts yet. Be the first to start a discussion!
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
              onDelete={() => fetchPosts(discussion.slug)}
              onClick={() => handlePostClick(post.id)}
            />
          ))
        )}
      </div>

      {/* Post Composer Modal */}
      {discussion && (
        <PostComposer
          isOpen={showComposer}
          onClose={() => { setShowComposer(false); setEditPost(null); }}
          threadId=""
          discussionType="custom"
          discussionId={discussion.slug}
          onPostCreated={() => fetchPosts(discussion.slug)}
          editPost={editPost}
        />
      )}
    </div>
  );
};

export default CustomThread;
