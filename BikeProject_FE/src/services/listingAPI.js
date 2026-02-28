import apiClient from "./api";

export const listingAPI = {
    create: (data) =>
        apiClient.post('/Listing/create', data),

    getById: (id) =>
        apiClient.get(`/Listing/${id}`),

    approve: (listingId) =>
        apiClient.post(`/Listing/approve/${listingId}`),
};

