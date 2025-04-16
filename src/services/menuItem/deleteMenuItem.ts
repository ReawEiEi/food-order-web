import api from "@/api/axios";

export async function deleteMenuItem(menuItemId: string) {
  try {
    const response = await api.delete("/DeleteMenuItem", {
      data: {
        menu_item_id: menuItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}
