import apiClient from "./api";

export const brandAPI = {
    /**
     * Lấy tất cả brand
     */
    getAll: async () => {
        try {
            const response = await apiClient.get("/Brand/getAll")
            return response
        } catch (error) {
            console.error("❌ Error fetching brands:", error)
            throw error
        }
    },

    /**
     * Tạo brand mới
     * @param {Object} data - { name: string, description?: string }
     */
    create: async (data) => {
        try {
            const response = await apiClient.post("/Brand/create", data)
            return response
        } catch (error) {
            console.error("❌ Error creating brand:", error)
            throw error
        }
    },

    /**
     * Cập nhật brand
     * @param {number} brandId 
     * @param {Object} data - { name: string, description?: string }
     */
    update: async (brandId, data) => {
        try {
            const response = await apiClient.put(`/Brand/${brandId}/updateBrand`, data)
            return response
        } catch (error) {
            console.error("❌ Error updating brand:", error)
            throw error
        }
    },
}
