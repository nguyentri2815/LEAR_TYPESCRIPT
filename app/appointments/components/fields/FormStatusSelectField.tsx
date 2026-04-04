import React from "react";
import FieldShell from "./FieldShell";

interface FormStatusSelectFieldProps {
  label: string;
  value: string | number | undefined;
  options: { value: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
}

const FormStatusSelectField = (props: FormStatusSelectFieldProps) => {
  const { label, value, options, onChange, error, description, disabled } =
    props;

  return (
    <FieldShell label={label} error={error} description={description}>
      <select
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-50"
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

export default FormStatusSelectField;
