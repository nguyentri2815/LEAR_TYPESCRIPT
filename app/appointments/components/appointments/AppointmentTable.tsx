import type { ReactNode } from "react";

import { getValueByKey } from "../../generic";
import { getAppointmentStatusLabel } from "../../helpers";
import type { Appointment } from "../../type";

interface AppointmentTableProps {
  items: Appointment[];
  onSelect: (item: Appointment) => void;
  onEdit: (item: Appointment) => void;
  onDelete: (item: Appointment) => void;
}

type AppointmentTableRowActions = Pick<
  AppointmentTableProps,
  "onSelect" | "onEdit" | "onDelete"
>;

type AppointmentTableDataKey = keyof Appointment;
type AppointmentTableColumnKey = AppointmentTableDataKey | "actions";

interface AppointmentTableColumn {
  key: AppointmentTableColumnKey;
  title: string;
  cellClassName?: string;
  showMobileLabel?: boolean;
  render?: (item: Appointment, actions: AppointmentTableRowActions) => ReactNode;
}

const TABLE_GRID_CLASS_NAME =
  "md:grid-cols-[1.3fr_1.1fr_0.9fr_0.9fr_1fr]";

const MOBILE_LABEL_CLASS_NAME =
  "text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:hidden";

const isAppointmentStatus = (
  value: Appointment[AppointmentTableDataKey],
): value is Appointment["status"] => {
  return value === "NEW" || value === "CONFIRM" || value === "CANCELLED";
};

const renderDefaultColumnValue = (
  value: Appointment[AppointmentTableDataKey],
): ReactNode => {
  if (typeof value === "number") {
    return (
      <p className="text-sm font-medium text-slate-700">
        {value.toLocaleString("vi-VN")} VND
      </p>
    );
  }

  if (isAppointmentStatus(value)) {
    return (
      <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
        {getAppointmentStatusLabel(value)}
      </span>
    );
  }

  return (
    <p className="text-sm font-medium text-slate-700">{value || "-"}</p>
  );
};

const renderColumnContent = (
  column: AppointmentTableColumn,
  item: Appointment,
  actions: AppointmentTableRowActions,
): ReactNode => {
  if (column.render) {
    return column.render(item, actions);
  }

  if (column.key === "actions") {
    return null;
  }

  return renderDefaultColumnValue(getValueByKey(item, column.key));
};

const columns: AppointmentTableColumn[] = [
  {
    key: "title",
    title: "Title",
    cellClassName: "space-y-1",
    render: (item) => (
      <>
        <p className="font-semibold text-slate-950">{item.title}</p>
        {item.note && (
          <p className="text-sm leading-6 text-slate-500">{item.note}</p>
        )}
      </>
    ),
  },
  {
    key: "customerName",
    title: "Customer",
    cellClassName: "space-y-1",
  },
  {
    key: "fee",
    title: "Fee",
    cellClassName: "space-y-1",
  },
  {
    key: "status",
    title: "Status",
    cellClassName: "space-y-1",
  },
  {
    key: "actions",
    title: "Action",
    cellClassName: "flex flex-wrap gap-2",
    showMobileLabel: false,
    render: (item, actions) => (
      <>
        <button
          onClick={() => actions.onSelect(item)}
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          View
        </button>
        <button
          onClick={() => actions.onEdit(item)}
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Edit
        </button>
        <button
          onClick={() => actions.onDelete(item)}
          className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Delete
        </button>
      </>
    ),
  },
];

const AppointmentTable = (props: AppointmentTableProps) => {
  const { items, onSelect, onEdit, onDelete } = props;
  const rowActions: AppointmentTableRowActions = {
    onSelect,
    onEdit,
    onDelete,
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200">
      <div
        className={`hidden ${TABLE_GRID_CLASS_NAME} gap-4 bg-slate-950 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 md:grid`}
      >
        {columns.map((column) => (
          <span key={column.key}>{column.title}</span>
        ))}
      </div>
      <ul className="divide-y divide-slate-200 bg-white">
        {items.map((item) => (
          <li key={item.id} className="px-5 py-4">
            <div className={`grid gap-4 ${TABLE_GRID_CLASS_NAME} md:items-center`}>
              {columns.map((column) => (
                <div key={column.key} className={column.cellClassName}>
                  {column.showMobileLabel !== false && (
                    <p className={MOBILE_LABEL_CLASS_NAME}>{column.title}</p>
                  )}
                  {renderColumnContent(column, item, rowActions)}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentTable;
