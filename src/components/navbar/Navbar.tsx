import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import AuthButtons from "./AuthButtons";
import BanglaDate from "./BanglaDate";
import CategoryLinks from "./CategoryLinks";
import CategoryNav from "./CategoryNav";

export default async function Navbar() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {

  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর — হোম">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg">
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold sm:text-xl">বাজার দর</span>
            <BanglaDate className="text-[11px] sm:text-xs" />
          </span>
        </Link>

        <AuthButtons />
      </div>

      <Suspense fallback={<CategoryLinks categories={categories} activeHref={null} />}>
        <CategoryNav categories={categories} />
      </Suspense>
    </header>
  );
}
