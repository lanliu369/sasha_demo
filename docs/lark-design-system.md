# 铁路撒砂智能管控平台 · Lark Design System

> Demo 全局飞书风格设计系统 v1.0 · 路径与功能不变，视觉与 IA 升级

## 1. 设计系统概览

| 维度 | 规范 |
|------|------|
| 产品气质 | 飞书后台 / 飞书 BI / 企业 SaaS / 数据驾驶舱 |
| 布局 | 248px 侧栏 + 56px 顶栏 + 可选 360px AI Copilot |
| 内容区 | max-width 1600px，padding 24px |
| 栅格 | 12 列，gutter 16px（1920 画布） |

代码入口：`src/lib/design-system/tokens.ts`

## 2. 全局颜色

### 浅色（默认）

| Token | 值 | 用途 |
|-------|-----|------|
| brand | `#3370FF` | 主按钮、链接、选中 |
| success | `#00B578` | 成功、正向趋势 |
| warning | `#FF7D00` | 警告、中风险 |
| danger | `#F53F3F` | 危险、高风险 |
| bg-app | `#F5F7FA` | 页面背景 |
| bg-card | `#FFFFFF` | 卡片、侧栏、顶栏 |
| border | `#E5E6EB` | 分割线 |
| text-primary | `#1F2329` | 标题、正文 |
| text-secondary | `#8F959E` | 辅助说明 |

### 深色

切换：`Header` 主题按钮 · `html[data-theme="dark"]`

见 `tokens.ts` → `larkDarkColors`

## 3. 圆角与阴影

| 元素 | 圆角 | 阴影 |
|------|------|------|
| 卡片 | 8px | `0 2px 8px rgba(0,0,0,0.06)` |
| 弹窗 | 12px | `0 8px 24px rgba(0,0,0,0.12)` |
| 按钮 | 6px | — |

CSS 类：`.lark-card-elevated`

## 4. 字体层级

| 层级 | 规格 | CSS 类 |
|------|------|--------|
| 页面标题 | 24px / 600 | `.lark-page-title` |
| 模块标题 | 18px / 500 | `.lark-module-title` |
| 正文 | 14px / 400 | `.lark-body` |
| 辅助 | 12px / 400 | `.lark-caption` |

## 5. 组件规范

### 布局

- `AppShell` — 全局壳（侧栏 + 顶栏 + Copilot）
- `LarkSectionCard` — 区块卡片

### 数据展示

- `MetricCards` / `StatCard` — KPI 四格
- `SimpleLineChart` — 趋势折线
- `HorizontalRankChart` — 横向排行
- `LarkTag` — 语义标签

### 交互

- `DemoButton` — 主/次/幽灵按钮
- `AiCopilotPanel` — 右侧 AI 助手

### 表格（弱化边框）

- `DemoArcoTable` + `.demo-table-flat` — 保留功能，减少重边框

## 6. 导航规范

### 一级导航（7 项）

1. 工作台
2. 调度中心
3. 监测中心
4. 分析中心
5. 模型中心
6. 数据中心
7. 系统管理

### 能力

- 二级折叠菜单
- 收藏（localStorage，有收藏项时展示）

**所有 leaf `path` 保持不变**

## 7. 页面模板

| 模板 | 结构 |
|------|------|
| 驾驶舱 | KPI 6 格 + 待办 + 图表 + 列表 |
| 列表页 | MetricCards + LarkSectionCard + DataTableCard |
| 画像/BI | AI 摘要 + 卡片网格 + 图表 + 风险卡 |
| 详情页 | 顶栏信息 + KeyValueGrid + 时间线 |

## 8. Figma 结构

见 `src/lib/design-system/figma-structure.ts`

```
File
├── 00 · Foundations
├── 01 · Components
├── 02 · Templates (1920)
└── 03 · Modules
```

组件命名：`{Category}/{Name}/{Variant}/{State}`

## 9. 业务模块重构路线（功能不变）

| 阶段 | 模块 | 状态 |
|------|------|------|
| P0 | 设计 Token + Shell + 导航 IA + Copilot | ✅ 已落地 |
| P0 | 工作台驾驶舱 | ✅ 已落地 |
| P1 | 模型评估（司机画像 BI） | ✅ 已落地 |
| P1 | 模型总览卡片化 | ✅ 已落地 |
| P2 | 运行监测三视图（地图/列表/卡片） | ✅ 已落地 |
| P2 | 任务编排看板/时间轴 | ✅ 已落地 |
| P2 | 预警中心消息流 | ✅ 已落地 |
| P3 | 数据分析仪表盘 | ✅ 已落地 |
| P4 | 全站组件/主题同步（StatCard/DataTable/Form/间距） | ✅ 已落地 |

## 10. 深浅色主题

- 浅色：默认，`data-theme` 未设置或 `light`
- 深色：`html[data-theme="dark"]`，Arco 卡片/侧栏/顶栏同步
- 持久化：`localStorage` key `lark-demo-theme`
