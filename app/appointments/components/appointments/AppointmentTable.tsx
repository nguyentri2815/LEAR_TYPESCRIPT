import { getAppointmentStatusLabel } from "../../helpers";
import { Appointment } from "../../type";

interface AppointmentTableProps {
  items: Appointment[];
  onSelect: (item: Appointment) => void;
  onEdit: (item: Appointment) => void;
  onDelete: (item: Appointment) => void;
}

const AppointmentTable = (props: AppointmentTableProps) => {
  const { items, onSelect, onEdit, onDelete } = props;

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200">
      <div className="hidden grid-cols-[1.3fr_1.1fr_0.9fr_0.9fr_1fr] gap-4 bg-slate-950 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 md:grid">
        <span>Title</span>
        <span>Customer</span>
        <span>Fee</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      <ul className="divide-y divide-slate-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="px-5 py-4">
            <div className="grid gap-4 md:grid-cols-[1.3fr_1.1fr_0.9fr_0.9fr_1fr] md:items-center">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:hidden">
                  Title
                </p>
                <p className="font-semibold text-slate-950">{item.title}</p>
                {item.note && (
                  <p className="text-sm leading-6 text-slate-500">
                    {item.note}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:hidden">
                  Customer
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {item.customerName}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:hidden">
                  Fee
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {item.fee.toLocaleString("vi-VN")} VND
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:hidden">
                  Status
                </p>
                <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                  {getAppointmentStatusLabel(item.status)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelect(item)}
                  className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentTable;
