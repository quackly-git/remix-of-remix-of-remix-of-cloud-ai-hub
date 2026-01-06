import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot } from "./KawaiiMascot";
import { Hash, MessageSquarePlus } from "lucide-react";

interface CreateDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export const CreateDiscussionModal = ({ isOpen, onClose, onCreated }: CreateDiscussionModalProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useDiscussionAuth();
  const { toast } = useToast();

  const generateSlugSync = (name: string, count: number): string => {
    const nextNumber = count + 1;
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 30);
    
    return `${nextNumber}-${baseSlug}`;
  };

  const handleNameChange = async (value: string) => {
    setName(value);
    // Get count for slug
    const { count } = await supabase
      .from('custom_discussions')
      .select('*', { count: 'exact', head: true });
    
    setSlug(generateSlugSync(value, count || 0));
  };

  const handleSlugChange = (value: string) => {
    // Just clean the input for manual slug editing
    const cleaned = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 50);
    setSlug(cleaned);
  };

  const handleCreate = async () => {
    if (!user || !name.trim() || !slug.trim()) {
      toast({ title: "Please fill in the discussion name", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('custom_discussions')
        .insert({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast({ title: "A discussion with this URL already exists", variant: "destructive" });
        } else {
          throw error;
        }
        return;
      }

      toast({ title: "Discussion created!" });
      onCreated?.();
      handleReset();
      onClose();
      navigate(`/discussion/${data.slug}`);
    } catch (error: any) {
      toast({ title: "Error creating discussion", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setSlug("");
    setDescription("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5" />
            Create New Discussion
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center py-2">
          <KawaiiMascot character="speechBubble" mood="happy" size={60} />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Discussion Name</Label>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Study Tips for Exams"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              URL Slug
            </Label>
            <Input
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="1-study-tips-for-exams"
            />
            <p className="text-xs text-muted-foreground">
              Your discussion will be at: /discussion/{slug || 'your-slug'}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this discussion about?"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim() || !slug.trim() || loading}>
            {loading ? 'Creating...' : 'Create Discussion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
