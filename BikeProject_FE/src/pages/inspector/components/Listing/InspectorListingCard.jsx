import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InspectorListingCard({
    item,
    creatingId,
    onCreateReport,
    API_BASE_URL
}) {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:shadow-md hover:border-gray-200 transition-all duration-200">

            {/* LEFT */}
            <div className="flex items-center gap-4">
                <img
                    src={`${API_BASE_URL}/${item.featuredImage}`}
                    alt={item.productName}
                    className="w-28 h-24 object-cover rounded-xl"
                />

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {item.productName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {item.brand} - {item.type} - {item.size}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Người bán: {item.sellerName}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {item.condition || "Đã qua sử dụng"}
                        </span>

                        {typeof item.price === "number" && (
                            <span className="ml-2 text-sm font-semibold text-blue-600">
                                {item.price.toLocaleString()} đ
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3 min-w-[190px]">
                {item.createdAt && (
                    <span className="text-xs text-gray-500">
                        Đăng ngày: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onCreateReport?.(item)}
                        disabled={creatingId === item.productId}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {creatingId === item.productId
                            ? "Đang tạo kiểm định..."
                            : "Tạo kiểm định"}
                    </button>

                    <button
                        onClick={() =>
                            navigate(`/inspector/bikes/${item.productId}`)
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 shadow-sm transition"
                    >
                        <Eye size={16} />
                        Xem báo cáo
                    </button>
                </div>
            </div>
        </div>
    )
}