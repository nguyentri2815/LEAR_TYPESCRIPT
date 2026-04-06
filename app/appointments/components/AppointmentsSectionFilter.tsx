"use client";

import ActionButton from "./ui/ActionButton";
import ActionBar from "./ui/ActionBar";
import AppointmentFilterForm from "./appointments/AppointmentFilterFormValues";
import { useAppointmentsSectionContext } from "./AppointmentsSectionContext";
import { useCallback, useState } from "react";

export const AppointmentsSectionFilter = () => {
  const {
    data: appointmentData,
    filters,
    modals,
    createMutation,
    handlers,
  } = useAppointmentsSectionContext();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenCreateAppointment = useCallback(() => {
    createMutation.reset();
    modals.createModal.open();
    setIsCreateModalOpen(true);
  }, [createMutation, modals]);

  const handleCloseCreateAppointment = useCallback(() => {
    if (createMutation.isPending) {
      return;
    }
    createMutation.reset();
    modals.createModal.close();
    setIsCreateModalOpen(false);
  }, [createMutation, modals]);

  const handlePreviewFirstAppointment = useCallback(() => {
    if (appointmentData.appointmentListWithCustomerLabel.length > 0) {
      modals.detailModal.setSelectedId(
        appointmentData.appointmentListWithCustomerLabel[0].id
      );
      modals.detailModal.open();
    }
  }, [appointmentData, modals]);

  return (
    <ActionBar
      actions={
        <>
          <ActionButton
            label="Create appointment"
            onClick={handleOpenCreateAppointment}
          />
          <ActionButton
            label="Close creator"
            onClick={handleCloseCreateAppointment}
            disabled={!isCreateModalOpen || createMutation.isPending}
            variant="secondary"
          />
          <ActionButton
            label="Preview first"
            onClick={handlePreviewFirstAppointment}
            variant="ghost"
          />
          <ActionButton
            label="refresh"
            onClick={handlers.refetch}
            variant="ghost"
          />
        </>
      }
    >
      <AppointmentFilterForm
        initialValues={filters}
        onClear={handlers.filterClear}
        onSubmit={handlers.filterSubmit}
      />
    </ActionBar>
  );
};
