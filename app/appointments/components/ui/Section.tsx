import type { ReactNode } from "react";
import Card from "./Card";

type SectionProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const Section = ({
  title,
  description,
  eyebrow,
  actions,
  children,
  className = "",
  contentClassName = "",
}: SectionProps): ReactNode => {
  return (
    <Card className={className} padding="lg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
                {eyebrow}
              </p>
            )}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                {title}
              </h2>
              {description && (
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  {description}
                </p>
              )}
            </div>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </Card>
  );
};

export default Section;
