"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: { fontFamily: "var(--font-sans)" },
          success: { iconTheme: { primary: "#1a9951", secondary: "#fff" } },
          error: { iconTheme: { primary: "#d03739", secondary: "#fff" } },
        }}
      />
    </>
  );
}
