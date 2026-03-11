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
        featuredImage: "",
        // Default to available + not inspected
        status: 1,
        inspectionStatus: 1
    })

    const parseNumber = (value, fallback = 0) => {
        const parsed = Number(value)
        return Number.isFinite(parsed) ? parsed : fallback
    }

    const buildPayload = () => {
        // Backend expects flat structure with specific data types per Swagger
        return {
            sellerId: String(formData.sellerId || sellerId),
            categoryId: String(formData.categoryId),
            brandId: String(formData.brandId),
            productName: formData.productName || "",
            description: formData.description || "",
            condition: parseNumber(formData.condition, 2),
            frameSize: formData.frameSize || "",
            frameMaterial: parseNumber(formData.frameMaterial, 0),
            wheelSize: formData.wheelSize || "",
            brakeType: formData.brakeType || "",
            gearSystem: formData.gearSystem || "",
            weight: parseNumber(formData.weight, 0),
            color: formData.color || "",
            yearOfManufacture: parseNumber(formData.yearOfManufacture, new Date().getFullYear()),
            usageHistory: parseNumber(formData.usageHistory, 0),
            price: parseNumber(formData.price, 0),
            stockQuantity: parseNumber(formData.stockQuantity, 1),
            locationCity: formData.locationCity || "",
            featuredImage: formData.featuredImage || "",
            status: parseNumber(formData.status, 5),
            inspectionStatus: parseNumber(formData.inspectionStatus, 1)
        }
    }

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
                featuredImage: product.featuredImage || "",
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
        if (!sellerId) {
            setError("Không tìm thấy tài khoản seller. Vui lòng đăng nhập lại")
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

        const payload = buildPayload()

        console.log("🚀 Payload gửi lên backend:", JSON.stringify(payload, null, 2))

        if (!payload.categoryId || !payload.brandId) {
            setError("Vui lòng nhập danh mục và thương hiệu")
            return
        }
        if (!payload.sellerId) {
            setError("sellerId không hợp lệ")
            return
        }

        try {
            setLoading(true)

            let successMessage = ""
            let newProductData = null

            if (isEditing) {
                // Update product
                const response = await productApi.updateProduct(product.productId, payload)
                console.log("✅ Update response:", response)
                successMessage = "Cập nhật sản phẩm thành công!"
            } else {
                // Create new product
                const response = await productApi.createBicycle(payload)
                console.log("✅ Create response:", response)

                // Parse response to get new product data. apiClient returns response.data via interceptor,
                // but different backends may return only a message or nested object. Normalize here and
                // fall back to form values so the UI can show the created item immediately.
                const raw = response?.data || response || {}
                const normalized = {
                    // prefer server-provided fields
                    productId: raw.productId ?? raw.id ?? raw.productId ?? null,
                    productName: raw.productName ?? formData.productName,
                    sellerId: raw.sellerId ?? payload.sellerId ?? sellerId,
                    categoryId: raw.categoryId ?? payload.categoryId,
                    brandId: raw.brandId ?? payload.brandId,
                    description: raw.description ?? formData.description,
                    condition: raw.condition ?? payload.condition,
                    frameSize: raw.frameSize ?? formData.frameSize,
                    frameMaterial: raw.frameMaterial ?? payload.frameMaterial,
                    wheelSize: raw.wheelSize ?? formData.wheelSize,
                    brakeType: raw.brakeType ?? formData.brakeType,
                    gearSystem: raw.gearSystem ?? formData.gearSystem,
                    weight: raw.weight ?? formData.weight,
                    color: raw.color ?? formData.color,
                    yearOfManufacture: raw.yearOfManufacture ?? formData.yearOfManufacture,
                    usageHistory: raw.usageHistory ?? formData.usageHistory,
                    price: raw.price ?? formData.price,
                    stockQuantity: raw.stockQuantity ?? formData.stockQuantity,
                    locationCity: raw.locationCity ?? formData.locationCity,
                    featuredImage: raw.featuredImage ?? formData.featuredImage,
                    status: raw.status ?? payload.status,
                    inspectionStatus: raw.inspectionStatus ?? payload.inspectionStatus
                }

                // If backend didn't return an id, add a client-side local id so we can
                // track this pending product uniquely in localStorage.
                if (!normalized.productId) {
                    normalized._localId = `local-${Date.now()}-${Math.floor(Math.random() * 10000)}`
                }

                newProductData = normalized
                console.log("🆕 New product data (normalized):", newProductData)

                successMessage = "Tạo sản phẩm mới thành công! Sản phẩm đang chờ admin duyệt."
            }
            // If backend returned a real productId, record it so listing flow can pick it
            try {
                if (newProductData?.productId) {
                    localStorage.setItem('lastCreatedProductId', String(newProductData.productId))
                    localStorage.setItem('lastCreatedProduct', JSON.stringify(newProductData))
                } else {
                    // still save normalized object for UI convenience
                    localStorage.setItem('lastCreatedProduct', JSON.stringify(newProductData))
                }
            } catch (lsErr) {
                console.warn('Could not save lastCreatedProduct to localStorage', lsErr)
            }

            onClose(true, successMessage, newProductData) // Pass new product data
        } catch (err) {
            console.error("Lỗi khi lưu sản phẩm:", err)

            // Parse backend validation errors
            const responseData = err.response?.data
            if (responseData?.errors) {
                const errorMessages = []
                Object.entries(responseData.errors).forEach(([field, messages]) => {
                    if (Array.isArray(messages)) {
                        messages.forEach(msg => errorMessages.push(`${field}: ${msg}`))
                    }
                })
                setError(errorMessages.length > 0 ? errorMessages.join('\n') : "Có lỗi xảy ra khi lưu sản phẩm")
            } else {
                setError(responseData?.message || responseData?.title || "Có lỗi xảy ra khi lưu sản phẩm")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 overflow-y-auto">
            <div className="bg-white rounded-xl p-3 max-w-2xl w-full my-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-2 sticky top-0 bg-white z-10 pb-2 border-b">
                    <h2 className="text-lg font-bold">
                        {isEditing ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
                    </h2>
                    <button
                        onClick={() => onClose(false)}
                        className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs whitespace-pre-line">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Tên sản phẩm */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium mb-0.5">
                                Tên sản phẩm <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: Giant Talon 29er"
                                required
                            />
                        </div>

                        {/* Category và Brand */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Danh mục <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="ID Danh mục (VD: 1)"
                                min="1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Thương hiệu <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="brandId"
                                value={formData.brandId}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="ID Thương hiệu (VD: 1)"
                                min="1"
                                required
                            />
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Tình trạng
                            </label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
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
                            <label className="block text-xs font-medium mb-0.5">
                                Chất liệu khung
                            </label>
                            <select
                                name="frameMaterial"
                                value={formData.frameMaterial}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
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
                            <label className="block text-xs font-medium mb-0.5">
                                Kích thước khung
                            </label>
                            <input
                                type="text"
                                name="frameSize"
                                value={formData.frameSize}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: XL, L, M, S"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Kích thước bánh xe
                            </label>
                            <input
                                type="text"
                                name="wheelSize"
                                value={formData.wheelSize}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: 29 inch"
                            />
                        </div>

                        {/* Brake & Gear */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Loại phanh
                            </label>
                            <input
                                type="text"
                                name="brakeType"
                                value={formData.brakeType}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: Đĩa thủy lực"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Hệ thống số
                            </label>
                            <input
                                type="text"
                                name="gearSystem"
                                value={formData.gearSystem}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: Shimano 21 số"
                            />
                        </div>

                        {/* Weight & Color */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Trọng lượng (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: 12.5"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Màu sắc
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: Đen, Xanh dương"
                            />
                        </div>

                        {/* Year & Usage */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Năm sản xuất
                            </label>
                            <input
                                type="number"
                                name="yearOfManufacture"
                                value={formData.yearOfManufacture}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Lịch sử sử dụng (tháng)
                            </label>
                            <input
                                type="number"
                                name="usageHistory"
                                value={formData.usageHistory}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                min="0"
                            />
                        </div>

                        {/* Price & Stock */}
                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Giá (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-0.5">
                                Số lượng
                            </label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                min="0"
                            />
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium mb-0.5">
                                Thành phố
                            </label>
                            <input
                                type="text"
                                name="locationCity"
                                value={formData.locationCity}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="VD: Hồ Chí Minh"
                            />
                        </div>

                        {/* Featured Image */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium mb-0.5">
                                URL Hình ảnh sản phẩm
                            </label>
                            <input
                                type="url"
                                name="featuredImage"
                                value={formData.featuredImage}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="https://example.com/image.jpg"
                            />
                            {formData.featuredImage && (
                                <div className="mt-1">
                                    <img
                                        src={formData.featuredImage}
                                        alt="Preview"
                                        className="h-16 w-auto rounded object-cover border"
                                        onError={(e) => {
                                            e.target.style.display = "none"
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium mb-0.5">
                                Mô tả
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={2}
                                className="w-full border rounded px-2 py-1 text-xs"
                                placeholder="Mô tả chi tiết về sản phẩm..."
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2 sticky bottom-0 bg-white border-t mt-2">
                        <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="px-3 py-1 text-xs rounded border hover:bg-gray-50"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 text-xs rounded bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
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
