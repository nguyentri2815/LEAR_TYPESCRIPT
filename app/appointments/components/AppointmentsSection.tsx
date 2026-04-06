"use client";

import Section from "./ui/Section";
import { AppointmentsSectionProvider } from "./AppointmentsSectionContext";
import { AppointmentsSectionHeader } from "./AppointmentsSectionHeader";
import { AppointmentsSectionFilter } from "./AppointmentsSectionFilter";
import { AppointmentsSectionContent } from "./AppointmentsSectionContent";
import { AppointmentsSectionModals } from "./AppointmentsSectionModals";
import type { UseAppointmentsPageStateReturn } from "../hooks/useAppointmentsPageState";

interface AppointmentsSectionProps {
  state: UseAppointmentsPageStateReturn;
}

/**
 * Compound Component Pattern with Context
 * 
 * Main AppointmentsSection uses Context Provider to share state
 * with all sub-components, avoiding prop drilling
 */
export const AppointmentsSection = ({ state }: AppointmentsSectionProps) => {
  return (
    <AppointmentsSectionProvider value={state}>
      <Section
        eyebrow="Appointments"
        title="Appointment workspace"
        description="Track bookings, keep quick actions nearby and work with a calmer dashboard-style layout."
        actions={<AppointmentsSectionHeader />}
      >
        <div className="space-y-5">
          <AppointmentsSectionFilter />
          <AppointmentsSectionContent />
        </div>
      </Section>
      <AppointmentsSectionModals />
    </AppointmentsSectionProvider>
  );
};

// Export sub-components for direct usage if needed
AppointmentsSection.Header = AppointmentsSectionHeader;
AppointmentsSection.Filter = AppointmentsSectionFilter;
AppointmentsSection.Content = AppointmentsSectionContent;
AppointmentsSection.Modals = AppointmentsSectionModals;
