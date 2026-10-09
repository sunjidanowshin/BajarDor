import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/navbar/Navbar";
import PriceTicker from "@/components/ticker/PriceTicker";
import Footer from "@/components/Footer";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর এক নজরে।",
  icons: { icon: "/logo-icon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="bazardor" data-scroll-behavior="smooth" className={`${hindSiliguri.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-base-200 text-base-content antialiased">
        <Providers>
          <Navbar />
          <PriceTicker />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

