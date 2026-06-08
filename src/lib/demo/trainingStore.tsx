"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sumAggregateIngestByPool } from "@/lib/mock/analysisRecords";
import { driverProfiles as initialDriverProfiles } from "@/lib/mock/driverProfiles";
import { buildProfileZoneAlertsForShifts } from "@/lib/demo/driverProfileUtils";
import { modelPreviousVersions } from "@/lib/demo/modelOverviewMeta";
import {
  buildTrainOutput,
  nextDatasetId,
  nextDeployId,
  nextTrainJobId,
  normalizeLabeled,
  nowDateTimeString,
  todayDateString,
} from "@/lib/demo/trainingUtils";
import {
  deployRecords as initialDeployRecords,
  models as initialModels,
  predictMonitor as initialPredictMonitor,
  trainingDatasets,
  trainJobs as initialTrainJobs,
} from "@/lib/mock/pages";
import type {
  ActiveShift,
  DeployRecord,
  DriverProfile,
  ModelInfo,
  PredictMonitorItem,
  ProfileZoneAlert,
  TrainJob,
  TrainingDataset,
} from "@/lib/types/demo";

type TrainingDemoContextValue = {
  datasets: TrainingDataset[];
  trainJobs: TrainJob[];
  deployRecords: DeployRecord[];
  runtimeModels: ModelInfo[];
  predictMonitor: PredictMonitorItem[];
  latestDeployVersion: string;
  aggregateSynced: boolean;
  availableDatasets: TrainingDataset[];
  deployableTrainJobs: TrainJob[];
  addDataset: (input: {
    name: string;
    modelType: string;
    samples: number;
    version: string;
    labeled: string;
  }) => void;
  updateDatasetLabeled: (id: string, labeled: string) => void;
  addTrainJob: (input: { model: string; dataset: string }) => void;
  completeTrainJob: (id: string) => void;
  syncAggregateToDatasets: () => void;
  startDeploy: (input: {
    trainJobId: string;
    model: string;
    outputVersion: string;
    packageName: string;
    target: string;
    ftpUrl: string;
  }) => void;
  driverProfiles: DriverProfile[];
  activeShifts: ActiveShift[];
  profileZoneAlerts: ProfileZoneAlert[];
  toggleActiveShift: (input: {
    driverId: string;
    driverName: string;
    train: string;
  }) => void;
  clearActiveShifts: () => void;
  rollbackModel: (modelName: string) => string | null;
};

const TrainingDemoContext = createContext<TrainingDemoContextValue | null>(null);

