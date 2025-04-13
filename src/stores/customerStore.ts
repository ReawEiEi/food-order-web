import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomerState {
  restaurantId: string | null;
  tableId: string | null;
  customerId: string | null;
  setIds: (restaurantId: string, tableId: string, customerId: string) => void;
  clear: () => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      restaurantId: null,
      tableId: null,
      customerId: null,
      setIds: (restaurantId, tableId, customerId) =>
        set({ restaurantId, tableId, customerId }),
      clear: () => set({ restaurantId: null, tableId: null, customerId: null }),
    }),
    {
      name: "customer-store",
    }
  )
);
