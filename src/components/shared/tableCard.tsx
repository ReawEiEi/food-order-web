"use client";

import { TableStatus } from "../../enum/tableStatus";

interface TableCardProps {
  table: {
    ID: string;
    TableNumber: number;
    Status: TableStatus;
    restaurant_id: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TableCard({ table, onEdit, onDelete }: TableCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-red-100 text-red-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">Table {table.TableNumber}</span>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusStyle(
            table.Status
          )}`}
        >
          {table.Status}
        </span>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onEdit(table.ID)}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(table.ID)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
