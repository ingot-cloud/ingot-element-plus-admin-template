import type { ComponentSize } from "@/components/cmp-size/types";

/**
 * 网络配置
 */
export interface NetConfig {
  baseURL?: string;
  timeout?: number;
  timeoutErrorMessage?: string;
}

/**
 * App Store
 */
export interface AppStore {
  /**
   * 标题
   */
  title: string;
  /**
   * 全局组件大小
   */
  componentSize: ComponentSize;
  /**
   * 网络配置
   */
  netConfig: NetConfig;
  /**
   * 租户ID
   */
  tenant: string;
  /**
   * basic token
   */
  basicToken: string;
}

/**
 * Tab item
 */
export interface TabItem {
  title: string;
  path: string;
  close: boolean;
}
