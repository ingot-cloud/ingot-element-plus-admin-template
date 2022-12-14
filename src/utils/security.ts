import { useAuthStore } from "@/stores/modules/auth";

/**
 * 退出登录，并且刷新页面
 */
export function logoutAndReload() {
  useAuthStore()
    .logout()
    .then(() => location.reload());
}
