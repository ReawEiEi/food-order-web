"use client";
import { useState, useEffect } from "react";
import { useCustomerStore } from "@/stores/customerStore";
import { findAllMenusByRestaurantID } from "@/services/menu/findAllMenuByRestaurantID";
import { findAllMenuItemsByMenuID } from "@/services/menuItem/findAllMenuItemsByMenuID";
import { createMenuItem } from "@/services/menuItem/createMenuItem";
import { updateMenuItem } from "@/services/menuItem/updateMenuItem";
import { deleteMenuItem } from "@/services/menuItem/deleteMenuItem";
import MenuItemCard from "@/components/menuItem/MenuItemCard";
import CreateMenuItemModal from "@/components/menuItem/CreateMenuItemModal";
import EditMenuItemModal from "@/components/menuItem/EditMenuItemModal";
import DeleteMenuItemModal from "@/components/menuItem/DeleteMenuItemModal";
import { toast } from "react-hot-toast";

export default function MenuItemsRestaurant() {
  const restaurantId = useCustomerStore((s) => s.restaurantId);
  const [menusWithItems, setMenusWithItems] = useState<MenuWithItems[]>([]);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMenus = async () => {
    if (!restaurantId) return;
    const menus = await findAllMenusByRestaurantID(restaurantId);
    const data = await Promise.all(
      menus.map(async (menu: { ID: string }) => {
        const items = await findAllMenuItemsByMenuID(menu.ID);
        return { menu, items };
      })
    );
    setMenusWithItems(data);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await createMenuItem(formData);
      toast.success("Menu item created!");
      fetchMenus();
    } catch {
      toast.error("Failed to create item.");
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateMenuItem(formData);
      toast.success("Item updated!");
      fetchMenus();
    } catch {
      toast.error("Update failed.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMenuItem(deleteId);
      toast.success("Item deleted!");
      fetchMenus();
    } catch {
      toast.error("Delete failed.");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [restaurantId]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Menu Items of Restaurant
      </h1>

      {menusWithItems.map(({ menu, items }) => (
        <div key={menu.ID}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">🍽 {menu.MenuName}</h2>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => {
                setActiveMenuId(menu.ID);
                setShowCreate(true);
              }}
            >
              + Add Item
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {items.map((item) => (
              <MenuItemCard
                key={item.ID}
                id={item.ID}
                name={item.MenuItemName}
                price={item.MenuItemPrice}
                description={item.MenuItemDescription}
                imageKey={item.MenuItemImageKey}
                onEdit={() => setEditItem(item)}
                onDelete={() => setDeleteId(item.ID)}
              />
            ))}
          </div>
        </div>
      ))}

      {showCreate && activeMenuId && (
        <CreateMenuItemModal
          menuId={activeMenuId}
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {editItem && (
        <EditMenuItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onUpdate={handleUpdate}
        />
      )}

      {deleteId && (
        <DeleteMenuItemModal
          onClose={() => setDeleteId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
