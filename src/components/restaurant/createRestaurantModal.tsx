"use client";

import { useState } from "react";

interface CreateRestaurantModalProps {
  onClose: () => void;
  onCreate: (restaurantName: string, branchName: string) => void;
}

export default function CreateRestaurantModal({
  onClose,
  onCreate,
}: CreateRestaurantModalProps) {
  const [restaurantName, setRestaurantName] = useState("");
  const [branchName, setBranchName] = useState("");

  const handleSubmit = () => {
    if (restaurantName === "" || branchName === "") {
      alert("Both fields are required.");
      return;
    }
    onCreate(restaurantName, branchName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Restaurant
        </h2>

        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />

          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
