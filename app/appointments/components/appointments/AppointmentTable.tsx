import { Column, getValueByKey } from "../../generic";
import { Appointment } from "../../type";

interface AppointmentTableProps {
  items: Appointment[];
  onSelect: (item: Appointment) => void;
  onDelete: (item: Appointment) => void;
}

const AppointmentTable = (props: AppointmentTableProps) => {
  const { items, onSelect, onDelete } = props;
  const columns: Column<Appointment>[] = [
    {
      label: "Action",
      key: "action",
      render: (item) => (
        <>
          <button onClick={() => onSelect(item)}>View</button>
          <button onClick={() => onDelete(item)}>Delete</button>
        </>
      ),
    },
    { label: "Title", key: "title" },
    { label: "Customer Name", key: "customerName" },
    { label: "Fee", key: "fee" },
    { label: "Status", key: "status" },
  ];
  return (
    <ul>
      {items.map((item) => (
        <>
          {
            /* Render table row based on columns configuration */
            columns.map((col) => {
              let content: React.ReactNode = null;

              if (col.render) {
                content = col.render(item);
              }
              if (col.dataKey) {
                content = getValueByKey(item, col.dataKey);
              }
              
              return <span key={col.key}>{content}</span>;
            })
          }
        </>
      ))}
    </ul>
  );
};

export default AppointmentTable;
