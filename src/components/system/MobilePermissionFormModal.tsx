"use client";

import { Checkbox, Form, Input } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  mobileCommandOptions,
  mobileDeviceScopeOptions,
  mobileViewOptions,
} from "@/lib/demo/mobilePermissionOptions";
import type { MobilePermissionRecord } from "@/lib/types/demo";

type MobilePermissionFormModalProps = {
  open: boolean;
  editing?: MobilePermissionRecord | null;
  existingRecords: MobilePermissionRecord[];
  onClose: () => void;
  onSubmit: (record: MobilePermissionRecord) => void;
};

function nextPermissionId(records: MobilePermissionRecord[]): string {
  const nums = records
    .map((item) => item.id.match(/^MP(\d+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => Number(match[1]));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `MP${String(next).padStart(2, "0")}`;
}

export function MobilePermissionFormModal({
  open,
  editing,
  existingRecords,
  onClose,
  onSubmit,
}: MobilePermissionFormModalProps) {
  const isEdit = Boolean(editing);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [viewItems, setViewItems] = useState<string[]>([]);
  const [commandItems, setCommandItems] = useState<string[]>([]);
  const [devices, setDevices] = useState(
    mobileDeviceScopeOptions[0]?.value ?? "全部移动终端",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setRole(editing?.role ?? "");
    setViewItems(editing?.viewItems ?? []);
    setCommandItems(editing?.commandItems ?? []);
    setDevices(editing?.devices ?? mobileDeviceScopeOptions[0]?.value ?? "全部移动终端");
    setErrors({});
  }, [open, editing]);

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    const trimmedRole = role.trim();
    if (!trimmedRole) {
      nextErrors.role = "请填写岗位名称";
    } else if (
      existingRecords.some(
        (item) => item.role === trimmedRole && item.id !== editing?.id,
      )
    ) {
      nextErrors.role = "岗位名称已存在";
    }
    if (viewItems.length === 0) {
      nextErrors.viewItems = "请至少选择一项可见数据";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      onSubmit({
        id: editing?.id ?? nextPermissionId(existingRecords),
        role: trimmedRole,
        viewItems,
        commandItems,
        devices,
      });
      demoToastSuccess(isEdit ? "策略已更新（Demo）" : "策略已创建（Demo）");
      setLoading(false);
      onClose();
    }, 500);
  };

  const allViewValues = mobileViewOptions.map((item) => item.value);
  const allCommandValues = mobileCommandOptions.map((item) => item.value);

  return (
    <DemoModal
      open={open}
      onClose={() => !loading && onClose()}
      title={
        <CardTitleWithHint
          title={isEdit ? "编辑岗位策略" : "新增岗位策略"}
          hint="配置移动终端可见数据、可下发指令与终端范围（Demo 会话内有效）"
        />
      }
      width={640}
      footer={
        <DemoModalActions
          loading={loading}
          onCancel={onClose}
          onConfirm={handleSubmit}
          confirmText={isEdit ? "保存" : "创建"}
        />
      }
    >
      <Form layout="vertical" size="small" className="space-y-1">
        <Form.Item
          label={
            <>
              岗位
              <span className="text-rose-500"> *</span>
            </>
          }
          validateStatus={errors.role ? "error" : undefined}
          help={errors.role}
        >
          <Input
            value={role}
            placeholder="如：运维值班"
            disabled={isEdit}
            onChange={setRole}
          />
        </Form.Item>

        <Form.Item label="终端范围">
          <NativeSelect
            value={devices}
            options={mobileDeviceScopeOptions}
            onChange={setDevices}
          />
        </Form.Item>

        <Form.Item
          label={
            <>
              可见数据
              <span className="text-rose-500"> *</span>
            </>
          }
          validateStatus={errors.viewItems ? "error" : undefined}
          help={errors.viewItems}
        >
          <div className="mb-2 flex flex-wrap gap-2">
            <DemoButton
              variant="secondary"
              size="sm"
              onClick={() => setViewItems(allViewValues)}
            >
              全选
            </DemoButton>
            <DemoButton
              variant="secondary"
              size="sm"
              onClick={() => setViewItems([])}
            >
              清空
            </DemoButton>
          </div>
          <Checkbox.Group
            value={viewItems}
            className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
            onChange={(values) => setViewItems(values as string[])}
          >
            {mobileViewOptions.map((item) => (
              <Checkbox key={item.value} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item label="可下发指令">
          <div className="mb-2 flex flex-wrap gap-2">
            <DemoButton
              variant="secondary"
              size="sm"
              onClick={() => setCommandItems(allCommandValues)}
            >
              全选
            </DemoButton>
            <DemoButton
              variant="secondary"
              size="sm"
              onClick={() => setCommandItems([])}
            >
              清空
            </DemoButton>
          </div>
          <Checkbox.Group
            value={commandItems}
            className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
            onChange={(values) => setCommandItems(values as string[])}
          >
            {mobileCommandOptions.map((item) => (
              <Checkbox key={item.value} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
          <p className="mt-1 text-xs text-text-secondary">
            不选择任何指令时，列表展示为「无」
          </p>
        </Form.Item>
      </Form>
    </DemoModal>
  );
}
