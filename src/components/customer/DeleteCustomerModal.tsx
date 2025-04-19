interface Props {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteCustomerModal({ onClose, onDelete }: Props) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">Delete Customer?</h2>
        <p className="text-gray-600 mb-4">This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
