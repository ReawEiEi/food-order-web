"use client";

interface DeleteTableModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteTableModal({
  onClose,
  onDelete,
}: DeleteTableModalProps) {
  const handleSubmit = () => {
    onDelete();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-96 shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Delete Table</h2>
        <p>Are you sure you want to delete this table?</p>
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
