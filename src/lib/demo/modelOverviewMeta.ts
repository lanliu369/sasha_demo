import type { ModelInfo, TrainJob } from "@/lib/types/demo";

export type ModelCardMeta = {
  previousVersion: string;
  lastTrainedAt: string;
  description: string;
  evaluatePath?: string;
};

export const modelCardMeta: Record<string, ModelCardMeta> = {
  diagram: {
    previousVersion: "v2.3.0",
    lastTrainedAt: "2026-05-25",
    description: "按线路坡度、曲线与限速生成撒砂建议阈值",
  },
  extreme: {
    previousVersion: "v1.7.2",
    lastTrainedAt: "2026-05-20",
    description: "雨雪、横风等极端工况下的撒砂策略模型",
  },
  evaluation: {
    previousVersion: "v2.0.1",
    lastTrainedAt: "2026-05-28",
    description: "司机操作合规评价与司机画像生成",
    evaluatePath: "/model/evaluate",
  },
  correction: {
    previousVersion: "v1.5.0",
    lastTrainedAt: "2026-05-18",
    description: "实时检测偏差并触发自动纠正撒砂",
  },
};

export const modelPreviousVersions: Record<string, string> = Object.fromEntries(
  Object.entries(modelCardMeta).map(([key, meta]) => {
    const nameMap: Record<string, string> = {
      diagram: "按图行车",
      extreme: "极端工况",
      evaluation: "操作评价",
      correction: "自动纠正",
    };
    return [nameMap[key] ?? key, meta.previousVersion];
  }),
);

export function computeModelOverviewStats(
  models: ModelInfo[],
  trainJobs: TrainJob[],
) {
  const training = trainJobs.filter((j) => j.status === "训练中").length;
  const running = models.filter((m) => m.status === "运行中").length;
  const anomaly = models.filter((m) => m.status !== "运行中").length;

  return {
    total: models.length,
    running,
    training,
    anomaly,
  };
}
