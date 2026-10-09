import Image from "next/image";
import BanglaDate from "@/components/navbar/BanglaDate";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col-reverse items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between md:py-10 lg:px-8">
        <div className="flex w-full max-w-xl flex-col items-start gap-2 text-left">
          {/* eyebrow */}
          <BanglaDate className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary" />

          {/* heading */}
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* subtitle */}
          <p className="mt-1 text-base text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

         
          <a
            href="#সব-পণ্য"
            className="btn btn-primary btn-sm sm:btn-md mt-3 rounded-lg font-semibold shadow-md shadow-primary/30"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়িতে সবজি ও মাছ"
          width={315}
          height={263}
          priority
          className="h-auto w-48 shrink-0 sm:w-60 md:w-[315px]"
        />
      </div>
    </section>
  );
}
