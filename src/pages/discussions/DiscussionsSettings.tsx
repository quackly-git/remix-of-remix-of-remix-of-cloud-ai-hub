import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot, KawaiiCharacter } from "@/components/discussions/KawaiiMascot";
import { UserAvatar } from "@/components/discussions/UserAvatar";
import { AvatarPicker } from "@/components/discussions/EmojiPicker";
import { SubjectSelector, UserSubjectsDisplay } from "@/components/discussions/SubjectSelector";
import { UniversitySelector, UserUniversitiesDisplay } from "@/components/discussions/UniversitySelector";
import { 
  User, 
  Lock, 
  Image, 
  BookOpen, 
  GraduationCap,
  ChevronDown, 
  ChevronUp, 
  Save,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";
import type { UserUniversity } from "@/types/university";

interface UserSubject {
  id: string;
  subject_name: string;
  exam_board: string;
  level: string;
}

const DiscussionsSettings = () => {
  const { user, profile, refreshProfile } = useDiscussionAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSubjects, setUserSubjects] = useState<UserSubject[]>([]);
  const [userUniversities, setUserUniversities] = useState<UserUniversity[]>([]);
  
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showSubjectSelector, setShowSubjectSelector] = useState(false);
  const [showUniversitySelector, setShowUniversitySelector] = useState(false);
  
  // Collapsible states
  const [openSections, setOpenSections] = useState({
    profile: true,
    avatar: true,
    subjects: true,
    universities: true,
    privacy: true,
    password: false,
  });

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
      setIsPublic(profile.is_public);
    }
    if (user) {
      fetchUserSubjects();
      fetchUserUniversities();
    }
  }, [profile, user]);

  const fetchUserSubjects = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_subjects')
      .select('*')
      .eq('user_id', user.id);
    
    if (data) {
      setUserSubjects(data);
    }
  };

  const fetchUserUniversities = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_universities')
      .select('*')
      .eq('user_id', user.id);
    
    if (data) {
      setUserUniversities(data);
    }
  };

  const handleRemoveUniversity = async (universityId: string) => {
    try {
      const { error } = await supabase
        .from('user_universities')
        .delete()
        .eq('id', universityId);

      if (error) throw error;
      toast({ title: "University removed" });
      fetchUserUniversities();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName || null,
          bio: bio || null,
          is_public: isPublic,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: "Profile updated!" });
      refreshProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEmoji = async (emoji: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_type: 'emoji',
          avatar_emoji: emoji,
          avatar_kawaii: null,
          avatar_url: null,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      toast({ title: "Avatar updated!" });
      refreshProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSelectKawaii = async (character: KawaiiCharacter) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_type: 'kawaii',
          avatar_kawaii: character,
          avatar_emoji: null,
          avatar_url: null,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      toast({ title: "Avatar updated!" });
      refreshProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      toast({ title: "Password changed!" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSubject = async (subjectId: string) => {
    try {
      const { error } = await supabase
        .from('user_subjects')
        .delete()
        .eq('id', subjectId);

      if (error) throw error;
      toast({ title: "Subject removed" });
      fetchUserSubjects();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const SectionHeader = ({ 
    icon: Icon, 
    title, 
    section 
  }: { 
    icon: any; 
    title: string; 
    section: keyof typeof openSections 
  }) => (
    <CollapsibleTrigger asChild>
      <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
          </span>
          {openSections[section] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
    </CollapsibleTrigger>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <KawaiiMascot character="backpack" mood="happy" size={60} />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <Collapsible open={openSections.profile} onOpenChange={() => toggleSection('profile')}>
        <Card>
          <SectionHeader icon={User} title="Profile Information" section="profile" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={profile?.username || ""} disabled />
                <p className="text-xs text-muted-foreground">Username cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your display name"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Avatar Section */}
      <Collapsible open={openSections.avatar} onOpenChange={() => toggleSection('avatar')}>
        <Card>
          <SectionHeader icon={Image} title="Avatar" section="avatar" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <UserAvatar
                  username={profile?.username}
                  displayName={profile?.display_name}
                  avatarUrl={profile?.avatar_url}
                  avatarType={profile?.avatar_type}
                  avatarEmoji={profile?.avatar_emoji}
                  avatarKawaii={profile?.avatar_kawaii}
                  size="xl"
                />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Current type: <span className="capitalize">{profile?.avatar_type}</span>
                  </p>
                  <Button onClick={() => setShowAvatarPicker(true)}>
                    Change Avatar
                  </Button>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Subjects Section */}
      <Collapsible open={openSections.subjects} onOpenChange={() => toggleSection('subjects')}>
        <Card>
          <SectionHeader icon={BookOpen} title="My Subjects" section="subjects" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {userSubjects.length > 0 ? (
                <UserSubjectsDisplay 
                  subjects={userSubjects} 
                  onRemove={handleRemoveSubject}
                  editable
                />
              ) : (
                <p className="text-muted-foreground">No subjects added yet</p>
              )}
              
              <Button onClick={() => setShowSubjectSelector(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Subjects
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Universities Section */}
      <Collapsible open={openSections.universities} onOpenChange={() => toggleSection('universities')}>
        <Card>
          <SectionHeader icon={GraduationCap} title="Target Universities" section="universities" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {userUniversities.length > 0 ? (
                <UserUniversitiesDisplay 
                  universities={userUniversities} 
                  onRemove={handleRemoveUniversity}
                  editable
                />
              ) : (
                <p className="text-muted-foreground">No target universities added yet</p>
              )}
              
              <Button onClick={() => setShowUniversitySelector(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add University
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Privacy Section */}
      <Collapsible open={openSections.privacy} onOpenChange={() => toggleSection('privacy')}>
        <Card>
          <SectionHeader icon={isPublic ? Eye : EyeOff} title="Privacy" section="privacy" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    {isPublic 
                      ? "Anyone can see your profile, subjects, and papers solved"
                      : "Only followers can see your full profile"}
                  </p>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={(checked) => {
                    setIsPublic(checked);
                    handleSaveProfile();
                  }}
                />
              </div>

              <div className="text-sm p-3 rounded-lg bg-muted">
                <p className="font-medium mb-1">Your stats:</p>
                <p>XP: <span className="font-bold text-primary">{profile?.xp || 0}</span></p>
                <p>Papers Solved: <span className="font-bold">{profile?.papers_solved || 0}</span></p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Password Section */}
      <Collapsible open={openSections.password} onOpenChange={() => toggleSection('password')}>
        <Card>
          <SectionHeader icon={Lock} title="Change Password" section="password" />
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <Button 
                onClick={handleChangePassword} 
                disabled={loading || !newPassword || !confirmPassword}
              >
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Modals */}
      <AvatarPicker
        isOpen={showAvatarPicker}
        onClose={() => setShowAvatarPicker(false)}
        onSelectEmoji={handleSelectEmoji}
        onSelectKawaii={handleSelectKawaii}
        currentEmoji={profile?.avatar_emoji}
        currentKawaii={profile?.avatar_kawaii}
      />

      <SubjectSelector
        isOpen={showSubjectSelector}
        onClose={() => setShowSubjectSelector(false)}
        onSubjectsAdded={fetchUserSubjects}
        existingSubjects={userSubjects}
      />

      <UniversitySelector
        isOpen={showUniversitySelector}
        onClose={() => setShowUniversitySelector(false)}
        onUniversityAdded={fetchUserUniversities}
        existingUniversities={userUniversities}
        mode="add"
      />
    </div>
  );
};

export default DiscussionsSettings;
