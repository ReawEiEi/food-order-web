import api from "@/api/axios";

export async function createCustomer(
  restaurantId: string,
  tableId: string,
  status: string
) {
  try {
    const response = await api.post(`/CreateCustomer`, {
      restaurant_id: restaurantId,
      table_id: tableId,
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
}
