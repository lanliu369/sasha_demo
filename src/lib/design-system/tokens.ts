/** 飞书企业产品设计语言 — Design Tokens（Demo 全局） */

export const larkColors = {
  brand: "#3370FF",
  brandHover: "#2860E0",
  brandLight: "#EBF1FF",
  brandMuted: "#F7F9FF",
  success: "#00B578",
  successLight: "#E8FFF3",
  warning: "#FF7D00",
  warningLight: "#FFF7E8",
  danger: "#F53F3F",
  dangerLight: "#FFECE8",
  bgApp: "#F5F7FA",
  bgCard: "#FFFFFF",
  border: "#E5E6EB",
  borderLight: "#F0F1F2",
  textPrimary: "#1F2329",
  textSecondary: "#8F959E",
  textTertiary: "#BBBFC4",
} as const;

export const larkDarkColors = {
  brand: "#4D88FF",
  brandHover: "#6B9AFF",
  brandLight: "#1A2744",
  brandMuted: "#141824",
  success: "#00B578",
  successLight: "#0D2E22",
  warning: "#FF7D00",
  warningLight: "#2E2210",
  danger: "#F53F3F",
  dangerLight: "#2E1515",
  bgApp: "#0F1114",
  bgCard: "#171A1F",
  border: "#2E3338",
  borderLight: "#232830",
  textPrimary: "#E5E6EB",
  textSecondary: "#8F959E",
  textTertiary: "#646A73",
} as const;

export const larkRadius = {
  button: "6px",
  card: "8px",
  modal: "12px",
  xl: "12px",
} as const;

export const larkShadow = {
  card: "0 2px 8px rgba(0, 0, 0, 0.06)",
  cardHover: "0 4px 16px rgba(0, 0, 0, 0.08)",
  popover: "0 8px 24px rgba(0, 0, 0, 0.12)",
} as const;

export const larkTypography = {
  pageTitle: { size: "24px", weight: 600, lineHeight: "32px" },
  moduleTitle: { size: "18px", weight: 500, lineHeight: "26px" },
  body: { size: "14px", weight: 400, lineHeight: "22px" },
  caption: { size: "12px", weight: 400, lineHeight: "20px" },
} as const;

export const larkLayout = {
  sidebarWidth: 248,
  headerHeight: 56,
  copilotWidth: 360,
  contentMaxWidth: 1600,
  pagePadding: 24,
} as const;
