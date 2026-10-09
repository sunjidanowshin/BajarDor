export default function CategoryHeader({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: React.ReactNode;
}) {
  return (
    <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
      <span aria-hidden className="text-4xl leading-none">
        {icon}
      </span>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-base-content/70">{subtitle}</p>
      </div>
    </header>
  );
}
