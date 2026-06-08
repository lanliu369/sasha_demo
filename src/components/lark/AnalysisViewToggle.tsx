"use client";

import { Radio } from "@arco-design/web-react";

type AnalysisViewToggleProps = {
  value: "dashboard" | "detail";
  onChange: (value: "dashboard" | "detail") => void;
};

export function AnalysisViewToggle({ value, onChange }: AnalysisViewToggleProps) {
  return (
    <Radio.Group
      type="button"
      value={value}
      onChange={(v) => onChange(v as "dashboard" | "detail")}
    >
      <Radio value="dashboard">仪表盘</Radio>
      <Radio value="detail">明细表</Radio>
    </Radio.Group>
  );
}
