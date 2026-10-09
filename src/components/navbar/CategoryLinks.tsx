import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryLinks({
  categories,
  activeHref,
}: {
  categories: Category[];
  activeHref: string | null;
}) {
  return (
    <nav aria-label="ক্যাটাগরি" className="border-t border-base-200 bg-base-100">
      <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
        {categories.map((cat) => {
          const href = `/category/${cat.slug}`;
          const active = activeHref === href;
          return (
            <li key={cat.slug} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                  active
                    ? "border-[#047c37] bg-secondary text-primary-content"
                    : "border-transparent hover:bg-base-200"
                }`}
              >
                <span aria-hidden>{cat.icon}</span>
                {cat.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
