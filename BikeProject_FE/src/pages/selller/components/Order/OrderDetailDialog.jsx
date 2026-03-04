import { useState, useEffect } from "react"
import { Eye, Loader2, CalendarDays, Package, MapPin, Phone, User, CreditCard, FileText } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../../components/ui/dialog"
import { Badge } from "../../../../components/ui/badge"
import orderAPI from "../../../../services/orderAPI"

const ORDER_STATUS = {
    1: { label: "Chờ xác nhận", variant: "warning" },
    2: { label: "Đã xác nhận", variant: "info" },
    3: { label: "Đã thanh toán", variant: "info" },
    4: { label: "Hoàn thành", variant: "success" },
    5: { label: "Đã hủy", variant: "destructive" },
    6: { label: "Hoàn tiền", variant: "secondary" },
}

const PAYMENT_STATUS = {
    1: { label: "Chưa thanh toán", variant: "warning" },
    2: { label: "Đã thanh toán", variant: "success" },
}

const DELIVERY_METHOD = {
    1: "Tự đến lấy",
    2: "Giao hàng",
}

export default function OrderDetailDialog({ orderId, open, onOpenChange }) {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!open || !orderId) return

        const fetchDetail = async () => {
            try {
                setLoading(true)
                setError(null)
                console.log("🔄 Fetching order detail:", orderId)
                const response = await orderAPI.getOrderById(orderId)
                console.log("📦 Order Detail:", response)
                setOrder(response)
            } catch (err) {
                console.error("❌ Fetch order detail error:", err)
                setError("Không thể tải thông tin đơn hàng.")
            } finally {
                setLoading(false)
            }
        }

        fetchDetail()
    }, [open, orderId])

    const formatDate = (value) => {
        if (!value) return "—"
        return new Date(value).toLocaleDateString("vi-VN", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        })
    }

    const formatMoney = (value) => {
        if (value == null) return "—"
        return Number(value).toLocaleString("vi-VN") + " đ"
    }

    const orderStatus = ORDER_STATUS[order?.orderStatus] || { label: "Không xác định", variant: "secondary" }
    const paymentStatus = PAYMENT_STATUS[order?.paymentStatus] || { label: "Không xác định", variant: "secondary" }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package size={18} />
                        Chi tiết đơn hàng
                    </DialogTitle>
                    <DialogDescription>
                        #{(orderId || "").toString().slice(0, 8)}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-12 text-gray-400">
                        <Loader2 size={24} className="animate-spin mr-2" />
                        Đang tải...
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : order ? (
                    <div className="space-y-5">
                        {/* Status badges */}
                        <div className="flex items-center gap-2">
                            <Badge variant={orderStatus.variant}>{orderStatus.label}</Badge>
                            <Badge variant={paymentStatus.variant}>{paymentStatus.label}</Badge>
                        </div>

                        {/* Order Info */}
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                            <InfoItem icon={<CreditCard size={14} />} label="Tổng tiền" value={formatMoney(order.totalAmount)} highlight />
                            <InfoItem label="Phương thức giao" value={DELIVERY_METHOD[order.deliveryMethod] || "—"} />
                            <InfoItem icon={<CalendarDays size={14} />} label="Ngày tạo" value={formatDate(order.createdAt)} />
                            <InfoItem icon={<CalendarDays size={14} />} label="Ngày cập nhật" value={formatDate(order.updatedAt)} />
                        </div>

                        {/* Receiver Info */}
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                            <User size={14} /> Thông tin nhận hàng
                        </h4>
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                            <InfoItem icon={<User size={14} />} label="Người nhận" value={order.receiverName || "—"} />
                            <InfoItem icon={<Phone size={14} />} label="SĐT" value={order.receiverPhone || "—"} />
                            <InfoItem icon={<MapPin size={14} />} label="Địa chỉ" value={order.shippingAddress || "—"} className="col-span-2" />
                        </div>

                        {/* Note */}
                        {order.note && (
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FileText size={14} /> Ghi chú</p>
                                <p className="text-sm">{order.note}</p>
                            </div>
                        )}

                        {/* Timestamps */}
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-1">
                            {order.confirmedAt && <span>Xác nhận: {formatDate(order.confirmedAt)}</span>}
                            {order.completedAt && <span>Hoàn thành: {formatDate(order.completedAt)}</span>}
                            {order.cancelledAt && <span>Hủy: {formatDate(order.cancelledAt)}</span>}
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    )
}

function InfoItem({ icon, label, value, highlight, className }) {
    return (
        <div className={`space-y-0.5 ${className || ""}`}>
            <p className="text-xs text-gray-400 flex items-center gap-1">
                {icon} {label}
            </p>
            <div className={`text-sm ${highlight ? "font-semibold text-blue-600" : "font-medium"}`}>
                {value}
            </div>
        </div>
    )
}
