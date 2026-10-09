export default function Footer() {
  return (
    <footer className="mt-12 border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>
          <span className="font-semibold">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="italic text-base-content/80">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
