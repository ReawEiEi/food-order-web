import { TableStatus } from "@/enum/tableStatus";

interface DropDownStatusProps {
  title: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function DropDownTableStatus({
  title,
  className,
  value,
  onChange,
}: DropDownStatusProps) {
  const statusOptions = [
    ...Object.values(TableStatus).map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      value: status,
    })),
  ];

  return (
    <select
      className={`p-2 border rounded ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{title}</option>
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
