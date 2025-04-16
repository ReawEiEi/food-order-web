import api from "@/api/axios";

export default async function createRestaurant(
  restaurantName: string,
  branchName: string
) {
  try {
    const response = await api.post("/CreateRestaurant", {
      branch: branchName,
      restaurant_name: restaurantName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
}
