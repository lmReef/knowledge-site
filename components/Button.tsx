export default function Button({
  children,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`button rounded-xl bg-white bg-opacity-5 p-2 transition-all hover:bg-opacity-15 ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
