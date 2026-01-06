import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KawaiiMascot, KawaiiCharacter } from "./KawaiiMascot";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username?: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  avatarType?: 'initials' | 'image' | 'kawaii' | 'emoji';
  avatarEmoji?: string | null;
  avatarKawaii?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const kawaiiSizes = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export const UserAvatar = ({
  username,
  displayName,
  avatarUrl,
  avatarType = 'initials',
  avatarEmoji,
  avatarKawaii,
  size = 'md',
  className,
}: UserAvatarProps) => {
  const getInitials = () => {
    const name = displayName || username || 'U';
    return name.slice(0, 2).toUpperCase();
  };

  if (avatarType === 'emoji' && avatarEmoji) {
    return (
      <div 
        className={cn(
          "rounded-full bg-muted flex items-center justify-center",
          sizeClasses[size],
          className
        )}
      >
        <span className={size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : size === 'md' ? 'text-xl' : size === 'lg' ? 'text-2xl' : 'text-4xl'}>
          {avatarEmoji}
        </span>
      </div>
    );
  }

  if (avatarType === 'kawaii' && avatarKawaii) {
    return (
      <div 
        className={cn(
          "rounded-full bg-muted flex items-center justify-center overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        <KawaiiMascot 
          character={avatarKawaii as KawaiiCharacter} 
          size={kawaiiSizes[size]}
          mood="happy"
        />
      </div>
    );
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {avatarType === 'image' && avatarUrl && (
        <AvatarImage src={avatarUrl} alt={displayName || username || 'User'} />
      )}
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};
