import React from 'react'

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any;
  error?: string;
}

const SelectField = (props: SelectFieldProps) => {
  const { options, name, label, error, ...rest } = props;
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        title={name}
        {...props.register(name)}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">Select customer</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-rose-500">{error}</span>}
    </div>
  )
}

export default SelectField;