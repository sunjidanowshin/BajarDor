import Link from "next/link";
import { formatNumberBn, perUnitBn } from "@/lib/format";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          <span aria-hidden>{product.image}</span>
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-base font-semibold group-hover:text-primary">
            {product.nameBn}
          </span>
          <span className="text-xs text-base-content/70">{perUnitBn(product.unit)}</span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="flex flex-col">
          <span className="text-xs text-base-content/70">আজকের দাম</span>
          <span>
            <span className="text-xl font-bold">{formatNumberBn(product.today)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </span>
        </span>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}
