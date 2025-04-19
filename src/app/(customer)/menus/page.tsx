"use client";
import MenuCard from "@/components/customer-menu/CustomerMenuCard";
import { findAllMenusByRestaurantID } from "@/services/menu/findAllMenuByRestaurantID";
import { findAllMenuItemsByMenuID } from "@/services/menuItem/findAllMenuItemsByMenuID";
import { createOrderLog } from "@/services/orderLog/createOrderLog";
import { useCustomerStore } from "@/stores/customerStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const {
    restaurantId: storeResId,
    tableId: storeTableId,
    customerId: storeCId,
    setIds,
  } = useCustomerStore();

  const restaurantId = searchParams.get("restaurant_id") || storeResId;
  const tableId = searchParams.get("table_id") || storeTableId;
  const customerId = searchParams.get("customer_id") || storeCId;

  useEffect(() => {
    const urlResId = searchParams.get("restaurant_id");
    const urlTableId = searchParams.get("table_id");
    const urlCustId = searchParams.get("customer_id");

    if (urlResId || urlTableId || urlCustId) {
      setIds(urlResId || "", urlTableId || "", urlCustId || "");
    }
  }, [searchParams]);

  const [menusWithItems, setMenusWithItems] = useState<MenuWithItems[]>([]);

  const fetchMenus = async () => {
    if (!restaurantId) return;
    const menus = (await findAllMenusByRestaurantID(restaurantId)) ?? [];
    const data = await Promise.all(
      menus.map(async (menu: { ID: string }) => {
        const items = await findAllMenuItemsByMenuID(menu.ID);
        return { menu, items };
      })
    );
    setMenusWithItems(data);
  };

  useEffect(() => {
    fetchMenus();
  }, [restaurantId]);

  const handleOrder = async (
    menuItemId: string,
    quantity: number,
    note: string
  ) => {
    if (!customerId) return;
    try {
      await createOrderLog(customerId, menuItemId, quantity.toString(), note);
      toast.success("Order placed successfully.");
    } catch {
      toast.error("Order failed.");
    }
  };

  return (
    <div className="px-6 py-8 mb-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Menu Items of Restaurant
      </h1>
      {menusWithItems.length === 0 ? (
        <p className="text-center text-gray-500">No menu items found.</p>
      ) : (
        <></>
      )}
      {menusWithItems.map(({ menu, items }) => (
        <div key={menu.ID}>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">🍽 {menu.MenuName}</h2>
          </div>
          {items !== null ? (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              {items.map((item) => (
                <MenuCard
                  key={item.ID}
                  id={item.ID}
                  name={item.MenuItemName}
                  price={item.MenuItemPrice}
                  description={item.MenuItemDescription}
                  imageKey={item.MenuItemImageKey}
                  onOrder={handleOrder}
                />
              ))}
            </div>
          ) : (
            <div className="mb-6"></div>
          )}
        </div>
      ))}
    </div>
  );
}
