export type ChangeDir = "up" | "down" | "flat";

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string; // "kg" | "litre" | "dozen" | "piece"
  image: string; // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: ChangeDir; pct: number };
  markets: MarketPrice[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
