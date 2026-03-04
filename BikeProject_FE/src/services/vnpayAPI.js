import apiClient from "./api";

const vnpayAPI = {
    /**
     * Tạo link thanh toán VnPay
     * @param {Object} paymentData - { orderId, fullName, description, amount, createdDate }
    * @returns {Promise<Object>} Kết quả trả về từ backend (chứa URL thanh toán)
     */
    createPayment: async (paymentData) => {
        try {
            const response = await apiClient.post("/VnPay", paymentData);
            return response;
        } catch (error) {
            console.error("VnPay Payment Error:", error);
            throw error;
        }
    },

    /**
     * Xác nhận callback thanh toán từ VnPay
     * @param {string} queryString - Query string từ VnPay callback
    * @returns {Promise<Object>} Kết quả từ backend
     */
    verifyCallback: async (queryString) => {
        try {
            const response = await apiClient.get(`/VnPay/Callback?${queryString}`);
            return response;
        } catch (error) {
            console.error("VnPay Callback Error:", error);
            throw error;
        }
    },
};

export default vnpayAPI;
