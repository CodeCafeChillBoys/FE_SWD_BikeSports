import { useEffect, useState } from "react"
import { CheckCircle, Eye, X } from "lucide-react"
import listingApi from "../../../services/listingAPI"

import { useNavigate } from "react-router-dom"

export default function ListingPage() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [approvingId, setApprovingId] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true)
                const res = await listingApi.getAllListings()

                const data = Array.isArray(res)
                    ? res
                    : Array.isArray(res?.data)
                        ? res.data
                        : []

                setListings(data)
            } catch (error) {
                console.error("Fetch listings error (inspector)", error)
                setListings([])
            } finally {
                setLoading(false)
            }
        }

        fetchListings()
    }, [])

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "https://localhost:7247"

    const reloadListings = async () => {
        try {
            setLoading(true)
            const res = await listingApi.getAllListings()
            const data = Array.isArray(res)
                ? res
                : Array.isArray(res?.data)
                    ? res.data
                    : []
            setListings(data)
        } catch (error) {
            console.error("Reload listings error (inspector)", error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (listingId) => {
        try {
            setApprovingId(listingId)
            await listingApi.approveListing(listingId, {})
            await reloadListings()
        } catch (error) {
            console.error("Approve listing error", error)
        } finally {
            setApprovingId(null)
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* HEADER PAGE */}
            <h1 className="text-2xl font-bold mb-4">Quản lý listing</h1>

            {/* WRAPPER giống card lớn trong ảnh */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="mb-4">
                    <h2 className="text-base font-semibold">Danh sách các xe đạp đang hoạt động trên hệ thống</h2>
                </div>

                {loading ? (
                    <p className="text-gray-500">Đang tải danh sách...</p>
                ) : listings.length === 0 ? (
                    <p className="text-gray-400">Hiện chưa có listing nào.</p>
                ) : (
                    <div className="space-y-4">
                        {listings.map((item) => {
                            const isApproved = item.status === 2
                            return (
                                <div
                                    key={item.listingId}
                                    className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:shadow-md hover:border-gray-200 transition-all duration-200"
                                >
                                    {/* LEFT */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`${API_BASE_URL}/${item.featuredImage}`}
                                            alt={item.productName}
                                            className="w-28 h-24 object-cover rounded-xl"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {item.productName}
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.brand} - {item.type} - {item.size}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Người bán: {item.sellerName}
                                            </p>

                                            <div className="flex items-center gap-2 mt-2 text-xs">
                                                {/* tình trạng xe */}
                                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    {item.condition || "Đã qua sử dụng"}
                                                </span>

                                                {/* trạng thái kiểm định/duyệt */}
                                                <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${isApproved ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                                                    {isApproved && <CheckCircle size={12} />}
                                                    {isApproved ? "Đã kiểm định" : "Chờ duyệt"}
                                                </span>

                                                {/* giá */}
                                                {typeof item.price === "number" && (
                                                    <span className="ml-2 text-sm font-semibold text-blue-600">
                                                        {item.price.toLocaleString()} đ
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex flex-col items-end gap-3 min-w-[190px]">
                                        {item.createdAt && (
                                            <span className="text-xs text-gray-500">
                                                Đăng ngày: {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleApprove(item.listingId)}
                                                disabled={approvingId === item.listingId}
                                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {approvingId === item.listingId ? "Đang duyệt..." : "Duyệt"}
                                            </button>

                                            <button
                                                onClick={() => navigate(`/inspector/bikes/${item.productId}`)}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 shadow-sm transition"
                                            >
                                                <Eye size={16} />
                                                Xem báo cáo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}



