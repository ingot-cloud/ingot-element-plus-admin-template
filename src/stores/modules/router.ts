import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { default as routes } from "@/router/routes";

interface BreadCrumbItem {
  path: string;
  title: string;
  icon?: string;
  redirect?: string;
  children?: Array<BreadCrumbItem>;
}

/**
 * 加载面包屑
 */
const loadBreadCrumbKV = (
  item: RouteRecordRaw,
  menus: Array<RouteRecordRaw>,
  out: { [key: string]: Array<BreadCrumbItem> }
) => {
  if (item.children?.length) {
    item.children?.forEach((child) => loadBreadCrumbKV(child, menus, out));
  } else {
    const breadCrumbList: Array<BreadCrumbItem> = [];
    loadPathBreadCrumbList(item.path, menus, breadCrumbList);
    out[item.path] = breadCrumbList;
  }
};

/**
 * 装载指定path的面包屑列表
 */
const loadPathBreadCrumbList = (
  path: string,
  menus: Array<RouteRecordRaw>,
  out: Array<BreadCrumbItem>
): boolean => {
  for (const menu of menus) {
    out.push({
      path: menu.path,
      title: menu.meta?.title || "",
      icon: menu.meta?.icon,
      redirect: menu.redirect?.toString(),
      children: menu.children?.map((item) => {
        return {
          path: item.path,
          title: item.meta?.title || "",
          icon: menu.meta?.icon,
          redirect: item.redirect?.toString(),
        };
      }),
    });

    if (path === menu.path) {
      const cLen = out.length;
      // 如果存在前一个菜单，那么判断前一个菜单是否为重定向到child的菜单
      // 如果是重定向到child的菜单，并且这个菜单的children只有1个
      // 那么将其删掉，只保留child即可
      if (
        cLen > 1 &&
        out[cLen - 2].redirect === path &&
        out[cLen - 2].children?.length === 1
      ) {
        out.splice(cLen - 2, 1);
      }
      return true;
    }

    if (
      menu.children?.length &&
      loadPathBreadCrumbList(path, menu.children, out)
    ) {
      return true;
    }
    out.pop();
  }

  return false;
};

/**
 * 清洗路由列表，过滤所有不需要显示的menu信息
 * @param menu 需要清洗的路由列表
 */
const filterMenus = (menu: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
  return menu
    .map((item) => {
      if (item.children) {
        item.children = filterMenus(item.children);
      }
      return item;
    })
    .filter((item) => {
      return item.meta && !item.meta.hidden;
    });
};

export const useRouterStore = defineStore("router", () => {
  const menus = ref<Array<RouteRecordRaw>>([]);
  const dynamicRoutes = ref<Array<RouteRecordRaw>>([]);

  const getMenus = computed(() => menus.value);
  const getBreadcrumb = computed(() => {
    const result: { [key: string]: Array<BreadCrumbItem> } = {};
    menus.value.forEach((menu) => loadBreadCrumbKV(menu, menus.value, result));
    return result;
  });

  const fetchRoutes = async (forceRefresh?: boolean) => {
    if (forceRefresh || menus.value.length === 0) {
      // todo 发送请求获取菜单列表，并且和固定的routes合并
      dynamicRoutes.value = [];

      menus.value = filterMenus(routes.concat(dynamicRoutes.value));
    }

    return {
      menus: menus.value,
      dynamicRoutes: dynamicRoutes.value,
    };
  };

  return { menus, getMenus, getBreadcrumb, fetchRoutes };
});
