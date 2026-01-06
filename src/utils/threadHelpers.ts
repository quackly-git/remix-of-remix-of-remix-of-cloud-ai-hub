import { Topic } from "@/types/checklist";

export const generateCommunitySlug = (objectiveId: string, objectiveText: string): string => {
  // Create a slug from the objective text
  const words = objectiveText.toLowerCase().split(" ");
  const firstWord = words[0].replace(/[^a-z0-9]/g, "");
  const number = objectiveId.split("-").pop() || "1";
  return `${firstWord}${number}`;
};

export const getCommunityColor = (index: number): string => {
  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
  ];
  return colors[index % colors.length];
};

export const extractAllObjectives = (topics: Topic[]) => {
  const objectives: Array<{
    id: string;
    text: string;
    lessonTitle: string;
    topicTitle: string;
  }> = [];

  topics.forEach((topic) => {
    topic.lessons.forEach((lesson) => {
      lesson.objectives.forEach((objective) => {
        if (!objective.hidden) {
          objectives.push({
            id: objective.id,
            text: objective.text,
            lessonTitle: lesson.title,
            topicTitle: topic.title,
          });
        }
      });
    });
  });

  return objectives;
};
