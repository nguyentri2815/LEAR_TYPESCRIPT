import React from "react";
import { Appointment } from "../../type";
import Section from "../ui/Section";
import EmptyState from "../ui/EmptyState";
import Card from "../ui/Card";

interface DeleteAppointmentConfirmModalProps {
  isOpen: boolean;
  deletingAppointment: Appointment | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitError: string;
  isPending: boolean;
}

const DeleteAppointmentConfirmModal = (
  props: DeleteAppointmentConfirmModalProps,
) => {
  const {
    isOpen,
    deletingAppointment,
    onClose,
    onConfirm,
    submitError = "",
    isPending = false,
  } = props;

  if (!isOpen) {
    return null;
  }
  if (!deletingAppointment) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
        <Card className="w-full max-w-xl" padding="lg">
          <div className="space-y-6">
            <Section
              eyebrow="Appointment deleting"
              title="No appointment selected"
              description="Please close this dialog and try again."
            >
              <EmptyState
                title="No appointment selected"
                description="Please close this dialog and try again."
              />
              <div>
                <button type="button" title="Close" onClick={onClose} />
              </div>
            </Section>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-xl" padding="lg">
        <div className="space-y-6">
          <Section
            eyebrow="Appointment deleting"
            title="Delete Appointment"
            description="Delete Appointment"
          >
            <h3>Are you sure you want to delete this appointment?</h3>
            {submitError ? <p className="text-red-500">{submitError}</p> : null}
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition ${
                  isPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-slate-800"
                }`}
                onClick={onConfirm}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </Section>
        </div>
      </Card>
    </div>
  );
};

export default DeleteAppointmentConfirmModal;
