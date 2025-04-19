"use client";

import CreateCustomerModal from "@/components/customer/CreateCustomerModal";
import CustomerList from "@/components/customer/CustomerList";
import DeleteCustomerModal from "@/components/customer/DeleteCustomerModal";
import EditCustomerModal from "@/components/customer/EditCustomerModal";
import CreateRestaurantModal from "@/components/restaurant/createRestaurantModal";
import DropDownRestaurant from "@/components/restaurant/dropDownRestaurant";
import { createCustomer } from "@/services/customer/createCustomer";
import { deleteCustomer } from "@/services/customer/deleteCustomer";
import { findAllCustomersByRestaurantId } from "@/services/customer/findAllCustomerByRestaurantId";
import { updateCustomerTable } from "@/services/customer/updateCustomer";
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
  const [customers, setCustomers] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    if (!selectedRestaurantId) return;
    try {
      const data = await findAllCustomersByRestaurantId(selectedRestaurantId);
      setCustomers(data.result);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

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

  useEffect(() => {
    fetchCustomers();
  }, [selectedRestaurantId]);

  const filteredCustomers = (customers || []).filter((c) =>
    statusFilter ? c.Status === statusFilter : true
  );

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
        setRestaurants((prev) => [...(prev ?? []), newRestaurant]);
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

  const handleCustomerCreation = async (tableId: string) => {
    if (!selectedRestaurantId || !tableId) {
      toast.error("Please select a restaurant and table.");
      return;
    }

    try {
      const res = await createCustomer(
        selectedRestaurantId,
        tableId,
        "occupied"
      );

      if (res) {
        toast.success("Customer created successfully!");
        setShowCreateCustomerModal(false);
        setCustomers((prev) => [...(prev ?? []), res.result]);
      } else {
        toast.error("Failed to create customer.");
      }
    } catch (error) {
      toast.error("Failed to create customer. Please try again.");
    }
  };

  const handleUpdateCustomer = async (payload: {
    customer_id: string;
    new_table_id: string;
  }) => {
    try {
      const data = await updateCustomerTable(payload);
      toast.success("Customer updated!");
      const refreshed = await findAllCustomersByRestaurantId(
        selectedRestaurantId
      );
      setCustomers(refreshed.result ?? []);
    } catch {
      toast.error("Failed to update customer.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCustomer(deleteId);
      toast.success("Customer deleted!");
      fetchCustomers();
    } catch {
      toast.error("Delete failed.");
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
          onClick={() => setShowCreateCustomerModal(true)}
        >
          Create Customer
        </button>

        <div className="w-full mt-4">
          <h3 className="text-lg font-semibold mb-2 text-center">Customers</h3>
          <div className="mt-4 w-4/5 md:w-1/2 mx-auto mb-4">
            <label className="block text-sm font-medium mb-1 text-center">
              Filter by Status
            </label>
            <select
              className="w-full border p-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="occupied">Occupied</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          {/* TODO: Pay */}
          <CustomerList
            customers={filteredCustomers}
            onEdit={(c) => setEditCustomer(c)}
            onDelete={(c) => setDeleteId(c.ID)}
            onPay={(c) => console.log("Pay", c)}
          />
        </div>
      </div>
      {showRestaurantModal && (
        <CreateRestaurantModal
          onClose={() => setShowRestaurantModal(false)}
          onCreate={handleCreateRestaurant}
        />
      )}
      {showCreateCustomerModal && (
        <CreateCustomerModal
          onClose={() => setShowCreateCustomerModal(false)}
          onCreate={handleCustomerCreation}
        />
      )}
      {editCustomer && (
        <EditCustomerModal
          customer={editCustomer}
          onClose={() => setEditCustomer(null)}
          onUpdate={handleUpdateCustomer}
        />
      )}
      {deleteId && (
        <DeleteCustomerModal
          onClose={() => setDeleteId(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
