"use client";

import type { Appointment } from "../type";
import AppointmentTable from "./appointments/AppointmentTable";
import ActionButton from "./ui/ActionButton";
import EmptyState from "./ui/EmptyState";
import { useAppointmentsSectionContext } from "./AppointmentsSectionContext";
import { useCallback } from "react";

export const AppointmentsSectionContent = () => {
  const {
    data: appointmentData,
    appointments,
    modals,
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

  // Loading state
  if (appointments.isLoading) {
    return (
      <EmptyState
        title="Loading appointments"
        description="The appointment board is preparing the latest data for you."
      />
    );
  }

  // Error state
  if (appointments.isError) {
    return (
      <EmptyState
        title="Unable to load appointments"
        description={appointments.error || "An error occurred"}
      />
    );
  }

  // Empty state
  if (appointmentData.filteredAppointments.length === 0) {
    return (
      <EmptyState
        title="No appointments found"
        description="Try another filter or create a new appointment to populate the board."
        action={
          <ActionButton
            label="Create appointment"
            onClick={() => {}}
          />
        }
      />
    );
  }

  // Success state - render table
  return (
    <AppointmentTable
      items={appointmentData.filteredAppointments}
      onSelect={handleOpenAppointmentDetail}
      onEdit={handleOpenEditAppointment}
      onDelete={handleOpenDeleteConfirm}
    />
  );
};
