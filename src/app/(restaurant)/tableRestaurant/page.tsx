"use client";

import TableCard from "@/components/table/tableCard";
import { findAllTableByRestaurantID } from "@/services/table/findAllTableByRestaurantID";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import DropDownTableStatus from "@/components/table/DropDownTableStatus";
import { createTable } from "@/services/table/createTable";
import toast from "react-hot-toast";
import CreateTableModal from "@/components/table/CreateTableModal";
import { TableStatus } from "@/enum/tableStatus";
import DeleteTableModal from "@/components/table/DeleteTableModal";
import EditTableModal from "@/components/table/EditTableModal";
import { deleteTable } from "@/services/table/deleteTable";
import { editTableStatus } from "@/services/table/editTableStatus";

export default function TableRestaurant() {
  const [showTableModal, setShowTableModal] = useState(false);
  const [tables, setTables] = useState<{ result: any[] }>({ result: [] });
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [searchStatus, setSearchStatus] = useState<string>("");

  const [editTable, setEditTable] = useState<{
    id: string;
    status: TableStatus;
  } | null>(null);
  const [deleteTableId, setDeleteTableId] = useState<string | null>(null);

  const handleEditTable = async (newStatus: TableStatus) => {
    if (!editTable) return;
    try {
      await editTableStatus(editTable.id, newStatus);
      toast.success("Table updated!");
    } catch {
      toast.error("Failed to update table.");
    }
    setTables((prev) => ({
      result: prev.result.map((table) =>
        table.ID === editTable.id ? { ...table, Status: newStatus } : table
      ),
    }));
  };

  const handleDeleteTable = async () => {
    if (!deleteTableId) return;
    try {
      await deleteTable(deleteTableId);
      toast.success("Table deleted!");
    } catch {
      toast.error("Failed to delete table.");
    }
    setTables((prev) => ({
      result: prev.result.filter((table) => table.ID !== deleteTableId),
    }));
  };

  useEffect(() => {
    const fetchTable = async () => {
      try {
        if (!restaurantId || restaurantId === "") {
          return;
        }
        const data = await findAllTableByRestaurantID(restaurantId || "");
        setTables(data);
      } catch (error) {
        console.error("Error fetching all tables:", error);
      }
    };
    fetchTable();
  }, [restaurantId]);

  const handleCreateTable = async (tableNumber: string) => {
    try {
      const res = await createTable(restaurantId || "", tableNumber);
      const newTable = res.result;

      setTables((prev) => ({
        result: [...(prev.result ?? []), newTable],
      }));

      toast.success("Table created successfully!");
    } catch (err) {
      console.error("Create table error:", err);
      toast.error("Failed to create table.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-4 mt-6">
        <h1 className="text-2xl font-bold">Table of Restaurant</h1>
        <button
          onClick={() => setShowTableModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Table
        </button>
        <div className="flex flex-col items-center gap-y-4 w-full">
          <h1 className="text-xl font-bold">Search Table Status</h1>
          <DropDownTableStatus
            title="All"
            className="w-4/5"
            value={searchStatus}
            onChange={setSearchStatus}
          />
        </div>
        {!tables.result && (
          <p className="text-center text-gray-500">No tables found.</p>
        )}
        {tables.result && (
          <div className="text-md font-semibold underline underline-offset-4 mt-5">
            Number of Table: {tables.result.length}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1 px-6 w-full mb-15">
          {tables.result &&
            tables.result
              .filter((t) =>
                searchStatus === "" ? true : t.Status === searchStatus
              )
              .sort((a, b) => a.TableNumber - b.TableNumber)
              .map((table: any) => (
                <TableCard
                  key={table.ID}
                  table={table}
                  onEdit={(id) => {
                    const table = tables.result.find((t) => t.ID === id);
                    if (table) setEditTable({ id, status: table.Status });
                  }}
                  onDelete={(id) => setDeleteTableId(id)}
                />
              ))}
        </div>
      </div>

      {showTableModal && (
        <CreateTableModal
          onClose={() => setShowTableModal(false)}
          onCreate={handleCreateTable}
        />
      )}
      {editTable && (
        <EditTableModal
          currentStatus={editTable.status}
          onClose={() => setEditTable(null)}
          onSave={handleEditTable}
        />
      )}

      {deleteTableId && (
        <DeleteTableModal
          onClose={() => setDeleteTableId(null)}
          onDelete={handleDeleteTable}
        />
      )}
    </>
  );
}
