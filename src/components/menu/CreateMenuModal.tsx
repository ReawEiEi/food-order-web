"use client";

import { useState } from "react";
import Modal from "../shared/Modal";

interface CreateMenuModalProps {
  onClose: () => void;
  onCreate: (menuName: string) => void;
}

export default function CreateRestaurantModal({
  onClose,
  onCreate,
}: CreateMenuModalProps) {
  const [menuName, setMenuName] = useState("");

  const handleSubmit = () => {
    if (menuName === "") {
      alert("Name field is required.");
      return;
    }
    onCreate(menuName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-96 shadow-lg">
        <Modal title="Create Menu" onClose={onClose} onSubmit={handleSubmit}>
          <h1>Menu Name:</h1>
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Menu Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
}
