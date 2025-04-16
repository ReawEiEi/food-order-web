import api from "@/api/axios";

export async function editTableStatus(tableId: string, status: string) {
  try {
    const response = await api.patch("/UpdateTableInfo", {
      table_id: tableId,
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing table status:", error);
    throw error;
  }
}
