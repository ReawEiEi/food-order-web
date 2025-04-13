"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCustomerStore } from "@/stores/customerStore";

export default function Page() {
  const params = useSearchParams();
  const setIds = useCustomerStore((s) => s.setIds);

  useEffect(() => {
    const restaurantId = params.get("restaurant_id");
    const tableId = params.get("table_id");
    const customerId = params.get("customer_id");

    if (restaurantId && tableId && customerId) {
      setIds(restaurantId, tableId, customerId);
    }
  }, []);
  const { restaurantId, tableId, customerId } = useCustomerStore();

  return (
    <div>
      <span className="font-itim">
        Welcome {customerId} to {tableId} on {restaurantId}
      </span>
    </div>
  );
}
