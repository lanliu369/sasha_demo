"use client";

import { Card, Form, Input } from "@arco-design/web-react";
import { DataTableCard } from "@/components/demo/DataTableCard";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { traceRecords } from "@/lib/mock/pages";

export function StorageTracePage() {
  return (
    <div className="space-y-5">
      <Card bordered className="lark-card-elevated">
        <p className="text-sm text-text-secondary">
          数据追溯（列车/批次维度）：按列车、批次查询关联调度、上砂、检测等全链路作业与数据记录。
        </p>
      </Card>
      <Card title="追溯查询" bordered className="lark-card-elevated">
        <Form layout="inline" className="flex flex-wrap gap-2">
          <Form.Item label="列车">
            <Input placeholder="G101" defaultValue="G101" style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="批次">
            <Input placeholder="#029" defaultValue="#029" style={{ width: 120 }} />
          </Form.Item>
          <Form.Item>
            <DemoActionButton
              confirmTitle="追溯查询"
              confirmContent="按列车与批次查询数据追溯记录？"
              successMessage="查询完成（Demo）"
            >
              查询
            </DemoActionButton>
          </Form.Item>
        </Form>
      </Card>
      <DataTableCard
        title="数据追溯结果"
        data={traceRecords}
        columns={[
          { title: "编号", dataIndex: "id", width: 80 },
          { title: "列车", dataIndex: "train", width: 80 },
          { title: "批次", dataIndex: "batch", width: 80 },
          { title: "环节", dataIndex: "stage", width: 100 },
          { title: "时间", dataIndex: "time", width: 80 },
          { title: "数据摘要", dataIndex: "data" },
        ]}
      />
    </div>
  );
}
