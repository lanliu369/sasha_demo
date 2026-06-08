"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { findRouteByPath } from "@/lib/navigation";
import { recordNavVisit } from "@/lib/navigation/navPreferences";

/** 记录最近访问（localStorage），供侧栏展示 */
export function NavVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      recordNavVisit({ path: "/", label: "运营驾驶舱", sectionLabel: "工作台" });
      return;
    }
    const route = findRouteByPath(pathname);
    if (route) {
      recordNavVisit({
        path: route.path,
        label: route.label,
        sectionLabel: route.sectionLabel,
      });
    }
  }, [pathname]);

  return null;
}
