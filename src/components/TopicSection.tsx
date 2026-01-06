import { ChevronDown, EyeOff, Eye, MoreVertical } from "lucide-react";
import { Topic } from "@/types/checklist";
import { LessonSection } from "./LessonSection";
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

interface TopicSectionProps {
  topic: Topic;
  strikeThrough: boolean;
  emojiMode: boolean;
  expandAll: boolean;
  onToggleCollapsed: () => void;
  onToggleLessonCollapsed: (lessonId: string) => void;
  onToggleObjective: (lessonId: string, objectiveId: string) => void;
  onEmojiChange: (
    lessonId: string,
    objectiveId: string,
    status: "happy" | "neutral" | "sad" | null
  ) => void;
  onManageObjectiveTags: (lessonId: string, objectiveId: string) => void;
  onAddObjectiveComment: (lessonId: string, objectiveId: string) => void;
  onToggleObjectiveHidden: (lessonId: string, objectiveId: string) => void;
  onToggleLessonHidden: (lessonId: string) => void;
  onToggleTopicHidden: () => void;
  onEditObjective: (lessonId: string, objectiveId: string) => void;
}

export const TopicSection = ({
  topic,
  strikeThrough,
  emojiMode,
  expandAll,
  onToggleCollapsed,
  onToggleLessonCollapsed,
  onToggleObjective,
  onEmojiChange,
  onManageObjectiveTags,
  onAddObjectiveComment,
  onToggleObjectiveHidden,
  onToggleLessonHidden,
  onToggleTopicHidden,
  onEditObjective,
}: TopicSectionProps) => {
  const visibleLessons = topic.lessons.filter((lesson) => !lesson.hidden);
  const isOpen = expandAll || !topic.collapsed;

  const totalObjectives = visibleLessons.reduce(
    (sum, lesson) => sum + lesson.objectives.filter((o) => !o.hidden).length,
    0
  );
  const completedObjectives = visibleLessons.reduce(
    (sum, lesson) =>
      sum +
      lesson.objectives.filter(
        (o) => !o.hidden && (o.completed || o.emojiStatus === "happy")
      ).length,
    0
  );

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in">
      <Collapsible open={isOpen} onOpenChange={onToggleCollapsed}>
        <div className="group">
          <CollapsibleTrigger
            className="w-full flex items-start gap-3 p-6 hover:bg-secondary/30 transition-colors text-left"
            disabled={expandAll}
          >
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-200 mt-0.5 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1">
                {topic.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {topic.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  {completedObjectives}/{totalObjectives} objectives completed
                </span>
                <div className="flex-1 max-w-xs bg-secondary rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${
                        totalObjectives > 0
                          ? (completedObjectives / totalObjectives) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-popover border-border"
              >
                <DropdownMenuItem
                  onClick={onToggleTopicHidden}
                  className="cursor-pointer"
                >
                  {topic.hidden ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Unhide Topic
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Topic
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CollapsibleTrigger>

          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="px-6 pb-6 space-y-3">
              {visibleLessons.map((lesson) => (
                <LessonSection
                  key={lesson.id}
                  lesson={lesson}
                  strikeThrough={strikeThrough}
                  emojiMode={emojiMode}
                  expandAll={expandAll}
                  onToggleCollapsed={() => onToggleLessonCollapsed(lesson.id)}
                  onToggleObjective={(objectiveId) =>
                    onToggleObjective(lesson.id, objectiveId)
                  }
                  onEmojiChange={(objectiveId, status) =>
                    onEmojiChange(lesson.id, objectiveId, status)
                  }
                  onManageObjectiveTags={(objectiveId) =>
                    onManageObjectiveTags(lesson.id, objectiveId)
                  }
                  onAddObjectiveComment={(objectiveId) =>
                    onAddObjectiveComment(lesson.id, objectiveId)
                  }
                  onToggleObjectiveHidden={(objectiveId) =>
                    onToggleObjectiveHidden(lesson.id, objectiveId)
                  }
                  onToggleLessonHidden={() => onToggleLessonHidden(lesson.id)}
                  onEditObjective={(objectiveId) =>
                    onEditObjective(lesson.id, objectiveId)
                  }
                />
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};
