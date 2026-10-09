import type { ChangeDir } from "./types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];


export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatNumberBn(n: number): string {
  return toBn(n.toLocaleString("en-US", { maximumFractionDigits: 2 }));
}


export function formatTaka(n: number): string {
  return `${formatNumberBn(n)} টাকা`;
}


export function formatPct(pct: number): string {
  return `${toBn(Math.abs(pct).toFixed(1))}%`;
}

export const ARROW: Record<ChangeDir, string> = { up: "▲", down: "▼", flat: "—" };

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};


export function unitBn(unit: string): string {
  return UNIT_BN[unit] ?? unit;
}


export function perUnitBn(unit: string): string {
  return `প্রতি ${unitBn(unit)}`;
}


export function formatBnDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return toBn(`${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`);
}


export const CHANGE_TEXT: Record<ChangeDir, string> = {
  up: "text-success",
  down: "text-error",
  flat: "text-base-content/60",
};


export function formatChange(dir: ChangeDir, pct: number): string {
  return `${ARROW[dir]} ${formatPct(pct)}`;
}
