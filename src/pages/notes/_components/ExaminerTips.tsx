import { Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExaminerTip {
  id: string;
  type: "tip" | "warning" | "success" | "info";
  title: string;
  content: string;
}

interface ExaminerTipsProps {
  tips: ExaminerTip[];
  title?: string;
  className?: string;
}

export function ExaminerTips({
  tips,
  title = "Tips+",
  className = "",
}: ExaminerTipsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <Lightbulb className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case "tip":
        return {
          container:
            "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
          icon: "text-blue-600 dark:text-blue-400",
          title: "text-blue-900 dark:text-blue-100",
          badge:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
      case "warning":
        return {
          container:
            "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
          icon: "text-yellow-600 dark:text-yellow-400",
          title: "text-yellow-900 dark:text-yellow-100",
          badge:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        };
      case "success":
        return {
          container:
            "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
          icon: "text-green-600 dark:text-green-400",
          title: "text-green-900 dark:text-green-100",
          badge:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        };
      case "info":
        return {
          container:
            "bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800",
          icon: "text-gray-600 dark:text-gray-400",
          title: "text-gray-900 dark:text-gray-100",
          badge:
            "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
        };
      default:
        return {
          container:
            "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
          icon: "text-blue-600 dark:text-blue-400",
          title: "text-blue-900 dark:text-blue-100",
          badge:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        };
    }
  };

  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-primary">{title}</h4>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => {
          const styles = getStyles(tip.type);
          return (
            <div
              key={tip.id}
              className={`border rounded-lg p-4 ${styles.container}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${styles.icon}`}>
                  {getIcon(tip.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className={`font-medium ${styles.title}`}>
                      {tip.title}
                    </h5>
                    <Badge className={`text-xs ${styles.badge}`}>
                      {tip.type.charAt(0).toUpperCase() + tip.type.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
