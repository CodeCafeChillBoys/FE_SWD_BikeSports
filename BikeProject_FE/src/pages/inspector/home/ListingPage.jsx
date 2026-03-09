import { useEffect, useState } from "react"
import productApi from "../../../services/productApi"
import inspectionReportApi from "../../../services/inspectionReportApi"
import InspectorListingCard from "../components/Listing/InspectorListingCard"

export default function ListingPage() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [creatingId, setCreatingId] = useState(null)

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "https://localhost:7247"

    useEffect(() => {
        fetchListings()
    }, [])

    const fetchListings = async () => {
        try {
            setLoading(true)
            const res = await productApi.getAllProducts()

            const data = Array.isArray(res)
                ? res
                : Array.isArray(res?.data)
                    ? res.data
                    : []

            // 👇 đảm bảo mỗi product có hasReport mặc định
            const normalized = data.map(item => ({
                ...item,
                hasReport: item.hasReport || false
            }))

            // Sort theo thời gian mới nhất lên đầu
            normalized.sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt || 0)
                const dateB = new Date(b.updatedAt || b.createdAt || 0)
                return dateB - dateA
            })

            // 🔍 Debug: Kiểm tra xem product có featuredImage không
            console.log("📦 Products loaded:", normalized)
            console.log("📸 First product images:", normalized[0]?.featuredImage, normalized[0]?.productImage, normalized[0]?.image)

            setListings(normalized)
        } catch (error) {
            console.error("Fetch listings error (inspector)", error)
            setListings([])
        } finally {
            setLoading(false)
        }
    }

    const handleCreateReport = async (item) => {
        const productId = item.productId
        const inspectorId = localStorage.getItem("userId")

        if (!inspectorId) {
            alert("Vui lòng đăng nhập lại để tạo kiểm định.")
            return
        }

        try {
            setCreatingId(productId)

            const payload = {
                productId,
                inspectorId,
                imagesUrl: item.featuredImage || ""
            }

            await inspectionReportApi.createReport(payload)

            // ✅ Update state ngay sau khi tạo thành công
            setListings(prev =>
                prev.map(p =>
                    p.productId === productId
                        ? { ...p, hasReport: true, inspectionStatus: 2 }
                        : p
                )
            )

            // Try to update product inspectionStatus on backend as well so other roles see the change
            try {
                await productApi.updateProduct(productId, { inspectionStatus: 2 })
            } catch (updateErr) {
                // Not fatal: backend may not support this or require different endpoint/permissions
                console.warn('Could not update product inspectionStatus on backend', updateErr)
            }

        } catch (error) {
            console.error("Create inspection report error", error)
            alert("Tạo kiểm định thất bại, vui lòng thử lại.")
        } finally {
            setCreatingId(null)
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">
                Quản lý Sản Phẩm
            </h1>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                {loading ? (
                    <p className="text-gray-500">Đang tải danh sách...</p>
                ) : listings.length === 0 ? (
                    <p className="text-gray-400">
                        Hiện chưa có listing nào.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {listings.map(item => (
                            <InspectorListingCard
                                key={item.productId}
                                item={item}
                                creatingId={creatingId}
                                onCreateReport={handleCreateReport}
                                API_BASE_URL={API_BASE_URL}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}