import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import ListingDetailDialog from "./ListingDetailDialog"

const STATUS_MAP = {
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

export default function ListingTable({ listings, loading }) {
    const [selectedId, setSelectedId] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'

    const handleView = (id) => {
        setSelectedId(id)
        setDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setDialogOpen(open)
        if (!open) setSelectedId(null)
    }

    const formatDate = (value) => {
        if (!value) return "—"
        return new Date(value).toLocaleDateString("vi-VN")
    }

    const formatMoney = (value) => {
        if (value == null) return "—"
        return Number(value).toLocaleString("vi-VN") + " đ"
    }

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
                Đang tải tin đăng...
            </div>
        )
    }

    if (!listings || listings.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 border rounded-xl bg-white">
                <FileText size={40} className="mx-auto mb-2 opacity-40" />
                Không có tin đăng nào.
            </div>
        )
    }

    return (
        <div className="border rounded-xl bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50/80">
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead>Người bán</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {listings.map((listing, index) => {
                        const statusKey = listing.status
                        const statusInfo = STATUS_MAP[statusKey] || STATUS_MAP[String(statusKey).toLowerCase()] || { label: String(statusKey), variant: "secondary" }
                        const image = listing.featuredImage ?? listing.images?.[0]

                        return (
                            <TableRow key={listing.listingId || listing.id || index}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        {image ? (
                                            <img
                                                src={image.startsWith("http") ? image : `${API_BASE_URL}/${image}`}
                                                alt={listing.title}
                                                className="w-14 h-14 rounded-lg object-cover border flex-shrink-0"
                                                onError={(e) => { e.target.src = "https://placehold.co/56x56?text=No" }}
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                <FileText size={18} className="text-gray-300" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-medium text-sm truncate max-w-[250px]">
                                                {listing.title || "Không có tiêu đề"}
                                            </p>
                                            <p className="text-xs text-gray-400 font-mono truncate">
                                                #{(listing.listingId || listing.id || "").toString().slice(0, 8)}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {listing.sellerName || listing.sellerId || "—"}
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                    {formatMoney(listing.price)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusInfo.variant}>
                                        {statusInfo.label}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-500">
                                    {formatDate(listing.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-900"
                                        onClick={() => handleView(listing.listingId || listing.id)}
                                    >
                                        <Eye size={14} />
                                        Xem
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            {/* Detail Dialog */}
            {selectedId && (
                <ListingDetailDialog
                    listingId={selectedId}
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                />
            )}
        </div>
    )
}
