export default function CreateListingPage() {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Đăng tin bán xe</h1>

            <div className="bg-white rounded-xl border p-6 space-y-6">

                {/* Tên xe */}
                <div>
                    <label className="block text-sm font-medium mb-1">Tên xe</label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Ví dụ: Giant Talon 29er"
                    />
                </div>

                {/* Loại xe */}
                <div>
                    <label className="block text-sm font-medium mb-1">Loại xe</label>
                    <select className="w-full border rounded-lg px-4 py-2">
                        <option>Xe đạp địa hình</option>
                        <option>Xe đạp đường trường</option>
                        <option>Xe gấp</option>
                    </select>
                </div>

                {/* Giá */}
                <div>
                    <label className="block text-sm font-medium mb-1">Giá bán (VNĐ)</label>
                    <input
                        type="number"
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="12500000"
                    />
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block text-sm font-medium mb-1">Mô tả</label>
                    <textarea
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2"
                    />
                </div>

                {/* Action */}
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 rounded-lg border">
                        Huỷ
                    </button>
                    <button className="px-5 py-2 rounded-lg bg-black text-white">
                        Đăng tin
                    </button>
                </div>
            </div>
        </div>
    )
}
