import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Subject } from "@/types";
import { getSubjectIcon, getSubjectIconColor } from "@/utils/subjectIcons";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const IconComponent = getSubjectIcon(subject.name);
  const iconColor = getSubjectIconColor(subject.name);
  const matches = iconColor.match(/(?:^|\s)(?:dark:)?bg-([\w-/]+)/g);

  const colors = matches.map((m) => m.split("bg-")[1]);

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "";
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressBgColor = (progress: number) => {
    if (progress === 0) return "";
    if (progress < 10) return "bg-red-100 dark:bg-red-900/20";
    if (progress < 30) return "bg-yellow-100 dark:bg-yellow-900/20";
    if (progress < 50) return "bg-yellow-100 dark:bg-yellow-900/20";
    if (progress < 80) return "bg-lime-100 dark:bg-lime-900/20";
    return "bg-green-100 dark:bg-green-900/20";
  };

  return (
    <Card
      className="card-hover cursor-pointer group h-full transition-all duration-300"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${iconColor}`}
          >
            <IconComponent className="h-6 w-6" />
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            {subject.code}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
          {subject.name}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {subject.description}
        </p>

        {subject.progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <div className="flex items-center gap-1">
                {subject.progress === 100 && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                <span className="font-medium">{subject.progress}%</span>
              </div>
            </div>
            <div
              className={`rounded-full p-1 ${getProgressBgColor(
                subject.progress
              )}`}
            >
              <Progress
                value={subject.progress}
                className="h-2"
                // style={
                //   {
                //     "--progress-background": getProgressColor(subject.progress),
                //   } as React.CSSProperties
                // }
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
