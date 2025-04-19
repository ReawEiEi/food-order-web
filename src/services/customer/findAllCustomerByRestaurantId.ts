import api from "@/api/axios";

export async function findAllCustomersByRestaurantId(restaurantId: string) {
  try {
    const response = await api.post(`/FindAllCustomersByRestaurantID`, {
      restaurant_id: restaurantId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers by restaurant ID:", error);
    throw error;
  }
}
