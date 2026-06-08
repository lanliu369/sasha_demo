"use client";

import { Card, Form, Input, Switch } from "@arco-design/web-react";
import { ConnectionHeader } from "@/components/demo/ConnectionHeader";
import { DemoActionBar } from "@/components/demo/DemoActionBar";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { MetricCards } from "@/components/demo/MetricCards";
import { PushRecordsCard, pushRecordsToSyncLogs } from "@/components/demo/PushRecordsCard";
import { PushWidgetEditor } from "@/components/demo/PushWidgetEditor";
import { SyncLogsTrigger } from "@/components/demo/SyncLogsTrigger";
import { LarkTag } from "@/components/demo/LarkTag";
import { exchangeModules, pushConfigs } from "@/lib/mock/pages";

type PushConfigPageProps = {
  type: "screen" | "mobile";
};

export function PushConfigPage({ type }: PushConfigPageProps) {
  const config = pushConfigs[type];
  const exchangeConfig = exchangeModules[type];
  const pushLogs = pushRecordsToSyncLogs(config.pushRecords);
  const channelLabel = type === "screen" ? "WebSocket" : "HTTPS 长轮询";

  return (
    <div className="space-y-5">
      <ConnectionHeader
        config={exchangeConfig}
        extra={
          <SyncLogsTrigger
            data={pushLogs}
            label="最近推送记录"
            modalTitle="最近推送记录"
          />
        }
      />
      <MetricCards items={exchangeConfig.metrics} columns={4} moduleKey={type} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card title="Web 推送配置" bordered className="lark-card-elevated">
          <Form layout="vertical">
            <Form.Item label="推送端点">
              <Input defaultValue={config.endpoint} />
            </Form.Item>
            <Form.Item label="推送间隔">
              <Input defaultValue={config.pushInterval} />
            </Form.Item>
            <Form.Item label="布局版本">
              <Input defaultValue={config.layout} />
            </Form.Item>
            <Form.Item label="推送组件">
              <PushWidgetEditor
                initialWidgets={config.widgets}
                presetWidgets={config.presetWidgets}
              />
            </Form.Item>
            <Form.Item label="启用推送">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item>
              <DemoActionBar>
                <DemoActionButton
                  confirmTitle="保存并推送"
                  confirmContent={`确认保存配置并推送至${config.title}？`}
                  successMessage="配置已保存并开始推送（Demo）"
                >
                  保存并推送
                </DemoActionButton>
              </DemoActionBar>
            </Form.Item>
          </Form>
        </Card>

        <Card title="推送状态" bordered className="lark-card-elevated">
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">连接状态</span>
              <LarkTag variant="success">已连接</LarkTag>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">最近推送</span>
              <span>{config.lastPush}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">今日推送</span>
              <span>{type === "screen" ? "8640 次" : "234 次"}</span>
            </div>
            <div className="rounded-lg border border-border bg-app/50 p-4">
              <p className="text-xs text-text-secondary">说明</p>
              <p className="mt-2 text-text-primary">
                在中台 Web 完成布局与指标配置后，通过 {type === "screen" ? "WebSocket" : "HTTPS 长轮询"} 推送至
                {config.title}，{type === "mobile" ? "支持指令模板下发与岗位权限隔离" : "展示设备状态与作业进度"}。
              </p>
            </div>
          </div>
        </Card>
      </div>

      <PushRecordsCard
        records={config.pushRecords}
        channelLabel={channelLabel}
      />
    </div>
  );
}
