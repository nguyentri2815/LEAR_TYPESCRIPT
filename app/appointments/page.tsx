"use client";

import { customerList } from "./data";
import {
  getAppointmentStatusLabel,
  getCustomerLabel,
  getCustomerNote,
  getTotalAppointments,
} from "./helpers";
import { groupBy, mapToOptions, toRecord } from "./generic";
import type { Appointment, Customer } from "./type";
import AppointmentDetailModal from "./components/appointments/AppointmentDetailModal";
import AppointmentFilterFormValues from "./components/appointments/AppointmentFilterFormValues";
import AppointmentTable from "./components/appointments/AppointmentTable";
import CreateAppointmentModal from "./components/appointments/CreateAppointmentModalV2";
import ActionButton from "./components/ui/ActionButton";
import ActionBar from "./components/ui/ActionBar";
import Card from "./components/ui/Card";
import EmptyState from "./components/ui/EmptyState";
import Section from "./components/ui/Section";
import { useModal } from "./hooks/useModal";
import { useAppointmentState } from "./hooks/useAppointmentState";
import { useAppointmentsQuery } from "./hooks/useAppointmentsDataQuery";
import {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "./hooks/useAppointmentMudation";
import { CreateAppointmentSchemaValues } from "./schema";

const AppointmentPage = () => {
  const createModal = useModal(false);
  const detailModal = useModal(false);

  const appointmentsQuery = useAppointmentsQuery();
  const createAppointmentMutation = useCreateAppointmentMutation();
  const deleteAppointmentMutation = useDeleteAppointmentMutation();

  const appointmentList = appointmentsQuery.data ?? [];

  const customerRecord = toRecord(customerList);
  const customerOptions = mapToOptions(
    customerList,
    getCustomerLabel,
    (customer) => customer.id,
  );
  const appointmentListWithCustomerLabel = appointmentList.map(
    (appointment) => ({
      ...appointment,
      customerName:
        customerRecord[appointment.customerName]?.name ??
        appointment.customerName,
    }),
  );
  const appointmentsByStatus = groupBy(
    appointmentListWithCustomerLabel,
    (appointment) => appointment.status,
  );
  const appointmentStatusEntries = Object.entries(
    appointmentsByStatus,
  ) as Array<[Appointment["status"], Appointment[]]>;
  const totalAppointments = getTotalAppointments(
    appointmentListWithCustomerLabel,
  );

  const {
    selectedAppointment,
    handleGetFirstAppointment,
    handleSelectedAppointment,
    handleClearAppointment,
  } = useAppointmentState({
    appointmentList: appointmentListWithCustomerLabel,
  });

  const handleOpenAppointmentDetail = (item: Appointment) => {
    handleSelectedAppointment(item);
    detailModal.open();
  };

  const handleCloseAppointmentDetail = () => {
    detailModal.close();
    handleClearAppointment();
  };

  const handleOpenCreateAppointment = () => {
    createAppointmentMutation.reset();
    createModal.open();
  };

  const handleCloseCreateAppointment = () => {
    if (createAppointmentMutation.isPending) {
      return;
    }

    createAppointmentMutation.reset();
    createModal.close();
  };

  const handleCreateAppointment = async (
    formValues: CreateAppointmentSchemaValues,
  ) => {
    await createAppointmentMutation.mutateAsync(formValues);
    handleCloseCreateAppointment();
  };

  const handlePreviewFirstAppointment = () => {
    handleGetFirstAppointment();
    detailModal.open();
  };

  const renderAppointmentContent = () => {
    switch (appointmentsQuery.status) {
      // case "idle":
      //   return (
      //     <EmptyState
      //       title="No request yet"
      //       description="Start by loading appointments or creating the first one for this workspace."
      //     />
      //   );
      case "pending":
        return (
          <EmptyState
            title="Loading appointments"
            description="The appointment board is preparing the latest data for you."
          />
        );
      case "success":
        if (appointmentListWithCustomerLabel.length === 0) {
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
            items={appointmentListWithCustomerLabel}
            onSelect={handleOpenAppointmentDetail}
            onDelete={async(item:Appointment):Promise<void> => {
              //handle onSuccess service state riêng bên trong hook mutation
              await deleteAppointmentMutation.mutateAsync(item.id);
              //handle local state riêng tại ui component//....
              handleClearAppointment()
            }}
          />
        );
      case "error":
        return (
          <EmptyState
            title="Unable to load appointments"
            description={appointmentsQuery.error.message}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#edf7f2_45%,_#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
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
                <p className="mt-2 text-2xl font-semibold">
                  {totalAppointments}
                </p>
              </Card>
              {appointmentStatusEntries.map(([status, items]) => (
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
                      !createModal.isOpen || createAppointmentMutation.isPending
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
                    onClick={() => appointmentsQuery.refetch()}
                    variant="ghost"
                  />
                </>
              }
            >
              <AppointmentFilterFormValues
                onSubmit={() => {
                  // Handle filter submission logic here
                }}
              />
            </ActionBar>
            {renderAppointmentContent()}
          </div>
        </Section>
        <Section
          eyebrow="Customers"
          title="Customer directory"
          description="Quick reference for phones, notes and VIP status linked to your appointment board."
        >
          <ul className="grid gap-4 lg:grid-cols-2">
            {customerList.map((customer: Customer) => {
              const { id, phone, isVip } = customer;
              return (
                <li key={id}>
                  <Card padding="sm" className="h-full bg-slate-50/80">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {getCustomerLabel(customer)}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">{phone}</p>
                        </div>
                        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
                          {isVip ? "VIP" : "Standard"}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-slate-600">
                        {getCustomerNote(customer)}
                      </p>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Section>
      </div>
      <AppointmentDetailModal
        isOpen={detailModal.isOpen}
        onClose={handleCloseAppointmentDetail}
        appointment={selectedAppointment}
      />
      {createModal.isOpen && (
        <CreateAppointmentModal
          customerOptions={customerOptions}
          onClose={handleCloseCreateAppointment}
          onSubmit={handleCreateAppointment}
          isSubmitting={createAppointmentMutation.isPending}
          submitErrMessage={
            createAppointmentMutation.isError ? "Tạo mới thất bại" : ""
          }
        />
      )}
    </main>
  );
};

export default AppointmentPage;
