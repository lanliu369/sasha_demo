import type {
  ActiveShift,
  DriverProfile,
  ProfileZoneAlert,
} from "@/lib/types/demo";

const ALERT_DISTANCES = ["前方 1.2 km", "前方 4.8 km", "前方 8.5 km"];
const ALERT_STATUSES: ProfileZoneAlert["status"][] = [
  "即将进入",
  "前方预警",
  "前方预警",
];

function buildAlertsForShift(
  shift: ActiveShift,
  profiles: DriverProfile[],
): ProfileZoneAlert[] {
  const profile = profiles.find(
    (item) => item.driverId === shift.driverId && item.train === shift.train,
  );
  if (!profile) return [];

  return profile.weakSegments.map((segment, index) => ({
    id: `${shift.train}-PA${String(index + 1).padStart(2, "0")}`,
    train: shift.train,
    driverName: shift.driverName,
    km: segment.km,
    scenario: segment.scenario,
    errorType: segment.errorType,
    distance: ALERT_DISTANCES[index] ?? `前方 ${(index + 1) * 3} km`,
    suggestion: segment.hint,
    status: ALERT_STATUSES[index] ?? "前方预警",
  }));
}

/** 多列车并行：合并各值乘会话的区段提前预警 */
export function buildProfileZoneAlertsForShifts(
  shifts: ActiveShift[],
  profiles: DriverProfile[],
): ProfileZoneAlert[] {
  return shifts.flatMap((shift) => buildAlertsForShift(shift, profiles));
}

export function isShiftBound(
  shifts: ActiveShift[],
  driverId: string,
  train: string,
): boolean {
  return shifts.some(
    (item) => item.driverId === driverId && item.train === train,
  );
}

export function findShiftByTrain(
  shifts: ActiveShift[],
  train: string,
): ActiveShift | undefined {
  return shifts.find((item) => item.train === train);
}
