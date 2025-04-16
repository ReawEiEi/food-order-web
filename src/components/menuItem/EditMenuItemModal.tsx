"use client";
import { useState } from "react";
import Modal from "../shared/Modal";

interface Props {
  item: any;
  onClose: () => void;
  onUpdate: (formData: FormData) => void;
}

export default function EditMenuItemModal({ item, onClose, onUpdate }: Props) {
  const [name, setName] = useState(item.MenuItemName);
  const [price, setPrice] = useState(item.MenuItemPrice.toString());
  const [description, setDescription] = useState(
    item.MenuItemDescription || ""
  );
  const [image, setImage] = useState<File | null>(null);

  const isValid =
    name.trim().length > 0 && !isNaN(Number(price)) && Number(price) > 0;

  const submit = () => {
    const form = new FormData();
    form.append("menu_item_id", item.ID);
    form.append("menu_item_name", name.trim());
    const sanitizedPrice = Number(price);
    if (!isNaN(sanitizedPrice)) {
      form.append("menu_item_price", sanitizedPrice.toString());
    }
    if (description.trim()) {
      form.append("menu_item_description", description.trim());
    }
    if (image) {
      form.append("menu_item_image", image);
    }

    onUpdate(form);
    onClose();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    // Remove leading zeros unless it's like "0." (decimal input)
    if (/^0[0-9]+/.test(input)) {
      input = input.replace(/^0+/, "");
    }
    setPrice(input);
  };

  return (
    <Modal
      title="Edit Menu Item"
      onClose={onClose}
      onSubmit={submit}
      showSubmit={isValid}
    >
      <h1>Item Name:</h1>
      <input
        className="border border-gray-300 p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1>Item Price:</h1>
      <input
        className="border border-gray-300 p-2 rounded"
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />
      <h1>Description:</h1>
      <textarea
        className="border border-gray-300 p-2 rounded resize-none"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <h1>Item Image:</h1>
      <div>
        <input
          type="file"
          id="menuImage"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <label
          htmlFor="menuImage"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Image
        </label>
        {image && (
          <p className="mt-2 text-sm text-gray-600">Selected: {image.name}</p>
        )}
      </div>
    </Modal>
  );
}
