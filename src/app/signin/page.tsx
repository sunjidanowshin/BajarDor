import type { Metadata } from "next";
import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন — বাজার দর" };

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      {[0, 1].map((i) => (
        <div key={i} className="space-y-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-10 w-full" />
        </div>
      ))}
      <div className="skeleton h-10 w-full" />
    </div>
  );
}

export default function SignInPage() {
  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      {/* useSearchParams (for ?redirect=) needs a Suspense boundary */}
      <Suspense fallback={<FormSkeleton />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
