import api from "@/api/axios";

export async function MakePayment(customerId: string) {
  try {
    const response = await api.patch("/MakePayment", {
      customer_id: customerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
}
