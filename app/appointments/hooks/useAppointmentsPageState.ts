import type { Appointment, AppointmentFilterFormValues } from "../type";
import { classifyError } from "../utils/errorClassification";
import { useCreateAppointmentMutation, useDeleteAppointmentMutation } from "./useAppointmentMudation";
import { useAppointmentState } from "./useAppointmentState";
import { useAppointmentsQuery } from "./useAppointmentsDataQuery";
import { useModalManager } from "./useModalManager";
import { useAppointmentData } from "./useAppointmentData";

/**
 * Gộp tất cả trạng thái, đột biến và chuyển đổi dữ liệu cho trang Cuộc Hẹn
 * thành một hook tùy chỉnh duy nhất để tránh khoan trải props
 */
export const useAppointmentsPageState = () => {
  // ========== Truy Vấn & Đột Biến ==========
  const appointmentsQuery = useAppointmentsQuery();
  const createMutation = useCreateAppointmentMutation();
  const deleteMutation = useDeleteAppointmentMutation();

  // ========== Quản Lý Trạng Thái ==========
  const modals = useModalManager();
  const { filters, handleFilterSubmit, handleFilterClear } = useAppointmentState({
    appointmentList: appointmentsQuery.data ?? [],
  });

  // ========== Chuyển Đổi Dữ Liệu ==========
  const appointmentList = appointmentsQuery.data ?? [];
  const appointmentData = useAppointmentData(appointmentList, filters);

  // ========== Trình Xử Lý ==========
  const handleCreateAppointment = async (formValues: any) => {
    await createMutation.mutateAsync(formValues);
    modals.createModal.close();
  };

  const handleUpdateAppointment = async () => {
    modals.editModal.close();
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    await deleteMutation.mutateAsync(appointmentId);
  };

  const handleRefetch = async () => {
    try {
      await appointmentsQuery.refetch();
    } catch (error) {
      console.error("Tìm nạp lại thất bại:", error);
    }
  };

  // ========== Phân Loại Lỗi ==========
  const classifiedError = appointmentsQuery.error
    ? classifyError(appointmentsQuery.error)
    : null;

  // ========== Đối Tượng Trạng Thái Được Gộp ==========
  return {
    // Dữ Liệu
    data: appointmentData,
    filters,
    
    // Modal
    modals,

    // Trạng Thái Truy Vấn & Đột Biến
    appointments: {
      isLoading: appointmentsQuery.status === "pending",
      isError: appointmentsQuery.status === "error",
      error: appointmentsQuery.error,
      errorMessage: classifiedError?.userMessage,
      isErrorRetryable: classifiedError?.isRetryable ?? false,
      status: appointmentsQuery.status,
    },
    createMutation: {
      isPending: createMutation.isPending,
      isError: createMutation.isError,
      reset: createMutation.reset,
    },
    deleteMutation: {
      isPending: deleteMutation.isPending,
      isError: deleteMutation.isError,
      error: deleteMutation.error,
    },

    // Trình Xử Lý
    handlers: {
      filterSubmit: handleFilterSubmit,
      filterClear: handleFilterClear,
      createAppointment: handleCreateAppointment,
      updateAppointment: handleUpdateAppointment,
      deleteAppointment: handleDeleteAppointment,
      refetch: handleRefetch,
    },
  };
};

export type UseAppointmentsPageStateReturn = ReturnType<typeof useAppointmentsPageState>;
