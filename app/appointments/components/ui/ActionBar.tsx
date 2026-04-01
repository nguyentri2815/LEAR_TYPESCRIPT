import type { ReactNode } from "react";

type ActionBarProps = {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

const ActionBar = ({
  children,
  actions,
  className = "",
}: ActionBarProps): ReactNode => {
  return (
    <div
      className={[
        "flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50/90 p-4",
        "lg:flex-row lg:items-center lg:justify-between",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};

export default ActionBar;
