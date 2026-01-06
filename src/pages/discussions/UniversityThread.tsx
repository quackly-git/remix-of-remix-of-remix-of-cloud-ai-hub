import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { PostComposer } from "@/components/discussions/PostComposer";
import { ArrowLeft, Plus, Clock, User, ExternalLink, GraduationCap, Globe, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import universitiesData from "@/data/world_universities_and_domains.json";
import type { University } from "@/types/university";

const universities = universitiesData as University[];

interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  upvotes: number | null;
  downvotes: number | null;
  created_at: string;
  question_number: number | null;
  images: string[] | null;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: string;
    avatar_emoji: string | null;
    avatar_kawaii: string | null;
  };
}

const UniversityThread = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useDiscussionAuth();
  const { toast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);

  // Parse slug to find university
  const university = useMemo(() => {
    if (!slug) return null;
    
    // Slug format: {alpha_two_code}-{name_slug}
    const parts = slug.split('-');
    const countryCode = parts[0]?.toUpperCase();
    
    const found = universities.find(u => {
      const uniSlug = `${u.alpha_two_code.toLowerCase()}-${u.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}`;
      return uniSlug === slug;
    });
    
    if (found) return found;
    
    // Fallback: find by country code and partial name match
    return universities.find(u => 
      u.alpha_two_code.toLowerCase() === countryCode?.toLowerCase()
    ) || null;
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPosts();
    }
  }, [slug]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('discussion_type', 'university')
      .eq('discussion_id', slug)
      .eq('is_draft', false)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const userIds = [...new Set(data.map(p => p.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));
      
      setPosts(data.map(p => ({
        ...p,
        profile: profileMap.get(p.user_id)
      })));
    }
    setLoading(false);
  };

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="sad" size={100} />
        <p className="mt-4 text-muted-foreground">University not found</p>
        <Button variant="outline" onClick={() => navigate('/discussions')} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/discussions')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{university.name}</h1>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {university.country}
            </span>
            <Badge variant="secondary">{university.alpha_two_code}</Badge>
            {university["state-province"] && (
              <span>{university["state-province"]}</span>
            )}
          </div>
          {university.web_pages[0] && (
            <a 
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center gap-1 mt-2 hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              Visit Website
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={() => setShowComposer(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="flex flex-col items-center py-12">
          <KawaiiMascot character="ghost" mood="shocked" size={80} />
          <p className="mt-4 text-muted-foreground animate-pulse">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <KawaiiMascot character="cat" mood="blissful" size={100} />
            <p className="mt-4 text-muted-foreground">No posts yet. Be the first to post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => navigate(`/discussion/${slug}/post/${post.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <UserAvatar
                    username={post.profile?.username}
                    displayName={post.profile?.display_name}
                    avatarUrl={post.profile?.avatar_url}
                    avatarType={post.profile?.avatar_type as any}
                    avatarEmoji={post.profile?.avatar_emoji}
                    avatarKawaii={post.profile?.avatar_kawaii}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        @{post.profile?.username}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {(post.upvotes || 0) - (post.downvotes || 0)} votes
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Post Composer */}
      <PostComposer
        isOpen={showComposer}
        onClose={() => setShowComposer(false)}
        threadId=""
        discussionType="university"
        discussionId={slug || ""}
        onPostCreated={fetchPosts}
      />
    </div>
  );
};

export default UniversityThread;
