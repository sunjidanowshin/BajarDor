import type { Metadata } from "next";
import NotFoundState from "@/components/NotFoundState";

export const metadata: Metadata = {
  title: "পাতাটি পাওয়া যায়নি — বাজার দর",
};

export default function NotFound() {
  return (
    <NotFoundState
      icon="🔍"
      code="৪০৪"
      title="পাতাটি খুঁজে পাওয়া যায়নি"
      message="আপনি যে পাতাটি খুঁজছেন সেটি সরানো হয়েছে অথবা কখনো ছিল না।"
    />
  );
}
