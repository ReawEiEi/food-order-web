import api from "@/api/axios";

export async function findOrderLogsByCustomerId(customerId: string) {
  try {
    const response = await api.post(`/FindOrderLogsByCustomerID`, {
      customer_id: customerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order logs:", error);
    throw error;
  }
}
