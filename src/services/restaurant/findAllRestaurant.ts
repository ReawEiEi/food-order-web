import api from "@/api/axios";

export async function findAllRestaurant() {
  try {
    const response = await api.get(`/GetAllRestaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all restaurants:", error);
    throw error;
  }
}
