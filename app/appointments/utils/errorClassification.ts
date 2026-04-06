/**
 * Tiện ích Phân loại Lỗi
 * 
 * Xác định loại lỗi và chiến lược khôi phục:
 * - Lỗi mạng → Có thể thử lại
 * - Lỗi máy chủ 5xx → Có thể thử lại
 * - Lỗi khách hàng 4xx → Không thể thử lại
 * - Lỗi không xác định → Có thể thử lại (safer fallback)
 */

export interface ClassifiedError {
  isRetryable: boolean;
  code: string;
  message: string;
  userMessage: string;
  statusCode?: number;
}

/**
 * Phân loại lỗi để xử lý thích hợp hướng tới người dùng
 */
export function classifyError(error: unknown): ClassifiedError {
  // Lỗi mạng (không có phản hồi từ máy chủ)
  if (isNetworkError(error)) {
    return {
      isRetryable: true,
      code: "NETWORK_ERROR",
      message: "Kết nối mạng thất bại",
      userMessage: "Không thể kết nối. Vui lòng kiểm tra kết nối Internet của bạn.",
      statusCode: 0,
    };
  }

  // Lỗi HTTP với mã trạng thái
  if (isHttpError(error)) {
    const statusCode = getStatusCode(error);
    const code = `HTTP_${statusCode}`;

    // 5xx: Lỗi máy chủ (có thể thử lại)
    if (statusCode >= 500) {
      return {
        isRetryable: true,
        code,
        message: `Lỗi máy chủ (${statusCode})`,
        userMessage: "Có điều gì đó không ổn ở phía chúng tôi. Vui lòng thử lại.",
        statusCode,
      };
    }

    // 4xx: Lỗi khách hàng (không thể thử lại)
    if (statusCode >= 400) {
      return {
        isRetryable: false,
        code,
        message: `Lỗi khách hàng (${statusCode})`,
        userMessage: getClientErrorMessage(statusCode),
        statusCode,
      };
    }

    // 2xx không nên ở đây, nhưng vẫn xử lý
    return {
      isRetryable: false,
      code,
      message: `Trạng thái không mong đợi (${statusCode})`,
      userMessage: "Đã xảy ra lỗi không mong đợi.",
      statusCode,
    };
  }

  // Lỗi TanStack Query
  if (isTanStackQueryError(error)) {
    const queryError = error as any;
    return classifyError(queryError.cause || error);
  }

  // Lỗi chung
  if (error instanceof Error) {
    return {
      isRetryable: true,
      code: "UNKNOWN_ERROR",
      message: error.message,
      userMessage: "Đã xảy ra lỗi không mong đợi. Vui lòng thử lại.",
    };
  }

  // Fallback
  return {
    isRetryable: true,
    code: "UNKNOWN_ERROR",
    message: String(error),
    userMessage: "Đã xảy ra lỗi không mong đợi. Vui lòng thử lại.",
  };
}

/**
 * Kiểm tra xem lỗi có phải là lỗi mạng không
 * (mất kết nối, hết giờ, v.v.)
 */
function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("timeout") ||
    message.includes("connection") ||
    message.includes("kết nối") ||
    message.includes("mạng") ||
    error.name === "NetworkError"
  );
}

/**
 * Kiểm tra xem lỗi có phải là lỗi HTTP với mã trạng thái không
 */
function isHttpError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "statusCode" in error || "statusText" in error)
  );
}

/**
 * Trích xuất mã trạng thái từ các định dạng lỗi khác nhau
 */
function getStatusCode(error: unknown): number {
  if (typeof error === "object" && error !== null) {
    if ("status" in error && typeof error.status === "number") {
      return error.status;
    }
    if ("statusCode" in error && typeof error.statusCode === "number") {
      return error.statusCode;
    }
  }
  return 500; // Mặc định là lỗi máy chủ
}

/**
 * Kiểm tra xem lỗi có phải từ TanStack Query không
 */
function isTanStackQueryError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    ("cause" in error || "message" in error) &&
    (error.constructor.name === "Error" ||
      error.constructor.name.includes("Query"))
  );
}

/**
 * Lấy thông báo thân thiện với người dùng cho các lỗi 4xx
 */
function getClientErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu nhập và thử lại.",
    401: "Bạn cần xác thực. Vui lòng đăng nhập lại.",
    403: "Bạn không có quyền truy cập tài nguyên này.",
    404: "Không tìm thấy tài nguyên được yêu cầu.",
    409: "Hành động này xung đột với dữ liệu hiện có. Vui lòng làm mới và thử lại.",
    422: "Dữ liệu bạn cung cấp không hợp lệ. Vui lòng kiểm tra và thử lại.",
    429: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
  };

  return messages[status] || "Đã xảy ra lỗi khi xử lý yêu cầu của bạn.";
}

/**
 * Định dạng lỗi để ghi nhật ký/telemetry
 */
export function formatErrorForLogging(error: ClassifiedError): Record<string, unknown> {
  return {
    code: error.code,
    isRetryable: error.isRetryable,
    statusCode: error.statusCode,
    message: error.message,
    timestamp: new Date().toISOString(),
  };
}
