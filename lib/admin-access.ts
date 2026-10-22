import { AdminUser, AVAILABLE_ADMIN_SCREENS } from "@/types/user";

export const ALL_ADMIN_SCREEN_IDS = AVAILABLE_ADMIN_SCREENS.map(
  (screen) => screen.id,
);

const getRawScreens = (admin: AdminUser): string[] =>
  admin.allowedScreens ?? admin.allowed_screens ?? [];

export const isGeneralAdminUser = (admin: AdminUser): boolean =>
  admin.role === "admin" ||
  getRawScreens(admin).length >= AVAILABLE_ADMIN_SCREENS.length;

export const getAdminScreens = (admin: AdminUser): string[] =>
  isGeneralAdminUser(admin) ? [...ALL_ADMIN_SCREEN_IDS] : getRawScreens(admin);

export const canAccessAdminScreen = (
  admin: Pick<AdminUser, "role" | "allowedScreens" | "allowed_screens"> | null | undefined,
  screenId: string,
  fallbackRoles?: string[],
): boolean => {
  const role = (admin?.role || "admin").toLowerCase();
  if (role === "admin") return true;
  const screens = admin?.allowedScreens || admin?.allowed_screens;
  if (screens && Array.isArray(screens) && screens.length > 0) {
    return screens.includes(screenId) || screens.includes("*");
  }
  return fallbackRoles ? fallbackRoles.includes(role) : false;
};
