import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { CHANGE_TEXT, ARROW, formatNumberBn, formatPct, perUnitBn, toBn, unitBn } from "@/lib/format";
import { marketAvg, priceSummary } from "@/lib/products";
import { requireSession } from "@/lib/session";
import type { Product } from "@/lib/types";

function changeLine(p: Product) {
  const diff = p.today - p.yesterday;
  if (p.change.dir === "flat" || diff === 0) return <>গতকালের তুলনায় আজ দাম <b className="font-semibold">অপরিবর্তিত</b></>;
  const word = diff > 0 ? "বেড়েছে" : "কমেছে";
  return (
    <>
      গতকালের তুলনায় আজ দাম <b className="font-semibold">{word}</b> · {formatNumberBn(Math.abs(diff))} টাকা
    </>
  );
}

function SummaryStat({ label, value, note, tone }: { label: string; value: number; note: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4">
      <p className="text-xs">{label}</p>
      <p className={tone}>
        <span className="text-2xl font-bold">{formatNumberBn(value)}</span>{" "}
        <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="text-xs text-base-content/70">{note}</p>
    </div>
  );
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = `/product/${slug}`;
  await requireSession(path); // protected route

  const product = await getProductBySlug(decodeURIComponent(slug));
  if (!product) notFound();

  const s = priceSummary(product);
  const unit = unitBn(product.unit);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="breadcrumbs py-1 text-sm">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link></li>
          <li className="text-base-content/70">{product.nameBn}</li>
        </ul>
      </div>

      {/* Summary header */}
      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl sm:size-20">
            <span aria-hidden>{product.image}</span>
          </span>
          <div className="min-w-0 space-y-1">
            <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-base-content/70">{changeLine(product)}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href={`/category/${product.category}`} className="badge badge-outline badge-success gap-1">
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="badge badge-ghost">{perUnitBn(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-2 rounded-2xl bg-base-200 px-5 py-4 sm:flex-col sm:items-center sm:text-center">
          <div>
            <p className="text-sm text-base-content/70">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatNumberBn(product.today)}</p>
            <p className="text-sm text-base-content/70">টাকা / {unit}</p>
          </div>
          <p className={`text-sm ${CHANGE_TEXT[product.change.dir]}`}>
            {ARROW[product.change.dir]} <span className="font-semibold">{formatPct(product.change.pct)}</span>
          </p>
        </div>
      </section>

      <section className="space-y-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        {/* Price summary */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <SummaryStat label="সর্বনিম্ন দাম" value={s.min} note={s.minMarket ?? "সবচেয়ে কম দামের বাজার"} tone="text-success" />
            <SummaryStat label="সর্বাধিক দাম" value={s.max} note={s.maxMarket ?? "সবচেয়ে বেশি দামের বাজার"} tone="text-error" />
            <SummaryStat label="গড় দাম" value={s.avg} note={`${toBn(s.marketCount)}টি বাজারের গড়`} />
          </div>
          <p className="text-sm text-base-content/70">
            গত সপ্তাহে {formatNumberBn(product.lastWeek)} টাকা · গত মাসে {formatNumberBn(product.lastMonth)} টাকা · গতকাল{" "}
            {formatNumberBn(product.yesterday)} টাকা (প্রতি {unit})
          </p>
        </div>

        {/* Market-wise prices */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table">
              <thead className="bg-base-200 text-sm text-base-content">
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {product.markets.map((m) => (
                  <tr key={`${m.division}-${m.market}`} className="hover:bg-base-200/60">
                    <td className="whitespace-nowrap font-medium">{m.market}</td>
                    <td className="whitespace-nowrap">{m.division}</td>
                    <td className="whitespace-nowrap text-right">{formatNumberBn(m.min)} টাকা</td>
                    <td className="whitespace-nowrap text-right">{formatNumberBn(m.max)} টাকা</td>
                    <td className="whitespace-nowrap text-right font-semibold">{formatNumberBn(marketAvg(m))} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/#সব-পণ্য" className="btn btn-outline btn-sm sm:btn-md rounded-lg">← সব পণ্য</Link>
        <Link href={`/category/${product.category}`} className="btn btn-primary btn-sm sm:btn-md rounded-lg">
          {product.categoryIcon} {product.categoryNameBn} — সব দাম দেখুন
        </Link>
      </div>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-5 w-48" />
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton size-20 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-8 w-1/3" />
          <div className="skeleton h-4 w-1/2" />
        </div>
        <div className="skeleton hidden h-28 w-28 rounded-2xl sm:block" />
      </div>
      <div className="space-y-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
        <div className="skeleton h-72 rounded-2xl" />
      </div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}
