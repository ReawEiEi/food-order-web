import api from "@/api/axios";

export async function findCustomerByID(customerId: string) {
  try {
    const response = await api.post(`/FindCustomerByID`, {
        customer_id: customerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
}
