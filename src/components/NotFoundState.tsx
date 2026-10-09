import Link from "next/link";

interface Props {
  icon?: string;
  code?: string;
  title: string;
  message: string;
}

export default function NotFoundState({ icon = "🧺", code, title, message }: Props) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <div className="mb-4 flex size-20 items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-4xl">
        <span aria-hidden>{icon}</span>
      </div>
      {code && <p className="text-5xl font-bold text-primary sm:text-6xl">{code}</p>}
      <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary btn-sm sm:btn-md mt-6 rounded-lg font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
