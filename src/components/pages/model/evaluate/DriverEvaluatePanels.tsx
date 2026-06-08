"use client";

import { Card, Radio } from "@arco-design/web-react";
import {
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CardTitleWithHint } from "@/components/demo/CardTitleWithHint";
import { DemoButton } from "@/components/demo/DemoButton";
import { HorizontalRankChart } from "@/components/demo/HorizontalRankChart";
import { LarkTag } from "@/components/demo/LarkTag";
import { SimpleLineChart } from "@/components/demo/SimpleLineChart";
import { demoToastInfo } from "@/components/demo/demoToast";
import {
  avatarGradient,
  computeProfileOverview,
  computeScenarioHeatRanking,
  driverAvatarText,
  resolveSegmentRiskLevel,
  riskLevelMeta,
} from "@/lib/demo/driverProfilePresentation";
import { isShiftBound } from "@/lib/demo/driverProfileUtils";
import type { ActiveShift, DriverProfile } from "@/lib/types/demo";

const trendIcon = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
} as const;

type DriverEvaluatePanelsProps = {
  profiles: DriverProfile[];
  activeShifts: ActiveShift[];
  selectedProfileId: string;
  onSelectProfile: (profileId: string) => void;
  onToggleShift: (driverId: string, driverName: string, train: string) => void;
  onClearShifts: () => void;
};

