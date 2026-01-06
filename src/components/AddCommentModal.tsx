import { useState } from "react";
import { X, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/checklist";

interface AddCommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentComments: Comment[];
  onSaveComment: (comment: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export const AddCommentModal = ({
  open,
  onOpenChange,
  currentComments,
  onSaveComment,
  onEditComment,
  onDeleteComment,
}: AddCommentModalProps) => {
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSave = () => {
    if (!comment.trim()) return;
    onSaveComment(comment.trim());
    setComment("");
    onOpenChange(false);
  };

  const handleEdit = (commentId: string, text: string) => {
    setEditingId(commentId);
    setEditText(text);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editText.trim()) return;
    onEditComment(commentId, editText.trim());
    setEditingId(null);
    setEditText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Add Comment
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add notes or reminders for this objective
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment here..."
            className="min-h-[120px] bg-background border-border resize-none"
          />

          {currentComments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Previous Comments</h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {currentComments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-secondary/30 rounded-lg border border-border group"
                  >
                    {editingId === c.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="min-h-[60px] bg-background border-border resize-none"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(c.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingId(null)}
                            className="border-border"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-foreground">{c.text}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(c.timestamp).toLocaleDateString()} at{" "}
                            {new Date(c.timestamp).toLocaleTimeString()}
                          </p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEdit(c.id, c.text)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:text-destructive"
                              onClick={() => onDeleteComment(c.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Add Comment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
