import api from "@/api/axios";

export async function findAllMenusByRestaurantID(restaurantId: string) {
  try {
    const response = await api.post(`/FindAllMenusByRestaurantID`, {
      restaurant_id: restaurantId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
}
