import type { DriverProfile } from "@/lib/types/demo";

/** 操作评价模型产出的司机画像（含薄弱区段） */
export const driverProfiles: DriverProfile[] = [
  {
    id: "DP01",
    driverId: "EV01",
    name: "李师傅",
    train: "G101",
    score: 92,
    trend: "up",
    updatedAt: "2026-05-29",
    strengthTags: ["操作稳定", "速度控制优秀"],
    riskTags: ["长坡道迟撒", "隧道出口早撒"],
    scoreTrend30: [86, 87, 88, 88, 89, 90, 91, 92],
    scoreTrend90: [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92],
    aiSummary: {
      headline: "李师傅近 30 天整体表现优秀，合规率持续领先班组均值。",
      mainRisks: [
        "K128+650 长大坡道迟撒",
        "K132+200 隧道出口早撒",
      ],
      monthCompare: [
        { label: "迟撒", value: "下降 33%", positive: true },
        { label: "评分", value: "提升 4 分", positive: true },
      ],
      suggestion: "重点加强长坡道预判训练，隧道出口区段保持按图行车阈值。",
    },
    weakSegments: [
      {
        km: "K128+650",
        scenario: "长大坡道",
        errorType: "迟撒",
        occurrences: 2,
        hint: "建议提前 200m 关注砂量与速度匹配，坡顶前完成预撒",
      },
      {
        km: "K132+200",
        scenario: "隧道出口",
        errorType: "早撒",
        occurrences: 1,
        hint: "隧道出口光照变化易误判，按图行车阈值为准勿提前撒砂",
      },
    ],
  },
  {
    id: "DP02",
    driverId: "EV02",
    name: "王师傅",
    train: "G205",
    score: 88,
    trend: "flat",
    updatedAt: "2026-05-28",
    strengthTags: ["应急反应快", "砂量控制精准"],
    riskTags: ["桥梁区未砂", "道岔群过撒"],
    scoreTrend30: [87, 88, 87, 88, 88, 89, 88, 88],
    scoreTrend90: [85, 86, 86, 87, 87, 88, 88, 88, 88, 88, 88],
    aiSummary: {
      headline: "王师傅近 30 天表现平稳，桥梁与道岔区段需持续关注。",
      mainRisks: ["K045+800 桥梁区未砂", "K051+120 道岔群过撒"],
      monthCompare: [
        { label: "未砂", value: "持平", positive: undefined },
        { label: "评分", value: "稳定 88 分", positive: undefined },
      ],
      suggestion: "加强桥梁横风区砂阀响应检查，道岔区控制单次撒砂时长。",
    },
    weakSegments: [
      {
        km: "K045+800",
        scenario: "桥梁区",
        errorType: "未砂",
        occurrences: 1,
        hint: "桥梁区横风较大，注意砂阀响应与砂量监测",
      },
      {
        km: "K051+120",
        scenario: "道岔群",
        errorType: "过撒",
        occurrences: 1,
        hint: "道岔区限速变化快，控制单次撒砂时长",
      },
    ],
  },
  {
    id: "DP03",
    driverId: "EV03",
    name: "张师傅",
    train: "D308",
    score: 90,
    trend: "down",
    updatedAt: "2026-05-28",
    strengthTags: ["极端工况适应", "简报执行到位"],
    riskTags: ["雨雪工况迟撒", "长大坡道早撒"],
    scoreTrend30: [92, 91, 91, 90, 90, 90, 89, 90],
    scoreTrend90: [88, 89, 90, 91, 92, 91, 90, 90, 90, 90, 90],
    aiSummary: {
      headline: "张师傅近 30 天评分小幅回落，坡道与极端工况区段是主要波动来源。",
      mainRisks: ["K210+400 雨雪工况迟撒", "K215+900 长大坡道早撒"],
      monthCompare: [
        { label: "早撒", value: "上升 1 次", positive: false },
        { label: "评分", value: "下降 2 分", positive: false },
      ],
      suggestion: "雨雪工况遵循极端工况模型阈值，坡道前避免经验性提前撒砂。",
    },
    weakSegments: [
      {
        km: "K210+400",
        scenario: "雨雪工况",
        errorType: "迟撒",
        occurrences: 1,
        hint: "极端工况模型建议阈值已下调，留意车载提示",
      },
      {
        km: "K215+900",
        scenario: "长大坡道",
        errorType: "早撒",
        occurrences: 2,
        hint: "坡道前勿凭经验提前撒砂，等待按图行车触发",
      },
    ],
  },
];
