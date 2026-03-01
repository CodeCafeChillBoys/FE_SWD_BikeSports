import apiClient from "./api";

// ============================
// CREATE LISTING
// ============================
const createListing = (data) => {
    return apiClient.post("/Listing/create", data)
}

// ============================
// GET LISTING BY ID
// ============================
const getListingById = (id) => {
    return apiClient.get(`/Listing/${id}`)
}

// ============================
// APPROVE LISTING
// Backend thường yêu cầu body JSON (kể cả rỗng)
// ============================
const approveListing = (listingId, payload = {}) => {
    return apiClient.post(`/Listing/approve/${listingId}`, payload)
}

// ============================
// GET ALL LISTINGS
// ============================
const getAllListings = () => {
    return apiClient.get("/Listing/get-all-listing")
}

const listingApi = {
    createListing,
    getListingById,
    approveListing,
    getAllListings
}

export default listingApi