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

                // Debug all localStorage
                console.log("🔍 All localStorage keys:", Object.keys(localStorage))
                console.log("🔍 accessToken:", localStorage.getItem("access_token"))
                console.log("🔍 email:", localStorage.getItem("email"))
                console.log("🔍 role:", localStorage.getItem("role"))

                const userId = localStorage.getItem("userId")
                console.log("👤 UserId from localStorage:", userId)
                console.log("👤 UserId type:", typeof userId)

                if (!userId || userId === "" || userId === "null") {
                    console.warn("⚠️ No valid userId found in localStorage")
                    setError("Vui lòng đăng nhập để xem đơn hàng")
                    setOrders([])
                    setLoading(false)
                    return
                }

                console.log("🔄 Fetching orders for userId:", userId)
                const response = await orderAPI.getOrderByUserId(userId)
                console.log("📦 Orders Response:", response)
                console.log("📦 Response type:", typeof response)
                console.log("📦 Is Array?", Array.isArray(response))
                console.log("⚠️ BACKEND ISSUE: Backend chỉ trả về 1 object thay vì array!")

                // Xử lý các trường hợp response khác nhau
                let orderData = []

                if (Array.isArray(response)) {
                    // Backend trả array
                    orderData = response
                } else if (response?.data) {
                    // Backend trả {data: [...]}
                    orderData = Array.isArray(response.data) ? response.data : [response.data]
                } else if (response && typeof response === 'object') {
                    // Backend trả 1 object đơn lẻ → wrap thành array
                    orderData = [response]
                }

                console.log("📦 Parsed Orders:", orderData)
                console.log("📦 Orders count:", orderData.length)

                if (orderData.length > 0) {
                    console.log("📦 First order sample:", orderData[0])
                }

                setOrders(orderData)

            } catch (err) {
                console.error("❌ Fetch Orders Error:", err)
                console.error("❌ Error response:", err.response)
                setError("Không thể tải đơn hàng.")
                setOrders([])
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
        <div className="space-y-6 mt-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                    Đơn mua của tôi
                </h2>

                <span className="px-3 py-1 rounded-md border text-sm bg-white">
                    {orders.length} đơn hàng
                </span>
            </div>

            {/* EMPTY STATE */}
            {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500 border rounded-xl bg-white">
                    Bạn chưa có đơn hàng nào.
                </div>
            )}

            {/* LIST */}
            {orders.map(order => (
                <OrderItem
                    key={order.orderId}
                    order={order}
                />
            ))}

        </div>
    )
}