import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import SignOutButton from "@/components/profile/SignOutButton";
import UserAvatar from "@/components/UserAvatar";
import { requireSession } from "@/lib/session";
import { toBn } from "@/lib/format";

export const metadata: Metadata = { title: "আমার প্রোফাইল — বাজার দর" };

function joinedDate(d: Date | string) {
  const parts = new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).formatToParts(new Date(d));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return toBn(`${get("day")} ${get("month")}, ${get("year")}`);
}

async function ProfileContent() {
  const { user } = await requireSession("/profile");

  return (
    <>
      <section className="flex flex-col items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        <UserAvatar name={user.name} image={user.image} size={80} className="rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl">{user.name}</p>
          <p className="truncate text-base text-base-content/70">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="space-y-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <dl className="divide-y divide-base-200 rounded-xl border border-base-200 px-4 text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/70">নাম</dt>
            <dd className="text-right font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/70">ইমেইল</dt>
            <dd className="break-all text-right font-medium">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-base-content/70">যোগদান</dt>
            <dd className="text-right font-medium">{joinedDate(user.createdAt)}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
          আপডেট
        </Link>
      </section>
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="skeleton size-20 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <div className="skeleton h-56 rounded-2xl" />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
