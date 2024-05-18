import Link from "next/link";

export default function NavItem({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="nav-item flex h-full items-center justify-center p-4">
        {text}
      </div>
    </Link>
  );
}
