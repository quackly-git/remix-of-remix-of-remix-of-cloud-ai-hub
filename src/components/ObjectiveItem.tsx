import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  Tag as TagIcon,
  MessageSquare,
  EyeOff,
  Eye,
  SmilePlus,
  Meh,
  Frown,
  Edit,
  MessageCircle,
  Smile,
} from "lucide-react";
import { generateCommunitySlug } from "@/utils/threadHelpers";
import { Checkbox } from "@/components/ui/checkbox";
import { Objective } from "@/types/checklist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ObjectiveItemProps {
  objective: Objective;
  strikeThrough: boolean;
  emojiMode: boolean;
  onToggle: () => void;
  onEmojiChange: (status: "happy" | "neutral" | "sad" | null) => void;
  onManageTags: () => void;
  onAddComment: () => void;
  onToggleHidden: () => void;
  onEditObjective: () => void;
  onCommentClick: () => void;
}

export const ObjectiveItem = ({
  objective,
  strikeThrough,
  emojiMode,
  onToggle,
  onEmojiChange,
  onManageTags,
  onAddComment,
  onToggleHidden,
  onEditObjective,
  onCommentClick,
}: ObjectiveItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoToThread = () => {
    const slug = generateCommunitySlug(objective.id, objective.text);
    navigate(`/threads/${slug}`);
  };

  const emojiIconMap = {
    happy: Smile,
    neutral: Meh,
    sad: Frown,
  };

  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-200">
      {emojiMode ? (
        <div className="flex gap-1">
          {(["happy", "neutral", "sad"] as const).map((emoji) => {
            const IconComponent = emojiIconMap[emoji];
            const colorClasses = {
              happy:
                objective.emojiStatus === emoji
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950",
              neutral:
                objective.emojiStatus === emoji
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950",
              sad:
                objective.emojiStatus === emoji
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950",
            };
            return (
              <button
                key={emoji}
                onClick={() =>
                  onEmojiChange(objective.emojiStatus === emoji ? null : emoji)
                }
                className={`p-1.5 rounded-lg transition-all hover:scale-110 ${
                  colorClasses[emoji]
                } ${objective.emojiStatus === emoji ? "scale-105" : ""}`}
              >
                <IconComponent className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      ) : (
        <Checkbox
          checked={objective.completed}
          onCheckedChange={onToggle}
          className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm ${
              objective.completed && strikeThrough
                ? "line-through text-muted-foreground"
                : "text-foreground"
            } transition-all duration-200`}
          >
            {objective.text}
          </span>
          {objective.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="text-xs px-2 py-0.5 border"
              style={{
                backgroundColor: `${tag.color}20`,
                borderColor: `${tag.color}40`,
                color: tag.color,
              }}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
        {objective.comments.length > 0 && (
          <button
            onClick={onCommentClick}
            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <MessageSquare className="h-3 w-3" />
            <span>
              {objective.comments.length} comment
              {objective.comments.length > 1 ? "s" : ""}
            </span>
          </button>
        )}
      </div>

      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-popover border-border"
        >
          <DropdownMenuItem
            onClick={onEditObjective}
            className="cursor-pointer"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onManageTags} className="cursor-pointer">
            <TagIcon className="h-4 w-4 mr-2" />
            Manage Tags
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAddComment} className="cursor-pointer">
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Comment
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleGoToThread}
            disabled={true}
            className="cursor-not-allowed pointer-events-none text-muted-foreground"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Go to Thread
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleHidden} className="cursor-pointer">
            {objective.hidden ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Unhide
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
