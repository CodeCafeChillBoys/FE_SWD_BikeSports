import { useEffect, useState } from "react"
import { Loader2, CalendarDays, User, Tag, FileText, MapPin, Gauge, Palette, Settings, Shield } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../../components/ui/dialog"
import { Badge } from "../../../../components/ui/badge"
import listingApi from "../../../../services/listingAPI"
import productApi from "../../../../services/productApi"
import { getToken } from "../../../../utils/auth"

// ===== STATUS MAPS =====
// Normalized to buyer mapping: 1=Đang hiển thị, 2=Chờ duyệt, 3=Từ chối, 4=Đã xóa
const LISTING_STATUS = {
    1: { label: "Đang hiển thị", variant: "success" },
    2: { label: "Chờ duyệt", variant: "warning" },
    3: { label: "Từ chối", variant: "destructive" },
    4: { label: "Đã xóa", variant: "secondary" },
    // Fallback string keys
    pending: { label: "Chờ duyệt", variant: "warning" },
    active: { label: "Đang hiển thị", variant: "success" },
    rejected: { label: "Từ chối", variant: "destructive" },
    deleted: { label: "Đã xóa", variant: "secondary" },
}

const CONDITION_MAP = { 1: "Mới", 2: "Đã sử dụng", 3: "Tân trang" }
const FRAME_MATERIAL_MAP = { 1: "Carbon", 2: "Nhôm", 3: "Thép", 4: "Titanium", 5: "Hợp kim" }
const PRODUCT_STATUS_MAP = {
    1: { label: "Có sẵn", variant: "success" },
    2: { label: "Đã bán", variant: "secondary" },
    3: { label: "Đã đặt", variant: "warning" },
    4: { label: "Đã ẩn", variant: "secondary" },
    5: { label: "Chờ duyệt", variant: "warning" },
    6: { label: "Từ chối", variant: "destructive" },
}


