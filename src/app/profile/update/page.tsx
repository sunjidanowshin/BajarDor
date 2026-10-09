import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import UpdateNameForm from "@/components/profile/UpdateNameForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট — বাজার দর" };

async function UpdateContent() {
  const { user } = await requireSession("/profile/update");
  return <UpdateNameForm currentName={user.name} />;
}

export default function UpdateProfilePage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-6">
      <div className="breadcrumbs py-1 text-sm">
        <ul>
          <li><Link href="/profile">আমার প্রোফাইল</Link></li>
          <li className="text-base-content/70">তথ্য আপডেট</li>
        </ul>
      </div>
      <header>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-base-content/70">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>
      </header>
      <section className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <Suspense fallback={<div className="space-y-3"><div className="skeleton h-4 w-12" /><div className="skeleton h-10 w-full" /><div className="skeleton h-10 w-full" /></div>}>
          <UpdateContent />
        </Suspense>
      </section>
    </div>
  );
}
