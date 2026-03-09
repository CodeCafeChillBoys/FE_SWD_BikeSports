import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function InspectorListingCard({
    item,
    creatingId,
    onCreateReport,
    API_BASE_URL
}) {
    const navigate = useNavigate()

    // 🎯 Xử lý hình ảnh với fallback
    const imageUrl = item.featuredImage || item.productImage || item.image
    const imageSrc = imageUrl
        ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`)
        : null

    return (
        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:shadow-md hover:border-gray-200 transition-all duration-200">

            {/* LEFT */}
            <div className="flex items-center gap-4">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={item.productName}
                        className="w-28 h-24 object-cover rounded-xl"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://placehold.co/112x96?text=No+Image"
                        }}
                    />
                ) : (
                    <div className="w-28 h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        Không có ảnh
                    </div>
                )}

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
                    {!item.inspection && !item.inspectionDate && (
                        <button
                            onClick={() => onCreateReport(item)}
                            disabled={
                                creatingId === item.productId ||
                                item.hasReport
                            }
                            className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200
        ${item.hasReport
                                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                                    : creatingId === item.productId
                                        ? "bg-blue-400 cursor-wait"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }
    `}
                        >
                            {item.hasReport
                                ? "Đã tạo kiểm định"
                                : creatingId === item.productId
                                    ? "Đang tạo..."
                                    : "Tạo kiểm định"}
                        </button>
                    )}

                    {(item.inspection || item.inspectionDate) && (
                        <button
                            onClick={() =>
                                navigate(`/inspector/bikes/${item.productId}`)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-black text-white hover:bg-gray-800 shadow-sm transition"
                        >
                            <Eye size={16} />
                            Xem báo cáo
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}