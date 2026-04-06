# Mẫu Xử Lý Lỗi Sản Xuất

Tài liệu này phác thảo các mẫu xử lý lỗi sản xuất được triển khai trong mô-đun cuộc hẹn.

## Tổng Quan

Hệ thống xử lý lỗi phân loại lỗi thành hai danh mục:
1. **Lỗi có thể thử lại** (mạng, 5xx) → Hiển thị nút "Thử lại"
2. **Lỗi không có thể thử lại** (lỗi khách 4xx) → Hiển thị hướng dẫn mà không có thử lại

## Thành Phần

### 1. Thành Phần ErrorState
**Vị trí:** `components/ui/ErrorState.tsx`

Dùng để xử lý các lỗi tìm nạp truy vấn với khả năng thử lại.

```tsx
<ErrorState
  title="Không thể tải"
  error={error}
  onRetry={handleRetry}
  isRetrying={isLoading}
  showDetails={isDevelopment}
/>
```

**Đặc Điểm:**
- Nút thử lại (chỉ khi lỗi có thể thử lại)
- Nút tải lại trang (dự phòng)
- Chi tiết lỗi (chế độ phát triển)
- Có thể truy cập (role="alert")
- Thông báo thân thiện với người dùng

**Khi nào sử dụng:**
- Lỗi tìm nạp dữ liệu trong AppointmentsSectionContent
- Lỗi gọi API
- Bất kỳ hoạt động nào có thể được thử lại

### 2. Thành Phần AlertError
**Vị trí:** `components/ui/AlertError.tsx`

Hiển thị lỗi nội tuyến đơn giản cho các biểu mẫu và đột biến.

```tsx
<AlertError message="Không thể tạo cuộc hẹn" />
```

**Đặc Điểm:**
- Kiểu tối giản (hộp cảnh báo đỏ)
- Có thể truy cập (role="alert")
- Hiển thị tin nhắn nhanh

**Khi nào sử dụng:**
- Lỗi gửi biểu mẫu
- Lỗi đột biến trong modal
- Lỗi xác thực cấp trường

## Phân Loại Lỗi

**Vị trí:** `utils/errorClassification.ts`

Tự động phân loại lỗi thành các danh mục có thể hành động.

```tsx
const classified = classifyError(error);

if (classified.isRetryable) {
  // Hiển thị nút thử lại
} else {
  // Hiển thị tin nhắn thông tin
}
```

**Logic Phân Loại:**

| Loại Lỗi | Trạng Thái | Có Thể Thử Lại | Ví Dụ |
|---|---|---|---|
| Lỗi Mạng | N/A | ✅ Có | "Kết nối mạng thất bại" |
| Lỗi Máy Chủ | 5xx | ✅ Có | "Có điều gì đó không ổn ở phía chúng tôi" |
| Lỗi Khách | 4xx | ❌ Không | "Yêu cầu không hợp lệ", "Không tìm thấy" |
| Lỗi Không Xác Định | N/A | ✅ Có | Mặc định đến tùy chọn an toàn |

## Điểm Tích Hợp

### Lỗi Truy Vấn (AppointmentsSectionContent)
```tsx
// Hook cung cấp:
appointments: {
  isError: boolean;
  errorMessage: string;
  isErrorRetryable: boolean;
  error: Error | null;
}

handlers: {
  refetch: () => Promise<void>;
}

// Cách sử dụng:
if (appointments.isError) {
  return (
    <ErrorState
      error={appointments.errorMessage}
      onRetry={appointments.isErrorRetryable ? handlers.refetch : undefined}
    />
  );
}
```

### Lỗi Đột Biến (Modal)
```tsx
// Modal nhận lỗi từ đột biến:
createMutation.isError ? (
  <AlertError message={createMutation.error?.message} />
) : null
```

## Cập Nhật Hook

### useAppointmentsPageState
Hiện tại tiếp xúc:
- `appointments.errorMessage` - Thông báo thân thiện với người dùng
- `appointments.isErrorRetryable` - Có nên hiển thị nút thử lại không
- `handlers.refetch()` - Tìm nạp lại không đồng bộ với xử lý lỗi

## Thực Hành Tốt Nhất

### 1. Luôn Hiển Thị Lỗi Cho Người Dùng
```tsx
// ❌ HỎI: Im lặng thất bại
if (error) {
  return null; // Người dùng không biết tại sao không có gì được tải
}

// ✅ TỐT: Hiển thị lỗi với đường phục hồi
if (error) {
  return <ErrorState error={error} onRetry={handleRetry} />;
}
```

### 2. Phân Loại Trước Khi Hiển Thị
```tsx
// ❌ HỎI: Hiển thị cùng một tin nhắn cho tất cả các lỗi
return <ErrorState error={error} />;

// ✅ TỐT: Sử dụng phân loại để tùy chỉnh UX
const classified = classifyError(error);
return (
  <ErrorState
    error={classified.userMessage}
    onRetry={classified.isRetryable ? retry : undefined}
  />
);
```

### 3. Cung Cấp Đường Phục Hồi
```tsx
// ❌ HỎI: Kết thúc chết
<ErrorState title="Có điều gì đó không ổn" />

// ✅ TỐT: Tùy chọn phục hồi
<ErrorState
  error={error}
  onRetry={retry}  // Thử lại hoạt động
  // HOẶC tải lại trang  (dự phòng)
/>
```

