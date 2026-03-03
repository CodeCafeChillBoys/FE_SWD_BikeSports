import { Heart, Eye, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function BikeCard({ bike }) {
    const navigate = useNavigate()

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'

    // Map status: 1 = active | 2 = pending | 3 = rejected | 4 = deleted
    const getStatusBadge = () => {
        if (bike.status === 1) {
            return (
                <span className="absolute top-3 left-3 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Hoạt động
                </span>
            )
        }

        if (bike.status === 2) {
            return (
                <span className="absolute top-3 left-3 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    Đang chờ
                </span>
            )
        }

        if (bike.status === 3) {
            return (
                <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    Từ chối
                </span>
            )
        }

        if (bike.status === 4) {
            return (
                <span className="absolute top-3 left-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    Đã xóa
                </span>
            )
        }

        return null
    }

    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

            {/* IMAGE */}
            <div className="relative">
                <img
                    src={`${API_BASE_URL}/${bike.featuredImage}`}
                    alt={bike.productName}
                    className="w-full h-56 object-cover"
                />

                {getStatusBadge()}

                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart size={16} />
                </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">

                {/* Title (ưu tiên title, fallback productName) */}
                <h3 className="font-semibold text-base line-clamp-2">
                    {bike.title || bike.productName}
                </h3>

                {/* Seller */}
                <p className="text-sm text-gray-500">
                    Người bán: {bike.sellerName}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-400">
                    Đăng ngày: {new Date(bike.createdAt).toLocaleDateString()}
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate(`/buyer/bikes/${bike.productId}`)}
                    className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    )
}

export default BikeCard