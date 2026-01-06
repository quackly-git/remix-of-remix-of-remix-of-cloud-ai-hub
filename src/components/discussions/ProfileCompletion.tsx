import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KawaiiMascot } from "./KawaiiMascot";
import { UserProfile } from "@/contexts/DiscussionAuthContext";
import { Check, X, ChevronDown, ChevronUp, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileCompletionProps {
  profile: UserProfile;
  subjectsCount: number;
  onEditProfile: () => void;
  onAddSubjects: () => void;
}

export const ProfileCompletion = ({ 
  profile, 
  subjectsCount, 
  onEditProfile, 
  onAddSubjects,
}: ProfileCompletionProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Check if permanently hidden
    const hiddenSections = (profile as any).hidden_sections || [];
    setIsHidden(hiddenSections.includes('profile_completion'));
  }, [profile]);

  const completionItems = [
    { label: "Add display name", completed: !!profile.display_name },
    { label: "Add bio", completed: !!profile.bio },
    { label: "Set avatar", completed: profile.avatar_type !== 'initials' },
    { label: "Add at least one subject", completed: subjectsCount > 0 },
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const percentage = Math.round((completedCount / completionItems.length) * 100);

  // Auto-hide when 100% complete or permanently hidden
  if (percentage === 100 || isHidden) {
    return null;
  }

  const getMoodFromPercentage = () => {
    if (percentage === 100) return 'excited';
    if (percentage >= 75) return 'blissful';
    if (percentage >= 50) return 'happy';
    if (percentage >= 25) return 'shocked';
    return 'sad';
  };

  const handlePermanentHide = async () => {
    try {
      const currentHidden = (profile as any).hidden_sections || [];
      const { error } = await supabase
        .from('profiles')
        .update({ hidden_sections: [...currentHidden, 'profile_completion'] })
        .eq('user_id', profile.user_id);

      if (error) throw error;
      setIsHidden(true);
      toast({ title: "Profile completion hidden permanently" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-primary/20">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <KawaiiMascot character="backpack" mood={getMoodFromPercentage()} size={40} />
                <div>
                  <CardTitle className="text-base">Complete Your Profile</CardTitle>
                  <p className="text-sm text-muted-foreground">{percentage}% complete</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePermanentHide();
                  }}
                  title="Hide permanently"
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <Progress value={percentage} className="mb-4" />
            
            <div className="space-y-2">
              {completionItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-sm"
                >
                  {item.completed ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={item.completed ? 'text-muted-foreground line-through' : ''}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={onEditProfile}>
                Edit Profile
              </Button>
              {subjectsCount === 0 && (
                <Button size="sm" variant="outline" onClick={onAddSubjects}>
                  Add Subjects
                </Button>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
