import api from "@/api/axios";

export async function createTable(restaurantId: string, tableNumber: string) {
  try {
    const response = await api.post("/CreateTableInfo", {
      restaurant_id: restaurantId,
      table_number: tableNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}
