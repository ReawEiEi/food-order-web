"use client";

import { FC } from "react";

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

  return (
    <ul className="space-y-2 mb-20">
      {customers
        .sort((a, b) => a.TableNumber - b.TableNumber)
        .map((cust) => (
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  onClick={() => onEdit(cust)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                  onClick={() => onDelete(cust)}
                >
                  🗑 Delete
                </button>
              </div>
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  onClick={() => onPay(cust)}
                >
                  💰 Pay
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CustomerList;
