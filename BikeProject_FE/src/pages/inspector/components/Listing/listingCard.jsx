import { Eye, RotateCcw } from "lucide-react";

export default function ListingCard({ item, onViewDetails, onUpdateStatus, updatingId }) {

    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "https://localhost:7247";

    // 🎯 Lấy hình ảnh từ inspection report hoặc product
    const imageUrl = item.imagesUrl || item.featuredImage || item.productImage
    const imageSrc = imageUrl
        ? (imageUrl.startsWith('http') ? imageUrl : `${API_BASE_URL}/${imageUrl}`)
        : null

    return (
        <div className="
            flex items-center justify-between
            bg-white
            border border-gray-100
            rounded-2xl
            p-4
            hover:shadow-md
            hover:border-gray-200
            transition-all duration-200
        ">

            {/* LEFT */}
            <div className="flex items-center gap-4">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={item.productName || "inspection"}
                        className="w-20 h-20 object-cover rounded-xl"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://placehold.co/80x80?text=No+Image"
                        }}
                    />
                ) : (
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                    </div>
                )}

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {item.productName ?? 'Sản phẩm'}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Ngày kiểm định: {new Date(item.inspectionDate).toLocaleDateString()}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <span
                            className={`
                                text-xs font-medium px-3 py-1 rounded-full
                                ${item.status === 2
                                    ? "bg-green-50 text-green-600"
                                    : item.status === 3
                                        ? "bg-red-50 text-red-600"
                                        : "bg-yellow-50 text-yellow-600"}
                            `}
                        >
                            {item.status === 2
                                ? "Đã kiểm định"
                                : item.status === 3
                                    ? "Đã từ chối"
                                    : "Chưa kiểm định"}
                        </span>

                        <span className="text-sm text-gray-500">
                            Rating: {item.overallRating ?? "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3">
                <span className="text-sm text-gray-500">
                    {new Date(item.inspectionDate).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onUpdateStatus?.(item)}
                        disabled={updatingId === item.reportId}
                        className="
                            p-2
                            border border-gray-200
                            rounded-lg
                            hover:bg-gray-50
                            hover:border-gray-300
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            transition
                            flex items-center justify-center
                        "
                        title={item.status === 2 ? "Chuyển về chưa kiểm định" : "Đánh dấu đã kiểm định"}
                    >
                        {updatingId === item.reportId ? (
                            <RotateCcw size={16} className="animate-spin" />
                        ) : (
                            <RotateCcw size={16} />
                        )}
                    </button>

                    <button
                        onClick={() => onViewDetails?.(item.reportId)}
                        className="
                            flex items-center gap-2
                            px-4 py-2
                            text-sm
                            bg-blue-600
                            text-white
                            rounded-lg
                            hover:bg-blue-700
                            transition
                        "
                    >
                        <Eye size={16} />
                        Xem Chi Tiết
                    </button>
                </div>
            </div>
        </div>
    );
}