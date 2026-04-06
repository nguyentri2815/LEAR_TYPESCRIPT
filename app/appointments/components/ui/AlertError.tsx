"use client";

/**
 * Thành phần cảnh báo lỗi sẵn sàng cho sản xuất
 * 
 * Sử dụng cho:
 * - Lỗi gậi biểu mẫu
 * - Lỗi mutation trong modal
 * - Lỗi xác nhận cơ bản
 * 
 * Đặc điểm:
 * - Kiểu dᷯf tối giản (Độc cụp cảnh báo đỏ)
 * - Khả năng truy cập (role="alert")
 * - Thành phần thông báo nșnh chóp
 */

export interface AlertErrorProps {
  message?: string;
  error?: string | Error;
  className?: string;
}

export const AlertError = ({
  message,
  error,
  className = "",
}: AlertErrorProps) => {
  const errorText =
    message ||
    (typeof error === "string" ? error : error?.message) ||
    "Đã xảy ra lỗi";

  return (
    <div
      className={`rounded-md bg-red-50 p-3 text-sm text-red-600 ${className}`}
      role="alert"
    >
      {errorText}
    </div>
  );
};
