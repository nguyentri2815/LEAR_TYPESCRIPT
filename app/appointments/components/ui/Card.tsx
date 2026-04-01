import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
};

const paddingClassMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = ({
  children,
  className = "",
  padding = "md",
}: CardProps): ReactNode => {
  return (
    <div
      className={[
        "rounded-[28px] border border-slate-200/80 bg-white/95",
        "shadow-[0_24px_70px_-40px_rgba(15,23,42,0.45)]",
        paddingClassMap[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export default Card;
