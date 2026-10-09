import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";
import SortedProductList from "@/components/category/SortedProductList";
import NotFoundState from "@/components/NotFoundState";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/format";

/** Pre-build the 8 known categories; reloading /category/chal on Vercel works without a 404. */
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(decodeURIComponent(slug));
  if (!category) notFound(); // invalid slug → 404 page with "হোম পেজে ফিরে যান"

  const products = await getProductsByCategory(category.slug);

  return (
    <>
      <CategoryHeader
        icon={category.icon}
        title={category.nameBn}
        subtitle={`${toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
      />
      {products.length === 0 ? (
        <NotFoundState
          icon={category.icon}
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          message="এই মুহূর্তে এই ক্যাটাগরির কোনো পণ্যের দাম পাওয়া যায়নি।"
        />
      ) : (
        <SortedProductList products={products} />
      )}
    </>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton size-10 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-6 w-24" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="skeleton h-16 w-full rounded-2xl" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}

export default function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}
