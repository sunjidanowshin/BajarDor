"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { authErrorMessage, safeRedirect } from "@/lib/auth-errors";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const redirectTo = safeRedirect(searchParams.get("redirect"));
  const fromProtected = searchParams.get("reason") === "protected";

  
  const toasted = useRef(false);
  useEffect(() => {
    if (fromProtected && !toasted.current) {
      toasted.current = true;
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন।", { id: "protected" });
    }
  }, [fromProtected]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const next: typeof errors = {};
    if (!email) next.email = "ইমেইল লিখুন।";
    if (!password) next.password = "পাসওয়ার্ড লিখুন।";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("অনুগ্রহ করে সব ঘর পূরণ করুন।");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
    
    setLoading(true);
    setTimeout(() => window.location.assign(redirectTo), 700);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="current-password" placeholder="আপনার পাসওয়ার্ড" error={errors.password} />

      <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>

      <SocialButtons callbackURL={redirectTo} />

      <p className="text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="link link-primary link-hover">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
