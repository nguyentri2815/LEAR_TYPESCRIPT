"use client";

type ActionButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

const variantClassMap = {
  primary:
    "bg-slate-950 text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,0.8)] hover:bg-slate-800",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50",
  ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200",
};

const ActionButton = (props: ActionButtonProps): React.ReactNode => {
  const {
    label,
    onClick,
    disabled = false,
    variant = "primary",
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-medium transition",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClassMap[variant],
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export default ActionButton;
