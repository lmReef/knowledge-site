import styles from "./Button.module.scss";

export default function Button({
  children,
  className,
  onClick,
  tooltip,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
  tooltip?: React.ReactNode | string;
}) {
  return (
    <button
      className={`button relative rounded-xl bg-white bg-opacity-5 p-2 transition-all hover:bg-opacity-15 ${styles.button} ${className || ""}`}
      onClick={onClick}
    >
      <div
        className={`tooltip absolute -top-3/4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 bg-opacity-95 px-2 py-1 transition-all ${styles.tooltip}`}
      >
        {tooltip}
      </div>
      {children}
    </button>
  );
}
