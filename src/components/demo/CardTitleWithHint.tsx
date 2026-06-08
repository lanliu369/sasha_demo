"use client";

type CardTitleWithHintProps = {
  title: React.ReactNode;
  hint?: string;
  hintClassName?: string;
};

/** 模块标题 + 旁侧说明（飞书风次要文字） */
export function CardTitleWithHint({
  title,
  hint,
  hintClassName = "text-text-secondary",
}: CardTitleWithHintProps) {
  if (!hint) {
    return <>{title}</>;
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span>{title}</span>
      <span className={`text-xs font-normal ${hintClassName}`}>{hint}</span>
    </div>
  );
}
