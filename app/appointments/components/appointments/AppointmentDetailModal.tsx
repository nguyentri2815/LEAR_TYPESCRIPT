import React from "react";
import { Appointment } from "../../type";
import Card from "../ui/Card";
import { useAppointmentDetailQuery } from "../../hooks/useAppointmentDetailQuery";
import EmptyState from "../ui/EmptyState";

interface AppointmentDetailModalProps {
  // Define any props you need here
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
}

const AppointmentDetailModal = (props: AppointmentDetailModalProps) => {
  const { isOpen, onClose, appointmentId } = props;
  const detailQuery = useAppointmentDetailQuery(isOpen ? appointmentId : "");

  if (!isOpen || !detailQuery.data) return null;

  const { id, title, customerName, fee, status, note } = detailQuery.data;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg" padding="lg">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
                Detail
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                Appointment detail
              </h3>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              x
            </button>
          </div>
          <div>
            {detailQuery.isPending && <p>Loading appointment detail...</p>}

            {detailQuery.isError && (
              <EmptyState
                title="Failed to load appointment detail"
                description="Please try again later."
              />
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                ID
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">{id}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Status
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {status}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Title
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">{title}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Customer
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {customerName}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Fee
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {fee.toLocaleString("vi-VN")} VND
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Note
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {note ?? "No note"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentDetailModal;
