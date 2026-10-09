import { ARROW, CHANGE_TEXT, formatPct } from "@/lib/format";
import type { ChangeDir } from "@/lib/types";

export default function ChangeBadge({ dir, pct }: { dir: ChangeDir; pct: number }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs ${CHANGE_TEXT[dir]}`}
    >
      <span aria-hidden>{ARROW[dir]}</span>
      <span className="font-semibold">{formatPct(pct)}</span>
    </span>
  );
}
