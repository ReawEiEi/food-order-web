import api from "@/api/axios";
export async function findAllMenuItemsByMenuID(menuId: string) {
  try {
    const response = await api.post(`/FindAllMenuItemsByMenuID`, {
      menu_id: menuId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
}
