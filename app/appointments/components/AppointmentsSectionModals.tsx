"use client";

import AppointmentDetailModal from "./appointments/AppointmentDetailModal";
import CreateAppointmentModal from "./appointments/CreateAppointmentModalV2";
import EditAppointmentModal from "./appointments/EditAppointmentModal";
import DeleteAppointmentConfirmModal from "./appointments/DeleteAppointmentConfirmModal";
import { useAppointmentsSectionContext } from "./AppointmentsSectionContext";
import { useCallback } from "react";

export const AppointmentsSectionModals = () => {
  const {
    data: appointmentData,
    modals,
    createMutation,
    deleteMutation,
    handlers,
  } = useAppointmentsSectionContext();

  // Detail Modal Handlers
  const handleCloseAppointmentDetail = useCallback(() => {
    modals.detailModal.close();
  }, [modals]);

  // Create Modal Handlers
  const handleCloseCreateAppointment = useCallback(() => {
    if (createMutation.isPending) {
      return;
    }
    createMutation.reset();
    modals.createModal.close();
  }, [createMutation, modals]);

  // Edit Modal Handlers
  const handleCloseEditAppointment = useCallback(() => {
    modals.editModal.setEditingAppointment(null);
    modals.editModal.close();
  }, [modals]);

  // Delete Modal Handlers
  const handleCloseDeleteConfirm = useCallback(() => {
    modals.deleteConfirmModal.setDeletingAppointment(null);
    modals.deleteConfirmModal.close();
  }, [modals]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!modals.deleteConfirmModal.deletingAppointment) {
      return;
    }
    await handlers.deleteAppointment(
      modals.deleteConfirmModal.deletingAppointment.id
    );
    handleCloseDeleteConfirm();
  }, [modals, handlers, handleCloseDeleteConfirm]);

  return (
    <>
      {/* Detail Modal */}
      <AppointmentDetailModal
        isOpen={modals.detailModal.isOpen}
        onClose={handleCloseAppointmentDetail}
        appointmentId={modals.detailModal.selectedId}
      />

      {/* Create Modal */}
      {modals.createModal.isOpen && (
        <CreateAppointmentModal
          customerOptions={appointmentData.customerOptions}
          onClose={handleCloseCreateAppointment}
          onSubmit={handlers.createAppointment}
          isSubmitting={createMutation.isPending}
          submitErrMessage={
            createMutation.isError ? "Tạo mới thất bại" : ""
          }
        />
      )}

      {/* Edit Modal */}
      {modals.editModal.isOpen && (
        <EditAppointmentModal
          appointment={modals.editModal.editingAppointment}
          customerOptions={appointmentData.customerOptions}
          onClose={handleCloseEditAppointment}
          onSubmit={handlers.updateAppointment}
          isSubmitting={createMutation.isPending}
          submitErrMessage={
            createMutation.isError ? "Tạo mới thất bại" : ""
          }
        />
      )}

      {/* Delete Confirm Modal */}
      <DeleteAppointmentConfirmModal
        isOpen={modals.deleteConfirmModal.isOpen}
        deletingAppointment={modals.deleteConfirmModal.deletingAppointment}
        isPending={deleteMutation.isPending}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        submitError={
          deleteMutation.isError
            ? deleteMutation.error?.message || "Fail to delete appointment"
            : ""
        }
      />
    </>
  );
};
