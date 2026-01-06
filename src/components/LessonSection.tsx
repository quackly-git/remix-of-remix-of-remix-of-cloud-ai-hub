import { ChevronDown, EyeOff, Eye, MoreVertical } from "lucide-react";
import { Lesson } from "@/types/checklist";
import { ObjectiveItem } from "./ObjectiveItem";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LessonSectionProps {
  lesson: Lesson;
  strikeThrough: boolean;
  emojiMode: boolean;
  expandAll: boolean;
  onToggleCollapsed: () => void;
  onToggleObjective: (objectiveId: string) => void;
  onEmojiChange: (
    objectiveId: string,
    status: "happy" | "neutral" | "sad" | null
  ) => void;
  onManageObjectiveTags: (objectiveId: string) => void;
  onAddObjectiveComment: (objectiveId: string) => void;
  onToggleObjectiveHidden: (objectiveId: string) => void;
  onToggleLessonHidden: () => void;
  onEditObjective: (objectiveId: string) => void;
}

export const LessonSection = ({
  lesson,
  strikeThrough,
  emojiMode,
  expandAll,
  onToggleCollapsed,
  onToggleObjective,
  onEmojiChange,
  onManageObjectiveTags,
  onAddObjectiveComment,
  onToggleObjectiveHidden,
  onToggleLessonHidden,
  onEditObjective,
}: LessonSectionProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const visibleObjectives = lesson.objectives.filter((obj) => !obj.hidden);
  const isOpen = expandAll || !lesson.collapsed;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleObjective = (objectiveId: string) => {
    setShowConfetti(true);
    onToggleObjective(objectiveId);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleEmojiChange = (
    objectiveId: string,
    status: "happy" | "neutral" | "sad" | null
  ) => {
    if (status !== null) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    onEmojiChange(objectiveId, status);
  };

  return (
    <div className="bg-card/50 border border-border rounded-lg overflow-hidden relative">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      <Collapsible open={isOpen} onOpenChange={onToggleCollapsed}>
        <div className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors group">
          <CollapsibleTrigger
            className="flex items-center gap-2 flex-1 text-left"
            disabled={expandAll}
          >
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
            <h4 className="text-sm font-medium text-foreground">
              {lesson.title}
            </h4>
            <span className="text-xs text-muted-foreground ml-2">
              {visibleObjectives.length}
            </span>
          </CollapsibleTrigger>

          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-popover border-border"
            >
              <DropdownMenuItem
                onClick={onToggleLessonHidden}
                className="cursor-pointer"
              >
                {lesson.hidden ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Unhide Lesson
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Lesson
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="px-4 pb-4 space-y-1">
            {visibleObjectives.map((objective) => (
              <ObjectiveItem
                key={objective.id}
                objective={objective}
                strikeThrough={strikeThrough}
                emojiMode={emojiMode}
                onToggle={() => handleToggleObjective(objective.id)}
                onEmojiChange={(status) =>
                  handleEmojiChange(objective.id, status)
                }
                onManageTags={() => onManageObjectiveTags(objective.id)}
                onAddComment={() => onAddObjectiveComment(objective.id)}
                onToggleHidden={() => onToggleObjectiveHidden(objective.id)}
                onEditObjective={() => onEditObjective(objective.id)}
                onCommentClick={() => onAddObjectiveComment(objective.id)}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
