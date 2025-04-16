"use client";

import TableCard from "@/components/shared/tableCard";
import { findAllTableByRestaurantID } from "@/services/table/findAllTableByRestaurantID";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import DropDownTableStatus from "@/components/table/DropDownTableStatus";
import { createTable } from "@/services/table/createTable";
import toast from "react-hot-toast";
import CreateTableModal from "@/components/table/CreateTableModal";

export default function TableRestaurant() {
  const [showTableModal, setShowTableModal] = useState(false);
  const [tables, setTables] = useState<{ result: any[] }>({ result: [] });
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [searchStatus, setSearchStatus] = useState<string>("");

  //TODO: Modify Edit and Delete Table
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
        result: [...prev.result, newTable],
      }));

      toast.success("Table created successfully!");
    } catch (err) {
      console.error("Create table error:", err);
      toast.error("Failed to create table.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 px-6 w-full mb-15">
          {tables.result
            .filter((t) =>
              searchStatus === "" ? true : t.Status === searchStatus
            )
            .sort((a, b) => a.TableNumber - b.TableNumber)
            .map((table: any) => (
              <TableCard
                key={table.ID}
                table={table}
                onEdit={(id) => console.log("Edit", id)}
                onDelete={(id) => console.log("Delete", id)}
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
    </>
  );
}
