"use client";

import { Card } from "@arco-design/web-react";
import { useState } from "react";
import { demoToastInfo, demoToastSuccess } from "@/components/demo/demoToast";
import { isShiftBound } from "@/lib/demo/driverProfileUtils";
import { useTrainingDemo } from "@/lib/demo/trainingStore";
import { DriverEvaluatePanels } from "@/components/pages/model/evaluate/DriverEvaluatePanels";

export function ModelEvaluatePage() {
  const {
    driverProfiles,
    activeShifts,
    toggleActiveShift,
    clearActiveShifts,
  } = useTrainingDemo();
  const [selectedProfileId, setSelectedProfileId] = useState(
    driverProfiles[0]?.id ?? "DP01",
  );

  const handleToggleShift = (
    driverId: string,
    driverName: string,
    train: string,
  ) => {
    const wasActive = isShiftBound(activeShifts, driverId, train);
    toggleActiveShift({ driverId, driverName, train });
    if (wasActive) {
      demoToastInfo(`已取消 ${driverName} · ${train} 值乘绑定（Demo）`);
      return;
    }
    demoToastSuccess(
      `已绑定 ${driverName} · ${train}，可与其它列车并行值乘 · 请前往「模型预测」查看（Demo）`,
    );
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-5 pb-2">
      <DriverEvaluatePanels
        profiles={driverProfiles}
        activeShifts={activeShifts}
        selectedProfileId={selectedProfileId}
        onSelectProfile={setSelectedProfileId}
        onToggleShift={handleToggleShift}
        onClearShifts={clearActiveShifts}
      />

      <Card
        bordered
        className="!rounded-xl !border-[#E5E6EB] lark-card-elevated"
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          合规诊断自动比对实际撒砂与按图行车/极端工况模型阈值；行车结束后生成操作安全简报。司机画像按公里标聚合风险区段，多列车并行值乘时区段预警按列车隔离推送至模型预测页。
        </p>
      </Card>
    </div>
  );
}
