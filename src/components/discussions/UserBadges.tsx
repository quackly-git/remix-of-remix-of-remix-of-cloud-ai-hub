import { Shield, Heart, BadgeCheck, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUserBadges, badgeConfig, BadgeType } from "@/data/badges";

interface UserBadgesProps {
  username: string;
  size?: number;
}

const iconMap = {
  Shield,
  Heart,
  BadgeCheck,
  AlertTriangle,
};

export function UserBadges({ username, size = 14 }: UserBadgesProps) {
  const badges = getUserBadges(username);

  if (badges.length === 0) return null;

  return (
    <TooltipProvider>
      <span className="inline-flex items-center gap-0.5">
        {badges.map((badgeType) => {
          const config = badgeConfig[badgeType];
          const IconComponent = iconMap[config.icon as keyof typeof iconMap];
          
          return (
            <Tooltip key={badgeType}>
              <TooltipTrigger asChild>
                <span className={`inline-flex ${config.className}`}>
                  <IconComponent size={size} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{config.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </span>
    </TooltipProvider>
  );
}
