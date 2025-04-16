"use client";

import { useState } from "react";
import { TableStatus } from "@/enum/tableStatus";

interface EditTableModalProps {
  currentStatus: TableStatus;
  onClose: () => void;
  onSave: (newStatus: TableStatus) => void;
}

export default function EditTableModal({
  currentStatus,
  onClose,
  onSave,
}: EditTableModalProps) {
  const [status, setStatus] = useState<TableStatus>(currentStatus);

  const handleSubmit = () => {
    onSave(status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Edit Table Status
        </h2>

        <select
          className="border border-gray-300 p-2 rounded w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as TableStatus)}
        >
          {Object.values(TableStatus).map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
