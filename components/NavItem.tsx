import Link from "next/link";

export default function NavItem({
  link,
  children,
}: {
  link: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="nav-item flex h-full items-center justify-center p-4">
        {children}
      </div>
    </Link>
  );
}
