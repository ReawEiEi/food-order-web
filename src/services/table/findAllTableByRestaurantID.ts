import api from "@/api/axios";
export async function findAllTableByRestaurantID(restaurantId: string) {
  try {
    const response = await api.post(`/FindAllTableInfoByRestaurantID`, {
      restaurant_id: restaurantId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
}
