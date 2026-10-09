import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-base-content/70">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <p className="mt-6 text-center text-sm">
        <Link href="/" className="link link-hover">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
