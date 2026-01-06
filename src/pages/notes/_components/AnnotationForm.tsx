import { useState, useEffect, useRef } from "react";
import { Check, Tag, MessageCircle, Copy, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AnnotationFormProps {
  selectedText: string;
  onSave: (tags: string[], comment: string) => void;
  onCancel: () => void;
  onHide?: () => void;
  isOpen: boolean;
  position?: { x: number; y: number };
  initialTags?: string;
  initialComment?: string;
  onTagsChange?: (tags: string) => void;
  onCommentChange?: (comment: string) => void;
  editingAnnotationId?: string | null;
  onEditingAnnotationChange?: (id: string | null) => void;
}

const PREDEFINED_TAGS = [
  "important",
  "revise again",
  "not in syllabus",
  "mastered",
  "doubt",
];

const TAG_COLORS = {
  "important":
    "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
  "doubt":
    "bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900 dark:text-rose-200",
  "revise again":
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
  "mastered":
    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
  "question":
    "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200",
  "example":
    "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200",
};

export function AnnotationForm({
  selectedText,
  onSave,
  onCancel,
  onHide,
  isOpen,
  position,
  initialTags = "",
  initialComment = "",
  onTagsChange,
  onCommentChange,
  editingAnnotationId,
  onEditingAnnotationChange,
}: AnnotationFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [copied, setCopied] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Initialize with existing data
  useEffect(() => {
    if (initialTags) {
      const tags = initialTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      setSelectedTags(tags);
    } else {
      setSelectedTags([]);
    }
    setComment(initialComment || "");
  }, [initialTags, initialComment]);

  // Handle click outside to close popover - but only if no modal is open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close popover if any modal is open
      if (showTagModal || showCommentModal) {
        return;
      }

      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel, showTagModal, showCommentModal]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    // Update parent component if callback provided
    if (onTagsChange) {
      onTagsChange(newSelectedTags.join(", "));
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      const newSelectedTags = [...selectedTags, customTag.trim()];
      setSelectedTags(newSelectedTags);
      setCustomTag("");

      // Update parent component if callback provided
      if (onTagsChange) {
        onTagsChange(newSelectedTags.join(", "));
      }
    }
  };

  const handleSaveTags = () => {
    setShowTagModal(false);
    if (selectedTags.length > 0 || comment) {
      onSave(selectedTags, comment);
    }
  };

  const handleSaveComment = () => {
    setShowCommentModal(false);
    if (selectedTags.length > 0 || comment) {
      onSave(selectedTags, comment);
    }
  };

  const handleTagModalClose = (open: boolean) => {
    setShowTagModal(open);
    // Reset form state when closing modal if not editing existing annotation
    if (!open && !editingAnnotationId) {
      setSelectedTags([]);
      setCustomTag("");
    }
  };

  const handleCommentModalClose = (open: boolean) => {
    setShowCommentModal(open);
    // Reset form state when closing modal if not editing existing annotation
    if (!open && !editingAnnotationId) {
      setComment("");
    }
  };

  const handleCommentChange = (newComment: string) => {
    setComment(newComment);
    if (onCommentChange) {
      onCommentChange(newComment);
    }
  };

  const getTagColor = (tag: string) => {
    return (
      TAG_COLORS[tag as keyof typeof TAG_COLORS] ||
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Compact Popover with 4 icons now */}
      <div
        ref={popoverRef}
        className="fixed z-50 bg-white dark:bg-[#111111] border rounded-lg shadow-lg p-2 flex items-center gap-1"
        style={{
          left: position?.x || 0,
          top: position?.y || 0,
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0"
          title="Copy text"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTagModal(true)}
          className="h-8 w-8 p-0"
          title="Add tags"
        >
          <Tag className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCommentModal(true)}
          className="h-8 w-8 p-0"
          title="Add comment"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleHide}
          className="h-8 w-8 p-0"
          title="Hide/blur text"
        >
          <EyeOff className="h-4 w-4" />
        </Button>
      </div>

      {/* Tags Modal */}
      <Dialog open={showTagModal} onOpenChange={handleTagModalClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAnnotationId ? "Edit Tags" : "Add Tags"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-3 rounded">
              <span className="text-xs text-muted-foreground">
                Selected text:
              </span>
              <p className="mt-1 text-sm italic">"{selectedText}"</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PREDEFINED_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedTags.includes(tag)
                      ? getTagColor(tag)
                      : "border border-dashed border-muted-foreground/50 hover:bg-muted/50"
                  }`}
                >
                  {selectedTags.includes(tag) && (
                    <Check className="inline h-3 w-3 mr-1" />
                  )}
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="text-sm"
                onKeyPress={(e) => e.key === "Enter" && addCustomTag()}
              />
              <Button
                size="sm"
                onClick={addCustomTag}
                disabled={!customTag.trim()}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`text-xs cursor-pointer ${getTagColor(tag)}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveTags} className="flex-1">
                {editingAnnotationId ? "Update Tags" : "Save Tags"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTagModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comment Modal */}
      <Dialog open={showCommentModal} onOpenChange={handleCommentModalClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAnnotationId ? "Edit Comment" : "Add Comment"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-3 rounded">
              <span className="text-xs text-muted-foreground">
                Selected text:
              </span>
              <p className="mt-1 text-sm italic">"{selectedText}"</p>
            </div>

            <Textarea
              placeholder="Add a comment or note..."
              value={comment}
              onChange={(e) => handleCommentChange(e.target.value)}
              className="min-h-[80px]"
            />

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveComment} className="flex-1">
                {editingAnnotationId ? "Update Comment" : "Save Comment"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCommentModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
