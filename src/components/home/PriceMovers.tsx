import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  direction: "up" | "down";
  products: Product[];
}

const CONFIG = {
  up: { title: "আজ দাম বেড়েছে", arrow: "▲", color: "text-success", empty: "আজ কোনো পণ্যের দাম বাড়েনি।" },
  down: { title: "আজ দাম কমেছে", arrow: "▼", color: "text-error", empty: "আজ কোনো পণ্যের দাম কমেনি।" },
} as const;

export default function PriceMovers({ direction, products }: Props) {
  const c = CONFIG[direction];
  return (
    <section aria-labelledby={`movers-${direction}`} className="space-y-3">
      <h2 id={`movers-${direction}`} className="flex items-center gap-2 text-xl font-bold">
        <span aria-hidden className={`text-base ${c.color}`}>
          {c.arrow}
        </span>
        {c.title}
      </h2>
      {products.length === 0 ? (
        <p className="text-sm text-base-content/70">{c.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
