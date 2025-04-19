"use client";
import { useEffect, useState } from "react";
import { useCustomerStore } from "@/stores/customerStore";
import { findOrderLogsByCustomerId } from "@/services/orderLog/findOrderLogsByCustomerId";
import OrderLogItem from "@/components/orderLog/OrderLogItem";

export default function OrderLogPage() {
  const customerId = useCustomerStore((s) => s.customerId);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!customerId) return;
      try {
        const res = await findOrderLogsByCustomerId(customerId);
        setLogs(res.result || []);
      } catch (err) {
        console.error("Failed to fetch order logs", err);
      }
    };
    fetchLogs();
  }, [customerId]);

  const total = logs.reduce(
    (sum, log) => sum + log.MenuItemPrice * log.Quantity,
    0
  );

  return (
    <div className="px-6 py-8 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">Order Log</h1>

      {logs.length === 0 ? (
        <p className="text-center text-gray-500">No order logs found.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-8">
            {logs
              .sort(
                (a, b) =>
                  new Date(a.OrderedTime).getTime() -
                  new Date(b.OrderedTime).getTime()
              )
              .map((log) => (
                <OrderLogItem key={log.ID} log={log} />
              ))}
          </ul>

          <div className="text-right font-semibold text-lg mb-15">
            Total: ฿{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
