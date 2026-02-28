import apiClient from "./api";
// apiClient là file ông đã config baseURL + interceptor

const productApi = {

    // =========================
    // CREATE PRODUCT
    // =========================
    createBicycle: (data) => {
        return apiClient.post("/Product/create-bicycle", data);
    },

    // =========================
    // UPDATE PRODUCT
    // =========================
    updateProduct: (productId, data) => {
        return apiClient.put(`/Product/${productId}/UpdateProduct`, data);
    },

    // =========================
    // GET ALL PRODUCTS
    // =========================
    getAllProducts: () => {
        return apiClient.get("/Product/get-all-product");
    },

    // =========================
    // GET PRODUCT DETAIL
    // =========================
    getProductDetail: (productId) => {
        return apiClient.get(
            `/Product/get-product-detail-by-productId/${productId}`
        );
    },

    // =========================
    // GET PRODUCT BY SELLER
    // =========================
    getProductBySeller: (sellerId) => {
        return apiClient.get(
            `/Product/get-product-by-seller/${sellerId}`
        );
    },

    // =========================
    // GET PRODUCT BY ID (query param)
    // =========================
    getProductById: (productId) => {
        return apiClient.get("/Product/get-product-by-product-id", {
            params: { productId }
        });
    },
};

export default productApi;