import apiClient from "./api";

const inspectionReportApi = {

    // ============================
    // CREATE INSPECTOR REPORT
    // POST: /api/InspectionReport/create-inspector-report
    // ============================
    createReport: async (data) => {
        return await apiClient.post(
            "/InspectionReport/create-inspector-report",
            data
        );
    },

    // ============================
    // UPDATE INSPECTOR REPORT
    // POST: /api/InspectionReport/update/{reportId}
    // ============================
    updateReport: async (reportId, data) => {
        return await apiClient.post(
            `/InspectionReport/update/${reportId}`,
            data
        );
    },

    // ============================
    // GET ALL INSPECTOR REPORT
    // GET: /api/InspectionReport/get-all-inspector-report
    // ============================
    getAllReports: async () => {
        return await apiClient.get(
            "/InspectionReport/get-all-inspector-report"
        );
    },

    // ============================
    // GET ALL INSPECTOR REPORT BY PRODUCT NAME
    // GET: /api/InspectionReport/get-all-inspector-report-product-name
    // ============================
    getReportsByProductName: async () => {
        return await apiClient.get(
            "/InspectionReport/get-all-inspector-report-product-name"
        );
    },

    // ============================
    // GET INSPECTOR REPORT BY ID
    // GET: /api/InspectionReport/get-all-inspector-report-by-Id/{reportId}
    // ============================
    getReportById: async (reportId) => {
        return await apiClient.get(
            `/InspectionReport/get-all-inspector-report-by-Id/${reportId}`
        );
    }

};

export default inspectionReportApi;