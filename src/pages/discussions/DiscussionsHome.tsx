import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { ProfileCompletion } from "@/components/discussions/ProfileCompletion";
import { SubjectSelector } from "@/components/discussions/SubjectSelector";
import { PaperSelector } from "@/components/discussions/PaperSelector";
import { PostComposer } from "@/components/discussions/PostComposer";
import { UniversitySelector } from "@/components/discussions/UniversitySelector";
import { CreateDiscussionModal } from "@/components/discussions/CreateDiscussionModal";
import { PostSearch } from "@/components/discussions/PostSearch";
import { DiscussionTypeSelector } from "@/components/discussions/DiscussionTypeSelector";
import { MessageSquare, Plus, Clock, User, Trophy, FileText, GraduationCap, Search, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, Link } from "react-router-dom";

interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  discussion_type: string | null;
  discussion_id: string | null;
  thread_id: string | null;
  upvotes: number | null;
  downvotes: number | null;
  created_at: string;
  profile?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    avatar_type: string;
    avatar_emoji: string | null;
    avatar_kawaii: string | null;
  };
}

interface CustomDiscussion {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

interface UserSubject {
  id: string;
  subject_name: string;
  exam_board: string;
  level: string;
}

const DiscussionsHome = () => {
  const { user, profile, refreshProfile } = useDiscussionAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [customDiscussions, setCustomDiscussions] = useState<CustomDiscussion[]>([]);
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showSubjectSelector, setShowSubjectSelector] = useState(false);
  const [showUniversitySelector, setShowUniversitySelector] = useState(false);
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchRecentPosts();
    fetchCustomDiscussions();
    if (user) {
      fetchUserSubjects();
    }
  }, [user]);

  const fetchRecentPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('is_draft', false)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) {
      const userIds = [...new Set(data.map(d => d.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, username, display_name, avatar_url, avatar_type, avatar_emoji, avatar_kawaii')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));
      
      setRecentPosts(data.map(d => ({
        ...d,
        profile: profileMap.get(d.user_id)
      })));
    }
    setLoading(false);
  };

  const fetchCustomDiscussions = async () => {
    const { data } = await supabase
      .from('custom_discussions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setCustomDiscussions(data);
  };

  const fetchUserSubjects = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_subjects')
      .select('*')
      .eq('user_id', user.id);
    if (data) setUserSubjects(data);
  };

  const getPostLink = (post: Post) => {
    if (post.discussion_type === 'university' && post.discussion_id) {
      return `/discussions/universities/${post.discussion_id}`;
    } else if (post.discussion_type === 'custom' && post.discussion_id) {
      return `/discussion/${post.discussion_id}`;
    } else if (post.thread_id) {
      return `/discussion/${post.thread_id}/post/${post.id}`;
    }
    return `/discussions`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading discussions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      {profile && (
        <ProfileCompletion
          profile={profile}
          subjectsCount={userSubjects.length}
          onEditProfile={() => navigate('/discussions/settings')}
          onAddSubjects={() => setShowSubjectSelector(true)}
        />
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Discussions
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSearch(true)}>
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/discussions/leaderboard">
              <Trophy className="h-4 w-4 mr-1" />
              Leaderboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <PaperSelector />
        <Button variant="outline" size="sm" onClick={() => setShowUniversitySelector(true)}>
          <GraduationCap className="h-4 w-4 mr-1" />
          Universities
        </Button>
        <Button variant="outline" size="sm" onClick={() => setShowCreateDiscussion(true)}>
          <Users className="h-4 w-4 mr-1" />
          Create Discussion
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/discussions/drafts">
            <FileText className="h-4 w-4 mr-1" />
            Drafts
          </Link>
        </Button>
        <Button size="sm" onClick={() => setShowNewPostModal(true)}>
          <Plus className="mr-1 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Recent Custom Discussions */}
      {customDiscussions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Community Discussions</h3>
          <div className="flex flex-wrap gap-2">
            {customDiscussions.map(d => (
              <Badge
                key={d.id}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/20"
                onClick={() => navigate(`/discussion/${d.slug}`)}
              >
                <Users className="h-3 w-3 mr-1" />
                {d.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <h3 className="text-sm font-medium mb-2">Recent Posts</h3>
      <div className="space-y-3">
        {recentPosts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-8">
              <KawaiiMascot character="cat" mood="sad" size={80} />
              <p className="mt-3 text-muted-foreground text-sm">No posts yet. Start one!</p>
            </CardContent>
          </Card>
        ) : (
          recentPosts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => navigate(getPostLink(post))}
            >
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <UserAvatar
                    username={post.profile?.username}
                    displayName={post.profile?.display_name}
                    avatarUrl={post.profile?.avatar_url}
                    avatarType={post.profile?.avatar_type as any}
                    avatarEmoji={post.profile?.avatar_emoji}
                    avatarKawaii={post.profile?.avatar_kawaii}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.discussion_type && (
                        <Badge variant="outline" className="text-xs">
                          {post.discussion_type === 'university' ? '🎓' : 
                           post.discussion_type === 'custom' ? '👥' : '📝'}
                        </Badge>
                      )}
                      <h3 className="font-medium text-sm truncate">{post.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>@{post.profile?.username}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Full Post Composer Modal */}
      <PostComposer
        isOpen={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
        threadId=""
        onPostCreated={() => {
          fetchRecentPosts();
          refreshProfile();
        }}
      />

      {/* Subject Selector */}
      <SubjectSelector
        isOpen={showSubjectSelector}
        onClose={() => setShowSubjectSelector(false)}
        onSubjectsAdded={fetchUserSubjects}
        existingSubjects={userSubjects}
      />

      {/* University Selector */}
      <UniversitySelector
        isOpen={showUniversitySelector}
        onClose={() => setShowUniversitySelector(false)}
        mode="navigate"
      />

      {/* Create Discussion Modal */}
      <CreateDiscussionModal
        isOpen={showCreateDiscussion}
        onClose={() => setShowCreateDiscussion(false)}
        onCreated={() => {
          fetchCustomDiscussions();
        }}
      />

      {/* Post Search */}
      <PostSearch
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />
    </div>
  );
};

export default DiscussionsHome;