export function DriverEvaluatePanels({
  profiles,
  activeShifts,
  selectedProfileId,
  onSelectProfile,
  onToggleShift,
  onClearShifts,
}: DriverEvaluatePanelsProps) {
  const [trendRange, setTrendRange] = useState<"30" | "90">("30");
  const overview = useMemo(() => computeProfileOverview(profiles), [profiles]);
  const heatRanking = useMemo(
    () => computeScenarioHeatRanking(profiles),
    [profiles],
  );
  const selectedProfile =
    profiles.find((item) => item.id === selectedProfileId) ?? profiles[0];

  const trendLabels =
    trendRange === "30"
      ? ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "本周"]
      : ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "本月"];
  const trendValues =
    trendRange === "30"
      ? selectedProfile?.scoreTrend30 ?? []
      : selectedProfile?.scoreTrend90 ?? [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "司机总数", value: overview.total, unit: "人" },
          { label: "平均评分", value: overview.avgScore, unit: "分" },
          { label: "高风险司机", value: overview.highRiskDrivers, unit: "人" },
          { label: "本周改善率", value: overview.improveRate, unit: "%" },
        ].map((item) => (
          <Card
            key={item.label}
            bordered
            className="lark-card-elevated !border-[#E5E6EB] !rounded-xl"
          >
            <p className="text-sm text-text-secondary">{item.label}</p>
            <p className="mt-2 text-[28px] font-semibold leading-none text-text-primary">
              {item.value}
              <span className="ml-1 text-sm font-normal text-text-secondary">
                {item.unit}
              </span>
            </p>
          </Card>
        ))}
      </div>

      {activeShifts.length > 0 ? (
        <div className="rounded-xl border border-[#D6E4FF] bg-[#EBF1FF]/60 px-5 py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#245BDB]">
            <span>
              并行值乘{" "}
              <span className="font-semibold">{activeShifts.length}</span> 列
            </span>
            {activeShifts.map((shift) => (
              <LarkTag key={shift.sessionId} variant="info">
                {shift.driverName} · {shift.train}
              </LarkTag>
            ))}
            <DemoButton variant="ghost" size="sm" onClick={onClearShifts}>
              清空全部
            </DemoButton>
          </div>
        </div>
      ) : null}

      {selectedProfile ? (
        <Card
          bordered
          className="lark-card-elevated overflow-hidden !rounded-xl !border-[#E5E6EB]"
        >
          <div className="flex items-start gap-3 border-b border-[#F0F1F2] bg-gradient-to-r from-[#F7F9FF] to-white px-6 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-medium text-text-primary">
                  分析摘要
                </h3>
                <LarkTag variant="info">操作评价模型</LarkTag>
                <span className="text-xs text-text-secondary">
                  {selectedProfile.name} · {selectedProfile.train}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text-primary">
                {selectedProfile.aiSummary.headline}
              </p>
            </div>
          </div>
          <div className="grid gap-6 px-6 py-5 lg:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
                主要风险
              </p>
              <ul className="space-y-2">
                {selectedProfile.aiSummary.mainRisks.map((risk) => (
                  <li
                    key={risk}
                    className="flex items-start gap-2 text-sm text-text-primary"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
                相比上月
              </p>
              <div className="space-y-2">
                {selectedProfile.aiSummary.monthCompare.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-[#F7F8FA] px-3 py-2 text-sm"
                  >
                    <span className="text-text-secondary">{item.label}</span>
                    <span
                      className={
                        item.positive === true
                          ? "font-medium text-emerald-600"
                          : item.positive === false
                            ? "font-medium text-rose-600"
                            : "font-medium text-text-primary"
                      }
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
                改进建议
              </p>
              <div className="rounded-xl border border-[#D6E4FF] bg-[#F7F9FF] px-4 py-3 text-sm leading-relaxed text-[#245BDB]">
                {selectedProfile.aiSummary.suggestion}
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <div>
        <CardTitleWithHint
          title="司机画像"
          hint="卡片化展示能力标签与风险标签，支持多列车并行值乘绑定"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {profiles.map((profile, index) => {
            const TrendIcon = trendIcon[profile.trend];
            const isSelected = profile.id === selectedProfile?.id;
            const isBound = isShiftBound(
              activeShifts,
              profile.driverId,
              profile.train,
            );

            return (
              <Card
                key={profile.id}
                bordered
                className={`!rounded-xl transition-all ${
                  isSelected
                    ? "!border-brand !shadow-[0_8px_24px_rgba(51,112,255,0.12)]"
                    : "!border-[#E5E6EB] lark-card-elevated hover:!border-brand/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-semibold text-white ${avatarGradient(index)}`}
                  >
                    {driverAvatarText(profile.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-medium text-text-primary">
                          {profile.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-text-secondary">
                          {profile.driverId} · {profile.train}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-text-primary">
                          {profile.score}
                        </p>
                        <p className="mt-0.5 flex items-center justify-end gap-0.5 text-xs text-emerald-600">
                          <TrendIcon className="size-3" />
                          {profile.trend === "up"
                            ? "改善"
                            : profile.trend === "down"
                              ? "回落"
                              : "持平"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="mb-1.5 text-xs text-text-secondary">能力标签</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.strengthTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[#D6E4FF] bg-[#EBF1FF] px-2 py-0.5 text-xs text-[#245BDB]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs text-text-secondary">风险标签</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.riskTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-rose-100 bg-rose-50 px-2 py-0.5 text-xs text-rose-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[#F0F1F2] pt-4">
                  <DemoButton
                    variant={isSelected ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => onSelectProfile(profile.id)}
                  >
                    查看画像
                  </DemoButton>
                  <DemoButton
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      demoToastInfo(`${profile.name} 历史评价记录（Demo）`)
                    }
                  >
                    查看历史
                  </DemoButton>
                  <DemoButton
                    variant={isBound ? "secondary" : "primary"}
                    size="sm"
                    onClick={() =>
                      onToggleShift(
                        profile.driverId,
                        profile.name,
                        profile.train,
                      )
                    }
                  >
                    {isBound ? "取消值乘" : "设为今日值乘"}
                  </DemoButton>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card
          bordered
          className="lark-card-elevated !rounded-xl xl:col-span-2"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <CardTitleWithHint
              title="评分趋势"
              hint={`${selectedProfile?.name ?? "—"} · 操作评价得分变化`}
            />
            <Radio.Group
              type="button"
              size="small"
              value={trendRange}
              onChange={(value) => setTrendRange(value as "30" | "90")}
            >
              <Radio value="30">近 30 天</Radio>
              <Radio value="90">近 90 天</Radio>
            </Radio.Group>
          </div>
          <SimpleLineChart labels={trendLabels} values={trendValues} />
        </Card>

        <HorizontalRankChart
          title="风险热力排行"
          hint="按场景问题占比排序（全司机聚合）"
          items={heatRanking}
        />
      </div>

      {selectedProfile ? (
        <div>
          <CardTitleWithHint
            title="风险区段"
            hint={`${selectedProfile.name} · ${selectedProfile.weakSegments.length} 处需关注区段`}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {selectedProfile.weakSegments.map((segment) => {
              const level = resolveSegmentRiskLevel(segment.occurrences);
              const meta = riskLevelMeta[level];
              return (
                <Card
                  key={`${segment.km}-${segment.errorType}`}
                  bordered
                  className="!rounded-xl !border-[#E5E6EB] lark-card-elevated"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-text-primary">
                        {segment.km}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {segment.scenario} · {segment.errorType}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.badge}`}
                    >
                      <span className={`size-2 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className="rounded-lg bg-[#F7F8FA] px-3 py-1.5 text-text-secondary">
                      近 30 天{" "}
                      <span className="font-medium text-text-primary">
                        {segment.occurrences}
                      </span>{" "}
                      次
                    </span>
                  </div>
                  <div className="mt-4 rounded-xl border border-[#D6E4FF] bg-[#F7F9FF] px-4 py-3 text-sm leading-relaxed text-[#245BDB]">
                    <span className="text-xs font-medium text-brand">改进建议</span>
                    <p className="mt-1">{segment.hint}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
