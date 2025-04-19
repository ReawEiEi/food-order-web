"use client";

import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { useCustomerStore } from "@/stores/customerStore";
import { findAllTableByRestaurantID } from "@/services/table/findAllTableByRestaurantID";

interface CreateCustomerModalProps {
  onClose: () => void;
  onCreate: (tableId: string) => void;
}

export default function CreateCustomerModal({
  onClose,
  onCreate,
}: CreateCustomerModalProps) {
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        if (!restaurantId || restaurantId === "") {
          return;
        }
        const data = await findAllTableByRestaurantID(restaurantId || "");
        setTables(data.result);
      } catch (error) {
        console.error("Error fetching all tables:", error);
      }
    };
    fetchTable();
  }, [restaurantId]);

  const handleSubmit = () => {
    if (!tableId) {
      alert("Please select a table.");
      return;
    }
    onCreate(tableId);
    onClose();
  };

  return (
    <Modal title="Create Customer" onClose={onClose} onSubmit={handleSubmit}>
      <label className="block mb-2">Table Number</label>
      <select
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">-- Select available table --</option>
        {tables
          .filter((table) => table.Status === "available")
          .sort((a, b) => a.TableNumber - b.TableNumber)
          .map((table) => (
            <option key={table.ID} value={table.ID}>
              Table {table.TableNumber}
            </option>
          ))}
      </select>
    </Modal>
  );
}
