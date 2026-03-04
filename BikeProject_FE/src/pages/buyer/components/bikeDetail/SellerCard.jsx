import { useState } from "react"
import { Phone, Mail, Eye, Calendar } from "lucide-react"
import orderAPI from "../../../../services/orderAPI"
import { toast } from "react-toastify"

function SellerCard({ bike }) {

    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        shippingAddress: "",
        receiverName: "",
        receiverPhone: "",
        note: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()

        try {
            const orderData = {
                buyerId: localStorage.getItem("userId"),
                sellerId: bike.sellerId,
                shippingAddress: formData.shippingAddress,
                receiverName: formData.receiverName,
                receiverPhone: formData.receiverPhone,
                note: formData.note,
                products: [
                    {
                        productId: bike.productId,
                        quantity: 1,
                        note: ""
                    }
                ]
            }

            await orderAPI.createOrder(orderData)

            toast.success("Đặt mua thành công!")
            setShowForm(false)

        } catch (error) {
            console.error(error)
            toast.error("Đặt mua thất bại!")
        }
    }

    return (
        <>
            {/* ================= CARD GỐC ================= */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">

                {/* Tên sản phẩm */}
                <div>
                    <h2 className="text-lg font-semibold leading-snug">
                        {bike.productName}
                    </h2>

                    <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                            {bike.categoryName}
                        </span>
                        <span className="px-3 py-1 text-xs bg-gray-200 rounded-full">
                            Mới
                        </span>
                    </div>
                </div>

                {/* Giá */}
                <div>
                    <p className="text-sm text-gray-500">Giá</p>
                    <p className="text-blue-600 text-xl font-bold">
                        {bike.price?.toLocaleString()} đ
                    </p>
                </div>

                <hr />

                {/* Người bán */}
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">Người bán</p>

                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium">{bike.sellerName}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                ⭐ 4.8/5
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>{bike.phone || "0912345678"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>{bike.email || "seller@example.com"}</span>
                        </div>
                    </div>
                </div>

                <hr />

                {/* View + Date */}
                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{bike.viewCount || 156} lượt xem</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                            Đăng ngày: {bike.createdAt || "30/1/2026"}
                        </span>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
                >
                    Đặt mua
                </button>
            </div>

            {/* ================= POPUP ĐẶT HÀNG ================= */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white w-[450px] rounded-2xl p-6 shadow-xl animate-fadeIn">

                        <h3 className="text-lg font-semibold mb-4">
                            Thông tin giao hàng
                        </h3>

                        <form onSubmit={handleSubmitOrder} className="space-y-4">

                            <input
                                type="text"
                                name="receiverName"
                                placeholder="Tên người nhận"
                                className="w-full border px-3 py-2 rounded-lg"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="receiverPhone"
                                placeholder="Số điện thoại"
                                className="w-full border px-3 py-2 rounded-lg"
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="shippingAddress"
                                placeholder="Địa chỉ giao hàng"
                                className="w-full border px-3 py-2 rounded-lg"
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="note"
                                placeholder="Ghi chú"
                                className="w-full border px-3 py-2 rounded-lg"
                                onChange={handleChange}
                            />

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="w-full border py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
                                >
                                    Xác nhận
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default SellerCard