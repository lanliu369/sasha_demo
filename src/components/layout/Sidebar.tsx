"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Archive,
  BarChart3,
  Bell,
  Brain,
  Cable,
  ChevronDown,
  Database,
  GitBranch,
  LayoutDashboard,
  Presentation,
  Shield,
  Star,
  Train,
} from "lucide-react";
import { menuTree } from "@/lib/mock/menu";
import {
  getFavorites,
  toggleFavorite,
  type NavBookmark,
} from "@/lib/navigation/navPreferences";
import { getSectionByPath, isPathInSection } from "@/lib/navigation";
import type { MenuItem } from "@/lib/types";

const iconMap = {
  LayoutDashboard,
  GitBranch,
  Presentation,
  Cable,
  BarChart3,
  Brain,
  Database,
  Bell,
  Archive,
  Shield,
} as const;

function getItemPadding(depth: number): string {
  if (depth <= 1) return "pl-9 pr-3";
  return "pl-11 pr-3";
}

type SubMenuProps = {
  items: MenuItem[];
  depth: number;
  pathname: string;
};

function SubMenu({ items, depth, pathname }: SubMenuProps) {
  return (
    <ul className="mb-0.5 mt-0.5 space-y-0.5">
      {items.map((item) => {
        const active = pathname === item.path;
        const hasChildren = (item.children?.length ?? 0) > 0;
        const padding = getItemPadding(depth);

        return (
          <li key={item.key}>
            {item.path ? (
              <Link
                href={item.path}
                className={`block rounded-lg py-2 text-sm transition-colors ${padding} ${
                  active
                    ? "lark-nav-active font-medium"
                    : "text-text-secondary hover:bg-app hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`block py-1.5 text-xs font-medium text-text-secondary ${padding}`}
              >
                {item.label}
              </span>
            )}
            {hasChildren ? (
              <SubMenu
                items={item.children!}
                depth={depth + 1}
                pathname={pathname}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function FavoriteLinks({
  items,
  pathname,
  onToggleFavorite,
}: {
  items: NavBookmark[];
  pathname: string;
  onToggleFavorite: (item: NavBookmark) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-3">
      <p className="mb-1.5 px-3 text-xs font-medium text-text-secondary">收藏</p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`flex items-center justify-between rounded-lg py-1.5 pl-3 pr-2 text-sm ${
                pathname === item.path
                  ? "lark-nav-active font-medium"
                  : "text-text-secondary hover:bg-app hover:text-text-primary"
              }`}
            >
              <span className="truncate">{item.label}</span>
              <button
                type="button"
                className="rounded p-1 text-amber-500 hover:bg-app"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(item);
                }}
                aria-label="取消收藏"
              >
                <Star className="size-3 fill-current" />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const activeSection = getSectionByPath(pathname);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<NavBookmark[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, [pathname]);

  useEffect(() => {
    if (activeSection) {
      setExpanded((prev) => ({ ...prev, [activeSection.key]: true }));
    }
  }, [activeSection?.key]);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleFavorite = (bookmark: NavBookmark) => {
    toggleFavorite(bookmark);
    setFavorites(getFavorites());
  };

  return (
    <aside className="lark-sidebar flex h-full shrink-0 flex-col">
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#6B9AFF] shadow-card">
          <Train className="size-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">
            撒砂智能管控
          </p>
          <p className="text-xs text-text-secondary">Lark Enterprise</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <FavoriteLinks
          items={favorites}
          pathname={pathname}
          onToggleFavorite={handleToggleFavorite}
        />

        <ul className="space-y-1">
          {menuTree.map((section) => {
            const Icon = section.icon
              ? iconMap[section.icon as keyof typeof iconMap]
              : null;
            const isActiveSection = isPathInSection(pathname, section.key);
            const isOpen = expanded[section.key] ?? isActiveSection;
            const hasChildren = (section.children?.length ?? 0) > 0;

            return (
              <li key={section.key}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActiveSection
                      ? "font-medium text-brand"
                      : "text-text-primary hover:bg-app"
                  }`}
                >
                  {Icon ? <Icon className="size-4 shrink-0" /> : null}
                  <span className="flex-1 text-left">{section.label}</span>
                  {hasChildren ? (
                    <ChevronDown
                      className={`size-4 shrink-0 text-text-secondary transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  ) : null}
                </button>

                {hasChildren && isOpen ? (
                  <SubMenu
                    items={section.children!}
                    depth={1}
                    pathname={pathname}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
