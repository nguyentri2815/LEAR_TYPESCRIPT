import type { ReactNode } from "react";
import Card from "./Card";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

const EmptyState = ({
  title,
  description,
  action,
}: EmptyStateProps): ReactNode => {
  return (
    <Card
      className="border-dashed border-slate-300 bg-slate-50/80 text-center"
      padding="lg"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-xl font-semibold text-teal-700">
          +
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {action}
      </div>
    </Card>
  );
};

export default EmptyState;
