"use client";

import { Card, Form, Input } from "@arco-design/web-react";
import { DemoActionButton } from "@/components/demo/DemoActionButton";
import { systemParams } from "@/lib/mock/pages";

export function SystemParamsPage() {
  return (
    <Card title="系统参数" bordered className="lark-card-elevated">
      <Form layout="vertical" className="max-w-xl">
        {systemParams.map((p) => (
          <Form.Item key={p.key} label={`${p.label}${p.unit ? ` (${p.unit})` : ""}`}>
            <Input defaultValue={p.value} />
          </Form.Item>
        ))}
        <Form.Item>
          <DemoActionButton
            confirmTitle="保存系统参数"
            confirmContent="确认保存全局参数配置？"
            successMessage="系统参数已保存（Demo）"
          >
            保存配置
          </DemoActionButton>
        </Form.Item>
      </Form>
    </Card>
  );
}
