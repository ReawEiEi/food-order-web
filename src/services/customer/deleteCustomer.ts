import api from "@/api/axios";

export async function deleteCustomer(customerId: string) {
  try {
    const response = await api.delete("/DeleteCustomerByID", {
      data: {
        customer_id: customerId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}
