export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
  SUPPORT: "SUPPORT",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
