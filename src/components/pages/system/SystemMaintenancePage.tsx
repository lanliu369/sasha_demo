"use client";

import { Card } from "@arco-design/web-react";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { LarkStatusTag } from "@/components/demo/LarkTag";
import { maintenanceItems } from "@/lib/mock/pages";

export function SystemMaintenancePage() {
  return (
    <div className="space-y-4">
      {maintenanceItems.map((item) => (
        <Card key={item.name} bordered className="lark-card-elevated">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-text-primary">{item.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                上次：{item.lastRun} · 下次：{item.nextRun}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LarkStatusTag value={item.status} />
              {item.name !== "系统版本" && (
                <DemoActionButton
                  variant="secondary"
                  size="sm"
                  confirmTitle={`执行${item.name}`}
                  confirmContent="确认立即执行该维护任务？"
                  successMessage={`${item.name}已执行（Demo）`}
                >
                  立即执行
                </DemoActionButton>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
