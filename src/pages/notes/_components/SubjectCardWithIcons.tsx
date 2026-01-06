import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { getSubjectIcon, getSubjectIconColor } from "@/utils/subjectIcons";

interface Subject {
  id: string;
  title: string;
  description: string;
  progress: number;
  chapters: number;
  estimatedHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
}

interface SubjectCardWithIconsProps {
  subject: Subject;
  onClick: () => void;
}

export function SubjectCardWithIcons({
  subject,
  onClick,
}: SubjectCardWithIconsProps) {
  const IconComponent = getSubjectIcon(subject.title);
  const iconColor = getSubjectIconColor(subject.title);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${iconColor}`}
            >
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                {subject.title}
              </h3>
              <Badge
                className={getDifficultyColor(subject.difficulty)}
                variant="secondary"
              >
                {subject.difficulty}
              </Badge>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {subject.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{subject.chapters} chapters</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{subject.estimatedHours}h</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{subject.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${subject.progress}%` }}
            />
          </div>
        </div>

        <Button
          onClick={onClick}
          className="w-full group-hover:shadow-md transition-all"
          size="sm"
        >
          Continue Learning
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
