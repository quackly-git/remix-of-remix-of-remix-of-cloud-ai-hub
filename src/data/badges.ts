// User badges configuration
// Add usernames to each array to assign badges

export const userBadges = {
  admins: [
    // Add admin usernames here
    // "admin_user",
  ] as string[],
  
  activeMembers: [
    // Add active member usernames here
    // "active_user",
  ] as string[],
  
  verified: [
    // Add verified usernames here
    // "verified_user",
  ] as string[],
  
  suspicious: [
    // Add suspicious usernames here
    // "sus_user",
  ] as string[],
};

export type BadgeType = "admin" | "active-member" | "verified" | "suspicious";

export interface UserBadge {
  type: BadgeType;
  icon: string;
  tooltip: string;
  className: string;
}

export const badgeConfig: Record<BadgeType, Omit<UserBadge, "type">> = {
  admin: {
    icon: "Shield",
    tooltip: "Admin",
    className: "text-red-500",
  },
  "active-member": {
    icon: "Heart",
    tooltip: "Active Member",
    className: "text-pink-500",
  },
  verified: {
    icon: "BadgeCheck",
    tooltip: "Verified",
    className: "text-blue-500",
  },
  suspicious: {
    icon: "AlertTriangle",
    tooltip: "Suspicious User",
    className: "text-yellow-500",
  },
};

export function getUserBadges(username: string): BadgeType[] {
  const badges: BadgeType[] = [];
  const lowerUsername = username.toLowerCase();
  
  if (userBadges.admins.map(u => u.toLowerCase()).includes(lowerUsername)) {
    badges.push("admin");
  }
  if (userBadges.activeMembers.map(u => u.toLowerCase()).includes(lowerUsername)) {
    badges.push("active-member");
  }
  if (userBadges.verified.map(u => u.toLowerCase()).includes(lowerUsername)) {
    badges.push("verified");
  }
  if (userBadges.suspicious.map(u => u.toLowerCase()).includes(lowerUsername)) {
    badges.push("suspicious");
  }
  
  return badges;
}
