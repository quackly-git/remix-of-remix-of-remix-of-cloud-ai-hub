import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth, UserProfile } from "@/contexts/DiscussionAuthContext";
import { KawaiiMascot } from "@/components/discussions/KawaiiMascot";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { UserBadges } from "@/components/discussions/UserBadges";
import { UserSubjectsDisplay } from "@/components/discussions/SubjectSelector";
import { FollowButton } from "@/components/discussions/FollowButton";
import { FollowListModal } from "@/components/discussions/FollowListModal";
import { XPDonationModal } from "@/components/discussions/XPDonationModal";
import { 
  ArrowLeft, 
  Lock, 
  Gift, 
  Users, 
  FileText, 
  Settings,
  Sparkles,
  GraduationCap,
  HelpCircle,
  ClipboardCheck
} from "lucide-react";

interface UserSubject {
  id: string;
  subject_name: string;
  exam_board: string;
  level: string;
}

interface UserUniversity {
  id: string;
  university_name: string;
  country: string;
  alpha_two_code: string;
  state_province: string | null;
}

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user, profile: currentUserProfile, refreshProfile } = useDiscussionAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<UserSubject[]>([]);
  const [universities, setUniversities] = useState<UserUniversity[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [quizzesSolved, setQuizzesSolved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [canViewProfile, setCanViewProfile] = useState(false);
  const [showFollowList, setShowFollowList] = useState(false);
  const [followListTab, setFollowListTab] = useState<'followers' | 'following'>('followers');
  const [showDonationModal, setShowDonationModal] = useState(false);

  const isOwnProfile = user?.id === profile?.user_id;

  useEffect(() => {
    if (username) {
      fetchProfile();
    }
  }, [username, user]);

  const fetchProfile = async () => {
    setLoading(true);

    // Fetch profile by username
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username?.toLowerCase())
      .maybeSingle();

    if (error || !profileData) {
      setLoading(false);
      return;
    }

    setProfile(profileData as UserProfile);

    // Check if current user can view this profile
    const isOwn = user?.id === profileData.user_id;
    const isPublicProfile = profileData.is_public;
    
    let canView = isOwn || isPublicProfile;
    
    if (!canView && user) {
      // Check if following
      const { data: followData } = await supabase
        .from('follows')
        .select('status')
        .eq('follower_id', user.id)
        .eq('following_id', profileData.user_id)
        .eq('status', 'accepted')
        .maybeSingle();
      
      canView = !!followData;
    }

    setCanViewProfile(canView);

    // Fetch subjects and universities
    if (canView) {
      const { data: subjectsData } = await supabase
        .from('user_subjects')
        .select('*')
        .eq('user_id', profileData.user_id);
      
      if (subjectsData) {
        setSubjects(subjectsData);
      }

      const { data: universitiesData } = await supabase
        .from('user_universities')
        .select('*')
        .eq('user_id', profileData.user_id);
      
      if (universitiesData) {
        setUniversities(universitiesData);
      }
    }

    // Get quiz questions solved from localStorage (this is stored locally)
    const solvedKey = 'quiz_solved_questions';
    try {
      const stored = localStorage.getItem(solvedKey);
      if (stored && isOwn) {
        const solvedIds = JSON.parse(stored);
        setQuizzesSolved(Array.isArray(solvedIds) ? solvedIds.length : 0);
      }
    } catch {
      setQuizzesSolved(0);
    }

    // Fetch follow counts
    const { count: followers } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', profileData.user_id)
      .eq('status', 'accepted');

    const { count: following } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', profileData.user_id)
      .eq('status', 'accepted');

    setFollowersCount(followers || 0);
    setFollowingCount(following || 0);
    setLoading(false);
  };

  const handleFollowListOpen = (tab: 'followers' | 'following') => {
    setFollowListTab(tab);
    setShowFollowList(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <KawaiiMascot character="ghost" mood="shocked" size={100} />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <KawaiiMascot character="cat" mood="sad" size={120} />
        <h1 className="text-2xl font-bold mt-4">User Not Found</h1>
        <p className="text-muted-foreground mt-2">@{username} doesn't exist</p>
        <Button onClick={() => navigate('/discussions')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discussions
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container py-8 max-w-2xl">
        {/* Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <UserAvatar
                username={profile.username}
                displayName={profile.display_name}
                avatarUrl={profile.avatar_url}
                avatarType={profile.avatar_type}
                avatarEmoji={profile.avatar_emoji}
                avatarKawaii={profile.avatar_kawaii}
                size="xl"
              />

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h1 className="text-2xl font-bold">
                    {profile.display_name || profile.username}
                  </h1>
                  {!profile.is_public && (
                    <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                      <Lock className="h-3 w-3" />
                      Private
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground flex items-center gap-1">
                  <UserBadges username={profile.username} size={14} />
                  @{profile.username}
                </p>

                {canViewProfile && profile.bio && (
                  <p className="mt-2 text-sm">{profile.bio}</p>
                )}

                {/* Stats */}
                <div className="flex justify-center sm:justify-start gap-6 mt-4">
                  <button 
                    className="text-center hover:text-primary transition-colors"
                    onClick={() => handleFollowListOpen('followers')}
                  >
                    <p className="font-bold">{followersCount}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </button>
                  <button 
                    className="text-center hover:text-primary transition-colors"
                    onClick={() => handleFollowListOpen('following')}
                  >
                    <p className="font-bold">{followingCount}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </button>
                  {canViewProfile && (
                    <>
                      <div className="text-center">
                        <p className="font-bold text-primary">{profile.xp}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center cursor-help flex items-center gap-1">
                              <div>
                                <p className="font-bold">{profile.papers_solved}</p>
                                <p className="text-xs text-muted-foreground">Papers</p>
                              </div>
                              <HelpCircle className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">You need to log marks to save your solved past papers</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {isOwnProfile && (
                        <div className="text-center">
                          <p className="font-bold">{quizzesSolved}</p>
                          <p className="text-xs text-muted-foreground">Quizzes</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                  {isOwnProfile ? (
                    <Button onClick={() => navigate('/discussions/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <FollowButton
                        targetUserId={profile.user_id}
                        targetUsername={profile.username}
                        isPrivate={!profile.is_public}
                        onFollowChange={fetchProfile}
                      />
                      {canViewProfile && (
                        <Button 
                          variant="outline" 
                          onClick={() => setShowDonationModal(true)}
                        >
                          <Gift className="mr-2 h-4 w-4" />
                          Donate XP
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Private Profile Message */}
        {!canViewProfile && (
          <Card className="mt-6">
            <CardContent className="flex flex-col items-center py-12">
              <KawaiiMascot character="ghost" mood="sad" size={80} />
              <p className="mt-4 text-muted-foreground text-center">
                This account is private.<br />
                Follow to see their profile.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Bio Card */}
        {canViewProfile && profile.bio && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Users className="h-4 w-4" />
                About
              </h3>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Subjects */}
        {canViewProfile && subjects.length > 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <FileText className="h-4 w-4" />
                Subjects
              </h3>
              <UserSubjectsDisplay subjects={subjects} />
            </CardContent>
          </Card>
        )}

        {/* Universities */}
        {canViewProfile && universities.length > 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <GraduationCap className="h-4 w-4" />
                Universities
              </h3>
              <div className="flex flex-wrap gap-2">
                {universities.map((uni) => (
                  <Badge key={uni.id} variant="secondary" className="flex items-center gap-2 py-1.5 px-3">
                    <span className={`fi fi-${uni.alpha_two_code.toLowerCase()}`} />
                    <span>{uni.university_name}</span>
                    {uni.state_province && (
                      <span className="text-xs text-muted-foreground">({uni.state_province})</span>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Follow List Modal */}
      {profile && (
        <FollowListModal
          isOpen={showFollowList}
          onClose={() => setShowFollowList(false)}
          userId={profile.user_id}
          username={profile.username}
          initialTab={followListTab}
          isOwnProfile={isOwnProfile}
        />
      )}

      {/* XP Donation Modal */}
      {profile && !isOwnProfile && (
        <XPDonationModal
          isOpen={showDonationModal}
          onClose={() => setShowDonationModal(false)}
          targetUserId={profile.user_id}
          targetUsername={profile.username}
          onDonationComplete={() => {
            fetchProfile();
            refreshProfile();
          }}
        />
      )}
    </div>
  );
};

export default PublicProfile;
