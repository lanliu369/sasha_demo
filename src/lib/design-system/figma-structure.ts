/**
 * Figma 可落地设计结构（Page / Frame / Component 命名规范）
 * 导入时可按此层级创建 File → Pages → Frames
 */
export const figmaFileStructure = {
  fileName: "铁路撒砂智能管控平台 · Lark Design System",
  pages: [
    {
      name: "00 · Foundations",
      frames: [
        "Colors / Light",
        "Colors / Dark",
        "Typography",
        "Spacing & Grid (1920)",
        "Elevation & Radius",
        "Icons",
      ],
    },
    {
      name: "01 · Components",
      frames: [
        "Button / Primary · Secondary · Ghost",
        "Tag / Status",
        "Card / Section · Metric · Profile",
        "Table / Flat List",
        "Navigation / Sidebar · Breadcrumb",
        "Chart / Line · Bar · Heat",
        "AI Copilot / Panel · Message · QuickAction",
        "Modal / Form",
      ],
    },
    {
      name: "02 · Templates",
      frames: [
        "Template / Dashboard Cockpit 1920",
        "Template / List + Filter 1920",
        "Template / Detail + Side Panel 1920",
        "Template / Model Center 1920",
        "Template / Alert Center 1920",
      ],
    },
    {
      name: "03 · Modules",
      frames: [
        "工作台",
        "调度中心",
        "监测中心",
        "分析中心",
        "模型中心",
        "砂数据追溯",
        "预警中心",
        "数据存储",
        "系统管理",
      ],
    },
  ],
  componentNaming: "{Category}/{Name}/{Variant}/{State}",
  autoLayout: {
    pagePadding: 24,
    cardGap: 16,
    sectionGap: 24,
    gridColumns: 12,
    columnWidth: 120,
    gutter: 16,
  },
} as const;
