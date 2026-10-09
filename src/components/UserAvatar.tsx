import Image from "next/image";


export default function UserAvatar({
  name,
  image,
  size = 36,
  className = "",
}: {
  name?: string | null;
  image?: string | null;
  size?: number;
  className?: string;
}) {
  const initial = (name?.trim().charAt(0) || "?").toUpperCase();
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden bg-primary font-semibold text-primary-content ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {image ? (
        <Image src={image} alt={name ?? ""} width={size} height={size} className="size-full object-cover" unoptimized />
      ) : (
        initial
      )}
    </span>
  );
}
