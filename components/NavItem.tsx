import Link from "next/link";

export default function NavItem({
  link,
  children,
  className,
}: {
  link: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={link}>
      <div
        className={`nav-item flex h-full items-center justify-center p-4 ${className || ""}`}
      >
        {children}
      </div>
    </Link>
  );
}
