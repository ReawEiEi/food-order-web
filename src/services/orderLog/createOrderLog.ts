import api from "@/api/axios";

export async function createOrderLog(
  customerId: string,
  menuItemId: string,
  quantity: string,
  note: string
) {
  try {
    const response = await api.post("/CreateOrderLog", {
      customer_id: customerId,
      menu_item_id: menuItemId,
      quantity: quantity,
      order_description: note,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order log:", error);
    throw error;
  }
}
