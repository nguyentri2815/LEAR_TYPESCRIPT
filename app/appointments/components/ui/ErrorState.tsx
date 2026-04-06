"use client";

import ActionButton from "./ActionButton";
import Card from "./Card";

interface ErrorStateProps {
  title?: string;
  description?: string;
  error?: string | Error;
  onRetry?: () => void | Promise<void>;
  isRetrying?: boolean;
  showDetails?: boolean;
}

/**
 * Thành phần xử lý lỗi sẵn sàng cho sản xuất
 * 
 * Xử lý:
 * - Thông báo lỗi rõ ràng
 * - Hành động thử lại
 * - Chi tiết lỗi để gỡ lỗi
 * - Khả năng truy cập (role="alert")
 */
export const ErrorState = ({
  title = "Không thể tải dữ liệu",
  description = "Đã xảy ra lỗi. Vui lòng thử lại.",
  error,
  onRetry,
  isRetrying = false,
  showDetails = false,
}: ErrorStateProps) => {
  const errorMessage =
    typeof error === "string" ? error : error?.message || description;

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-red-200 bg-red-50 px-6 py-8">
      {/* Biểu tượng lỗi */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Thông báo lỗi */}
      <div className="text-center" role="alert">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{errorMessage}</p>
      </div>

      {/* Chi tiết lỗi (để gỡ lỗi) */}
      {showDetails && error && typeof error !== "string" && (
        <Card padding="sm" className="w-full bg-slate-100">
          <details className="text-xs text-slate-600">
            <summary className="cursor-pointer font-mono font-semibold">
              Chi tiết lỗi
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-slate-950 px-3 py-2 text-xs text-slate-100">
              {error.message}
              {error.stack && `\n${error.stack}`}
            </pre>
          </details>
        </Card>
      )}

      {/* Hành động */}
      <div className="flex gap-3">
        {onRetry && (
          <ActionButton
            label={isRetrying ? "Đang thử lại..." : "Thử lại"}
            onClick={onRetry}
            disabled={isRetrying}
          />
        )}
        <ActionButton
          label="Tải lại trang"
          onClick={() => window.location.reload()}
          variant="secondary"
        />
      </div>

      {/* Văn bản trợ giúp */}
      <p className="text-xs text-slate-500">
        Nếu sự cố này tiếp tục xảy ra, vui lòng liên hệ bộ phận hỗ trợ hoặc thử tải lại trang.
      </p>
    </div>
  );
};
