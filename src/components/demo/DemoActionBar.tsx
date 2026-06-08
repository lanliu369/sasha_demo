"use client";

type DemoActionBarProps = {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
};

/** 页面操作按钮组 — 统一间距与换行 */
export function DemoActionBar({
  children,
  className = "",
  align = "start",
}: DemoActionBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${
        align === "end" ? "justify-end" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
