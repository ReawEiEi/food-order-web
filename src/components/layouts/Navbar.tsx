"use client";
import { findCustomerByID } from "@/services/customer/findCustomerById";
import { findRestaurantNameByID } from "@/services/restaurant/findRestaurantNameByID";
import { useCustomerStore } from "@/stores/customerStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const Ids = useCustomerStore();
  const [restaurantName, setRestaurantName] = useState<string>("Food Order");
  const [tableNumber, setTableNumber] = useState<string>("-");

  useEffect(() => {
    const restaurantId = Ids.restaurantId;
    const customerId = Ids.customerId;
    if (!restaurantId || !customerId) return;

    const fetchRestaurantName = async () => {
      const data = await findRestaurantNameByID(restaurantId);
      setRestaurantName(data.restaurant_name);
    };
    const fetchCustomer = async () => {
      const data = await findCustomerByID(customerId);
      setTableNumber(data.result.TableNumber);
    };

    fetchRestaurantName();
    fetchCustomer();
  }, [Ids.restaurantId, Ids.customerId]);

  return (
    <nav className="fixed top-0 z-50 w-full font-itim h-13 bg-white shadow-md flex items-center">
      <div className="flex justify-between px-5 gap-4 items-center w-full">
        <Link
          href="/"
          className="text-md font-bold truncate underline underline-offset-4 w-1/2"
        >
          {restaurantName}
        </Link>
        <div className="flex justify-end gap-4 w-1/3">
          Table No: {tableNumber}
        </div>
      </div>
    </nav>
  );
}
