"use client";
import { useState } from "react";
import Modal from "../shared/Modal";

interface Props {
  onClose: () => void;
  onCreate: (quantity: number, note: string) => void;
}

export default function OrderModal({ onClose, onCreate }: Props) {
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");

  const isValid = !isNaN(Number(quantity)) && Number(quantity) > 0;

  const handleSubmit = () => {
    const qty = Number(quantity);
    if (!isValid) return alert("Quantity must be a positive number.");
    onCreate(qty, note.trim());
    onClose();
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (/^0[0-9]+/.test(input)) {
      input = input.replace(/^0+/, "");
    }
    setQuantity(input);
  };

  return (
    <Modal
      title="Order Menu Item"
      onClose={onClose}
      onSubmit={handleSubmit}
      showSubmit={isValid}
    >
      <h1>Quantity:</h1>
      <input
        className="border border-gray-300 p-2 rounded w-full"
        type="number"
        min={1}
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />

      <h1 className="mt-4">Note (optional):</h1>
      <textarea
        className="border border-gray-300 p-2 rounded resize-none w-full"
        placeholder="Special request or note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
      />
    </Modal>
  );
}
