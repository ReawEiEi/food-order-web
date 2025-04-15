interface DropDownProps {
  title: string
  className?: string;
  options: Restaurant[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropDown({
  title,
  className,
  options,
  value,
  onChange,
}: DropDownProps) {
  return (
    <select
      className={`p-2 border rounded ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {title}
      </option>
      {options.map((option) => (
        <option key={option.ID} value={option.ID}>
          {option.RestaurantName} ({option.Branch})
        </option>
      ))}
    </select>
  );
}
