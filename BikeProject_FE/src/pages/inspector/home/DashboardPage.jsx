import { CheckCircle, Clock, Plus, ShieldCheck, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback, useMemo } from "react"
import StatsCard from "../components/DashBoard/StatsCard"
import ListingCard from "../components/Listing/listingCard"
import inspectionReportApi from "../../../services/inspectionReportApi"

export default function DashboardPage() {

    const navigate = useNavigate()

    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState("all")

    const [showModal, setShowModal] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        productId: "",
        inspectorId: "",
        imagesUrl: ""
    })

    // ================= FETCH DATA =================
    const fetchReports = useCallback(async () => {
        try {
            setLoading(true)
            const res = await inspectionReportApi.getAllReports()
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
        () => reports?.filter(r => r?.status === 0).length || 0,
        [reports]
    )

    const completed = useMemo(
        () => reports?.filter(r => r?.status === 1).length || 0,
        [reports]
    )

    const total = reports?.length || 0

    // ================= FILTER =================
    const filteredReports = useMemo(() => {
        if (!Array.isArray(reports)) return []

        let data = [...reports]

        if (filterStatus === "pending")
            data = data.filter(r => r?.status === 0)

        if (filterStatus === "completed")
            data = data.filter(r => r?.status === 1)

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

            fetchReports()

        } catch (error) {
            console.error("Create report error:", error)
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

                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    <Plus size={18} />
                    Tạo Báo Cáo Mới
                </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6">
                <div onClick={() => setFilterStatus("pending")} className="cursor-pointer">
                    <StatsCard
                        title="Chờ kiểm định"
                        value={pending}
                        icon={<Clock size={20} />}
                        bgColor="bg-orange-100"
                        iconColor="text-orange-500"
                    />
                </div>

                <div onClick={() => setFilterStatus("completed")} className="cursor-pointer">
                    <StatsCard
                        title="Đã hoàn thành"
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
                        />
                    ))}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-[420px] p-6 rounded-2xl shadow-xl relative">

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-lg font-semibold mb-5">
                            Tạo Báo Cáo Mới
                        </h3>

                        <form onSubmit={handleCreateReport} className="space-y-4">

                            <input
                                placeholder="Product ID"
                                value={formData.productId}
                                onChange={(e) =>
                                    setFormData({ ...formData, productId: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                                required
                            />

                            <input
                                placeholder="Inspector ID"
                                value={formData.inspectorId}
                                onChange={(e) =>
                                    setFormData({ ...formData, inspectorId: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                                required
                            />

                            <input
                                placeholder="Image URL"
                                value={formData.imagesUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, imagesUrl: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                                required
                            />

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {submitting ? "Đang tạo..." : "Tạo Báo Cáo"}
                            </button>

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}