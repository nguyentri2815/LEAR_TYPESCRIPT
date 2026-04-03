// field Controlled component for appointment status (e.g., Scheduled, Completed, Canceled)
import React from "react";
interface StatusSelectFieldProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}
const StatusSelectField = (props: StatusSelectFieldProps) => {
  const { label, value, onChange, error } = props;

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        title={props.name}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">Select status</option>
        <option value="NEW">New</option>
        <option value="CONFIRM">Confirm</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      {error && <span className="text-sm text-rose-500">{error}</span>}
    </div>
  );
};

export default StatusSelectField;
