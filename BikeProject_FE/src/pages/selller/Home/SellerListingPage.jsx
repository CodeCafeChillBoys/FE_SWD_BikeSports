import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import listingApi from "../../../services/listingAPI"
import ListingCard from "../components/Listing/ListingCard"
import StatusTabs from "../components/Listing/StatusTabs"

export default function SellerListingsPage() {
    const navigate = useNavigate()
    const sellerId = localStorage.getItem("userId")
    const [tab, setTab] = useState("all")
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        listingApi.getAllListings()
            .then((res) => {
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
                setListings(filtered)
            })
            .catch(() => setError("Không thể tải danh sách tin đăng."))
            .finally(() => setLoading(false))
    }, [sellerId])

    const getStatus = (l) => String(l.status ?? "").toLowerCase()

    const filteredListings = listings.filter((l) => {
        if (tab === "all") return true
        return getStatus(l) === tab
    })

    const counts = {
        all: listings.length,
        active: listings.filter((l) => getStatus(l) === "active").length,
        pending: listings.filter((l) => getStatus(l) === "pending").length,
        rejected: listings.filter((l) => getStatus(l) === "rejected").length,
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Quản lý tin đăng</h1>
                <button
                    onClick={() => navigate("/seller/listings/new")}
                    className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
                >
                    + Đăng tin mới
                </button>
            </div>

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
