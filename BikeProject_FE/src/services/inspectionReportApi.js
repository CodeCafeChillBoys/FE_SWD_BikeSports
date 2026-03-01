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
    }

};

export default inspectionReportApi;