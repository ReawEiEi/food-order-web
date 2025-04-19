"use client";

import { useState } from "react";
import OrderModal from "@/components/customer-menu/OrderModal";

interface Props {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  imageKey?: string | null;
  onOrder: (menuItemId: string, quantity: number, description: string) => void;
}

export default function MenuItemCard({
  id,
  name,
  price,
  description,
  imageKey,
  onOrder,
}: Props) {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const imageUrl = imageKey ? `https://s3-url/${imageKey}` : "/Room.jpg";

  const handleOrder = (quantity: number, note: string) => {
    onOrder(id, quantity, note);
    setShowOrderModal(false);
  };

  return (
    <div className="border p-3 rounded shadow flex flex-col items-center h-full relative">
      <img
        src={imageUrl}
        alt={name}
        className="w-40 h-40 object-cover rounded mb-2"
      />

      <div className="text-center flex flex-col flex-grow justify-between w-full">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">฿{price}</p>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="bg-yellow-400 px-3 py-1 text-sm rounded text-white"
            onClick={() => setShowOrderModal(true)}
          >
            Order
          </button>
        </div>
      </div>

      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          onCreate={handleOrder}
        />
      )}
    </div>
  );
}
