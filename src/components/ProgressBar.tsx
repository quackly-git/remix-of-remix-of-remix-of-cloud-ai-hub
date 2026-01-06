import { Topic } from "@/types/checklist";
import { CheckCircle2, Circle } from "lucide-react";

interface ProgressBarProps {
  topics: Topic[];
}

export const ProgressBar = ({ topics }: ProgressBarProps) => {
  const allObjectives = topics.flatMap((topic) =>
    topic.lessons.flatMap((lesson) => lesson.objectives.filter((obj) => !obj.hidden))
  );

  // Count completed objectives and happy emojis
  const completed = allObjectives.filter((obj) => obj.completed || obj.emojiStatus === "happy").length;
  const total = allObjectives.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Overall Progress</h2>
          <p className="text-sm text-muted-foreground">
            {completed} of {total} objectives completed
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-foreground">{completed} done</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{total - completed} remaining</span>
          </div>
          <div className="text-2xl font-bold text-primary">{percentage}%</div>
        </div>
      </div>
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