export default function ListingDetailDialog({ listingId, open, onOpenChange, onRefresh }) {
    const [listing, setListing] = useState(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [approving, setApproving] = useState(false)
    const decodeUserNameFromToken = () => {
        const raw = getToken() || localStorage.getItem('access_token') || localStorage.getItem('accessToken')
        if (!raw) return ""
        const token = raw.split(' ')[1] ?? raw
        try {
            const payload = JSON.parse(window.atob(token.split('.')[1] || ''))
            return payload.userName || payload.fullName || payload.name || payload.sub || ""
        } catch {
            return ""
        }
    }

    const [approvedBy, setApprovedBy] = useState(decodeUserNameFromToken())

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!open || !listingId) return

        let mounted = true

        const fetchDetail = async () => {
            try {
                if (!mounted) return
                setLoading(true)
                setError(null)

                // 1. Fetch listing
                const listingRes = await listingApi.getListingById(listingId)
                console.log("📦 Listing Detail:", listingRes)
                if (!mounted) return
                setListing(listingRes)
                setSelectedStatus(listingRes?.status ?? null)

                // 2. Fetch product detail using productId from listing
                if (listingRes?.productId) {
                    try {
                        const productRes = await productApi.getProductDetail(listingRes.productId)
                        console.log("� Product Detail:", productRes)
                        if (mounted) setProduct(productRes)
                    } catch (e) {
                        console.warn("Could not fetch product detail", e)
                    }
                }
            } catch (err) {
                console.error("❌ Fetch listing detail error:", err)
                if (mounted) setError("Không thể tải thông tin tin đăng.")
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchDetail()

        return () => { mounted = false }
    }, [open, listingId])

    const formatDate = (value) => {
        if (!value) return "—"
        return new Date(value).toLocaleDateString("vi-VN")
    }

    const formatMoney = (value) => {
        if (value == null) return "—"
        return Number(value).toLocaleString("vi-VN") + " đ"
    }

    const listingStatus = LISTING_STATUS[Number(listing?.status)] || LISTING_STATUS[String(listing?.status).toLowerCase()] || { label: String(listing?.status), variant: "secondary" }

    const handleApprove = async () => {
        if (!listingId) return
        try {
            setApproving(true)
            setError(null)
            const payload = {
                approvedBy: approvedBy || "",
                status: Number(selectedStatus) || 1,
            }
            await listingApi.approveListing(listingId, payload)
            // update local state
            setListing(prev => ({ ...(prev || {}), status: Number(payload.status) }))
            // Reload trang để cập nhật dữ liệu mới
            if (onRefresh) {
                onRefresh()
            }
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } catch (err) {
            console.error("Approve listing error:", err)
            setError("Không thể cập nhật trạng thái.")
        } finally {
            setApproving(false)
        }
    }
    const image = product?.featuredImage || listing?.featuredImage

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <FileText size={18} />
                        Chi tiết tin đăng
                    </DialogTitle>
                    <DialogDescription>
                        #{(listingId || "").toString().slice(0, 8)}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-12 text-gray-400">
                        <Loader2 size={24} className="animate-spin mr-2" />
                        Đang tải...
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : listing ? (
                    <div className="space-y-5">
                        {/* Image */}
                        {image && (
                            <img
                                src={image.startsWith("http") ? image : `${API_BASE_URL}/${image}`}
                                alt={listing.title}
                                className="w-full h-52 object-cover rounded-xl border"
                                onError={(e) => { e.target.src = "https://placehold.co/600x200?text=No+Image" }}
                            />
                        )}

                        {/* Title + Listing Status */}
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold">{listing.title || product?.productName || "Không có tiêu đề"}</h3>
                            <div className="flex items-center gap-3">
                                <Badge variant={listingStatus.variant}>{listingStatus.label}</Badge>
                                {/* Admin controls: status select + approve button */}
                                <div className="flex items-center gap-2">
                                    <select
                                        value={selectedStatus ?? ""}
                                        onChange={(e) => setSelectedStatus(Number(e.target.value))}
                                        className="text-sm border rounded px-2 py-1"
                                    >
                                        <option value="">-- Chọn trạng thái --</option>
                                        <option value={1}>Đang hiển thị</option>
                                        <option value={2}>Chờ duyệt</option>
                                        <option value={3}>Từ chối</option>
                                        <option value={4}>Đã xóa</option>
                                    </select>
                                    <input
                                        placeholder="Người duyệt"
                                        value={approvedBy}
                                        onChange={(e) => setApprovedBy(e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                    />
                                    <button
                                        onClick={handleApprove}
                                        disabled={approving || selectedStatus == null}
                                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                                    >
                                        {approving ? "Đang cập nhật..." : "Cập nhật"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {(product?.description || listing?.description) && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {product?.description || listing?.description}
                            </p>
                        )}

                        {/* ===== PRODUCT INFO ===== */}
                        {product && (
                            <>
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                                    <InfoItem icon={<Tag size={14} />} label="Giá" value={formatMoney(product.price)} highlight />
                                    <InfoItem icon={<User size={14} />} label="Người bán" value={product.sellerName || "—"} />
                                    <InfoItem label="Danh mục" value={product.categoryName || "—"} />
                                    <InfoItem label="Thương hiệu" value={product.brandName || "—"} />
                                </div>

                                {/* Specs */}
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                                    <Settings size={14} /> Thông số kỹ thuật
                                </h4>
                                <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4 text-sm">
                                    <InfoItem label="Tình trạng" value={CONDITION_MAP[product.condition] || "—"} />
                                    <InfoItem label="Khung" value={`${FRAME_MATERIAL_MAP[product.frameMaterial] || "—"} • Size ${product.frameSize || "—"}`} />
                                    <InfoItem label="Bánh xe" value={product.wheelSize || "—"} />
                                    <InfoItem label="Phanh" value={product.brakeType || "—"} />
                                    <InfoItem label="Hệ thống số" value={product.gearSystem || "—"} />
                                    <InfoItem label="Trọng lượng" value={product.weight ? `${product.weight} kg` : "—"} />
                                    <InfoItem icon={<Palette size={14} />} label="Màu sắc" value={product.color || "—"} />
                                    <InfoItem label="Năm SX" value={product.yearOfManufacture || "—"} />
                                </div>

                                {/* Additional */}
                                <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-xl p-4 text-sm">
                                    <InfoItem icon={<MapPin size={14} />} label="Khu vực" value={product.locationCity || "—"} />
                                    <InfoItem label="Lịch sử sử dụng" value={product.usageHistory ? `${product.usageHistory} km` : "—"} />
                                    <InfoItem label="Tồn kho" value={product.stockQuantity ?? "—"} />
                                    <InfoItem icon={<Gauge size={14} />} label="Lượt xem" value={product.viewCount ?? 0} />
                                    <InfoItem label="Trạng thái SP"
                                        value={
                                            <Badge variant={PRODUCT_STATUS_MAP[product.status]?.variant || "secondary"}>
                                                {PRODUCT_STATUS_MAP[product.status]?.label || "—"}
                                            </Badge>
                                        }
                                    />
                                    {/* Kiểm định: removed per request */}
                                </div>
                            </>
                        )}

                        {/* Listing dates (fallback if no product) */}
                        {!product && (
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                                <InfoItem icon={<Tag size={14} />} label="Giá" value={formatMoney(listing.price)} />
                                <InfoItem icon={<User size={14} />} label="Người bán" value={listing.sellerName || "—"} />
                            </div>
                        )}

                        {/* Dates */}
                        <div className="flex gap-6 text-xs text-gray-400 pt-1">
                            <span>Ngày đăng: {formatDate(listing.createdAt)}</span>
                            <span>Cập nhật: {formatDate(listing.updatedAt)}</span>
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}

function InfoItem({ icon, label, value, highlight }) {
    return (
        <div className="space-y-0.5">
            <p className="text-xs text-gray-400 flex items-center gap-1">
                {icon} {label}
            </p>
            <div className={`text-sm ${highlight ? "font-semibold text-blue-600" : "font-medium"}`}>
                {value}
            </div>
        </div>
    )
}
