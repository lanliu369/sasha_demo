"use client";

import { Select } from "@arco-design/web-react";

type NativeSelectOption = {
  value: string;
  label: string;
};

type NativeSelectProps = {
  options: NativeSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "small" | "default" | "mini" | "large";
  disabled?: boolean;
  style?: React.CSSProperties;
};

export function NativeSelect({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  className = "",
  size = "small",
  disabled = false,
  style,
}: NativeSelectProps) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      className={className}
      style={{ width: "100%", ...style }}
      triggerProps={{ autoAlignPopupWidth: true }}
      onChange={(next) => onChange?.(String(next))}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  );
}
