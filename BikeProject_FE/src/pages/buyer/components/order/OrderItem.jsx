import { CalendarDays, CreditCard, Eye, Package, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OrderItem({ order }) {
    const navigate = useNavigate()

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'


    // Map trạng thái số sang text
    // order_status: 1 = pending | 2 = confirmed | 3 = paid | 4 = completed | 5 = cancelled | 6 = refunded
    const orderStatusMap = {
        1: "Chờ xác nhận",
        2: "Đã xác nhận",
        3: "Đã thanh toán",
        4: "Hoàn thành",
        5: "Đã hủy",
        6: "Hoàn tiền"
    }

    // payment_status: 1 = unpaid | 2 = paid
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
        return value?.toLocaleString("vi-VN") + " đ"
    }

    const statusText = orderStatusMap[order.orderStatus] || "Không xác định"

    // Rút gọn orderId để hiển thị
    const shortOrderId = order.orderId?.slice(0, 8) || order.orderId

    return (
        <div className="border rounded-2xl p-8 bg-white space-y-4">

            {/* ===== HEADER ===== */}
            <div className="flex gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-500" />
                    <span className="font-semibold text-sm">
                        Đơn hàng #{shortOrderId}
                    </span>

                    <span
                        className={`text-xs px-2 py-0.5 rounded ${statusColor[statusText] || "bg-gray-100 text-gray-600"
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
                {order.featuredImage && (
                    <img
                        src={`${API_BASE_URL}/${order.featuredImage}`}
                        alt={order.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                )}

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

                <div className="min-w-[170px] lg:text-right space-y-1 text-xs">
                    <p className="text-gray-500">Tổng tiền</p>
                    <p className="font-semibold text-blue-600">
                        {formatMoney(order.subtotal)}
                    </p>

                    <p className="text-gray-500">Thanh toán</p>
                    <p className="font-semibold text-green-600">
                        {paymentStatusMap[order.paymentStatus]}
                    </p>
                </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex gap-3 pt-3 border-t">
                {order.paymentStatus === 1 && order.orderStatus !== 5 && order.orderStatus !== 6 && (
                    <button
                        onClick={() => navigate(`/buyer/payment/${order.orderId}`)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                        <CreditCard size={16} /> Thanh toán
                    </button>
                )}

                <button
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                    className="flex items-center gap-1 border px-3 py-1 rounded text-sm hover:bg-gray-50"
                >
                    <Star size={16} /> Đánh giá
                </button>

                <button
                    onClick={() => navigate(`/buyer/bikes/${order.productId}`)}
                    className="flex items-center gap-1 border px-3 py-1 rounded text-sm hover:bg-gray-50"
                >
                    <Eye size={16} /> Xem sản phẩm
                </button>
            </div>
        </div>
    )
}