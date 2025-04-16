interface Props {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  imageKey?: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MenuItemCard({
  name,
  price,
  description,
  imageKey,
  onEdit,
  onDelete,
}: Props) {
  //TODO: Use real s3
  const imageUrl = imageKey ? `https://s3-url/${imageKey}` : "/Room.jpg";

  return (
    <div className="border p-3 rounded shadow flex flex-col items-center h-full">
      <img
        src={imageUrl}
        alt={name}
        className="w-40 h-40 object-cover rounded mb-2"
      />

      {/* Content wrapper that grows to push buttons to bottom */}
      <div className="text-center flex flex-col flex-grow justify-between w-full">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">฿{price}</p>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button
            className="bg-yellow-400 px-3 py-1 text-sm rounded text-white"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 px-3 py-1 text-sm rounded text-white"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
