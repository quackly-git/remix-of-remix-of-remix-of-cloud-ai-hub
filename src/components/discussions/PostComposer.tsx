import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useDiscussionAuth } from "@/contexts/DiscussionAuthContext";
import { useToast } from "@/hooks/use-toast";
import { KawaiiMascot, getMoodFromAction } from "./KawaiiMascot";
import { ImageUpload } from "./ImageUpload";
import { GifPickerButton } from "./GifPickerButton";
import { EmojiPickerButton } from "./EmojiPicker";
import { pp_data } from "@/data/pp_data";
import { Send, Save, X, Tag, Plus, FileText, GraduationCap, Users } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color: string;
  is_custom: boolean;
}

interface CustomDiscussion {
  id: string;
  name: string;
  slug: string;
}

interface PostComposerProps {
  isOpen: boolean;
  onClose: () => void;
  threadId: string;
  onPostCreated: () => void;
  discussionType?: string;
  discussionId?: string;
  editPost?: {
    id: string;
    title: string;
    content: string;
    question_number: number | null;
    images: string[];
    tagIds: string[];
  } | null;
}

export const PostComposer = ({ 
  isOpen, 
  onClose, 
  threadId, 
  onPostCreated,
  discussionType = 'general',
  discussionId = '',
  editPost 
}: PostComposerProps) => {
  const { user, refreshProfile } = useDiscussionAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [questionNumber, setQuestionNumber] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [showNewTag, setShowNewTag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mascotMood, setMascotMood] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Discussion selection state
  const [selectedDiscussionType, setSelectedDiscussionType] = useState(discussionType || 'general');
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(discussionId || '');
  const [customDiscussions, setCustomDiscussions] = useState<CustomDiscussion[]>([]);

  // Get standard papers for dropdown
  const standardPapers = pp_data.filter(p => p.id && p.year && p.season);
  const papersByYear = standardPapers.reduce((acc, paper) => {
    if (!paper.year) return acc;
    if (!acc[paper.year]) acc[paper.year] = [];
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, typeof standardPapers>);
  const years = Object.keys(papersByYear).map(Number).sort((a, b) => b - a);

  useEffect(() => {
    fetchTags();
    fetchCustomDiscussions();
  }, []);

  const fetchCustomDiscussions = async () => {
    const { data } = await supabase
      .from('custom_discussions')
      .select('id, name, slug')
      .order('name');
    if (data) setCustomDiscussions(data);
  };

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setQuestionNumber(editPost.question_number?.toString() || "");
      setImages(editPost.images || []);
      setSelectedTags(editPost.tagIds || []);
    } else {
      resetForm();
    }
  }, [editPost, isOpen]);

  const fetchTags = async () => {
    const { data } = await supabase.from('tags').select('*').order('name');
    if (data) setAvailableTags(data);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setQuestionNumber("");
    setImages([]);
    setSelectedTags([]);
    setNewTagName("");
    setShowNewTag(false);
    setMascotMood('idle');
    setSelectedDiscussionType(discussionType || 'general');
    setSelectedDiscussionId(discussionId || '');
  };

  const handleAddTag = async () => {
    if (!newTagName.trim() || !user) return;
    
    const { data, error } = await supabase
      .from('tags')
      .insert({ name: newTagName.trim(), is_custom: true, created_by: user.id })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        toast({ title: "Tag already exists", variant: "destructive" });
      }
      return;
    }
    
    setAvailableTags([...availableTags, data]);
    setSelectedTags([...selectedTags, data.id]);
    setNewTagName("");
    setShowNewTag(false);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (asDraft: boolean = false) => {
    if (!user || !title.trim() || !content.trim()) {
      toast({ title: "Please fill in title and content", variant: "destructive" });
      return;
    }

    setLoading(true);
    setMascotMood('loading');

    try {
      const postData = {
        user_id: user.id,
        thread_id: threadId && threadId.trim() !== '' ? threadId : null,
        title: title.trim(),
        content: content.trim(),
        question_number: questionNumber ? parseInt(questionNumber) : null,
        images,
        is_draft: asDraft,
        discussion_type: selectedDiscussionType,
        discussion_id: selectedDiscussionId || null,
      };

      let postId: string;

      if (editPost) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editPost.id);
        
        if (error) throw error;
        postId = editPost.id;

        // Remove old tags
        await supabase.from('post_tags').delete().eq('post_id', postId);
      } else {
        const { data, error } = await supabase
          .from('posts')
          .insert(postData)
          .select()
          .single();
        
        if (error) throw error;
        postId = data.id;
      }

      // Add tags
      if (selectedTags.length > 0) {
        await supabase.from('post_tags').insert(
          selectedTags.map(tagId => ({ post_id: postId, tag_id: tagId }))
        );
      }

      setMascotMood('success');
      toast({ 
        title: asDraft 
          ? "Draft saved!" 
          : editPost 
            ? "Post updated!" 
            : "Post created! +2 XP 🎉" 
      });
      
      resetForm();
      onClose();
      onPostCreated();
      if (!asDraft && !editPost) refreshProfile();
    } catch (error: any) {
      setMascotMood('error');
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGifSelect = (gifUrl: string) => {
    setImages([...images, gifUrl]);
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KawaiiMascot character="speechBubble" mood={getMoodFromAction(mascotMood)} size={40} />
            {editPost ? "Edit Post" : "Create New Post"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Discussion Type Selection - Only show if not pre-set */}
          {!discussionId && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Post to Discussion
              </Label>
              <div className="flex gap-2 flex-wrap">
                <Badge 
                  variant={selectedDiscussionType === 'general' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => { setSelectedDiscussionType('general'); setSelectedDiscussionId(''); }}
                >
                  📝 General
                </Badge>
                <Badge 
                  variant={selectedDiscussionType === 'paper' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setSelectedDiscussionType('paper')}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Past Paper
                </Badge>
                <Badge 
                  variant={selectedDiscussionType === 'custom' ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setSelectedDiscussionType('custom')}
                >
                  <Users className="h-3 w-3 mr-1" />
                  Community
                </Badge>
              </div>
              
              {/* Paper Selection */}
              {selectedDiscussionType === 'paper' && (
                <Select value={selectedDiscussionId} onValueChange={setSelectedDiscussionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a past paper..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {years.map(year => (
                      <SelectGroup key={year}>
                        <SelectLabel>{year}</SelectLabel>
                        {papersByYear[year].map(paper => (
                          <SelectItem key={paper.id} value={paper.id}>
                            {paper.year} {paper.season?.charAt(0).toUpperCase()}{paper.season?.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {/* Custom Discussion Selection */}
              {selectedDiscussionType === 'custom' && (
                <Select value={selectedDiscussionId} onValueChange={setSelectedDiscussionId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a community discussion..." />
                  </SelectTrigger>
                  <SelectContent>
                    {customDiscussions.map(d => (
                      <SelectItem key={d.id} value={d.slug}>
                        {d.name}
                      </SelectItem>
                    ))}
                    {customDiscussions.length === 0 && (
                      <SelectItem value="" disabled>No discussions yet</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question or topic?"
            />
          </div>

          {/* Question Number */}
          <div className="space-y-2">
            <Label>Question Number (optional)</Label>
            <Select value={questionNumber || "none"} onValueChange={(val) => setQuestionNumber(val === "none" ? "" : val)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Q#" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <SelectItem key={num} value={num.toString()}>Q{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your question or share your thoughts..."
              rows={6}
            />
            <div className="flex gap-2">
              <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
              <GifPickerButton onGifSelect={handleGifSelect} />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Images</Label>
            <ImageUpload images={images} onImagesChange={setImages} />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer transition-all"
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                  {selectedTags.includes(tag.id) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
              
              {showNewTag ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="New tag..."
                    className="w-32 h-6 text-xs"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button size="sm" variant="ghost" onClick={handleAddTag}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowNewTag(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Badge
                  variant="outline"
                  className="cursor-pointer border-dashed"
                  onClick={() => setShowNewTag(true)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Tag
                </Badge>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSubmit(true)} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit(false)} disabled={loading}>
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Posting..." : editPost ? "Update" : "Post (+2 XP)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
