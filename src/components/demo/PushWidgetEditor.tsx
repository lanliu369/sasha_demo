"use client";

import { useMemo, useState } from "react";
import { Checkbox, Input } from "@arco-design/web-react";
import { Plus, X } from "lucide-react";
import { DemoButton } from "@/components/demo/DemoButton";
import { demoToastInfo } from "@/components/demo/demoToast";

type PushWidgetEditorProps = {
  initialWidgets: string[];
  presetWidgets?: string[];
};

export function PushWidgetEditor({
  initialWidgets,
  presetWidgets = [],
}: PushWidgetEditorProps) {
  const [widgets, setWidgets] = useState<string[]>(initialWidgets);
  const [selected, setSelected] = useState<string[]>(initialWidgets);
  const [draft, setDraft] = useState("");

  const defaultSet = useMemo(() => new Set(initialWidgets), [initialWidgets]);

  const addWidget = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (widgets.includes(trimmed)) {
      demoToastInfo(`组件「${trimmed}」已存在`);
      setSelected((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
      return;
    }
    setWidgets((prev) => [...prev, trimmed]);
    setSelected((prev) => [...prev, trimmed]);
    setDraft("");
  };

  const removeWidget = (name: string) => {
    setWidgets((prev) => prev.filter((w) => w !== name));
    setSelected((prev) => prev.filter((w) => w !== name));
  };

  const unusedPresets = presetWidgets.filter((p) => !widgets.includes(p));

  return (
    <div className="space-y-3">
      <Checkbox.Group
        value={selected}
        onChange={(values) => setSelected(values as string[])}
        className="flex flex-wrap gap-x-4 gap-y-2"
      >
        {widgets.map((w) => (
          <div key={w} className="inline-flex items-center gap-1">
            <Checkbox value={w}>{w}</Checkbox>
            {!defaultSet.has(w) ? (
              <button
                type="button"
                aria-label={`移除 ${w}`}
                className="inline-flex size-5 items-center justify-center rounded text-text-secondary hover:bg-app hover:text-danger"
                onClick={() => removeWidget(w)}
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
        ))}
      </Checkbox.Group>

      {unusedPresets.length > 0 ? (
        <div>
          <p className="mb-1.5 text-xs text-text-secondary">常用组件（点击添加）</p>
          <div className="flex flex-wrap gap-2">
            {unusedPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                className="rounded-md border border-dashed border-border px-2.5 py-1 text-xs text-text-secondary transition-colors hover:border-brand/40 hover:bg-brand-light/40 hover:text-brand"
                onClick={() => addWidget(preset)}
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-1.5 text-xs text-text-secondary">自定义组件</p>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={draft}
            placeholder="输入组件名称，如：列车运行图"
            onChange={setDraft}
            onPressEnter={() => addWidget(draft)}
            style={{ maxWidth: 280 }}
          />
          <DemoButton
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={() => addWidget(draft)}
          >
            添加
          </DemoButton>
        </div>
      </div>

      <p className="text-xs text-text-secondary">
        已选 {selected.length} 项
        {selected.length > 0 ? `：${selected.join("、")}` : ""}
      </p>
    </div>
  );
}
