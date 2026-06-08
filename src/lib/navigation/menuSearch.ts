import { menuTree } from "@/lib/mock/menu";
import type { MenuItem } from "@/lib/types";

export type FlatMenuEntry = {
  key: string;
  label: string;
  path: string;
  description?: string;
  sectionLabel: string;
  breadcrumb: string;
};

function walkMenu(
  items: MenuItem[],
  sectionLabel: string,
  ancestors: string[],
  output: FlatMenuEntry[],
) {
  for (const item of items) {
    const trail = [...ancestors, item.label];
    if (item.path && item.description) {
      output.push({
        key: item.key,
        label: item.label,
        path: item.path,
        description: item.description,
        sectionLabel,
        breadcrumb: trail.join(" / "),
      });
    }
    if (item.children?.length) {
      walkMenu(item.children, sectionLabel, trail, output);
    }
  }
}

export function getFlatMenuEntries(): FlatMenuEntry[] {
  const output: FlatMenuEntry[] = [];
  for (const section of menuTree) {
    if (section.children?.length) {
      walkMenu(section.children, section.label, [section.label], output);
    } else if (section.path) {
      output.push({
        key: section.key,
        label: section.label,
        path: section.path,
        description: section.description,
        sectionLabel: section.label,
        breadcrumb: section.label,
      });
    }
  }
  return output;
}

export function searchMenuEntries(query: string): FlatMenuEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getFlatMenuEntries().filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.path.toLowerCase().includes(q) ||
      item.breadcrumb.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q),
  );
}
