"use client";

import { Checkbox, Form, Input } from "@arco-design/web-react";
import { useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  dataScopeOptions,
  menuPermissionOptions,
  operatePermissionOptions,
} from "@/lib/demo/rolePermissionOptions";
import type { RoleRecord } from "@/lib/types/demo";

type CreateRoleModalProps = {
  existingRoles: RoleRecord[];
  onSubmit: (role: RoleRecord) => void;
};

function nextRoleId(roles: RoleRecord[]): string {
  const nums = roles
    .map((role) => role.id.match(/^RL(\d+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => Number(match[1]));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `RL${String(next).padStart(2, "0")}`;
}

export function CreateRoleModal({ existingRoles, onSubmit }: CreateRoleModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [dataScope, setDataScope] = useState(dataScopeOptions[0]?.value ?? "全线路");
  const [menuPermissions, setMenuPermissions] = useState<string[]>([]);
  const [operatePermissions, setOperatePermissions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName("");
    setDataScope(dataScopeOptions[0]?.value ?? "全线路");
    setMenuPermissions([]);
    setOperatePermissions([]);
    setErrors({});
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) {
      nextErrors.name = "请填写角色名称";
    } else if (existingRoles.some((role) => role.name === name.trim())) {
      nextErrors.name = "角色名称已存在";
    }
    if (menuPermissions.length === 0) {
      nextErrors.menuPermissions = "请至少选择一项菜单权限";
    }
    if (operatePermissions.length === 0) {
      nextErrors.operatePermissions = "请至少选择一项操作权限";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      onSubmit({
        id: nextRoleId(existingRoles),
        name: name.trim(),
        dataScope,
        menuPermissions,
        operatePermissions,
      });
      demoToastSuccess("角色已创建（Demo）");
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  const allMenuValues = menuPermissionOptions.map((item) => item.value);
  const allOperateValues = operatePermissionOptions.map((item) => item.value);

  return (
    <>
      <DemoButton variant="primary" size="sm" onClick={handleOpen}>
        新增角色
      </DemoButton>
      <DemoModal
        open={open}
        onClose={() => !loading && setOpen(false)}
        title={
          <CardTitleWithHint
            title="新增角色"
            hint="配置菜单、数据范围与操作权限（Demo 会话内有效）"
          />
        }
        width={640}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setOpen(false)}
            onConfirm={handleSubmit}
            confirmText="创建"
          />
        }
      >
        <Form layout="vertical" size="small" className="space-y-1">
          <Form.Item
            label={
              <>
                角色名称
                <span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.name ? "error" : undefined}
            help={errors.name}
          >
            <Input
              value={name}
              placeholder="如：运维值班"
              onChange={setName}
            />
          </Form.Item>

          <Form.Item label="数据范围">
            <NativeSelect
              value={dataScope}
              options={dataScopeOptions}
              onChange={setDataScope}
            />
          </Form.Item>

          <Form.Item
            label={
              <>
                菜单权限
                <span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.menuPermissions ? "error" : undefined}
            help={errors.menuPermissions}
          >
            <div className="mb-2 flex flex-wrap gap-2">
              <DemoButton
                variant="secondary"
                size="sm"
                onClick={() => setMenuPermissions(allMenuValues)}
              >
                全选
              </DemoButton>
              <DemoButton
                variant="secondary"
                size="sm"
                onClick={() => setMenuPermissions([])}
              >
                清空
              </DemoButton>
            </div>
            <Checkbox.Group
              value={menuPermissions}
              className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
              onChange={(values) => setMenuPermissions(values as string[])}
            >
              {menuPermissionOptions.map((item) => (
                <Checkbox key={item.value} value={item.value}>
                  {item.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label={
              <>
                操作权限
                <span className="text-rose-500"> *</span>
              </>
            }
            validateStatus={errors.operatePermissions ? "error" : undefined}
            help={errors.operatePermissions}
          >
            <div className="mb-2 flex flex-wrap gap-2">
              <DemoButton
                variant="secondary"
                size="sm"
                onClick={() => setOperatePermissions(allOperateValues)}
              >
                全选
              </DemoButton>
              <DemoButton
                variant="secondary"
                size="sm"
                onClick={() => setOperatePermissions([])}
              >
                清空
              </DemoButton>
            </div>
            <Checkbox.Group
              value={operatePermissions}
              className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
              onChange={(values) => setOperatePermissions(values as string[])}
            >
              {operatePermissionOptions.map((item) => (
                <Checkbox key={item.value} value={item.value}>
                  {item.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </DemoModal>
    </>
  );
}
