"use client";

import { Copy } from "lucide-react";
import { FC } from "react";
import toast from "react-hot-toast";

interface CustomerListProps {
  customers: any[];
  onEdit: (customer: any) => void;
  onDelete: (customer: any) => void;
  onPay: (customer: any) => void;
}

const CustomerList: FC<CustomerListProps> = ({
  customers,
  onEdit,
  onDelete,
  onPay,
}) => {
  if (!customers || customers.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center italic">
        No customers yet.
      </p>
    );
  }

  const handleCopy = (c: any) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/menus?restaurant_id=${c.RestaurantID}&table_id=${c.TableID}&customer_id=${c.ID}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <ul className="space-y-2 mb-20 mx-4">
      {customers
        .sort((a, b) => a.TableNumber - b.TableNumber || a.TimeIn - b.TimeIn)
        .map((cust) => {
          const isPaid = cust.Status === "paid";
          return (
            <li
              key={cust.ID}
              className="bg-gray-100 px-4 py-3 rounded shadow text-sm flex flex-col md:flex-row md:justify-between md:items-center gap-2"
            >
              <div className="flex flex-col md:flex-row md:gap-4">
                <span>🧍 Table {cust.TableNumber}</span>
                <span className="italic text-gray-600">
                  Status: {cust.Status}
                </span>
                <span className="text-gray-500">
                  Time in: {new Date(cust.TimeIn).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0 justify-between w-full">
                <div className="gap-2 flex">
                  <button
                    className={`px-3 py-1 rounded text-xs ${
                      isPaid
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    onClick={() => !isPaid && onEdit(cust)}
                    disabled={isPaid}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => onDelete(cust)}
                  >
                    🗑 Delete
                  </button>

                  <button
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-2 py-1 rounded text-xs flex items-center"
                    onClick={() => handleCopy(cust)}
                    title="Copy link"
                  >
                    <Copy size={16} className="mr-1" />
                  </button>
                </div>

                <div>
                  <button
                    className={`px-3 py-1 rounded text-xs ${
                      isPaid
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() => !isPaid && onPay(cust)}
                    disabled={isPaid}
                  >
                    💰 Pay
                  </button>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CustomerList;
