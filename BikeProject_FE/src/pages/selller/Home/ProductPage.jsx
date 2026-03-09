import { useState, useEffect } from "react"
import productApi from "../../../services/productApi"
import ProductForm from "../components/Product/ProductForm"
import ProductCard from "../components/Product/ProductCard"

export default function ProductPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Lấy sellerId từ localStorage
    const sellerId = localStorage.getItem("userId")

    console.log("🔑 All localStorage keys:")
    console.log("  - userId:", localStorage.getItem("userId"))
    console.log("  - accessToken:", localStorage.getItem("accessToken"))
    console.log("  - role:", localStorage.getItem("role"))
    console.log("  - fullName:", localStorage.getItem("fullName"))

    // Load danh sách sản phẩm
    useEffect(() => {
        if (sellerId) {
            fetchProducts()
        } else {
            console.warn("⚠️ No sellerId found in localStorage")
        }
    }, [sellerId])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError("")

            console.log("🔍 Fetching products for sellerId:", sellerId)
            const response = await productApi.getProductBySeller(sellerId)
            console.log("📦 API Response:", response)
            console.log("📦 Response type:", typeof response)
            console.log("📦 Is Array?", Array.isArray(response))

            // Handle different response structures
            let productsList = []
            if (Array.isArray(response)) {
                productsList = response
            } else if (response?.data && Array.isArray(response.data)) {
                productsList = response.data
            } else if (response && typeof response === 'object') {
                // If single object returned, wrap in array
                productsList = [response]
            }

            // Merge any locally stored pending products (created but not yet returned by backend)
            try {
                const pendingAll = JSON.parse(localStorage.getItem('pendingProducts') || '[]')
                const sellerPending = pendingAll.filter(p => String(p.sellerId) === String(sellerId))

                // Remove pending items that already exist in the server list.
                // Only remove when a pending item has a real `productId` that appears in server results.
                // Avoid removing pending items based on `productName` to prevent collapsing multiple
                // created entries that share the same name.
                const remainingPending = pendingAll.filter(p => {
                    if (p.productId) {
                        return !productsList.some(prod => String(prod.productId) === String(p.productId))
                    }
                    // keep pending items without a productId
                    return true
                })

                // Persist remaining pending (remove those already present)
                localStorage.setItem('pendingProducts', JSON.stringify(remainingPending))

                // Prepend seller pending items. Keep pending items without productId so multiple
                // newly-created entries are shown. If a pending item has productId, avoid
                // duplicating the server entry.
                const merged = [
                    ...sellerPending.filter(p => {
                        if (p.productId) return !productsList.some(prod => String(prod.productId) === String(p.productId))
                        return true
                    }),
                    ...productsList
                ]

                // Sort theo thời gian mới nhất lên đầu (updatedAt hoặc createdAt)
                const sorted = merged.sort((a, b) => {
                    const dateA = new Date(a.updatedAt || a.createdAt || 0)
                    const dateB = new Date(b.updatedAt || b.createdAt || 0)
                    return dateB - dateA // Mới nhất lên đầu
                })

                console.log("🔁 Merged products with pending local items:", sorted)
                setProducts(sorted)
            } catch (localErr) {
                console.warn('Could not merge pending products from localStorage', localErr)
                // Sort productsList nếu không merge được
                const sorted = productsList.sort((a, b) => {
                    const dateA = new Date(a.updatedAt || a.createdAt || 0)
                    const dateB = new Date(b.updatedAt || b.createdAt || 0)
                    return dateB - dateA
                })
                setProducts(sorted)
            }

            console.log("✅ Products list (from server):", productsList)
        } catch (err) {
            console.error("❌ Lỗi khi tải sản phẩm:", err)
            console.error("❌ Error response:", err.response)
            setError("Không thể tải danh sách sản phẩm: " + (err.response?.data?.message || err.message))
            setProducts([]) // Ensure products is always an array
        } finally {
            setLoading(false)
        }
    }

    // Mở modal tạo mới
    const handleCreateNew = () => {
        setEditingProduct(null)
        setShowModal(true)
    }

    // Mở modal chỉnh sửa
    const handleEdit = (product) => {
        setEditingProduct(product)
        setShowModal(true)
    }

    // Xem chi tiết sản phẩm
    const handleViewDetail = async (productId) => {
        try {
            setLoading(true)
            const response = await productApi.getProductDetail(productId)

            // Handle different response structures
            const productDetail = response?.data || response
            setSelectedProduct(productDetail)
        } catch (err) {
            console.error("Lỗi khi tải chi tiết:", err)
            alert("Không thể tải chi tiết sản phẩm")
        } finally {
            setLoading(false)
        }
    }

    // Đóng modal và refresh danh sách
    const handleModalClose = (shouldRefresh, successMessage, newProductData) => {
        setShowModal(false)
        setEditingProduct(null)

        if (shouldRefresh) {
            if (successMessage) {
                setSuccess(successMessage)
                setTimeout(() => setSuccess(""), 5000)
            }

            // Nếu có dữ liệu sản phẩm mới, thêm ngay vào list
            if (newProductData) {
                console.log("🔄 Adding new product to list:", newProductData)
                // Save to localStorage pending list so it survives reloads until backend returns it
                try {
                    const pendingAll = JSON.parse(localStorage.getItem('pendingProducts') || '[]')
                    // Avoid duplicates: if server provided productId, compare by that;
                    // otherwise compare by client _localId (unique per creation)
                    const exists = pendingAll.some(p => {
                        if (newProductData.productId) {
                            return String(p.productId) === String(newProductData.productId) && String(p.sellerId) === String(newProductData.sellerId)
                        }
                        // fallback to local id (should exist for local-only entries)
                        return p._localId && newProductData._localId && p._localId === newProductData._localId && String(p.sellerId) === String(newProductData.sellerId)
                    })
                    if (!exists) {
                        pendingAll.unshift(newProductData)
                        localStorage.setItem('pendingProducts', JSON.stringify(pendingAll))
                    }
                } catch (localErr) {
                    console.warn('Could not save pending product to localStorage', localErr)
                }

                setProducts(prev => [newProductData, ...prev]) // Thêm lên đầu list
                setLoading(false) // Stop loading ngay
            } else {
                // Nếu không có data, fetch lại từ server
                fetchProducts()
            }
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
                    <p className="text-gray-500 mt-1">
                        Quản lý tất cả sản phẩm xe đạp của bạn
                    </p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    <span>Tạo sản phẩm mới</span>
                </button>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex justify-between items-center">
                    <span>{success}</span>
                    <button onClick={() => setSuccess("")} className="text-green-800 hover:text-green-900">×</button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError("")} className="text-red-800 hover:text-red-900">×</button>
                </div>
            )}

            {/* Loading State */}
            {loading && !showModal && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    <p className="mt-4 text-gray-500">Đang tải...</p>
                </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                            onEdit={handleEdit}
                            onViewDetail={handleViewDetail}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Chưa có sản phẩm nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Bắt đầu tạo sản phẩm đầu tiên của bạn
                    </p>
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Tạo sản phẩm mới
                    </button>
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <ProductForm
                    product={editingProduct}
                    sellerId={sellerId}
                    onClose={handleModalClose}
                />
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-bold">Chi tiết sản phẩm</h2>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div><strong>Tên:</strong> {selectedProduct.productName}</div>
                            <div><strong>Mô tả:</strong> {selectedProduct.description}</div>
                            <div><strong>Giá:</strong> {selectedProduct.price?.toLocaleString()} VNĐ</div>
                            <div><strong>Số lượng:</strong> {selectedProduct.stockQuantity}</div>
                            <div><strong>Tình trạng:</strong> {selectedProduct.condition}</div>
                            <div><strong>Khung:</strong> {selectedProduct.frameSize}</div>
                            <div><strong>Chất liệu:</strong> {selectedProduct.frameMaterial}</div>
                            <div><strong>Màu:</strong> {selectedProduct.color}</div>
                            <div><strong>Trọng lượng:</strong> {selectedProduct.weight} kg</div>
                            <div><strong>Năm sản xuất:</strong> {selectedProduct.yearOfManufacture}</div>
                            <div><strong>Thành phố:</strong> {selectedProduct.locationCity}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
