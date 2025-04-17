import api from "@/api/axios";

export async function createMenu(restaurantId: string, menuName: string) {
  try {
    const response = await api.post(`/CreateMenu`, {
      restaurant_id: restaurantId,
      menu_name: menuName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating menu:", error);
    throw error;
  }
}
