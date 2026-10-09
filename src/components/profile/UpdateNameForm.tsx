"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/auth/FormField";
import { updateUser } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("নাম খালি রাখা যাবে না।");
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন হয়নি।", { icon: "ℹ️" });
      return;
    }
    setError(undefined);
    setLoading(true);
    // BetterAuth: https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.replace("/profile");
    router.refresh(); // re-render navbar + profile with the new name
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="আপনার পূর্ণ নাম"
        error={error}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <Link href="/profile" className="btn btn-ghost btn-sm sm:btn-md rounded-lg sm:flex-1">
          বাতিল
        </Link>
        <button type="submit" disabled={loading} className="btn btn-primary btn-sm sm:btn-md rounded-lg font-semibold sm:flex-[2]">
          {loading && <span className="loading loading-spinner loading-sm" />}
          তথ্য আপডেট করুন
        </button>
      </div>
    </form>
  );
}
