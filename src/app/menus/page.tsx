"use client";
import { useCustomerStore } from "@/stores/customerStore";

export default function MenuPage() {
  const { restaurantId, tableId, customerId } = useCustomerStore();
  console.log("Restaurant ID:", restaurantId);
  console.log("Table ID:", tableId);
  console.log("Customer ID:", customerId);
  return <div>This is Menu Page.</div>;
}
