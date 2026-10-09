"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await signOut();
        toast.success("সাইন আউট সম্পন্ন হয়েছে");
        router.push("/");
        router.refresh();
      }}
      className="btn btn-outline btn-error btn-sm sm:btn-md rounded-lg font-semibold"
    >
      {loading ? <span className="loading loading-spinner loading-xs" /> : <span aria-hidden>↩</span>}
      সাইন আউট
    </button>
  );
}
