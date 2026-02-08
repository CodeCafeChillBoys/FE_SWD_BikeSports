function RecentItem({ bike }) {
    return (
        <div className="flex justify-between items-center py-4 border-t">
            <div className="flex gap-4">
                <img
                    src={bike.image}
                    className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                    <p className="font-medium">{bike.title}</p>
                    <p className="text-sm text-gray-500">
                        {bike.brand} - {bike.type}
                    </p>
                    <p className="text-sm mt-1">
                        <span className="text-blue-600 font-semibold">
                            {bike.price.toLocaleString()} đ
                        </span>
                        <span className="ml-3 text-gray-400">
                            👁 {bike.views}
                        </span>
                    </p>
                </div>
            </div>

            <button className="border px-4 py-1.5 rounded-lg text-sm">
                Quản lý
            </button>
        </div>
    )
}

export default RecentItem