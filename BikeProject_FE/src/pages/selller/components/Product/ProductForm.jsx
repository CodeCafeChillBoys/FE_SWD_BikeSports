import { useState, useEffect } from "react"
import productApi from "../../../../services/productApi"

const CONDITION_OPTIONS = [
    { value: 0, label: "Mới 100%" },
    { value: 1, label: "Đã qua sử dụng - Như mới" },
    { value: 2, label: "Đã qua sử dụng - Tốt" },
    { value: 3, label: "Đã qua sử dụng - Trung bình" },
]

const FRAME_MATERIAL_OPTIONS = [
    { value: 0, label: "Kim loại" },
    { value: 1, label: "Carbon" },
    { value: 2, label: "Nhôm" },
    { value: 3, label: "Thép" },
]

export default function ProductForm({ product, sellerId, onClose }) {
    const isEditing = Boolean(product)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        sellerId: sellerId || "",
        categoryId: "",
        brandId: "",
        productName: "",
        description: "",
        condition: 2,
        frameSize: "",
        frameMaterial: 0,
        wheelSize: "",
        brakeType: "",
        gearSystem: "",
        weight: 0,
        color: "",
        yearOfManufacture: new Date().getFullYear(),
        usageHistory: 0,
        price: 0,
        stockQuantity: 1,
        locationCity: "",
        status: 0,
        inspectionStatus: 0
    })

    // Load dữ liệu sản phẩm nếu đang edit
    useEffect(() => {
        if (product) {
            setFormData({
                sellerId: product.sellerId || sellerId,
                categoryId: product.categoryId || "",
                brandId: product.brandId || "",
                productName: product.productName || "",
                description: product.description || "",
                condition: product.condition ?? 2,
                frameSize: product.frameSize || "",
                frameMaterial: product.frameMaterial ?? 0,
                wheelSize: product.wheelSize || "",
                brakeType: product.brakeType || "",
                gearSystem: product.gearSystem || "",
                weight: product.weight || 0,
                color: product.color || "",
                yearOfManufacture: product.yearOfManufacture || new Date().getFullYear(),
                usageHistory: product.usageHistory || 0,
                price: product.price || 0,
                stockQuantity: product.stockQuantity || 1,
                locationCity: product.locationCity || "",
                status: product.status ?? 0,
                inspectionStatus: product.inspectionStatus ?? 0
            })
        }
    }, [product, sellerId])

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!formData.productName.trim()) {
            setError("Tên sản phẩm không được để trống")
            return
        }
        if (!formData.categoryId || !formData.brandId) {
            setError("Vui lòng chọn danh mục và thương hiệu")
            return
        }
        if (formData.price <= 0) {
            setError("Giá phải lớn hơn 0")
            return
        }

        try {
            setLoading(true)

            if (isEditing) {
                // Update product
                await productApi.updateProduct(product.productId, formData)
                alert("Cập nhật sản phẩm thành công!")
            } else {
                // Create new product
                await productApi.createBicycle(formData)
                alert("Tạo sản phẩm mới thành công!")
            }

            onClose(true) // true = refresh danh sách
        } catch (err) {
            console.error("Lỗi khi lưu sản phẩm:", err)
            setError(err.response?.data?.message || "Có lỗi xảy ra khi lưu sản phẩm")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full my-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
                    </h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tên sản phẩm */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Tên sản phẩm <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: Giant Talon 29er"
                                required
                            />
                        </div>

                        {/* Category và Brand */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Danh mục <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="ID Danh mục (VD: 1)"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Thương hiệu <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="brandId"
                                value={formData.brandId}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="ID Thương hiệu (VD: 1)"
                                required
                            />
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Tình trạng
                            </label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                {CONDITION_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Frame Material */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Chất liệu khung
                            </label>
                            <select
                                name="frameMaterial"
                                value={formData.frameMaterial}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                {FRAME_MATERIAL_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Frame Size & Wheel Size */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Kích thước khung
                            </label>
                            <input
                                type="text"
                                name="frameSize"
                                value={formData.frameSize}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: XL, L, M, S"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Kích thước bánh xe
                            </label>
                            <input
                                type="text"
                                name="wheelSize"
                                value={formData.wheelSize}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: 29 inch"
                            />
                        </div>

                        {/* Brake & Gear */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Loại phanh
                            </label>
                            <input
                                type="text"
                                name="brakeType"
                                value={formData.brakeType}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: Đĩa thủy lực"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Hệ thống số
                            </label>
                            <input
                                type="text"
                                name="gearSystem"
                                value={formData.gearSystem}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: Shimano 21 số"
                            />
                        </div>

                        {/* Weight & Color */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Trọng lượng (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: 12.5"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Màu sắc
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: Đen, Xanh dương"
                            />
                        </div>

                        {/* Year & Usage */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Năm sản xuất
                            </label>
                            <input
                                type="number"
                                name="yearOfManufacture"
                                value={formData.yearOfManufacture}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Lịch sử sử dụng (tháng)
                            </label>
                            <input
                                type="number"
                                name="usageHistory"
                                value={formData.usageHistory}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                min="0"
                            />
                        </div>

                        {/* Price & Stock */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giá (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Số lượng
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                min="0"
                            />
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Thành phố
                            </label>
                            <input
                                type="text"
                                name="locationCity"
                                value={formData.locationCity}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="VD: Hồ Chí Minh"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="Mô tả chi tiết về sản phẩm..."
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="px-6 py-2 rounded-lg border hover:bg-gray-50"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
                            disabled={loading}
                        >
                            {loading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Tạo mới"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
