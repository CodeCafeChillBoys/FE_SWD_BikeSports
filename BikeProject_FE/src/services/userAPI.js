import apiClient from './api';

export const userAPI = {
    search: (params = {}) =>
        apiClient.get('/User/get-user-by-search-filter', { params }),

    getById: (userId) =>
        apiClient.get(`/User/${userId}`),

    update: (userId, data) =>
        apiClient.put(`/User/${userId}`, data),

    updateStatus: (userId, data) =>
        apiClient.patch(`/User/${userId}/UpdateStatus`, data),
};
