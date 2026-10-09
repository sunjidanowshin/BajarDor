"use client";

import { useSyncExternalStore } from "react";
import { formatBnDate } from "@/lib/format";

const subscribe = () => () => {};


export default function BanglaDate({ className }: { className?: string }) {
  const date = useSyncExternalStore(
    subscribe,
    () => formatBnDate(),
    () => ""
  );
  return (
    <span className={className} suppressHydrationWarning>
      {date || " "}
    </span>
  );
}
