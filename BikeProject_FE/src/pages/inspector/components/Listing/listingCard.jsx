import { Eye } from "lucide-react";

export default function ListingCard({ item }) {
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
                <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl"
                />

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {item.brand} - {item.category}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="
                            bg-green-50
                            text-green-600
                            text-xs
                            font-medium
                            px-3 py-1
                            rounded-full
                        ">
                            {item.status}
                        </span>

                        <span className="text-sm text-gray-500">
                            Đánh giá: {item.rating}/5
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3">
                <span className="text-sm text-gray-500">
                    {item.date}
                </span>

                <button className="
                    flex items-center gap-2
                    px-4 py-2
                    text-sm
                    border border-gray-200
                    rounded-lg
                    hover:bg-gray-50
                    hover:border-gray-300
                    transition
                ">
                    <Eye size={16} />
                    Chi tiết
                </button>
            </div>
        </div>
    );
}