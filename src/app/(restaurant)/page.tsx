"use client";

import CreateRestaurantModal from "@/components/restaurant/createRestaurantModal";
import DropDownRestaurant from "@/components/restaurant/dropDownRestaurant";
import createRestaurant from "@/services/restaurant/createRestaurant";
import { findAllRestaurant } from "@/services/restaurant/findAllRestaurant";
import { useCustomerStore } from "@/stores/customerStore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function HomePage() {
  const setIds = useCustomerStore((s) => s.setIds);
  const storedRestaurantId = useCustomerStore((s) => s.restaurantId);

  const [hydrated, setHydrated] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");

  const [showRestaurantModal, setShowRestaurantModal] = useState(false);

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

  const handleCreateRestaurant = async (
    restaurantName: string,
    branchName: string
  ) => {
    try {
      const res = await createRestaurant(restaurantName, branchName);
      const newRestaurant = res.result;

      if (newRestaurant?.ID && newRestaurant?.RestaurantName) {
        setRestaurants((prev) => [...prev, newRestaurant]);
        handleRestaurantChange(newRestaurant.ID);
      } else {
        const refreshed = await findAllRestaurant();
        setRestaurants(refreshed);
        toast("Fallback to refresh list.");
      }

      toast.success("Restaurant created successfully!");
      setShowRestaurantModal(false);
    } catch (err) {
      toast.error("Failed to create restaurant. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-center">Welcome to Food Order</h1>
      <p className="text-center mt-2">
        Your one-stop solution for food order services!
      </p>

      <div className="flex flex-col items-center mt-8 gap-y-5">
        <h2 className="text-xl font-semibold text-center mt-4">
          Select Your Restaurant
        </h2>
        {hydrated && (
          <DropDownRestaurant
            title="Select a restaurant"
            className="w-4/5"
            options={restaurants}
            value={selectedRestaurantId}
            onChange={handleRestaurantChange}
          />
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowRestaurantModal(true)}
        >
          Create Restaurant / Branch
        </button>
      </div>
      <div className="flex flex-col items-center mt-12 gap-y-5">
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
      {showRestaurantModal && (
        <CreateRestaurantModal
          onClose={() => setShowRestaurantModal(false)}
          onCreate={handleCreateRestaurant}
        />
      )}
    </div>
  );
}
