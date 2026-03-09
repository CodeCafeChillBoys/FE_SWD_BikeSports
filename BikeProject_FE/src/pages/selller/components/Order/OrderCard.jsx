
import { useState } from "react"
import { CalendarDays, Package, Eye } from "lucide-react"
import OrderDetailDialog from "./OrderDetailDialog"

function OrderCard({ order }) {
    const [dialogOpen, setDialogOpen] = useState(false)

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'

    const orderStatusMap = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Đã thanh toán",
        4: "Hoàn thành",
        5: "Đã hủy",
        6: "Hoàn tiền"
    }

    const paymentStatusMap = {
        1: "Chưa thanh toán",
        2: "Đã thanh toán"
    }

    const statusColor = {
        "Hoàn thành": "bg-green-100 text-green-700",
        "Đã thanh toán": "bg-blue-100 text-blue-700",
        "Đã xác nhận": "bg-yellow-100 text-yellow-700",
        "Chờ xác nhận": "bg-yellow-100 text-yellow-700",
        "Đã hủy": "bg-red-100 text-red-700",
        "Hoàn tiền": "bg-orange-100 text-orange-700"
    }

    const formatDate = (value) => {
        if (!value) return "Chưa hoàn thành"
        return new Date(value).toLocaleDateString("vi-VN")
    }

    const formatMoney = (value) => {
        if (value == null) return "0 đ"
        return value.toLocaleString("vi-VN") + " đ"
    }

    const statusText = orderStatusMap[order.orderStatus] || "Không xác định"
    const shortOrderId = order.orderId?.slice(0, 8) || order.orderId

    return (
        <div className="border rounded-2xl p-6 bg-white space-y-4">

            {/* ===== HEADER ===== */}
            <div className="flex gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-500" />
                    <span className="font-semibold text-sm">
                        Đơn hàng #{shortOrderId}
                    </span>

                    <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statusColor[statusText] || "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {statusText}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {formatDate(order.createdAt)}
                    </span>
                </div>
            </div>

            {/* ===== ITEM ===== */}
            <div className="flex gap-4 lg:flex-row lg:items-start">
                {/* Product Image */}
                {(() => {
                    const imageUrl = order.featuredImage || order.productImage || order.image
                    const imageSrc = imageUrl
                        ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`)
                        : null

                    if (imageSrc) {
                        return (
                            <img
                                src={imageSrc}
                                alt={order.productName}
                                className="w-24 h-24 object-cover rounded-lg border"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = "https://placehold.co/96x96?text=No+Image"
                                }}
                            />
                        )
                    }
                    return (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400 text-xs">
                            Không có ảnh
                        </div>
                    )
                })()}

                {/* Info */}
                <div className="flex-1">
                    <h3 className="font-bold text-sm">
                        {order.productName}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                        Người mua: {order.fullName}
                    </p>

                    <p className="text-xs text-gray-500">
                        Số lượng: {order.quantity}
                    </p>

                    <p className="text-xs text-gray-500">
                        Đơn giá: {formatMoney(order.unitPrice)}
                    </p>
                </div>

                {/* Payment Info */}
                <div className="min-w-[170px] lg:text-right space-y-1 text-xs">
                    <p className="text-gray-500">Tổng tiền</p>
                    <p className="font-semibold text-blue-600">
                        {formatMoney(order.subtotal)}
                    </p>

                    <p className="text-gray-500">Thanh toán</p>
                    <p className="font-semibold text-green-600">
                        {paymentStatusMap[order.paymentStatus] || "Không xác định"}
                    </p>
                </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                    onClick={() => setDialogOpen(true)}
                    className="flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                >
                    <Eye size={14} />
                    Xem chi tiết
                </button>

                {order.orderStatus === 4 && (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                        ✔ Đã hoàn tất
                    </span>
                )}
            </div>

            {/* Detail Dialog */}
            <OrderDetailDialog
                orderId={order.orderId}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </div>
    )
}

export default OrderCard