### 4. Thông Báo Nhất Quán
```tsx
// Sử dụng các tin nhắn chuẩn hóa của phân loại lỗi
// Chúng đã thân thiện với người dùng và nhất quán/dịch

const classified = classifyError(error);
return <ErrorState error={classified.userMessage} />;
```

### 5. Khả Năng Truy Cập
Tất cả các trạng thái lỗi bao gồm:
- `role="alert"` để thông báo cho trình đọc màn hình
- Kiểu hình ảnh rõ ràng (kiểu màu đỏ)
- HTML ngữ nghĩa

## Kịch Bản Lỗi Phổ Biến

### Kịch Bản 1: Mạng Ngoại Tuyến
```
Phân Loại: Lỗi mạng
Có Thể Thử Lại: Có
Người Dùng Thấy: "Không thể kết nối. Kiểm tra Internet của bạn."
Hành Động: Nút thử lại có sẵn
```

### Kịch Bản 2: Máy Chủ Bị Lỗi (503)
```
Phân Loại: Lỗi máy chủ (5xx)
Có Thể Thử Lại: Có
Người Dùng Thấy: "Có điều gì đó không ổn ở phía chúng tôi. Thử lại."
Hành Động: Nút thử lại có sẵn
```

### Kịch Bản 3: Không Tìm Thấy (404)
```
Phân Loại: Lỗi khách (4xx)
Có Thể Thử Lại: Không
Người Dùng Thấy: "Không tìm thấy tài nguyên được yêu cầu."
Hành Động: Chỉ nút Tải Lại Trang
```

### Kịch Bản 4: Dữ Liệu Không Hợp Lệ (400)
```
Phân Loại: Lỗi khách (4xx)
Có Thể Thử Lại: Không
Người Dùng Thấy: "Yêu cầu không hợp lệ. Kiểm tra dữ liệu nhập của bạn."
Hành Động: Chỉ nút Tải Lại Trang (người dùng nên sửa biểu mẫu)
```

## Ghi Nhật Ký Lỗi (Tương Lai)

Để giám sát sản xuất, phân loại lỗi trước khi ghi nhật ký:

```tsx
import { formatErrorForLogging } from "./errorClassification";

const classified = classifyError(error);
const logPayload = formatErrorForLogging(classified);

// Gửi tới dịch vụ telemetry
telemetry.logError(logPayload);
```

Dữ liệu nhật ký bao gồm:
- Mã lỗi (NETWORK_ERROR, HTTP_500, v.v.)
- Liệu có thể thử lại không
- Trạng thái HTTP nếu áp dụng
- Dấu thời gian

## Cấu Trúc Tập Tin

```
app/appointments/
├── components/
│   ├── ui/
│   │   ├── ErrorState.tsx       # Hiển thị lỗi truy vấn với thử lại
│   │   ├── AlertError.tsx        # Cảnh báo lỗi nội tuyến
│   │   └── EmptyState.tsx        # Trạng thái trống thực (0 kết quả)
│   ├── AppointmentsSectionContent.tsx  # Sử dụng ErrorState cho truy vấn
│   └── AppointmentsSectionModals.tsx   # Sử dụng AlertError cho đột biến
├── hooks/
│   └── useAppointmentsPageState.ts    # Tiếp xúc phân loại lỗi
├── utils/
│   └── errorClassification.ts          # Logic phân loại lỗi
└── ...
```

## Thử Nghiệm

### Thử Nghiệm Phân Loại Lỗi
```tsx
import { classifyError } from "./errorClassification";

// Lỗi mạng
const netError = new Error("Không thể tìm nạp");
expect(classifyError(netError).isRetryable).toBe(true);

// Lỗi 404
const notFoundError = { status: 404 };
expect(classifyError(notFoundError).isRetryable).toBe(false);

// Lỗi 500
const serverError = { status: 500 };
expect(classifyError(serverError).isRetryable).toBe(true);
```

### Thử Nghiệm Kết Xuất ErrorState
```tsx
// Lỗi có thể thử lại hiển thị thử lại
<ErrorState
  error={{ message: "Lỗi mạng" }}
  onRetry={mockRetry}
/>
expect(screen.getByRole("button", { name: /thử lại/i })).toBeInTheDocument();

// Lỗi không có thể thử lại ẩn thử lại
<ErrorState
  error={{ message: "Không tìm thấy" }}
  onRetry={undefined}
/>
expect(screen.queryByRole("button", { name: /thử lại/i })).not.toBeInTheDocument();
```

## Danh Sách Kiểm Tra Chuyển Đổi

Khi tích hợp với các thành phần khác:

- [ ] Thay thế cách sử dụng lỗi EmptyState bằng ErrorState
- [ ] Thêm AlertError để hiển thị lỗi biểu mẫu/đột biến
- [ ] Cập nhật hook để tiếp xúc phân loại lỗi
- [ ] Chuyển handlers.refetch sang ErrorState
- [ ] Thử nghiệm tất cả 4 loại lỗi (mạng, 5xx, 4xx, không xác định)
- [ ] Đảm bảo role="alert" hiện tại
- [ ] Xác minh tin nhắn lỗi thân thiện với người dùng
- [ ] Thêm tích hợp ghi nhật ký/telemetry lỗi
