"use client";

import DropDown from "@/components/shared/dropDown";
import { findAllRestaurant } from "@/services/restaurant/findAllRestaurant";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";

export default function HomePage() {
  const setIds = useCustomerStore((s) => s.setIds);
  const storedRestaurantId = useCustomerStore((s) => s.restaurantId);

  const [hydrated, setHydrated] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && storedRestaurantId) {
      setSelectedRestaurantId(storedRestaurantId);
    }
  }, [hydrated, storedRestaurantId]);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const data = await findAllRestaurant();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching all restaurants:", error);
      }
    };

    fetchAllRestaurants();
  }, []);

  const handleRestaurantChange = (id: string) => {
    setSelectedRestaurantId(id);
    setIds(id, "", "");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Welcome to Food Order</h1>
      <p className="text-center mt-2">
        Your one-stop solution for food order services!
      </p>

      <div className="flex flex-col items-center mt-8 gap-y-5">
        <h2 className="text-xl font-semibold text-center mt-4">
          Select Your Restaurant
        </h2>
        {hydrated && (
          <DropDown
            title="Select a restaurant"
            className="w-4/5"
            options={restaurants}
            value={selectedRestaurantId}
            onChange={handleRestaurantChange}
          />
        )}
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          onClick={() =>
            //TODO: Create Customer
            console.log("CreateCustomer")
          }
        >
          Create Customer
        </button>
      </div>
    </div>
  );
}
