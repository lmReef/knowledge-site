import Link from "next/link";
import styles from "./NavItem.module.scss";

export default function NavItem({
  link,
  onclick,
  children,
  className,
  currentPage,
  align = "left",
}: {
  link?: string;
  onclick?: () => void;
  children?: React.ReactNode;
  className?: string;
  currentPage: string;
  align?: "left" | "right";
}) {
  let active = currentPage === link;

  //@ts-ignore
  if (!link && children.includes("Random")) {
    active = currentPage.includes("from=random");
  }

  // because sometimes theres no link, so we want to wrap those cases with div instead
  const wrapper = (inner: React.ReactNode) => {
    const classes = `overflow-hidden ${styles["nav-item"]} relative rounded-sm ${align === "right" ? "ml-auto" : ""}`;
    if (link) {
      return (
        <Link href={link} className={classes}>
          {inner}
        </Link>
      );
    } else {
      return (
        <div
          className={classes + " cursor-pointer text-[var(--custom-primary)]"}
        >
          {inner}
        </div>
      );
    }
  };

  return wrapper(
    <>
      <div
        className={`nav-item flex h-full items-center justify-center gap-2 p-4 ${className || ""}`}
        onClick={onclick}
      >
        {children}
      </div>
      <div
        className={`hover-accent-x absolute bottom-0 left-0 h-0 w-1 bg-[var(--custom-primary)] transition-all duration-300 ${styles["hover-accent"]} ${active ? "h-14" : ""}`}
      />
    </>,
  );
}
