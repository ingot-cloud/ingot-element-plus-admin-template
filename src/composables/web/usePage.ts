import type { Router, RouteLocationRaw } from "vue-router";
import {
  PageNameEnum,
  PagePathEnum,
  RedirectType,
  RedirectField,
} from "@/models/enums/pageEnums";

export const useDoRedirect = (
  path = String(PagePathEnum.HOME),
  redirectType = String(RedirectType.PATH)
) => {
  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);

  Reflect.deleteProperty(params, RedirectField.TYPE);
  Reflect.deleteProperty(params, RedirectField.PATH);

  return new Promise<void>((resolve, reject) => {
    const _path = Array.isArray(path) ? path.join("/") : path;
    switch (redirectType) {
      case RedirectType.NAME:
        replace({
          name: _path,
          query,
          params,
        });
        resolve();
        break;
      case RedirectType.PATH:
        replace({
          path: _path.startsWith("/") ? _path : "/" + _path,
          query,
        });
        resolve();
        break;
      default:
        reject();
        break;
    }
  });
};

export function useGo(router?: Router) {
  const { push, replace } = router || useRouter();
  function go(opt: RouteLocationRaw, isReplace = false) {
    if (!opt) {
      return;
    }
    isReplace ? replace(opt) : push(opt);
  }
  return go;
}

export const useRefreshPage = (router?: Router) => {
  const { replace, currentRoute } = router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function refreshPage(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === PageNameEnum.REDIRECT) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params[RedirectField.TYPE] = RedirectType.NAME;
        params[RedirectField.PATH] = String(name);
      } else {
        params[RedirectField.TYPE] = RedirectType.PATH;
        params[RedirectField.PATH] = fullPath;
      }
      replace({ name: PageNameEnum.REDIRECT, params, query }).then(() =>
        resolve(true)
      );
    });
  }
  return refreshPage;
};
