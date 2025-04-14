"use client";
import { findRestaurantNameByID } from "@/services/restaurant/findRestaurantNameByID";
import { useCustomerStore } from "@/stores/customerStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const Ids = useCustomerStore();
  const [restaurantName, setRestaurantName] = useState<string>("Food Order");

  useEffect(() => {
    const restaurantId = Ids.restaurantId;
    if (!restaurantId) return;

    const fetchRestaurantName = async () => {
      const data = await findRestaurantNameByID(restaurantId);
      setRestaurantName(data.restaurant_name);
    };

    fetchRestaurantName();
  }, [Ids.restaurantId]);

  return (
    <nav className="flex items-center font-itim h-13 bg-white shadow-md">
      <div className="flex justify-between px-5 gap-4 items-center w-full">
        <Link
          href="/"
          className="text-md font-bold w-20 truncate underline underline-offset-4"
        >
          {restaurantName}
        </Link>
        <div className="flex justify-between gap-4 w-30">
          <Link href="/menu">Menu</Link>
          <Link href="/order">Order</Link>
        </div>
        <div className="flex justify-end gap-4 w-20">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            onClick={() => router.push("/payment")}
          >
            Pay
          </button>
        </div>
      </div>
    </nav>
  );
}
