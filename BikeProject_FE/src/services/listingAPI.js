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
// ============================
const approveListing = (listingId) => {
    return apiClient.post(`/Listing/approve/${listingId}`)
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