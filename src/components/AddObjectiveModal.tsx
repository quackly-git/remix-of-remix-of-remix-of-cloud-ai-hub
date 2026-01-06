import { useState } from "react";
import { X, Plus, Target } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Topic } from "@/types/checklist";

interface AddObjectiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topics: Topic[];
  onAddObjective: (
    topicId: string,
    lessonId: string,
    objectiveText: string
  ) => void;
  onAddTopic: (topicTitle: string, topicDescription: string) => void;
}

export const AddObjectiveModal = ({
  open,
  onOpenChange,
  topics,
  onAddObjective,
  onAddTopic,
}: AddObjectiveModalProps) => {
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [objectiveText, setObjectiveText] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  const handleSave = () => {
    if (mode === "existing") {
      if (!selectedTopicId || !selectedLessonId || !objectiveText.trim()) {
        return;
      }
      onAddObjective(selectedTopicId, selectedLessonId, objectiveText.trim());
    } else {
      if (!newTopicTitle.trim()) return;
      onAddTopic(newTopicTitle.trim(), newTopicDescription.trim());
    }
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setMode("existing");
    setSelectedTopicId("");
    setSelectedLessonId("");
    setObjectiveText("");
    setNewTopicTitle("");
    setNewTopicDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Add to Syllabus
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new objective or create a custom topic
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
            <Button
              variant={mode === "existing" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setMode("existing")}
            >
              Add Objective
            </Button>
            <Button
              variant={mode === "new" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setMode("new")}
            >
              New Topic
            </Button>
          </div>

          {mode === "existing" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Topic</Label>
                <Select
                  value={selectedTopicId}
                  onValueChange={setSelectedTopicId}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Choose a topic..." />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTopic && (
                <div className="space-y-2">
                  <Label>Select Lesson</Label>
                  <Select
                    value={selectedLessonId}
                    onValueChange={setSelectedLessonId}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Choose a lesson..." />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTopic.lessons.map((lesson) => (
                        <SelectItem key={lesson.id} value={lesson.id}>
                          {lesson.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Objective Text</Label>
                <Input
                  value={objectiveText}
                  onChange={(e) => setObjectiveText(e.target.value)}
                  placeholder="Enter the objective..."
                  className="bg-background border-border"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Topic Title</Label>
                <Input
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Enter topic title..."
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Input
                  value={newTopicDescription}
                  onChange={(e) => setNewTopicDescription(e.target.value)}
                  placeholder="Enter topic description..."
                  className="bg-background border-border"
                />
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
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              {mode === "existing" ? "Add Objective" : "Create Topic"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
