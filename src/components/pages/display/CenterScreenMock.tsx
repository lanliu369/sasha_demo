"use client";

import { useEffect, useState } from "react";
import { Activity, AlertTriangle, Cpu, Gauge, Train } from "lucide-react";
import { recentAlerts } from "@/lib/mock/dashboard";
import { deviceStatusList, kpiItems, statsChart } from "@/lib/mock/pages";

const progressTasks = [
  { name: "上砂 G101", percent: 72, tone: "from-brand to-cyan-400" },
  { name: "砂处理 #029", percent: 45, tone: "from-violet-500 to-brand" },
  { name: "加砂计划", percent: 100, tone: "from-emerald-500 to-teal-400" },
];

const statusTone: Record<string, { dot: string; text: string }> = {
  online: { dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]", text: "text-emerald-300" },
  warning: { dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]", text: "text-amber-300" },
  offline: { dot: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]", text: "text-red-300" },
};

function Panel({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[#3370ff]/25 bg-[#0f1a2e]/80 p-3 backdrop-blur-sm ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3370ff]/60 to-transparent" />
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-[#6b9aff]">{icon}</span>
        <span className="text-xs font-medium tracking-wide text-[#94a3b8]">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function CenterScreenMock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        now.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const activeAlerts = recentAlerts.filter((a) => a.status !== "已关闭").slice(0, 2);
  const maxStat = Math.max(...statsChart.map((s) => s.value));

  return (
    <div className="screen-mock relative aspect-video w-full overflow-hidden rounded-xl border border-[#1e3a5f] bg-[#060b14] text-white shadow-[inset_0_0_80px_rgba(51,112,255,0.08)]">
      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(51,112,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(51,112,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-0 size-64 rounded-full bg-[#3370ff]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 size-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex h-full flex-col p-4">
        {/* 顶栏 */}
        <header className="mb-3 flex shrink-0 items-center justify-between border-b border-[#3370ff]/20 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#3370ff]/20 ring-1 ring-[#3370ff]/40">
              <Train className="size-4 text-[#6b9aff]" aria-hidden />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">
                撒砂智能管控中心
              </h3>
              <p className="text-[10px] text-[#64748b]">Sanding Control Center · 3840×2160</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300 ring-1 ring-emerald-500/30">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              LIVE
            </span>
            <span className="font-mono text-[#94a3b8]">{clock || "—"}</span>
            <span className="rounded bg-[#3370ff]/15 px-2 py-0.5 text-[#6b9aff]">v3.2 · 2s</span>
          </div>
        </header>

        {/* KPI 条 */}
        <div className="mb-3 grid shrink-0 grid-cols-5 gap-2">
          {kpiItems.map((k) => (
            <div
              key={k.label}
              className="relative overflow-hidden rounded-lg border border-[#3370ff]/20 bg-[#0c1525]/90 px-2 py-2 text-center"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#3370ff] to-transparent" />
              <p className="text-xl font-bold tabular-nums text-[#6b9aff]">{k.value}%</p>
              <p className="mt-0.5 truncate text-[10px] text-[#64748b]">{k.label}</p>
            </div>
          ))}
        </div>

        {/* 主体三栏 */}
        <div className="grid min-h-0 flex-1 grid-cols-12 gap-3">
          <Panel title="设备状态" icon={<Cpu className="size-3.5" />} className="col-span-3">
            <div className="space-y-2">
              {deviceStatusList.slice(0, 4).map((d) => {
                const tone = statusTone[d.status] ?? statusTone.online;
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-2 rounded-md bg-white/[0.03] px-2 py-1.5"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className={`size-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      <div className="min-w-0">
                        <p className="truncate text-xs text-white">{d.name}</p>
                        <p className="truncate text-[10px] text-[#64748b]">{d.module}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 text-xs font-medium tabular-nums ${tone.text}`}>
                      {d.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="作业进度" icon={<Gauge className="size-3.5" />} className="col-span-5">
            <div className="space-y-3 pt-1">
              {progressTasks.map((task) => (
                <div key={task.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-[#cbd5e1]">{task.name}</span>
                    <span className="font-mono tabular-nums text-[#6b9aff]">{task.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/5">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${task.tone} transition-all duration-700`}
                      style={{ width: `${task.percent}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="mb-2 text-[10px] text-[#64748b]">今日作业量</p>
                <div className="flex h-16 items-end gap-1.5">
                  {statsChart.slice(0, 5).map((s) => (
                    <div key={s.label} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-[#3370ff]/80 to-[#3370ff]/30"
                        style={{ height: `${Math.max(12, (s.value / maxStat) * 100)}%` }}
                      />
                      <span className="truncate text-[9px] text-[#64748b]">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="告警摘要" icon={<AlertTriangle className="size-3.5" />} className="col-span-4">
            <div className="space-y-2">
              {activeAlerts.map((alert) => {
                const levelMap = {
                  high: {
                    badge: "高",
                    box: "border-red-500/40 bg-red-500/10",
                    badgeText: "text-red-300",
                  },
                  medium: {
                    badge: "中",
                    box: "border-amber-500/40 bg-amber-500/10",
                    badgeText: "text-amber-300",
                  },
                  low: {
                    badge: "低",
                    box: "border-[#3370ff]/30 bg-[#3370ff]/10",
                    badgeText: "text-[#6b9aff]",
                  },
                } as const;
                const level = levelMap[alert.level as keyof typeof levelMap] ?? levelMap.low;
                return (
                  <div key={alert.id} className={`rounded-md border px-2.5 py-2 ${level.box}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-medium ${level.badgeText}`}>
                        {level.badge}
                      </span>
                      <span className="text-[10px] text-[#64748b]">{alert.time}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-[#e2e8f0]">{alert.title}</p>
                    <p className="mt-0.5 text-[10px] text-[#64748b]">{alert.source}</p>
                  </div>
                );
              })}
              <div className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-2">
                <span className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
                  <Activity className="size-3.5 text-[#6b9aff]" aria-hidden />
                  推送通道
                </span>
                <span className="text-xs text-emerald-300">WebSocket · 已连接</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
