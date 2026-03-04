import { useEffect, useState } from "react"
import OrderItem from "../components/order/OrderItem"
import orderAPI from "../../../services/orderAPI"

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)

                const userId = localStorage.getItem("userId")

                if (!userId || userId === "" || userId === "null") {
                    setError("Vui lòng đăng nhập để xem đơn hàng")
                    setOrders([])
                    setLoading(false)
                    return
                }

                const response = await orderAPI.getOrderByUserId(userId)

                let orderData = []

                if (Array.isArray(response)) {
                    orderData = response
                } else if (response?.data) {
                    orderData = Array.isArray(response.data) ? response.data : [response.data]
                } else if (response && typeof response === "object") {
                    orderData = [response]
                }

                setOrders(orderData)
            } catch (err) {
                setError("Không thể tải đơn hàng.")
                setOrders([])
                console.log(err);

            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) {
        return (
            <div className="mt-10 text-center text-gray-500">
                Đang tải đơn hàng...
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-10 text-center text-red-500">
                {error}
            </div>
        )
    }

    return (
        <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Đơn mua của tôi</h2>
                <span className="px-3 py-1 rounded-md border text-sm bg-white">
                    {orders.length} đơn hàng
                </span>
            </div>

            {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
                    Bạn chưa có đơn hàng nào.
                </div>
            )}

            {orders.map((order) => (
                <OrderItem key={order.orderId} order={order} />
            ))}
        </div>
    )
}