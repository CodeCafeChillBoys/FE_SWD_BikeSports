function SellerCard({ seller, price }) {
    return (
        <div className="top-6 bg-white rounded-xl border p-6">
            <p className="text-xl font-bold text-blue-600 mb-4">
                {price.toLocaleString()}
            </p>

            <div className="flex items-center gap-3 mb-4">
                <img
                    src={seller.avatar}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-yellow-500">⭐ {seller.rating}</p>
                </div>
            </div>
            <p className="text-sm">📞 {seller.phone}</p>
            <p className="text-sm">✉️ {seller.email}</p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                Nhắn tin
            </button>
        </div>
    )
}

export default SellerCard
