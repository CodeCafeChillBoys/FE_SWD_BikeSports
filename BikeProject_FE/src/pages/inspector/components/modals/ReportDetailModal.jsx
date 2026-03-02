import { X } from "lucide-react"

export default function ReportDetailModal({ isOpen, onClose, reportDetails, loadingDetail }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] p-8 rounded-2xl shadow-xl relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-black"
                >
                    <X size={20} />
                </button>

                <h3 className="text-2xl font-semibold mb-6">
                    Chi Tiết Báo Cáo
                </h3>

                {loadingDetail ? (
                    <p className="text-gray-500 text-center py-8">Đang tải...</p>
                ) : reportDetails ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Tên Sản Phẩm</p>
                                <p className="font-semibold">{reportDetails.productName ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Trạng Thái</p>
                                <p className={`font-semibold ${reportDetails.status === 2 ? 'text-green-600' :
                                    reportDetails.status === 3 ? 'text-red-600' :
                                        'text-yellow-600'
                                    }`}>
                                    {reportDetails.status === 2 ? 'Đã kiểm định' :
                                        reportDetails.status === 3 ? 'Đã từ chối' :
                                            'Chưa kiểm định'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Xếp Hạng Chung</p>
                                <p className="font-semibold">{reportDetails.overallRating ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày Kiểm Định</p>
                                <p className="font-semibold">
                                    {new Date(reportDetails.inspectionDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Ngày Tạo</p>
                                <p className="font-semibold">
                                    {new Date(reportDetails.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày Cập Nhật</p>
                                <p className="font-semibold">
                                    {new Date(reportDetails.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {reportDetails.imagesUrl && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Hình ảnh</p>
                                <img
                                    src={`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247'}/${reportDetails.imagesUrl}`}
                                    alt="inspection"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-gray-500">Notes</p>
                            <p className="font-semibold">{reportDetails.notes ?? 'Không có ghi chú'}</p>
                        </div>

                        {/* ================= INSPECTION DETAILS ================= */}
                        <div className="border-t pt-4 mt-4">
                            <h4 className="font-semibold mb-3 text-base">Chi Tiết Kiểm Định</h4>

                            {reportDetails.frameCondition !== null && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Frame Condition</p>
                                        <p className="font-semibold">{reportDetails.frameCondition ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Frame Notes</p>
                                        <p className="font-semibold">{reportDetails.frameNotes ?? 'Không có ghi chú'}</p>
                                    </div>
                                </div>
                            )}

                            {reportDetails.brakeCondition !== null && (
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Brake Condition</p>
                                        <p className="font-semibold">{reportDetails.brakeCondition ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Brake Notes</p>
                                        <p className="font-semibold">{reportDetails.brakeNotes ?? 'Không có ghi chú'}</p>
                                    </div>
                                </div>
                            )}

                            {reportDetails.drivetrainCondition !== null && (
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Drivetrain Condition</p>
                                        <p className="font-semibold">{reportDetails.drivetrainCondition ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Drivetrain Notes</p>
                                        <p className="font-semibold">{reportDetails.drivetrainNotes ?? 'Không có ghi chú'}</p>
                                    </div>
                                </div>
                            )}

                            {reportDetails.wheelCondition !== null && (
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Wheel Condition</p>
                                        <p className="font-semibold">{reportDetails.wheelCondition ?? 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Wheel Notes</p>
                                        <p className="font-semibold">{reportDetails.wheelNotes ?? 'Không có ghi chú'}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Đóng
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-8">Không tìm thấy chi tiết báo cáo</p>
                )}
            </div>
        </div>
    )
}
