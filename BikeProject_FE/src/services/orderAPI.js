import apiClient from "./api";

const orderAPI = {
    // ============================
    // CREATE ORDER
    // ============================
    createOrder: async (orderData) => {
        try {
            const response = await apiClient.post("/Order", orderData);
            return response;
        } catch (error) {
            console.error("Create Order Error:", error);
            throw error;
        }
    },

    // ============================
    // GET ALL ORDERS
    // ============================
    getAllOrders: async () => {
        try {
            const response = await apiClient.get("/Order/get-all-order");
            return response;
        } catch (error) {
            console.error("Get All Orders Error:", error);
            throw error;
        }
    },

    // ============================
    // GET ORDER BY ID
    // ============================
    getOrderById: async (orderId) => {
        try {
            const response = await apiClient.get(`/Order/${orderId}`);
            return response;
        } catch (error) {
            console.error("Get Order By Id Error:", error);
            throw error;
        }
    },

    // ============================
    // GET ORDER BY USER ID
    // ============================
    getOrderByUserId: async (userId) => {
        try {
            const endpoint = `/Order/get-order-by-user/${userId}`;
            console.log("🌐 Calling endpoint:", endpoint);

            const response = await apiClient.get(endpoint);

            console.log("✅ API Response received:", response);
            return response;
        } catch (error) {
            console.error("❌ Get Order By User Error:", error);
            console.error("❌ Error details:", error.response?.data);
            console.error("❌ Error status:", error.response?.status);
            throw error;
        }
    },

    // ============================
    // UPDATE ORDER
    // ============================
    updateOrder: async (orderId, updateData) => {
        try {
            const response = await apiClient.put(
                `/Order/${orderId}`,
                updateData
            );
            return response;
        } catch (error) {
            console.error("Update Order Error:", error);
            throw error;
        }
    },
};

export default orderAPI;