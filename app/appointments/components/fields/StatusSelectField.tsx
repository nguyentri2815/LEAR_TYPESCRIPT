// field Controlled component for appointment status (e.g., Scheduled, Completed, Canceled)
import React from "react";
import FieldShell from "./FieldShell";
interface StatusSelectFieldProps {
  label: string;
  value: string | number | undefined;
  options: { value: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  description?: string;
}
const StatusSelectField = (props: StatusSelectFieldProps) => {
  const { label, value, options, onChange, error, description, ...rest } = props;

  return (
    <FieldShell label={label} error={error} description={description}>
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
};

export default StatusSelectField;
