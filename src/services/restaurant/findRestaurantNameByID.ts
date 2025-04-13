import api from "@/api/axios";

export async function findRestaurantNameByID(restaurantId: string) {
  try {
    const response = await api.post(`/FindRestaurantNameByID`, {
      restaurant_id: restaurantId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant name:", error);
    throw error;
  }
    
}