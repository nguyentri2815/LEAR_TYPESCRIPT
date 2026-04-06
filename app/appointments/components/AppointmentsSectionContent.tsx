"use client";

import type { Appointment } from "../type";
import AppointmentTable from "./appointments/AppointmentTable";
import ActionButton from "./ui/ActionButton";
import EmptyState from "./ui/EmptyState";
import { ErrorState } from "./ui/ErrorState";
import { useAppointmentsSectionContext } from "./AppointmentsSectionContext";
import { useCallback } from "react";

export const AppointmentsSectionContent = () => {
  const {
    data: appointmentData,
    appointments,
    modals,
    handlers,
  } = useAppointmentsSectionContext();

  const handleOpenAppointmentDetail = useCallback(
    (item: Appointment) => {
      modals.detailModal.setSelectedId(item.id);
      modals.detailModal.open();
    },
    [modals]
  );

  const handleOpenEditAppointment = useCallback(
    (appointment: Appointment) => {
      modals.editModal.setEditingAppointment(appointment);
      modals.editModal.open();
    },
    [modals]
  );

  const handleOpenDeleteConfirm = useCallback(
    (appointment: Appointment) => {
      modals.deleteConfirmModal.setDeletingAppointment(appointment);
      modals.deleteConfirmModal.open();
    },
    [modals]
  );

  // Trạng thái đang tải
  if (appointments.isLoading) {
    return (
      <EmptyState
        title="Đang tải cuộc hẹn"
        description="Bảng cuộc hẹn đang chuẩn bị dữ liệu mới nhất cho bạn."
      />
    );
  }

  // Trạng thái lỗi - sử dụng thành phần ErrorState với hỗ trợ thử lại
  if (appointments.isError) {
    return (
      <ErrorState
        title="Không thể tải cuộc hẹn"
        error={appointments.errorMessage || "Không thể tải các cuộc hẹn"}
        onRetry={appointments.isErrorRetryable ? handlers.refetch : undefined}
        showDetails={process.env.NODE_ENV === "development"}
      />
    );
  }

  // Trạng thái trống
  if (appointmentData.filteredAppointments.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy cuộc hẹn"
        description="Hãy thử bộ lọc khác hoặc tạo một cuộc hẹn mới để điền vào bảng."
        action={
          <ActionButton
            label="Tạo cuộc hẹn"
            onClick={() => {}}
          />
        }
      />
    );
  }

  // Trạng thái thành công - kết xuất bảng
  return (
    <AppointmentTable
      items={appointmentData.filteredAppointments}
      onSelect={handleOpenAppointmentDetail}
      onEdit={handleOpenEditAppointment}
      onDelete={handleOpenDeleteConfirm}
    />
  );
};
