import { X } from "lucide-react"

export default function UpdateReportModal({ isOpen, onClose, updateFormData, setUpdateFormData, onSubmit, updatingReport }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[700px] p-8 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-black"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl font-semibold mb-6">
                    Cập Nhật Báo Cáo Kiểm Định
                </h3>

                <form onSubmit={onSubmit} className="space-y-4">

                    {/* OVERALL RATING */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Xếp Hạng Chung</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="0-5"
                            value={updateFormData.overallRating}
                            onChange={(e) =>
                                setUpdateFormData({ ...updateFormData, overallRating: e.target.value })
                            }
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    {/* FRAME */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tình Trạng Khung</label>
                            <input
                                type="number"
                                placeholder="Đánh giá khung"
                                value={updateFormData.frameCondition}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, frameCondition: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ghi Chú Khung</label>
                            <input
                                type="text"
                                placeholder="Ghi chú chi tiết"
                                value={updateFormData.frameNotes}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, frameNotes: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* BRAKE */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tình Trạng Phanh</label>
                            <input
                                type="number"
                                placeholder="Đánh giá phanh"
                                value={updateFormData.brakeCondition}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, brakeCondition: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ghi Chú Phanh</label>
                            <input
                                type="text"
                                placeholder="Ghi chú chi tiết"
                                value={updateFormData.brakeNotes}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, brakeNotes: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* DRIVETRAIN */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tình Trạng Truyền Động</label>
                            <input
                                type="number"
                                placeholder="Đánh giá truyền động"
                                value={updateFormData.drivetrainCondition}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, drivetrainCondition: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ghi Chú Truyền Động</label>
                            <input
                                type="text"
                                placeholder="Ghi chú chi tiết"
                                value={updateFormData.drivetrainNotes}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, drivetrainNotes: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* WHEEL */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Tình Trạng Bánh Xe</label>
                            <input
                                type="number"
                                placeholder="Đánh giá bánh xe"
                                value={updateFormData.wheelCondition}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, wheelCondition: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ghi Chú Bánh Xe</label>
                            <input
                                type="text"
                                placeholder="Ghi chú chi tiết"
                                value={updateFormData.wheelNotes}
                                onChange={(e) =>
                                    setUpdateFormData({ ...updateFormData, wheelNotes: e.target.value })
                                }
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Trạng Thái</label>
                        <select
                            value={updateFormData.status}
                            onChange={(e) =>
                                setUpdateFormData({ ...updateFormData, status: parseInt(e.target.value) })
                            }
                            className="w-full border p-2 rounded-lg"
                        >
                            <option value={1}>Chưa Kiểm Định</option>
                            <option value={2}>Đã Kiểm Định</option>
                            <option value={3}>Đã Từ Chối</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={updatingReport}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                            {updatingReport ? "Đang cập nhật..." : "Cập Nhật"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
