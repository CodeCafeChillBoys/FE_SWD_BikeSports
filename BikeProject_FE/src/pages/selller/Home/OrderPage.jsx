
import OrderCard from "../components/Order/OrderCard"
import bikes from "../../../mock/bikes"
import orders from "../../../mock/orders"

function OrderPage() {
    const ordersWithBike = orders.map(order => ({
        ...order,
        bike: bikes.find(b => b.id === order.bikeId),
    }))


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
                <div className="border rounded-lg px-3 py-1 text-sm bg-white">
                    {ordersWithBike.length} đơn hàng
                </div>
            </div>
            {orders.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                />
            ))}
        </div>
    )
}

export default OrderPage
