import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  Target,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useLocalStorage } from "@/utils/useLocalStorage";

interface LearningObjective {
  id: string;
  text: string;
}

interface LearningObjectivesProps {
  objectives: LearningObjective[];
  lessonId: string;
  title?: string;
  className?: string;
}

export function LearningObjectives({
  objectives,
  lessonId,
  title = "Objectives",
  className = "",
}: LearningObjectivesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [completedObjectives, setCompletedObjectives] = useLocalStorage<
    string[]
  >(`learning-objectives-${lessonId}`, []);

  const toggleObjective = (objectiveId: string) => {
    setCompletedObjectives((prev) =>
      prev.includes(objectiveId)
        ? prev.filter((id) => id !== objectiveId)
        : [...prev, objectiveId]
    );
  };

  const completedCount = completedObjectives.length;
  const totalCount = objectives.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      className={`border border-primary/10 dark:bg-[#0b0b0b] bg-[#ffffffc5] dark:border-primary/10 rounded-lg p-6 ${className}`}
    >
      <button
        className="flex items-center justify-between w-full mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Target className="h-5 w-5 text-primary dark:text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-primary dark:text-primary">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {completedCount}/{totalCount} completed
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-primary dark:text-primary">
            {progressPercentage}%
          </div>
          <div className="text-xs text-primary dark:text-primary">Complete</div>
        </div>

        <div className="ml-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {totalCount > 0 && (
        <div className="w-full bg-[#ffffffc5] dark:bg-[#151515] rounded-full h-2 mb-4">
          <div
            className={`${
              progressPercentage >= 90
                ? "bg-[#1cc7695e]/60"
                : progressPercentage >= 80
                ? "bg-[#22c55e]/60"
                : progressPercentage >= 70
                ? "bg-[#5fcc16]/60"
                : progressPercentage >= 50
                ? "bg-[#84cc16]/60"
                : progressPercentage >= 40
                ? "bg-[#ead308]/60"
                : progressPercentage >= 30
                ? "bg-[#eab308]/60"
                : progressPercentage >= 20
                ? "bg-[#f97316]/60"
                : progressPercentage >= 10
                ? "bg-[#f95a16]/60"
                : "bg-[#ef4444]/60"
            } h-2 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      {isOpen && (
        <>
          <div className="space-y-3">
            {objectives.map((objective) => {
              const isCompleted = completedObjectives.includes(objective.id);

              return (
                <div
                  key={objective.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-gray-800/50 ${
                    isCompleted
                      ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
                      : "bg-white/30 dark:bg-gray-800/30"
                  }`}
                >
                  <button
                    onClick={() => toggleObjective(objective.id)}
                    className="mt-0.5 transition-transform hover:scale-110"
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400 hover:text-green-500" />
                    )}
                  </button>

                  <div className="flex-1">
                    <p
                      className={`text-sm leading-relaxed transition-all duration-200 ${
                        isCompleted
                          ? "text-green-800 dark:text-green-200 line-through opacity-75"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {objective.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {completedCount === totalCount && totalCount > 0 && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-950/30 border border-green-300 dark:border-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Congratulations! You've completed all syllabus objectives for
                  this chapter! You can mark the lessons as complete from the
                  navbar 😄
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
