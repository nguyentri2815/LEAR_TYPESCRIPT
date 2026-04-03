import React from 'react'
import FieldShell from './FieldShell';

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any;
  error?: string;
  description?: string;
}

const SelectField = (props: SelectFieldProps) => {
  const { options, name, label, error, description, ...rest } = props;
  return (
    <FieldShell label={label} error={error} description={description}>
      <select
        title={name}
        {...rest.register(name)}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">Select customer</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export default SelectField;