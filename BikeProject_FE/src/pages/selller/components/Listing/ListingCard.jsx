import { MoreVertical, Clock, CheckCircle, XCircle, Loader } from "lucide-react"

const STATUS_MAP = {
    1: { label: "Đang hiển thị", color: "bg-green-100 text-green-600", icon: <CheckCircle size={13} /> },
    2: { label: "Chờ duyệt", color: "bg-yellow-100 text-yellow-600", icon: <Loader size={13} /> },
    3: { label: "Từ chối", color: "bg-red-100 text-red-500", icon: <XCircle size={13} /> },
    4: { label: "Đã xóa", color: "bg-gray-100 text-gray-500", icon: <Clock size={13} /> },
}

export default function ListingCard({ item }) {
    const image = item.featuredImage ?? item.images?.[0]
    const status = Number(item.status ?? 1)
    const statusInfo = STATUS_MAP[status] ?? STATUS_MAP[1]

    const formatDate = (dateStr) => {
        if (!dateStr) return "—"
        try {
            return new Date(dateStr).toLocaleDateString("vi-VN")
        } catch {
            return dateStr
        }
    }

    return (
        <div className="bg-white border rounded-xl p-4 flex gap-4 mb-4">

            {/* Image */}
            {image ? (
                <img
                    src={image}
                    alt={item.title}
                    className="w-40 h-28 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { e.target.src = "https://placehold.co/160x112?text=No+Image" }}
                />
            ) : (
                <div className="w-40 h-28 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">
                    Không có ảnh
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold truncate pr-2">{item.title ?? "Không có tiêu đề"}</h3>
                    <MoreVertical size={18} className="text-gray-400 flex-shrink-0 cursor-pointer" />
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 mt-2">
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                    </span>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-x-4 text-sm mt-3 text-gray-500">
                    <div>
                        <p className="text-xs text-gray-400">Mã tin</p>
                        <p className="font-mono text-xs truncate">{item.listingId ?? item.id ?? "—"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Ngày đăng</p>
                        <p>{formatDate(item.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
