import { menuTree } from "@/lib/mock/menu";
import type { MenuItem, RouteMeta } from "@/lib/types";

export function getFirstChildPath(item: MenuItem): string | undefined {
  if (item.path) return item.path;
  const first = item.children?.[0];
  if (!first) return undefined;
  return first.path ?? getFirstChildPath(first);
}

function flattenSection(section: MenuItem): RouteMeta[] {
  const routes: RouteMeta[] = [];

  const walk = (items: MenuItem[]) => {
    for (const item of items) {
      if (item.path && item.description) {
        routes.push({
          key: item.key,
          label: item.label,
          path: item.path,
          description: item.description,
          sectionKey: section.key,
          sectionLabel: section.label,
        });
      }
      if (item.children) {
        walk(item.children);
      }
    }
  };

  if (section.children) {
    walk(section.children);
  }

  return routes;
}

export function getAllRoutes(): RouteMeta[] {
  return menuTree.flatMap((section) => flattenSection(section));
}

export function findRouteByPath(path: string): RouteMeta | undefined {
  return getAllRoutes().find((route) => route.path === path);
}

export function isPathInSection(pathname: string, sectionKey: string): boolean {
  const section = menuTree.find((item) => item.key === sectionKey);
  if (!section) return false;

  if (section.path === pathname) return true;

  return flattenSection(section).some((route) => route.path === pathname);
}

export function getSectionByPath(pathname: string): MenuItem | undefined {
  return menuTree.find(
    (section) =>
      section.path === pathname || isPathInSection(pathname, section.key)
  );
}

/** 旧版菜单路由 → 当前路由 */
export const legacyRedirects: Record<string, string> = {
  "/exchange/upstream/dispatch": "/exchange/dispatch",
  "/exchange/downstream/vehicle": "/exchange/vehicle",
  "/exchange/downstream/loading": "/exchange/loading",
  "/exchange/downstream/processing": "/exchange/processing",
  "/exchange/downstream/inspection": "/exchange/inspection",
  "/exchange/downstream/screen": "/exchange/screen",
  "/exchange/downstream/mobile": "/system/mobile",
  "/exchange/mobile": "/system/mobile",
  "/schedule/overview": "/orchestration/overview",
  "/schedule/rules": "/alert/config?tab=orchestration",
  "/schedule/linkage": "/orchestration/linkage",
  "/schedule/sand-supply": "/orchestration/processing-task",
  "/schedule/loading": "/orchestration/loading-task",
  "/schedule/tickets": "/orchestration/full-flow",
  "/schedule": "/orchestration/overview",
  "/monitor/sub-s1": "/exchange/processing",
  "/monitor/sub-s2": "/exchange/inspection",
  "/monitor/sub-s3": "/exchange/loading",
  "/monitor/sub-s4": "/exchange/dispatch",
  "/monitor/agv": "/exchange/vehicle",
  "/monitor/device": "/display/device",
  "/monitor/ledger": "/display/ledger",
  "/monitor/fault": "/display/fault",
  "/monitor/model": "/model/overview",
  "/monitor/screen": "/display/screen",
  "/monitor": "/display/device",
  "/data/interfaces": "/exchange/monitor",
  "/data/sync": "/process/aggregate",
  "/data/trace": "/storage/trace",
  "/data/export": "/storage/export",
  "/data": "/exchange/monitor",
  "/sand/supplier": "/",
  "/sand/procurement": "/",
  "/sand/warehouse": "/",
  "/sand/processing": "/",
  "/sand/inspection": "/",
  "/sand/trace": "/storage/trace",
  "/sand/supply": "/",
  "/sand": "/",
  "/lifecycle/supplier": "/",
  "/lifecycle/procurement": "/",
  "/lifecycle/warehouse": "/",
  "/lifecycle/supply": "/",
  "/lifecycle/trace": "/storage/trace",
  "/lifecycle": "/",
  "/task/schedule": "/orchestration/smart-dispatch",
  "/task/loading": "/orchestration/loading-task",
  "/task/processing": "/orchestration/processing-task",
  "/task/equipment": "/display/device",
  "/task/workflow": "/orchestration/full-flow",
  "/task/coordination": "/orchestration/linkage",
  "/task": "/orchestration/overview",
  "/model/diagram": "/model/overview",
  "/model/extreme": "/model/overview",
  "/model/evaluation": "/model/evaluate",
  "/model/correction": "/model/overview",
  "/model/vehicle-data": "/analysis/vehicle",
  "/model/analysis": "/model/evaluate",
  "/dashboard/tasks": "/",
  "/dashboard/alerts": "/alert/realtime",
  "/dashboard/progress": "/display/progress",
  "/analysis": "/analysis/vehicle",
  "/model": "/model/overview",
  "/process": "/process/aggregate",
  "/orchestration/rules-center": "/alert/config",
  "/orchestration/rules": "/alert/config?tab=orchestration",
  "/process/rules": "/alert/config?tab=process",
  "/alert/rules": "/alert/config?tab=alert",
};
