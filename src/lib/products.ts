import type { Product } from "./types";

/** Top N products whose price went up today, biggest rise first. */
export function topRisers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);
}

/** Top N products whose price went down today, biggest fall first. */
export function topFallers(products: Product[], n = 6): Product[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // most negative first
    .slice(0, n);
}

export interface PriceSummary {
  min: number;
  max: number;
  avg: number;
  minMarket?: string;
  maxMarket?: string;
  marketCount: number;
}

/** Average of a market's min and max price, rounded to whole taka. */
export function marketAvg(m: { min: number; max: number }): number {
  return Math.round((m.min + m.max) / 2);
}

/** Lowest / highest / average price across all markets. */
export function priceSummary(product: Product): PriceSummary {
  const markets = product.markets ?? [];
  if (markets.length === 0) {
    return { min: product.today, max: product.today, avg: product.today, marketCount: 0 };
  }
  const minM = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const maxM = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const avg = Math.round(markets.reduce((s, m) => s + marketAvg(m), 0) / markets.length);
  return {
    min: minM.min,
    max: maxM.max,
    avg,
    minMarket: `${minM.market}, ${minM.division}`,
    maxMarket: `${maxM.market}, ${maxM.division}`,
    marketCount: markets.length,
  };
}
