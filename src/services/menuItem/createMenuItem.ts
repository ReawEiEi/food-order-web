import api from "@/api/axios";

export async function createMenuItem(formData: FormData) {
  try {
    const response = await api.post("/CreateMenuItem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
}
