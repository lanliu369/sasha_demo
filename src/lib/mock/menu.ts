import type { MenuItem } from "@/lib/types";

/**
 * 飞书风格一级导航 IA（路径不变，仅重组展示层级）
 * 工作台 · 调度中心 · 运行监测 · 模块对接 · 分析中心 · 模型中心 · 预警中心 · 数据存储 · 系统管理
 */
export const menuTree: MenuItem[] = [
  {
    key: "dashboard",
    label: "工作台",
    icon: "LayoutDashboard",
    path: "/",
    children: [
      {
        key: "overview",
        label: "运营驾驶舱",
        path: "/",
        description:
          "汇聚在线列车、任务、预警、模型健康与司机风险，一屏总览控制中心运行情况。",
      },
      {
        key: "quick",
        label: "快捷操作",
        path: "/dashboard/quick",
        description: "高频功能操作入口：任务下发、告警处置、大屏推送配置。",
      },
    ],
  },
  {
    key: "dispatch-center",
    label: "调度中心",
    icon: "GitBranch",
    children: [
      {
        key: "overview",
        label: "调度总览",
        path: "/orchestration/overview",
        description:
          "平台工单池（上砂/砂处理）：待处理/处理中/已处理；下发入口见「上砂/砂处理任务下发」。",
      },
      {
        key: "smart-dispatch",
        label: "系统智能调度",
        path: "/orchestration/smart-dispatch",
        description: "基于调度计划与设备状态的智能任务编排与资源分配。",
      },
      {
        key: "loading-task",
        label: "上砂任务下发",
        path: "/orchestration/loading-task",
        description:
          "上砂平台工单筛选与下发；指令由调度中心推送至移动上砂装置。",
      },
      {
        key: "processing-task",
        label: "砂处理任务下发",
        path: "/orchestration/processing-task",
        description:
          "砂处理平台工单筛选与下发；指令由调度中心推送至智能砂处理装置。",
      },
      {
        key: "full-flow",
        label: "全流程管控",
        path: "/orchestration/full-flow",
        description: "上砂、砂处理：编排生成工单 → 业务模块下发 → 回传闭环全流程管控。",
      },
      {
        key: "linkage",
        label: "联动处置与安全保障",
        path: "/orchestration/linkage",
        description: "跨模块联动处置策略、安全保障规则与执行状态。",
      },
    ],
  },
  {
    key: "runtime-monitor",
    label: "运行监测",
    icon: "Presentation",
    children: [
      {
        key: "device",
        label: "设备运行监测",
        path: "/display/device",
        description: "各模块设备实时运行状态与参数汇总展示。",
      },
      {
        key: "progress",
        label: "作业进度",
        path: "/display/progress",
        description: "上砂、加砂、砂处理作业进度与异常状态展示。",
      },
      {
        key: "kpi",
        label: "KPI 指标",
        path: "/display/kpi",
        description: "关键运营指标、完成率与效率类 KPI 看板。",
      },
      {
        key: "fault",
        label: "故障监测与追溯",
        path: "/display/fault",
        description: "设备故障实时监测、历史记录与根因追溯。",
      },
      {
        key: "ledger",
        label: "设备台账",
        path: "/display/ledger",
        description: "设备档案、维护记录与生命周期管理。",
      },
    ],
  },
  {
    key: "exchange-center",
    label: "模块对接",
    icon: "Cable",
    children: [
      {
        key: "dispatch",
        label: "调度中心对接",
        path: "/exchange/dispatch",
        description:
          "接收进站信息、道口信号、加砂计划；与调度中心双向数据交互。",
      },
      {
        key: "vehicle",
        label: "车载设备对接",
        path: "/exchange/vehicle",
        description: "接收撒砂采集、车地转储、作业任务与模型预测回传。",
      },
      {
        key: "loading",
        label: "移动上砂装置对接",
        path: "/exchange/loading",
        description:
          "上砂装置连接状态、设备运行态与作业进度回传；仅数据汇聚展示，不下发任务。",
      },
      {
        key: "processing",
        label: "智能砂处理装置对接",
        path: "/exchange/processing",
        description:
          "砂处理装置连接状态、设备监控与砂仓存量回传；仅数据汇聚展示，不下发任务。",
      },
      {
        key: "inspection",
        label: "砂品监测装置对接",
        path: "/exchange/inspection",
        description: "便携式砂品检测数据接收与上传状态。",
      },
      {
        key: "screen",
        label: "中心大屏推送配置",
        path: "/exchange/screen",
        description:
          "中台 Web 配置大屏布局与指标，WebSocket 推送至中心大屏展示（含预览入口）。",
      },
      {
        key: "monitor",
        label: "接口监控",
        path: "/exchange/monitor",
        description: "各模块接口健康度与异常连接告警。",
      },
    ],
  },
  {
    key: "analysis-center",
    label: "分析中心",
    icon: "BarChart3",
    children: [
      {
        key: "vehicle",
        label: "车载数据分析",
        path: "/analysis/vehicle",
        description: "车端撒砂采集数据多维分析、趋势与异常洞察。",
      },
      {
        key: "stats",
        label: "数据统计",
        path: "/analysis/stats",
        description: "作业、设备、检测数据等综合统计分析。",
      },
      {
        key: "report",
        label: "报表分析",
        path: "/analysis/report",
        description: "周期性报表、趋势对比与班组/线路维度分析。",
      },
      {
        key: "aggregate",
        label: "数据汇聚转换",
        path: "/process/aggregate",
        description: "多源数据采集、格式转换与清洗规则执行。",
      },
    ],
  },
  {
    key: "model-center",
    label: "模型中心",
    icon: "Brain",
    children: [
      {
        key: "overview",
        label: "模型总览",
        path: "/model/overview",
        description: "按图行车、极端工况、操作评价、自动纠正四类模型运行概览。",
      },
      {
        key: "train",
        label: "模型训练",
        path: "/model/train",
        description: "训练任务管理、超参配置与训练进度监控。",
      },
      {
        key: "deploy",
        label: "模型部署",
        path: "/model/deploy",
        description: "车端模型部署；局域网 FTP 热更新与版本迭代。",
      },
      {
        key: "predict",
        label: "模型预测",
        path: "/model/predict",
        description: "车端 NPU 实时预测监控与推理结果回传。",
      },
      {
        key: "evaluate",
        label: "模型评估",
        path: "/model/evaluate",
        description: "司机操作画像、合规诊断与效果评估。",
      },
      {
        key: "training-data",
        label: "训练数据集",
        path: "/analysis/training-data",
        description: "模型训练样本管理、标注质量与数据集版本管理。",
      },
    ],
  },
  {
    key: "alert-center",
    label: "预警中心",
    icon: "Bell",
    children: [
      {
        key: "realtime",
        label: "实时告警",
        path: "/alert/realtime",
        description: "告警分级分类、实时推送与提醒。",
      },
      {
        key: "disposal",
        label: "告警处置",
        path: "/alert/disposal",
        description: "告警处置流程、方案引导与闭环管理。",
      },
      {
        key: "trace",
        label: "告警追溯",
        path: "/alert/trace",
        description: "历史告警统计分析与根因追溯。",
      },
      {
        key: "config",
        label: "规则配置",
        path: "/alert/config",
        description:
          "全部规则统一配置：编排、数据处理、告警分级与联动、联动处置。",
      },
    ],
  },
  {
    key: "storage-center",
    label: "数据存储",
    icon: "Archive",
    children: [
      {
        key: "archive",
        label: "数据归档",
        path: "/storage/archive",
        description: "历史数据归档策略、存储容量与生命周期管理。",
      },
      {
        key: "export",
        label: "数据导出与留存",
        path: "/storage/export",
        description: "数据导出、操作日志与合规留存。",
      },
      {
        key: "trace",
        label: "全链路追溯",
        path: "/storage/trace",
        description: "撒砂作业全链路数据追溯查询。",
      },
    ],
  },
  {
    key: "system",
    label: "系统管理",
    icon: "Shield",
    children: [
      {
        key: "users",
        label: "用户管理",
        path: "/system/users",
        description: "用户增删改查。",
      },
      {
        key: "roles",
        label: "角色与权限",
        path: "/system/roles",
        description: "角色、菜单权限、数据权限；岗位差异化隔离。",
      },
      {
        key: "mobile",
        label: "移动设备权限",
        path: "/system/mobile",
        description: "移动终端岗位差异化展示与指令下发权限策略。",
      },
      {
        key: "params",
        label: "系统参数",
        path: "/system/params",
        description: "全局参数与编排联动规则参数。",
      },
      {
        key: "api",
        label: "接口管理",
        path: "/system/api",
        description: "API 密钥与接口安全。",
      },
      {
        key: "logs",
        label: "日志管理",
        path: "/system/logs",
        description: "操作日志与系统日志。",
      },
      {
        key: "maintenance",
        label: "系统维护",
        path: "/system/maintenance",
        description: "升级、备份与健康检查。",
      },
    ],
  },
];

