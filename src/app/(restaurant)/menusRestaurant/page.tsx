"use client";

import MenuCard from "@/components/menu/MenuCard";
import { findAllMenusByRestaurantID } from "@/services/menu/findAllMenuByRestaurantID";
import { useCustomerStore } from "@/stores/customerStore";
import { useState, useEffect } from "react";
export default function MenusRestaurant() {
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [menus, setMenus] = useState<any>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        if (!restaurantId || restaurantId === "") {
          return;
        }
        const data = await findAllMenusByRestaurantID(restaurantId || "");
        setMenus(data);
      } catch (error) {
        console.error("Error fetching all tables:", error);
      }
    };
    fetchMenus();
  }, [restaurantId]);
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Menus of Restaurant
      </h1>
      {/* TODO: Add Create Menu Button */}
      {menus.length === 0 ? (
        <p className="text-center text-gray-500">No menus found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((menu: any) => (
            <MenuCard key={menu.ID} id={menu.ID} name={menu.MenuName} />
          ))}
        </div>
      )}
    </div>
  );
}
