"use client";

import { useState } from "react";

interface CreateTableModalProps {
  onClose: () => void;
  onCreate: (tableNumber: string) => void;
}

export default function CreateTableModal({
  onClose,
  onCreate,
}: CreateTableModalProps) {
  const [tableNumber, setTableNumber] = useState("");

  const handleSubmit = () => {
    if (!tableNumber.trim()) {
      alert("Table number is required.");
      return;
    }

    onCreate(tableNumber.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Create Table</h2>

        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
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
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
