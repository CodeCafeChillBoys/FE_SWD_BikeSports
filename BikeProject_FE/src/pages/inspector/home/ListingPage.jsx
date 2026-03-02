import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { X } from "lucide-react"
import productApi from "../../../services/productApi"
import inspectionReportApi from "../../../services/inspectionReportApi"
import InspectorListingCard from "../components/Listing/InspectorListingCard"

export default function ListingPage() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [creatingId, setCreatingId] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true)
                const res = await productApi.getAllProducts()

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

    // const reloadListings = async () => {
    //     try {
    //         setLoading(true)
    //         const res = await productApi.getAllProducts()
    //         const data = Array.isArray(res)
    //             ? res
    //             : Array.isArray(res?.data)
    //                 ? res.data
    //                 : []
    //         setListings(data)
    //     } catch (error) {
    //         console.error("Reload listings error (inspector)", error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const handleCreateReport = async (item) => {
        const productId = item.productId
        const inspectorId = localStorage.getItem("userId")

        if (!inspectorId) {
            console.warn("No inspectorId in localStorage")
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

            const res = await inspectionReportApi.createReport(payload)
            console.log("Report:" + res);


            // Nếu backend trả về reportId thì có thể dùng sau này
            const reportId = res?.reportId || res?.data?.reportId
            console.log("ReportId" + reportId);


            // Sau khi tạo xong, cho xem chi tiết xe
            navigate(`/inspector/bikes/${productId}`)

            // Nếu cần xem chi tiết report riêng:
            // if (reportId) navigate(`/inspector/report/${reportId}`)

        } catch (error) {
            console.error("Create inspection report error", error)
            alert("Tạo kiểm định thất bại, vui lòng thử lại.")
        } finally {
            setCreatingId(null)
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-2xl font-bold mb-4">Quản lý Sản Phẩm</h1>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">

                {loading ? (
                    <p className="text-gray-500">Đang tải danh sách...</p>
                ) : listings.length === 0 ? (
                    <p className="text-gray-400">Hiện chưa có listing nào.</p>
                ) : (
                    <div className="space-y-4">
                        {listings.map((item) => (
                            <InspectorListingCard
                                key={item.productId || item.listingId}
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
