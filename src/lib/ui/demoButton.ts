import type { ButtonProps } from "@arco-design/web-react";

export type DemoButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type DemoButtonSize = "sm" | "md" | "lg";

export function resolveArcoButtonSize(size: DemoButtonSize): ButtonProps["size"] {
  if (size === "sm") return "small";
  if (size === "lg") return "large";
  return "default";
}

export function resolveArcoButtonProps(
  variant: DemoButtonVariant = "primary",
): Pick<ButtonProps, "type" | "status"> {
  switch (variant) {
    case "primary":
      return { type: "primary" };
    case "secondary":
      return { type: "outline" };
    case "danger":
      return { type: "outline", status: "danger" };
    case "ghost":
      return { type: "text" };
    default:
      return { type: "primary" };
  }
}

/** 兼容 DemoActionButton 旧 props */
export function resolveDemoButtonVariant(
  type: "primary" | "outline" | "text" | "secondary" | "dashed" = "primary",
  status?: "danger" | "warning" | "success" | "default",
): DemoButtonVariant {
  if (type === "text") return "ghost";
  if (type === "primary") return "primary";
  if (status === "danger") return "danger";
  return "secondary";
}

export function resolveDemoButtonSize(
  size?: "small" | "default" | "large" | "mini",
): DemoButtonSize {
  if (size === "mini" || size === "small") return "sm";
  if (size === "large") return "lg";
  return "md";
}
