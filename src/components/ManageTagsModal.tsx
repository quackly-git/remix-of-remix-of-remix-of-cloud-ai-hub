import { useState } from "react";
import { X, Plus, Tag as TagIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "@/types/checklist";
import { Badge } from "@/components/ui/badge";

interface ManageTagsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTags: Tag[];
  onSaveTags: (tags: Tag[]) => void;
}

const TAG_COLORS = [
  { name: "Blue", value: "hsl(221, 83%, 53%)" },
  { name: "Green", value: "hsl(142, 71%, 45%)" },
  { name: "Purple", value: "hsl(271, 81%, 56%)" },
  { name: "Red", value: "hsl(0, 72%, 51%)" },
  { name: "Yellow", value: "hsl(48, 100%, 50%)" },
  { name: "Pink", value: "hsl(330, 81%, 60%)" },
  { name: "Orange", value: "hsl(18, 95%, 60%)" },
  { name: "Teal", value: "hsl(180, 71%, 45%)" },
];

export const ManageTagsModal = ({
  open,
  onOpenChange,
  currentTags,
  onSaveTags,
}: ManageTagsModalProps) => {
  const [tags, setTags] = useState<Tag[]>(currentTags);
  const [newTagLabel, setNewTagLabel] = useState("");
  const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0].value);

  const addTag = () => {
    if (!newTagLabel.trim()) return;
    
    const newTag: Tag = {
      id: `tag-${Date.now()}`,
      label: newTagLabel.trim(),
      color: selectedColor,
    };
    
    setTags([...tags, newTag]);
    setNewTagLabel("");
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((t) => t.id !== tagId));
  };

  const handleSave = () => {
    onSaveTags(tags);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-primary" />
                Manage Tags
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add or remove tags for this objective
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newTagLabel}
                onChange={(e) => setNewTagLabel(e.target.value)}
                placeholder="Enter tag name..."
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                className="bg-background border-border"
              />
              <Button onClick={addTag} size="icon" className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {TAG_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.value
                      ? "border-foreground scale-110"
                      : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-secondary/30 rounded-lg border border-border">
            {tags.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tags added yet</p>
            ) : (
              tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 border"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    borderColor: `${tag.color}40`,
                    color: tag.color,
                  }}
                >
                  {tag.label}
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="ml-1 hover:opacity-70 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save Tags
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
