"use client";

import { Form, Input } from "@arco-design/web-react";
import { useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { DemoModal } from "@/components/demo/DemoModal";
import { DemoModalActions } from "@/components/demo/DemoModalActions";
import { NativeSelect } from "@/components/demo/NativeSelect";
import { demoToastSuccess } from "@/components/demo/demoToast";
import {
  resolveDemoButtonSize,
  type DemoButtonSize,
} from "@/lib/ui/demoButton";

type FormFieldOption = {
  value: string;
  label: string;
};

type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  type?: "text" | "select";
  options?: FormFieldOption[];
};

type DemoFormModalProps = {
  buttonText: string;
  title: string;
  fields: FormField[];
  successMessage?: string;
  size?: DemoButtonSize | "small" | "default" | "large" | "mini";
  disabled?: boolean;
  onSubmit?: (values: Record<string, string>) => void;
};

export function DemoFormModal({
  buttonText,
  title,
  fields,
  successMessage = "提交成功（Demo）",
  size = "sm",
  disabled = false,
  onSubmit,
}: DemoFormModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpen = () => {
    if (disabled) return;
    setValues(
      Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]))
    );
    setErrors({});
    setOpen(true);
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        nextErrors[field.name] = `请填写${field.label}`;
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    window.setTimeout(() => {
      onSubmit?.(values);
      demoToastSuccess(successMessage);
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  return (
    <>
      <DemoButton
        variant="primary"
        size={
          size === "sm" || size === "md" || size === "lg"
            ? size
            : resolveDemoButtonSize(size)
        }
        disabled={disabled}
        onClick={handleOpen}
      >
        {buttonText}
      </DemoButton>
      <DemoModal
        open={open}
        onClose={() => !loading && setOpen(false)}
        title={
          <CardTitleWithHint
            title={title}
            hint="Demo 演示，数据不会持久保存"
          />
        }
        width={480}
        footer={
          <DemoModalActions
            loading={loading}
            onCancel={() => setOpen(false)}
            onConfirm={handleSubmit}
            confirmText="提交"
          />
        }
      >
        <Form layout="vertical" size="small">
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              label={
                <>
                  {field.label}
                  {field.required && <span className="text-rose-500"> *</span>}
                </>
              }
              validateStatus={errors[field.name] ? "error" : undefined}
              help={errors[field.name]}
            >
              {field.type === "select" ? (
                <NativeSelect
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder ?? `请选择${field.label}`}
                  options={field.options ?? []}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, [field.name]: value }))
                  }
                />
              ) : (
                <Input
                  value={values[field.name] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, [field.name]: value }))
                  }
                />
              )}
            </Form.Item>
          ))}
        </Form>
      </DemoModal>
    </>
  );
}
