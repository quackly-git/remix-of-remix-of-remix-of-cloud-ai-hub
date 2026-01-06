import { ExternalLink, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigateToContentProps {
  lessonId: string;
  lessonTitle: string;
  onNavigate: (lessonId: string) => void;
  contentType: "highlight" | "annotation" | "saved";
}

export function NavigateToContent({
  lessonId,
  lessonTitle,
  onNavigate,
  contentType,
}: NavigateToContentProps) {
  const handleClick = () => {
    onNavigate(lessonId);
  };

  const getTooltipText = () => {
    switch (contentType) {
      case "highlight":
        return `Go to highlighted text in "${lessonTitle}"`;
      case "annotation":
        return `Go to annotated text in "${lessonTitle}"`;
      case "saved":
        return `Go to saved content in "${lessonTitle}"`;
      default:
        return `Go to "${lessonTitle}"`;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
