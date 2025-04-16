import api from "@/api/axios";

export async function deleteTable(tableId: string) {
  try {
    const response = await api.delete("/DeleteTableInfoByID", {
      data: {
        table_id: tableId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error;
  }
}
