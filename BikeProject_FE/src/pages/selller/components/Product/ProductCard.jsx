export default function ProductCard({ product, onEdit, onViewDetail }) {
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
        const statusMap = {
            0: { text: "Đang chờ", color: "bg-yellow-100 text-yellow-800" },
            1: { text: "Hoạt động", color: "bg-green-100 text-green-800" },
            2: { text: "Ẩn", color: "bg-gray-100 text-gray-800" },
            3: { text: "Đã bán", color: "bg-blue-100 text-blue-800" },
        }
        const badge = statusMap[status] || statusMap[0]
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${badge.color}`}>
                {badge.text}
            </span>
        )
    }

    const getInspectionBadge = (inspectionStatus) => {
        const map = {
            0: { text: "Chưa kiểm tra", color: "bg-gray-100 text-gray-800" },
            1: { text: "Đang kiểm tra", color: "bg-blue-100 text-blue-800" },
            2: { text: "Đã duyệt", color: "bg-green-100 text-green-800" },
            3: { text: "Từ chối", color: "bg-red-100 text-red-800" },
        }
        const badge = map[inspectionStatus] || map[0]
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
            <button
                onClick={() => onViewDetail(product.productId)}
                className="w-full py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
                Xem chi tiết
            </button>
        </div>
    )
}
