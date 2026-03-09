import apiClient from "./api";

export const categoryAPI = {
    /**
     * Lấy tất cả category
     */
    getAll: async () => {
        try {
            const response = await apiClient.get("/Category/getAll")
            return response
        } catch (error) {
            console.error("❌ Error fetching categories:", error)
            throw error
        }
    },

    /**
     * Tạo category mới
     * @param {Object} data - { name: string, description?: string }
     */
    create: async (data) => {
        try {
            const response = await apiClient.post("/Category/createCategory", data)
            return response
        } catch (error) {
            console.error("❌ Error creating category:", error)
            throw error
        }
    },

    /**
     * Cập nhật category
     * @param {number} categoryId 
     * @param {Object} data - { name: string, description?: string }
     */
    update: async (categoryId, data) => {
        try {
            const response = await apiClient.put(`/Category/${categoryId}/updateCategory`, data)
            return response
        } catch (error) {
            console.error("❌ Error updating category:", error)
            throw error
        }
    },
}
