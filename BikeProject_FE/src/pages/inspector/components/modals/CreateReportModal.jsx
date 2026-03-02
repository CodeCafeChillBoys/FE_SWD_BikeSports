import { X } from "lucide-react"

export default function CreateReportModal({ isOpen, onClose, formData, setFormData, onSubmit, submitting }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[420px] p-6 rounded-2xl shadow-xl relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-black"
                >
                    <X size={20} />
                </button>

                <h3 className="text-lg font-semibold mb-5">
                    Tạo Báo Cáo Mới
                </h3>

                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        placeholder="Product ID"
                        value={formData.productId}
                        onChange={(e) =>
                            setFormData({ ...formData, productId: e.target.value })
                        }
                        className="w-full border p-2 rounded-lg"
                        required
                    />

                    <input
                        placeholder="Inspector ID"
                        value={formData.inspectorId}
                        onChange={(e) =>
                            setFormData({ ...formData, inspectorId: e.target.value })
                        }
                        className="w-full border p-2 rounded-lg"
                        required
                    />

                    <input
                        placeholder="Image URL"
                        value={formData.imagesUrl}
                        onChange={(e) =>
                            setFormData({ ...formData, imagesUrl: e.target.value })
                        }
                        className="w-full border p-2 rounded-lg"
                        required
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {submitting ? "Đang tạo..." : "Tạo Báo Cáo"}
                    </button>

                </form>
            </div>
        </div>
    )
}
