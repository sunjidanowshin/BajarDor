"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  const handle = async (provider: "google" | "github") => {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      setLoading(null);
    }
    
  };

  return (
    <>
      <div className="divider my-0 text-xs">অথবা</div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handle("google")}
          disabled={loading !== null}
          className="btn btn-outline btn-sm sm:btn-md gap-1.5 whitespace-nowrap rounded-lg border-base-300 px-2 font-semibold"
        >
          {loading === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => handle("github")}
          disabled={loading !== null}
          className="btn btn-outline btn-sm sm:btn-md gap-1.5 whitespace-nowrap rounded-lg border-base-300 px-2 font-semibold"
        >
          {loading === "github" ? <span className="loading loading-spinner loading-xs" /> : <GitHubIcon />}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
