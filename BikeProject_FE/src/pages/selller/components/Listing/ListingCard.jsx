import { Eye, MoreVertical, Check } from "lucide-react"

export default function ListingCard({ item }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex gap-4 mb-4">

            {/* Image */}
            <img
                src={item.images?.[0]}
                className="w-40 h-28 rounded-lg object-cover"
            />

            {/* Content */}
            <div className="flex-1">
                <div className="flex justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <MoreVertical size={18} className="text-gray-500" />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">
                        {item.type}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">
                        {item.condition}
                    </span>
                    {item.verified && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-600 rounded">
                            <Check size={12} /> Đã kiểm định
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {item.description}
                </p>

                {/* Footer */}
                <div className="grid grid-cols-3 text-sm mt-3">
                    <div>
                        <p className="text-gray-500">Giá bán</p>
                        <p className="text-blue-600 font-semibold">
                            {item.price.toLocaleString()} đ
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Lượt xem</p>
                        <p className="flex items-center gap-1">
                            <Eye size={14} /> {item.views}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Đăng ngày</p>
                        <p>{item.date}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
