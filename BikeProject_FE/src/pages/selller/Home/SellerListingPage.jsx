import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import listingApi from "../../../services/listingAPI"
import ListingCard from "../components/Listing/ListingCard"
import StatusTabs from "../components/Listing/StatusTabs"

export default function SellerListingsPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const sellerId = localStorage.getItem("userId")
    const [tab, setTab] = useState("all")
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Hiển thị success message nếu có trong navigation state
    useEffect(() => {
        if (location.state?.success) {
            setSuccess(location.state.success)
            setTimeout(() => setSuccess(""), 5000)
            // Clear state để không hiện lại khi refresh
            window.history.replaceState({}, document.title)
        }
    }, [location.state])

    const loadListings = async () => {
        try {
            setLoading(true)
            setError("")

            const res = await listingApi.getAllListings()
            // api.js response interceptor trả về response.data trực tiếp
            let list = []
            if (Array.isArray(res)) {
                list = res
            } else if (res?.data && Array.isArray(res.data)) {
                list = res.data
            } else if (res && typeof res === "object") {
                list = [res]
            }
            // Chỉ hiện listing của seller đang đăng nhập
            const filtered = sellerId
                ? list.filter((l) => l.sellerId === sellerId)
                : list

            // Sort theo thời gian mới nhất lên đầu (updatedAt hoặc createdAt)
            const sorted = filtered.sort((a, b) => {
                const dateA = new Date(a.updatedAt || a.createdAt || 0)
                const dateB = new Date(b.updatedAt || b.createdAt || 0)
                return dateB - dateA // Mới nhất lên đầu
            })

            setListings(sorted)

            console.log("✅ Loaded listings:", sorted.length)
        } catch (e) {
            setError("Không thể tải danh sách tin đăng.")
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadListings()
    }, [sellerId, location.key]) // Refetch mỗi khi navigate về trang này

    const filteredListings = listings.filter((l) => {
        if (tab === "all") return true
        return Number(l.status) === tab
    })

    const counts = {
        all: listings.length,
        1: listings.filter((l) => Number(l.status) === 1).length,
        2: listings.filter((l) => Number(l.status) === 2).length,
        3: listings.filter((l) => Number(l.status) === 3).length,
        4: listings.filter((l) => Number(l.status) === 4).length,
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Quản lý tin đăng</h1>
                <div className="flex gap-2">
                    <button
                        onClick={loadListings}
                        disabled={loading}
                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-50"
                        title="Làm mới danh sách"
                    >
                        🔄 {loading ? "Đang tải..." : "Làm mới"}
                    </button>
                    <button
                        onClick={() => navigate("/seller/listings/new")}
                        className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
                    >
                        + Đăng tin mới
                    </button>
                </div>
            </div>

            {success && (
                <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm flex justify-between items-center">
                    <span>{success}</span>
                    <button onClick={() => setSuccess("")} className="text-green-800 hover:text-green-900 text-xl leading-none">×</button>
                </div>
            )}

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <StatusTabs
                current={tab}
                onChange={setTab}
                counts={counts}
            />

            {loading ? (
                <div className="text-center py-16 text-gray-400">Đang tải...</div>
            ) : filteredListings.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    Không có tin đăng nào.
                </div>
            ) : (
                filteredListings.map((listing) => (
                    <ListingCard key={listing.listingId ?? listing.id} item={listing} />
                ))
            )}
        </div>
    )
}
