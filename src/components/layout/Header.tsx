"use client";

import { Avatar } from "@arco-design/web-react";
import { Bell } from "lucide-react";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="lark-header flex shrink-0 items-center justify-between px-6">
      <div className="min-w-0">
        <h1 className="lark-page-title truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="demo-header-notify-btn"
          aria-label="通知，3 条未读"
        >
          <Bell className="size-4" strokeWidth={1.75} aria-hidden />
          <span className="demo-header-notify-count" aria-hidden>
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Avatar size={32} style={{ backgroundColor: "#3370FF" }}>
            调
          </Avatar>
          <span className="hidden text-sm text-text-primary sm:inline">调度员</span>
        </div>
      </div>
    </header>
  );
}
