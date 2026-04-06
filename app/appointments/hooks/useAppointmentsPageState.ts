import type { Appointment, AppointmentFilterFormValues } from "../type";
import { useCreateAppointmentMutation, useDeleteAppointmentMutation } from "./useAppointmentMudation";
import { useAppointmentState } from "./useAppointmentState";
import { useAppointmentsQuery } from "./useAppointmentsDataQuery";
import { useModalManager } from "./useModalManager";
import { useAppointmentData } from "./useAppointmentData";

/**
 * Bundles all state, mutations, and data transformations for the Appointments page
 * into a single custom hook to avoid prop drilling
 */
export const useAppointmentsPageState = () => {
  // ========== Queries & Mutations ==========
  const appointmentsQuery = useAppointmentsQuery();
  const createMutation = useCreateAppointmentMutation();
  const deleteMutation = useDeleteAppointmentMutation();

  // ========== State Management ==========
  const modals = useModalManager();
  const { filters, handleFilterSubmit, handleFilterClear } = useAppointmentState({
    appointmentList: appointmentsQuery.data ?? [],
  });

  // ========== Data Transformations ==========
  const appointmentList = appointmentsQuery.data ?? [];
  const appointmentData = useAppointmentData(appointmentList, filters);

  // ========== Handlers ==========
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

  const handleRefetch = () => {
    appointmentsQuery.refetch();
  };

  // ========== Bundled State Object ==========
  return {
    // Data
    data: appointmentData,
    filters,
    
    // Modals
    modals,

    // Query & Mutation States
    appointments: {
      isLoading: appointmentsQuery.status === "pending",
      isError: appointmentsQuery.status === "error",
      error: appointmentsQuery.error?.message,
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

    // Handlers
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
