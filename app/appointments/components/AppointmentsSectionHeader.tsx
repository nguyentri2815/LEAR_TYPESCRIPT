"use client";

import type { Appointment } from "../type";
import { getAppointmentStatusLabel } from "../helpers";
import Card from "./ui/Card";
import { useAppointmentsSectionContext } from "./AppointmentsSectionContext";

export const AppointmentsSectionHeader = () => {
  const { data: appointmentData } = useAppointmentsSectionContext();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Card padding="sm" className="bg-slate-950 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          Total
        </p>
        <p className="mt-2 text-2xl font-semibold text-black">
          {appointmentData.totalAppointments}
        </p>
      </Card>
      {appointmentData.appointmentStatusEntries.map(
        ([status, items]: [Appointment["status"], Appointment[]]) => (
          <Card key={status} padding="sm" className="bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              {getAppointmentStatusLabel(status)}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {items.length}
            </p>
          </Card>
        )
      )}
    </div>
  );
};