export const menuItems = menuTree;

export const subsystems = [
  {
    key: "dispatch",
    name: "调度中心",
    status: "running",
    menuPath: "/exchange/dispatch",
    tier: "core",
    role: "上游计划 · 加砂编排",
  },
  {
    key: "vehicle",
    name: "车载设备",
    status: "running",
    menuPath: "/exchange/vehicle",
    tier: "core",
    role: "撒砂采集 · 模型回传",
  },
  {
    key: "loading",
    name: "移动上砂装置",
    status: "warning",
    menuPath: "/exchange/loading",
    tier: "core",
    role: "上砂作业 · 进度回传",
  },
  {
    key: "processing",
    name: "智能砂处理装置",
    status: "running",
    menuPath: "/exchange/processing",
    tier: "core",
    role: "砂处理 · 存量监测",
  },
  {
    key: "screen",
    name: "中心大屏",
    status: "running",
    menuPath: "/exchange/screen",
    tier: "display",
    role: "WebSocket 推送展示",
  },
  {
    key: "mobile",
    name: "移动设备",
    status: "running",
    menuPath: "/system/mobile",
    tier: "display",
    role: "移动终端 · 岗位协同",
  },
  {
    key: "inspection",
    name: "砂品监测装置",
    status: "running",
    menuPath: "/exchange/inspection",
    tier: "support",
    role: "砂品检测数据汇聚",
  },
] as const;

export type SubsystemTier = (typeof subsystems)[number]["tier"];
