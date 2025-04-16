"use client";

interface MenuCardProps {
  id: string;
  name: string;
}

export default function MenuCard({ id, name }: MenuCardProps) {
  return (
    <div
      key={id}
      className="border rounded-lg p-4 shadow hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}
