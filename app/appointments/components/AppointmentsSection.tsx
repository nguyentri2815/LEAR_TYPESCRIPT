"use client";

import type { Appointment } from "../type";
import { getAppointmentStatusLabel } from "../helpers";
import AppointmentDetailModal from "./appointments/AppointmentDetailModal";
import AppointmentFilterForm from "./appointments/AppointmentFilterFormValues";
import AppointmentTable from "./appointments/AppointmentTable";
import CreateAppointmentModal from "./appointments/CreateAppointmentModalV2";
import EditAppointmentModal from "./appointments/EditAppointmentModal";
import DeleteAppointmentConfirmModal from "./appointments/DeleteAppointmentConfirmModal";
import ActionButton from "./ui/ActionButton";
import ActionBar from "./ui/ActionBar";
import Card from "./ui/Card";
import EmptyState from "./ui/EmptyState";
import Section from "./ui/Section";
import type { UseAppointmentsPageStateReturn } from "../hooks/useAppointmentsPageState";

interface AppointmentsSectionProps {
  state: UseAppointmentsPageStateReturn;
}

export const AppointmentsSection = ({ state }: AppointmentsSectionProps) => {
  const {
    data: appointmentData,
    filters,
    modals,
    appointments,
    createMutation,
    deleteMutation,
    handlers,
  } = state;

  const handleOpenAppointmentDetail = (item: Appointment) => {
    modals.detailModal.setSelectedId(item.id);
    modals.detailModal.open();
  };

  const handleCloseAppointmentDetail = () => {
    modals.detailModal.close();
  };

  const handleOpenCreateAppointment = () => {
    createMutation.reset();
    modals.createModal.open();
  };

  const handleCloseCreateAppointment = () => {
    if (createMutation.isPending) {
      return;
    }
    createMutation.reset();
    modals.createModal.close();
  };

  const handlePreviewFirstAppointment = () => {
    if (appointmentData.appointmentListWithCustomerLabel.length > 0) {
      modals.detailModal.setSelectedId(
        appointmentData.appointmentListWithCustomerLabel[0].id
      );
      modals.detailModal.open();
    }
  };

  const handleOpenEditAppointment = (appointment: Appointment) => {
    modals.editModal.setEditingAppointment(appointment);
    modals.editModal.open();
  };

  const handleCloseEditAppointment = () => {
    modals.editModal.setEditingAppointment(null);
    modals.editModal.close();
  };

  const handleOpenDeleteConfirm = (appointment: Appointment) => {
    modals.deleteConfirmModal.setDeletingAppointment(appointment);
    modals.deleteConfirmModal.open();
  };

  const handleCloseDeleteConfirm = () => {
    modals.deleteConfirmModal.setDeletingAppointment(null);
    modals.deleteConfirmModal.close();
  };

  const handleDeleteConfirm = async () => {
    if (!modals.deleteConfirmModal.deletingAppointment) {
      return;
    }
    await handlers.deleteAppointment(
      modals.deleteConfirmModal.deletingAppointment.id
    );
    handleCloseDeleteConfirm();
  };

  const renderAppointmentContent = () => {
    if (appointments.isLoading) {
      return (
        <EmptyState
          title="Loading appointments"
          description="The appointment board is preparing the latest data for you."
        />
      );
    }

    if (appointments.isError) {
      return (
        <EmptyState
          title="Unable to load appointments"
          description={appointments.error || "An error occurred"}
        />
      );
    }

    if (appointmentData.filteredAppointments.length === 0) {
      return (
        <EmptyState
          title="No appointments found"
          description="Try another filter or create a new appointment to populate the board."
          action={
            <ActionButton
              label="Create appointment"
              onClick={handleOpenCreateAppointment}
            />
          }
        />
      );
    }

    return (
      <AppointmentTable
        items={appointmentData.filteredAppointments}
        onSelect={handleOpenAppointmentDetail}
        onEdit={handleOpenEditAppointment}
        onDelete={handleOpenDeleteConfirm}
      />
    );
  };

  return (
    <>
      <Section
        eyebrow="Appointments"
        title="Appointment workspace"
        description="Track bookings, keep quick actions nearby and work with a calmer dashboard-style layout."
        actions={
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card padding="sm" className="bg-slate-950 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                Total
              </p>
              <p className="mt-2 text-2xl font-semibold text-black">
                {appointmentData.totalAppointments}
              </p>
            </Card>
            {appointmentData.appointmentStatusEntries.map(([status, items]) => (
              <Card key={status} padding="sm" className="bg-slate-50">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {getAppointmentStatusLabel(status)}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {items.length}
                </p>
              </Card>
            ))}
          </div>
        }
      >
        <div className="space-y-5">
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
                  disabled={
                    !modals.createModal.isOpen || createMutation.isPending
                  }
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
          {renderAppointmentContent()}
        </div>
      </Section>

      {/* Modals */}
      <AppointmentDetailModal
        isOpen={modals.detailModal.isOpen}
        onClose={handleCloseAppointmentDetail}
        appointmentId={modals.detailModal.selectedId}
      />

      {modals.createModal.isOpen && (
        <CreateAppointmentModal
          customerOptions={appointmentData.customerOptions}
          onClose={handleCloseCreateAppointment}
          onSubmit={handlers.createAppointment}
          isSubmitting={createMutation.isPending}
          submitErrMessage={createMutation.isError ? "Tạo mới thất bại" : ""}
        />
      )}

      {modals.editModal.isOpen && (
        <EditAppointmentModal
          appointment={modals.editModal.editingAppointment}
          customerOptions={appointmentData.customerOptions}
          onClose={handleCloseEditAppointment}
          onSubmit={handlers.updateAppointment}
          isSubmitting={createMutation.isPending}
          submitErrMessage={createMutation.isError ? "Tạo mới thất bại" : ""}
        />
      )}

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
