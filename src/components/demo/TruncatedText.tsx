"use client";

type TruncatedTextProps = {
  text: string;
  className?: string;
  title?: string;
};

/** 单行截断 + hover 展示全称（native title） */
export function TruncatedText({
  text,
  className = "",
  title,
}: TruncatedTextProps) {
  const display = text || "—";

  return (
    <span
      className={`block min-w-0 max-w-full truncate ${className}`}
      title={title ?? display}
    >
      {display}
    </span>
  );
}

export function formatTableCellText(value: unknown): string {
  if (value == null || value === "") return "—";
  return String(value);
}
