"use client";

import CreateMenuModal from "@/components/menu/CreateMenuModal";
import MenuCard from "@/components/menu/MenuCard";
import { createMenu } from "@/services/menu/createMenu";
import { findAllMenusByRestaurantID } from "@/services/menu/findAllMenuByRestaurantID";
import { useCustomerStore } from "@/stores/customerStore";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function MenusRestaurant() {
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [menus, setMenus] = useState<any>([]);
  const [showModal, setShowCreateModal] = useState(false);

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

  const handleCreateMenu = async (menuName: string) => {
    try {
      const res = await createMenu(restaurantId || "", menuName);
      console.log("Create menu response:", res);
      console.log("Menus:", menus);
      const newMenu = res.result;

      setMenus([...menus, newMenu]);

      toast.success("Table created successfully!");
    } catch (err) {
      console.error("Create table error:", err);
      toast.error("Failed to create table.");
    }
  };
  return (
    <div className="mt-6 py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6">
        Menus of Restaurant
      </h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Menu
      </button>
      {showModal && (
        <CreateMenuModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateMenu}
        />
      )}
      <div className="w-10/12 mt-6 mb-15">
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
    </div>
  );
}
