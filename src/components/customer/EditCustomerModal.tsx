"use client";

import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import { findAllTableByRestaurantID } from "@/services/table/findAllTableByRestaurantID";

interface Props {
  customer: any;
  onClose: () => void;
  onUpdate: (payload: { customer_id: string; new_table_id: string }) => void;
}

export default function EditCustomerModal({
  customer,
  onClose,
  onUpdate,
}: Props) {
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await findAllTableByRestaurantID(customer.RestaurantID);
        const filtered = (res.result ?? []).filter(
          (t: any) => t.Status === "available"
        );
        setTables(filtered);
      } catch (err) {
        console.error("Failed to load tables", err);
      }
    };
    fetchTables();
  }, [customer]);

  const handleSubmit = () => {
    if (tableId) {
      onUpdate({
        customer_id: customer.ID,
        new_table_id: tableId,
      });
      onClose();
    }
  };

  return (
    <Modal
      title="Edit Customer Table"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="block mb-2">Select Table</label>
      <select
        className="w-full border p-2 rounded"
        value={tableId}
        onChange={(e) => setTableId(e.target.value)}
      >
        <option value="">-- Select available table --</option>
        {tables
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
