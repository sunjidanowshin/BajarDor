"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut, signUp } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import FormField from "./FormField";
import SocialButtons from "./SocialButtons";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const next: Errors = {};
    if (!name) next.name = "নাম লিখুন।";
    if (!email) next.email = "ইমেইল লিখুন।";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
    if (password.length < 8) next.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    if (confirm !== password) next.confirm = "দুটি পাসওয়ার্ড মেলেনি।";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(Object.values(next)[0]!);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }
   
    await signOut();
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="নাম" name="name" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" error={errors.name} />
      <FormField label="ইমেইল" name="email" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email} />
      <FormField label="পাসওয়ার্ড" name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" error={errors.password} />
      <FormField label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" autoComplete="new-password" placeholder="আবার লিখুন" error={errors.confirm} />

      <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md w-full rounded-lg font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <SocialButtons callbackURL="/" />

      <p className="text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="link link-primary link-hover">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
