import bikes from "../../../../mock/bikes"

function OrderCard({ order, onConfirm }) {
    const bike = bikes.find((b) => b.id === order.bikeId)

    const statusStyle = {
        "Đang chờ": "bg-yellow-100 text-yellow-700",
        "Hoàn thành": "bg-green-100 text-green-700",
        "Đã huỷ": "bg-red-100 text-red-700",
    }

    return (
        <div className="border rounded-xl p-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                <span
                    className={`text-sm px-2 py-0.5 rounded-full ${statusStyle[order.status] || "bg-gray-100 text-gray-600"
                        }`}
                >
                    {order.status}
                </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                📅 {order.orderDate}
            </p>

            {/* Bike + Payment */}
            <div className="flex gap-4">
                {/* Image */}
                <img
                    src={bike?.images?.[0]}
                    alt={order.title}
                    className="w-24 h-24 rounded-lg object-cover border"
                />

                {/* Info */}
                <div className="flex-1">
                    <p className="font-medium">{order.title}</p>

                    {bike && (
                        <p className="text-sm text-gray-500 mt-0.5">
                            {bike.brand} • {bike.type} • Size {bike.frameSize}
                        </p>
                    )}

                    <div className="mt-2 text-sm space-y-1">
                        <p>
                            Tổng tiền:{" "}
                            <span className="font-semibold text-blue-600">
                                {order.payment.total.toLocaleString()} đ
                            </span>
                        </p>
                        <p>Đặt cọc: {order.payment.deposit.toLocaleString()} đ</p>
                        <p>Thanh toán: {order.payment.method}</p>
                        <p>Trạng thái TT: {order.payment.status}</p>
                    </div>

                    {order.status === "Hoàn thành" && order.completedDate && (
                        <p className="text-sm text-gray-500 mt-2">
                            ✅ Hoàn thành ngày: {order.completedDate}
                        </p>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-5">
                {order.status !== "Đã huỷ" && (
                    <button className="border px-3 py-1.5 rounded-lg text-sm">
                        Nhắn tin
                    </button>
                )}

                {order.status === "Đang chờ" && (
                    <button
                        onClick={() => onConfirm(order.id)}
                        className="bg-black text-white px-4 py-1.5 rounded-lg text-sm"
                    >
                        Xác nhận đơn hàng
                    </button>
                )}

                {order.status === "Hoàn thành" && (
                    <span className="text-green-600 text-sm font-medium">
                        ✔ Đã hoàn tất
                    </span>
                )}
            </div>
        </div>
    )
}

export default OrderCard