export function TrainingDemoProvider({ children }: { children: ReactNode }) {
  const [datasets, setDatasets] = useState<TrainingDataset[]>(
    () => trainingDatasets
  );
  const [trainJobs, setTrainJobs] = useState<TrainJob[]>(() => initialTrainJobs);
  const [deployRecords, setDeployRecords] = useState<DeployRecord[]>(
    () => initialDeployRecords
  );
  const [runtimeModels, setRuntimeModels] = useState<ModelInfo[]>(
    () => initialModels
  );
  const [predictMonitor, setPredictMonitor] = useState<PredictMonitorItem[]>(
    () => initialPredictMonitor
  );
  const [latestDeployVersion, setLatestDeployVersion] = useState("v2.3.1");
  const [aggregateSynced, setAggregateSynced] = useState(false);
  const [driverProfiles] = useState<DriverProfile[]>(
    () => initialDriverProfiles
  );
  const [activeShifts, setActiveShiftsState] = useState<ActiveShift[]>([]);

  const profileZoneAlerts = useMemo(
    () => buildProfileZoneAlertsForShifts(activeShifts, driverProfiles),
    [activeShifts, driverProfiles]
  );

  const availableDatasets = useMemo(
    () => datasets.filter((item) => item.labeled === "100%"),
    [datasets]
  );

  const deployableTrainJobs = useMemo(
    () =>
      trainJobs.filter(
        (job) => job.status === "已完成" && job.packageName && job.outputVersion
      ),
    [trainJobs]
  );

  const addDataset = useCallback(
    (input: {
      name: string;
      modelType: string;
      samples: number;
      version: string;
      labeled: string;
    }) => {
      setDatasets((prev) => [
        ...prev,
        {
          id: nextDatasetId(prev),
          name: input.name.trim(),
          modelType: input.modelType,
          samples: input.samples,
          labeled: normalizeLabeled(input.labeled),
          version: input.version.trim() || "v1.0",
          updatedAt: todayDateString(),
        },
      ]);
    },
    []
  );

  const updateDatasetLabeled = useCallback((id: string, labeled: string) => {
    setDatasets((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              labeled: normalizeLabeled(labeled),
              updatedAt: todayDateString(),
            }
          : item
      )
    );
  }, []);

  const syncAggregateToDatasets = useCallback(() => {
    const totals = sumAggregateIngestByPool();
    setDatasets((prev) =>
      prev.map((item) => {
        const delta = totals[item.name] ?? 0;
        if (delta <= 0) return item;
        return {
          ...item,
          samples: item.samples + delta,
          updatedAt: todayDateString(),
        };
      })
    );
    setAggregateSynced(true);
  }, []);

  const addTrainJob = useCallback(
    (input: { model: string; dataset: string }) => {
      setTrainJobs((prev) => {
        const dataset = datasets.find((item) => item.name === input.dataset);
        if (!dataset || dataset.modelType !== input.model) {
          return prev;
        }

        const id = nextTrainJobId(prev);
        return [
          ...prev,
          {
            id,
            model: input.model,
            dataset: input.dataset,
            progress: 0,
            epoch: "0/48",
            status: "排队中",
          },
        ];
      });
    },
    [datasets]
  );

  const completeTrainJob = useCallback(
    (id: string) => {
      setTrainJobs((prev) =>
        prev.map((job) => {
          if (job.id !== id || job.status === "已完成") return job;
          const dataset = datasets.find((item) => item.name === job.dataset);
          const { outputVersion, packageName } = buildTrainOutput(
            job.model,
            dataset?.version ?? "v1.0"
          );
          const totalEpoch = job.epoch.split("/")[1] ?? "48";
          return {
            ...job,
            status: "已完成",
            progress: 100,
            epoch: `${totalEpoch}/${totalEpoch}`,
            outputVersion,
            packageName,
          };
        })
      );
    },
    [datasets]
  );

  const startDeploy = useCallback(
    (input: {
      trainJobId: string;
      model: string;
      outputVersion: string;
      packageName: string;
      target: string;
      ftpUrl: string;
    }) => {
      setDeployRecords((prev) => {
        const deployId = nextDeployId(prev);
        const record: DeployRecord = {
          id: deployId,
          model: `${input.model} ${input.outputVersion}`,
          target: input.target,
          method: "FTP 热更新",
          time: nowDateTimeString(),
          status: "进行中",
          trainJobId: input.trainJobId,
          packageName: input.packageName,
        };

        window.setTimeout(() => {
          setDeployRecords((current) =>
            current.map((item) =>
              item.id === deployId ? { ...item, status: "成功" } : item
            )
          );
          setRuntimeModels((current) =>
            current.map((item) =>
              item.name === input.model
                ? { ...item, version: input.outputVersion }
                : item
            )
          );
          setPredictMonitor((current) => {
            const train = input.target.includes("101")
              ? "G101"
              : input.target.includes("205")
                ? "G205"
                : input.target.includes("308")
                  ? "D308"
                  : "G101";
            const hasRow = current.some((item) => item.model === input.model);
            if (hasRow) {
              return current.map((item) =>
                item.model === input.model
                  ? {
                      ...item,
                      train,
                      deployedVersion: input.outputVersion,
                      suggestion: `已加载 ${input.outputVersion} · 车端推理运行中`,
                    }
                  : item
              );
            }
            return [
              ...current,
              {
                id: `PV${String(current.length + 1).padStart(2, "0")}`,
                train,
                model: input.model,
                inferenceMs: 10,
                suggestion: `已加载 ${input.outputVersion} · 等待首条推理`,
                status: "正常",
                deployedVersion: input.outputVersion,
              },
            ];
          });
          setLatestDeployVersion(input.outputVersion);
        }, 2000);

        void input.ftpUrl;
        return [record, ...prev];
      });
    },
    [],
  );

  const toggleActiveShift = useCallback(
    (input: { driverId: string; driverName: string; train: string }) => {
      setActiveShiftsState((prev) => {
        const existing = prev.find(
          (item) =>
            item.driverId === input.driverId && item.train === input.train,
        );
        if (existing) {
          return prev.filter((item) => item.sessionId !== existing.sessionId);
        }

        const withoutTrain = prev.filter((item) => item.train !== input.train);
        return [
          ...withoutTrain,
          {
            sessionId: `SS${input.train}-${input.driverId}`,
            driverId: input.driverId,
            driverName: input.driverName,
            train: input.train,
            startedAt: nowDateTimeString(),
          },
        ];
      });
    },
    [],
  );

  const clearActiveShifts = useCallback(() => {
    setActiveShiftsState([]);
  }, []);

  const rollbackModel = useCallback((modelName: string) => {
    const previous = modelPreviousVersions[modelName];
    if (!previous) return null;
    setRuntimeModels((prev) =>
      prev.map((item) =>
        item.name === modelName ? { ...item, version: previous } : item,
      ),
    );
    setLatestDeployVersion(previous);
    return previous;
  }, []);

  const value = useMemo(
    () => ({
      datasets,
      trainJobs,
      deployRecords,
      runtimeModels,
      predictMonitor,
      latestDeployVersion,
      aggregateSynced,
      availableDatasets,
      deployableTrainJobs,
      addDataset,
      updateDatasetLabeled,
      addTrainJob,
      completeTrainJob,
      syncAggregateToDatasets,
      startDeploy,
      driverProfiles,
      activeShifts,
      profileZoneAlerts,
      toggleActiveShift,
      clearActiveShifts,
      rollbackModel,
    }),
    [
      datasets,
      trainJobs,
      deployRecords,
      runtimeModels,
      predictMonitor,
      latestDeployVersion,
      aggregateSynced,
      availableDatasets,
      deployableTrainJobs,
      addDataset,
      updateDatasetLabeled,
      addTrainJob,
      completeTrainJob,
      syncAggregateToDatasets,
      startDeploy,
      driverProfiles,
      activeShifts,
      profileZoneAlerts,
      toggleActiveShift,
      clearActiveShifts,
      rollbackModel,
    ]
  );

  return (
    <TrainingDemoContext.Provider value={value}>
      {children}
    </TrainingDemoContext.Provider>
  );
}

export function useTrainingDemo() {
  const context = useContext(TrainingDemoContext);
  if (!context) {
    throw new Error("useTrainingDemo must be used within TrainingDemoProvider");
  }
  return context;
}
