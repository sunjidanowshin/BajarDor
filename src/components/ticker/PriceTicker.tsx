import Link from "next/link";
import { getProducts } from "@/lib/api";
import { CHANGE_TEXT, formatChange, formatNumberBn, unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

function TickerItems({ products, hidden = false }: { products: Product[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={hidden || undefined}>
      {products.map((p) => (
        <li key={p.id} className="shrink-0 border-r border-base-200">
          <Link
            href={`/product/${p.slug}`}
            tabIndex={hidden ? -1 : undefined}
            className="flex h-9 items-center gap-1.5 whitespace-nowrap pl-4 pr-[17px] text-sm hover:bg-base-200"
          >
            <span aria-hidden>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
              {formatNumberBn(p.today)} টাকা/{unitBn(p.unit)}
            </span>
            <span className={`font-semibold ${CHANGE_TEXT[p.change.dir]}`}>
              {formatChange(p.change.dir, p.change.pct)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}


export default async function PriceTicker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    return null; 
  }
  if (products.length === 0) return null;


  const duration = `${products.length * 3}s`;

  return (
    <div
      className="ticker group overflow-hidden border-b border-base-300 bg-base-100"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track flex w-max" style={{ animationDuration: duration }}>
        <TickerItems products={products} />
     
        <TickerItems products={products} hidden />
      </div>
    </div>
  );
}
