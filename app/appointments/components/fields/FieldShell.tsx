import React from "react";

interface FieldShellProps {
  children: React.ReactNode; // Để chứa các field cụ thể bên trong
  label: string;
  description?: string;
  error?: string;
}

const FieldShell = (props: FieldShellProps) => {
  const { label, description, error, children } = props;
  return (
    <div title={description}>
      {/* Đây là component shell để chứa các field, có thể thêm styling hoặc layout chung ở đây */}
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {/* Các field cụ thể sẽ được render ở đây */}
      {/* Ví dụ: <TextField ... /> */}
      {children}
      {/* Hiển thị lỗi nếu có */}
      {error && <span className="text-sm text-rose-500">{error}</span>}
    </div>
  );
};

export default FieldShell;
