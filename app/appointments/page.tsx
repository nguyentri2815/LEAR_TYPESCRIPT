"use client";

import { useAppointmentsPageState } from "./hooks/useAppointmentsPageState";
import { CustomersSection } from "./components/CustomersSection";
import { AppointmentsSection } from "./components/AppointmentsSection";

const AppointmentPage = () => {
  const state = useAppointmentsPageState();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc_0%,_#edf7f2_45%,_#f8fafc_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <AppointmentsSection state={state} />
        <CustomersSection />
      </div>
    </main>
  );
};

export default AppointmentPage;
