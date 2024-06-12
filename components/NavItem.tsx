import Link from "next/link";

export default function NavItem({
  link = "/",
  onclick,
  children,
  className,
}: {
  link?: string;
  onclick?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={link}>
      <div
        className={`nav-item flex h-full items-center justify-center gap-2 p-4 ${className || ""}`}
        onClick={onclick}
      >
        {children}
      </div>
    </Link>
  );
}
