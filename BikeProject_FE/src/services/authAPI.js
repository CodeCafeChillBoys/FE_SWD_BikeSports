import apiClient from "./api";

const authAPI = {
    login: async (data) => {
        const response = await apiClient.post("/Auth/Login", data)
        return response // apiClient interceptor already returns response.data
    },

    register: async (data) => {
        const response = await apiClient.post("/Auth/Register", data)
        return response // apiClient interceptor already returns response.data
    }
}

export default authAPI