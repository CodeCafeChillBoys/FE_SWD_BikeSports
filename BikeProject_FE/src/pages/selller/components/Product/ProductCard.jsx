import { useNavigate } from "react-router-dom"

export default function ProductCard({ product, onEdit, onViewDetail }) {
    const navigate = useNavigate()
    const getConditionText = (condition) => {
        const map = {
            0: "Mới 100%",
            1: "Như mới",
            2: "Tốt",
            3: "Trung bình",
        }
        return map[condition] || "N/A"
    }

    const getStatusBadge = (status) => {
        // New mapping:
        // 1 = available | 2 = sold | 3 = reserved | 4 = hidden | 5 = pending_approval | 6 = rejected
        const statusMap = {
            1: { text: "Có sẵn", color: "bg-green-100 text-green-800" },
            2: { text: "Đã bán", color: "bg-blue-100 text-blue-800" },
            3: { text: "Đã đặt", color: "bg-yellow-100 text-yellow-800" },
            4: { text: "Đã ẩn", color: "bg-gray-100 text-gray-800" },
            5: { text: "Chờ duyệt", color: "bg-orange-100 text-orange-800" },
            6: { text: "Từ chối", color: "bg-red-100 text-red-800" },
        }
        const badge = statusMap[status] || statusMap[0]
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.color}`}>
                {badge.text}
            </span>
        )
    }

    const getInspectionBadge = (inspectionStatus) => {
        // New mapping: 1 = Not Inspected | 2 = Inspected
        const map = {
            1: { text: "Chưa kiểm định", color: "bg-gray-100 text-gray-800" },
            2: { text: "Đã kiểm định", color: "bg-green-100 text-green-800" },
        }
        const badge = map[inspectionStatus] || { text: "Chưa kiểm định", color: "bg-gray-100 text-gray-800" }
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.color}`}>
                {badge.text}
            </span>
        )
    }

    return (
        <div className="bg-white rounded-xl border hover:shadow-lg transition p-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg line-clamp-2">
                    {product.productName}
                </h3>
                <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex-shrink-0 ml-2"
                >
                    ✏️ Sửa
                </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
                {getStatusBadge(product.status)}
                {getInspectionBadge(product.inspectionStatus)}
            </div>

            {/* Info Grid */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                    <span>Giá:</span>
                    <span className="font-semibold text-black">
                        {product.price?.toLocaleString()} VNĐ
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Tình trạng:</span>
                    <span className="font-medium">{getConditionText(product.condition)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Số lượng:</span>
                    <span className="font-medium">{product.stockQuantity || 0}</span>
                </div>
                {product.frameSize && (
                    <div className="flex justify-between">
                        <span>Khung:</span>
                        <span className="font-medium">{product.frameSize}</span>
                    </div>
                )}
                {product.color && (
                    <div className="flex justify-between">
                        <span>Màu:</span>
                        <span className="font-medium">{product.color}</span>
                    </div>
                )}
                {product.locationCity && (
                    <div className="flex justify-between">
                        <span>Địa điểm:</span>
                        <span className="font-medium">{product.locationCity}</span>
                    </div>
                )}
            </div>

            {/* Description Preview */}
            {product.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.description}
                </p>
            )}

            {/* Action Button */}
            <div className="flex gap-2">
                <button
                    onClick={() => onViewDetail(product.productId)}
                    className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                >
                    Xem chi tiết
                </button>

                <button
                    onClick={() => {
                        const id = product.productId ?? product.id
                        navigate('/seller/listings/new', { state: { productId: id, productName: product.productName ?? product.name } })
                    }}
                    className="py-2 px-3 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
                >
                    Đăng tin
                </button>
            </div>
        </div>
    )
}
