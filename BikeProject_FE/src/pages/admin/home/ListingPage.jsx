import { useEffect, useState, useMemo } from "react"
import listingApi from "../../../services/listingAPI"
import productApi from "../../../services/productApi"
import ListingTable from "../components/Listing/ListingTable"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Search } from "lucide-react"

const STATUS_TABS = [
    { key: "all", label: "Tất cả" },
    { key: 1, label: "Đang hiển thị" },
    { key: 2, label: "Chờ duyệt" },
    { key: 3, label: "Từ chối" },
    { key: 4, label: "Đã xóa" },
]

function ListingPage() {
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [tab, setTab] = useState("all")
    const [search, setSearch] = useState("")

    const fetchListings = async () => {
        try {
            setLoading(true)
            setError(null)

            console.log("🔄 Fetching all listings...")
            const response = await listingApi.getAllListings()
            console.log("📦 Listings Response:", response)

            let listData = []
            if (Array.isArray(response)) {
                listData = response
            } else if (response?.data && Array.isArray(response.data)) {
                listData = response.data
            } else if (response && typeof response === 'object') {
                const firstArray = Object.values(response).find(v => Array.isArray(v))
                if (firstArray) {
                    listData = firstArray
                } else if (response.listingId || response.title) {
                    listData = [response]
                }
            }

            // Enrich listings with product data (price, sellerName)
            const enriched = await Promise.all(
                listData.map(async (listing) => {
                    if (listing.productId) {
                        try {
                            const product = await productApi.getProductDetail(listing.productId)
                            return {
                                ...listing,
                                price: product.price,
                                sellerName: product.sellerName || listing.sellerName,
                                productName: product.productName,
                                categoryName: product.categoryName,
                                brandName: product.brandName,
                            }
                        } catch {
                            return listing
                        }
                    }
                    return listing
                })
            )

            console.log("📦 Enriched listings:", enriched.length)
            setListings(enriched)

        } catch (err) {
            console.error("❌ Fetch listings error:", err)
            if (err.response?.status === 404) {
                setListings([])
            } else {
                setError("Không thể tải danh sách tin đăng.")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchListings()
    }, [])

    // Tab counts
    const counts = useMemo(() => ({
        all: listings.length,
        1: listings.filter(l => Number(l.status) === 1).length,
        2: listings.filter(l => Number(l.status) === 2).length,
        3: listings.filter(l => Number(l.status) === 3).length,
        4: listings.filter(l => Number(l.status) === 4).length,
    }), [listings])

    // Filter by tab + search keyword
    const filteredListings = useMemo(() => {
        return listings.filter(l => {
            const matchTab = tab === "all" || Number(l.status) === tab
            const matchSearch = !search ||
                (l.title || "").toLowerCase().includes(search.toLowerCase()) ||
                (l.sellerName || "").toLowerCase().includes(search.toLowerCase()) ||
                (l.productName || "").toLowerCase().includes(search.toLowerCase()) ||
                (l.listingId || "").toString().includes(search)
            return matchTab && matchSearch
        })
    }, [listings, tab, search])

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý tin đăng</h1>
                <span className="text-sm text-gray-500">
                    Tổng: {listings.length} tin đăng
                </span>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                    placeholder="Tìm theo tiêu đề, người bán..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
                {STATUS_TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`
                            px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${tab === t.key
                                ? "bg-white shadow text-black"
                                : "text-gray-500 hover:text-black"}
                        `}
                    >
                        {t.label} ({counts[t.key] ?? 0})
                    </button>
                ))}
            </div>

            {/* Error */}
            {error && (
                <div className="text-center py-4 text-red-500 bg-red-50 rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            {/* Table */}
            <ListingTable
                listings={filteredListings}
                loading={loading}
            />
        </div>
    )
}

export default ListingPage
