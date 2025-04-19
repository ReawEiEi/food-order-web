import api from "@/api/axios";

export async function updateCustomerTable(payload: {
  customer_id: string;
  new_table_id: string;
}) {
  try {
    const response = await api.patch("/UpdateCustomer", {
      customer_id: payload.customer_id,
      new_table_id: payload.new_table_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating customer table:", error);
    throw error;
  }
}
