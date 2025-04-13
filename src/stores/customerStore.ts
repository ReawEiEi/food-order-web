import { create } from "zustand";

interface CustomerState {
  restaurantId: string | null;
  tableId: string | null;
  customerId: string | null;
  setIds: (restaurantId: string, tableId: string, customerId: string) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  restaurantId: null,
  tableId: null,
  customerId: null,
  setIds: (restaurantId, tableId, customerId) =>
    set({ restaurantId, tableId, customerId }),
}));
