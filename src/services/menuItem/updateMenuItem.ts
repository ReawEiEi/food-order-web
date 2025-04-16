import api from "@/api/axios";
export async function updateMenuItem(formData: FormData) {
  try {
    const response = await api.patch("/UpdateMenuItem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
}
