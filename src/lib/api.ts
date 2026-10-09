import { cacheLife } from "next/cache";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // fallback
];

/** Fetch JSON from the main API, falling back to the alternative URL. */
async function fetchJson<T>(path: string): Promise<T | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
    } catch {
      // try the next base URL
    }
  }
  throw new Error(`Failed to load ${path}`);
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return (await fetchJson<Product[]>("/products")) ?? [];
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return (await fetchJson<Category[]>("/categories")) ?? [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  return (
    (await fetchJson<Product[]>(`/products?category=${encodeURIComponent(slug)}`)) ?? []
  );
}

export async function getCategory(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Product pages use the slug in the URL (/product/[slug]). */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
