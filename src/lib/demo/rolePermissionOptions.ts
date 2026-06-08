import { menuTree } from "@/lib/mock/menu";

/** 一级菜单权限选项（与侧栏 IA 一致） */
export const menuPermissionOptions = menuTree.map((item) => ({
  value: item.label,
  label: item.label,
}));

export const dataScopeOptions = [
  { value: "全线路", label: "全线路" },
  { value: "设备数据", label: "设备数据" },
  { value: "检测数据", label: "检测数据" },
  { value: "本部门", label: "本部门" },
  { value: "全部", label: "全部" },
];

export const operatePermissionOptions = [
  { value: "任务下发", label: "任务下发" },
  { value: "告警确认", label: "告警确认" },
  { value: "规则配置", label: "规则配置" },
  { value: "参数配置", label: "参数配置" },
  { value: "接口管理", label: "接口管理" },
  { value: "检测数据查看", label: "检测数据查看" },
  { value: "数据导出", label: "数据导出" },
  { value: "用户管理", label: "用户管理" },
];

export function isAllMenuPermissions(selected: string[]): boolean {
  return selected.length >= menuPermissionOptions.length;
}

export function isAllOperatePermissions(selected: string[]): boolean {
  return selected.length >= operatePermissionOptions.length;
}

export function formatPermissionSummary(
  items: string[],
  allLabel = "全部",
  totalCount?: number,
): string {
  if (totalCount !== undefined && items.length >= totalCount) {
    return allLabel;
  }
  if (items.length === 0) return "—";
  return items.join("、");
}
