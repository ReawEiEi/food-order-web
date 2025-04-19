"use client";
import { FC } from "react";

interface OrderLogItemProps {
  log: any;
}

const OrderLogItem: FC<OrderLogItemProps> = ({ log }) => {
  return (
    <li className="border px-4 py-3 rounded shadow text-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">
            {"->"} {log.MenuItemName}
          </p>
          <p className="text-gray-700 italic">
            {log.OrderDescription || "No description"}
          </p>
          <p className="text-gray-600 text-sm">
            Qty: {log.Quantity} × ฿{log.MenuItemPrice}
          </p>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(log.OrderedTime).toLocaleString()}
        </span>
      </div>
    </li>
  );
};

export default OrderLogItem;
