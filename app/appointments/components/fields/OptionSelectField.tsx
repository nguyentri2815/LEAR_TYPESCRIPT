import React from "react";
import FieldShell from "./FieldShell";
type Option<TValue = string> = {
  label: string;
  value: TValue;
};
interface OptionSelectFieldProps<TValue extends string | number> {
  label: string;
  value: TValue;
  options: Option<TValue>[];
  onChange: (value: TValue) => void;
  onBlur?: () => void;
  error?: string;
  description?: string;
}

const OptionSelectField = <TValue extends string | number>(
  props: OptionSelectFieldProps<TValue>,
): React.ReactNode => {
  const { label, options, onChange, onBlur, error, description } = props;
  return (
    <FieldShell label={label} error={error} description={description}>
      <select
        title={label}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        onChange={(e) => onChange(e.target.value as TValue)}
        onBlur={onBlur}
        aria-invalid={error ? "true" : "false"}
      >
        <option value="">Select customer</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
};

export default OptionSelectField;
