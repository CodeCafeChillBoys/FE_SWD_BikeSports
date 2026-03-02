import { CheckCircle, Clock, Plus, ShieldCheck, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback, useMemo } from "react"
import StatsCard from "../components/DashBoard/StatsCard"
import ListingCard from "../components/Listing/listingCard"
import CreateReportModal from "../components/modals/CreateReportModal"
import ReportDetailModal from "../components/modals/ReportDetailModal"
import UpdateReportModal from "../components/modals/UpdateReportModal"
import inspectionReportApi from "../../../services/inspectionReportApi"

export default function DashboardPage() {

    const navigate = useNavigate()

    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState("all")
    const [updatingId, setUpdatingId] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [showDetailModal, setShowDetailModal] = useState(false)
    const [reportDetails, setReportDetails] = useState(null)
    const [loadingDetail, setLoadingDetail] = useState(false)

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [reportToUpdate, setReportToUpdate] = useState(null)
    const [updatingReport, setUpdatingReport] = useState(false)

    const [updateFormData, setUpdateFormData] = useState({
        overallRating: "",
        frameCondition: "",
        frameNotes: "",
        brakeCondition: "",
        brakeNotes: "",
        drivetrainCondition: "",
        drivetrainNotes: "",
        wheelCondition: "",
        wheelNotes: "",
        status: 1
    })

    const [formData, setFormData] = useState({
        productId: "",
        inspectorId: "",
        imagesUrl: ""
    })

    // ================= FETCH DATA =================
    const fetchReports = useCallback(async () => {
        try {
            setLoading(true)
            const res = await inspectionReportApi.getReportsByProductName()
            const data = Array.isArray(res)
                ? res
                : Array.isArray(res?.data)
                    ? res.data
                    : []
            setReports(data)
        } catch (error) {
            console.error("Fetch report error:", error)
            setReports([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchReports()
    }, [fetchReports])

    // ================= STATS =================
    const pending = useMemo(
        () => reports?.filter(r => r?.status === 1).length || 0,
        [reports]
    )

    const completed = useMemo(
        () => reports?.filter(r => r?.status === 2).length || 0,
        [reports]
    )

    const total = reports?.length || 0

    // ================= FILTER =================
    const filteredReports = useMemo(() => {
        if (!Array.isArray(reports)) return []

        let data = [...reports]

        if (filterStatus === "pending")
            data = data.filter(r => r?.status === 1)

        if (filterStatus === "completed")
            data = data.filter(r => r?.status === 2)

        return data
            .sort((a, b) =>
                new Date(b?.inspectionDate || 0) -
                new Date(a?.inspectionDate || 0)
            )
            .slice(0, 5)
    }, [reports, filterStatus])

    const handleView = (id) => {
        navigate(`/inspector/report/${id}`)
    }

    // ================= VIEW REPORT DETAILS =================
    const handleViewDetails = async (reportId) => {
        try {
            setLoadingDetail(true)
            setShowDetailModal(true)
            const res = await inspectionReportApi.getReportById(reportId)
            const data = res?.data || res
            setReportDetails(data)
        } catch (error) {
            console.error("Fetch report details error:", error)
            alert("Lấy chi tiết báo cáo thất bại")
        } finally {
            setLoadingDetail(false)
        }
    }

    const closeDetailModal = () => {
        setShowDetailModal(false)
        setReportDetails(null)
    }

    // ================= UPDATE REPORT STATUS =================
    const handleUpdateStatus = async (report) => {
        if (!report?.reportId) return

        // Open modal for inspection details update
        setReportToUpdate(report)

        const nextStatus = report.status === 1 ? 2 : 1

        setUpdateFormData({
            overallRating: report.overallRating ?? "",
            frameCondition: report.frameCondition ?? "",
            frameNotes: report.frameNotes ?? "",
            brakeCondition: report.brakeCondition ?? "",
            brakeNotes: report.brakeNotes ?? "",
            drivetrainCondition: report.drivetrainCondition ?? "",
            drivetrainNotes: report.drivetrainNotes ?? "",
            wheelCondition: report.wheelCondition ?? "",
            wheelNotes: report.wheelNotes ?? "",
            status: nextStatus
        })

        setShowUpdateModal(true)
    }

    // ================= SUBMIT UPDATE REPORT =================
    const handleSubmitUpdate = async (e) => {
        e.preventDefault()
        if (!reportToUpdate?.reportId) return

        try {
            setUpdatingReport(true)
            setUpdatingId(reportToUpdate.reportId)

            await inspectionReportApi.updateReport(reportToUpdate.reportId, updateFormData)

            setShowUpdateModal(false)
            setReportToUpdate(null)
            await fetchReports()
        } catch (error) {
            console.error("Update report error:", error)
            alert("Cập nhật báo cáo thất bại, vui lòng thử lại.")
        } finally {
            setUpdatingReport(false)
            setUpdatingId(null)
        }
    }

    // ================= CREATE REPORT =================
    const handleCreateReport = async (e) => {
        e.preventDefault()
        try {
            setSubmitting(true)

            await inspectionReportApi.createReport(formData)

            setShowModal(false)
            setFormData({
                productId: "",
                inspectorId: "",
                imagesUrl: ""
            })
            await fetchReports()
        } catch (error) {
            console.error("Create report error:", error);
        } finally {
            setSubmitting(false)
        }
    }

    // ================= UI =================
    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Dashboard Kiểm Định Viên
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Chào mừng trở lại!
                    </p>
                </div>
            </div>


            {/* STATS */}
            <div className="grid grid-cols-3 gap-6">
                <div onClick={() => setFilterStatus("pending")} className="cursor-pointer">
                    <StatsCard
                        title="Chưa kiểm định"
                        value={pending}
                        icon={<Clock size={20} />}
                        bgColor="bg-orange-100"
                        iconColor="text-orange-500"
                    />
                </div>

                <div onClick={() => setFilterStatus("completed")} className="cursor-pointer">
                    <StatsCard
                        title="Đã kiểm định"
                        value={completed}
                        icon={<CheckCircle size={20} />}
                        bgColor="bg-green-100"
                        iconColor="text-green-600"
                    />
                </div>

                <div onClick={() => setFilterStatus("all")} className="cursor-pointer">
                    <StatsCard
                        title="Tổng kiểm định"
                        value={total}
                        icon={<ShieldCheck size={20} />}
                        bgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                </div>
            </div>

            {/* RECENT REPORTS */}
            <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">
                        Kiểm định gần đây
                    </h2>
                </div>

                <div className="space-y-4">
                    {loading && <p className="text-gray-500">Đang tải...</p>}

                    {!loading && filteredReports.length === 0 && (
                        <p className="text-gray-400">Không có báo cáo nào.</p>
                    )}

                    {!loading && filteredReports.map(item => (
                        <ListingCard
                            key={item.reportId}
                            item={item}
                            onView={handleView}
                            onViewDetails={handleViewDetails}
                            onUpdateStatus={handleUpdateStatus}
                            updatingId={updatingId}
                        />
                    ))}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            <CreateReportModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateReport}
                submitting={submitting}
            />

            {/* ================= DETAIL MODAL ================= */}
            <ReportDetailModal
                isOpen={showDetailModal}
                onClose={closeDetailModal}
                reportDetails={reportDetails}
                loadingDetail={loadingDetail}
            />

            {/* ================= UPDATE REPORT MODAL ================= */}
            <UpdateReportModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                updateFormData={updateFormData}
                setUpdateFormData={setUpdateFormData}
                onSubmit={handleSubmitUpdate}
                updatingReport={updatingReport}
            />
        </div>
    )
}