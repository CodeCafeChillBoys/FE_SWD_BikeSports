
import { useEffect, useState } from "react"
import OrderCard from "../components/Order/OrderCard"
import orderAPI from "../../../services/orderAPI"

function OrderPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)

                const userId = localStorage.getItem("userId")
                console.log("👤 Seller UserId from localStorage:", userId)

                if (!userId || userId === "" || userId === "null") {
                    console.warn("⚠️ No valid userId found in localStorage")
                    setError("Vui lòng đăng nhập để xem đơn hàng")
                    setOrders([])
                    setLoading(false)
                    return
                }

                console.log("🔄 Fetching orders for seller:", userId)
                const response = await orderAPI.getOrderBySeller(userId)
                console.log("📦 Seller Orders Response:", response)

                // Xử lý các trường hợp response khác nhau
                let orderData = []

                if (Array.isArray(response)) {
                    orderData = response
                } else if (response?.data) {
                    orderData = Array.isArray(response.data) ? response.data : [response.data]
                } else if (response && typeof response === 'object') {
                    orderData = [response]
                }

                console.log("📦 Parsed Seller Orders:", orderData)
                console.log("📦 Orders count:", orderData.length)

                // Deduplicate by orderId
                const uniqueOrders = [...new Map(orderData.map(o => [o.orderId, o])).values()]
                console.log("📦 Unique orders:", uniqueOrders.length)

                setOrders(uniqueOrders)

            } catch (err) {
                console.error("❌ Fetch Seller Orders Error:", err)
                // Backend trả 404 khi user chưa có đơn hàng → hiển thị empty state
                if (err.response?.status === 404) {
                    console.log("📭 No orders found for this user (404)")
                    setOrders([])
                } else {
                    setError("Không thể tải đơn hàng.")
                    setOrders([])
                }
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    // ========================
    // UI STATES
    // ========================

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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
                <div className="border rounded-lg px-3 py-1 text-sm bg-white">
                    {orders.length} đơn hàng
                </div>
            </div>

            {/* EMPTY STATE */}
            {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
                    Chưa có đơn hàng nào.
                </div>
            )}

            {/* LIST */}
            {orders.map((order, index) => (
                <OrderCard
                    key={order.orderId || index}
                    order={order}
                />
            ))}
        </div>
    )
}

export default OrderPage
