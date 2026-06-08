export type MenuItem = {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  description?: string;
  children?: MenuItem[];
};

export type RouteMeta = {
  key: string;
  label: string;
  path: string;
  description: string;
  sectionKey: string;
  sectionLabel: string;
  parentLabel?: string;
};

export type StatItem = {
  key: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
};

export type TaskItem = {
  id: string;
  title: string;
  type: "上砂" | "砂处理" | "调度";
  status: "待处理" | "处理中" | "已处理" | "异常" | "待下发" | "进行中";
  device: string;
  updatedAt: string;
};

export type AlertItem = {
  id: string;
  level: "high" | "medium" | "low";
  title: string;
  source: string;
  time: string;
  status: "未处理" | "处理中" | "已关闭";
};

export type ProgressTaskDetail = {
  id: string;
  title: string;
  train?: string;
  track?: string;
  phase: string;
  operator: string;
  startedAt: string;
  eta?: string;
  progress: number;
  status: "进行中" | "待触发" | "排队" | "异常" | "处理中";
};

export type ProgressItem = {
  id: string;
  name: string;
  current: number;
  total: number;
  status: "正常" | "逆向" | "异常";
  /** 分类汇总说明 */
  summary?: string;
  /** 当前进行中的代表性任务（Demo 展示 2–3 条） */
  tasks?: ProgressTaskDetail[];
};
