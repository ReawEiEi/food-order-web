"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, Utensils, ShoppingCart, Armchair } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Menu", icon: <Utensils size={20} />, path: "/menus" },
    {
      label: "Order Log",
      icon: <ShoppingCart size={20} />,
      path: "/orderLog",
    },
  ];

  const handleNavigate = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md border-t z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`flex flex-col items-center text-xs font-itim ${
              pathname === item.path ? "text-yellow-500" : "text-gray-500"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </footer>
  );
}
