interface DropDownProps {
  title: string;
  className?: string;
  options: Restaurant[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropDownRestaurant({
  title,
  className,
  options = [], // ✅ default to empty array
  value,
  onChange,
}: DropDownProps) {
  return (
    <select
      className={`p-2 border rounded ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!options || options.length === 0}
    >
      <option value="" disabled>
        {!options || options.length === 0 ? "No restaurants available" : title}
      </option>

      {options &&
        options.map((option) => (
          <option key={option.ID} value={option.ID}>
            {option.RestaurantName} ({option.Branch})
          </option>
        ))}
    </select>
  );
}
