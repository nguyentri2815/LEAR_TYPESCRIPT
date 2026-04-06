"use client";

import { customerList } from "../data";
import { getCustomerLabel, getCustomerNote } from "../helpers";
import type { Customer } from "../type";
import Card from "./ui/Card";
import Section from "./ui/Section";

interface CustomersSectionProps {}

export const CustomersSection = ({}: CustomersSectionProps) => {
  return (
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
  );
};
