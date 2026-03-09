import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import productApi from "../../../services/productApi"
import listingApi from "../../../services/listingAPI"

export default function CreateListingPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const sellerId = localStorage.getItem("userId")

    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [form, setForm] = useState({
        productId: "",
        title: "",
        featuredImage: "",
    })

    // Lấy danh sách sản phẩm của seller
    const fetchProducts = () => {
        if (!sellerId) {
            setError("Không tìm thấy thông tin người bán. Vui lòng đăng nhập lại.")
            return
        }
        setLoadingProducts(true)
        setError("")

        productApi.getProductBySeller(sellerId)
            .then((res) => {
                // api.js response interceptor trả về response.data trực tiếp
                let list = []
                if (Array.isArray(res)) {
                    list = res
                } else if (res?.data && Array.isArray(res.data)) {
                    list = res.data
                } else if (res && typeof res === "object") {
                    list = [res]
                }

                // Sort theo thời gian mới nhất lên đầu
                list.sort((a, b) => {
                    const dateA = new Date(a.updatedAt || a.createdAt || 0)
                    const dateB = new Date(b.updatedAt || b.createdAt || 0)
                    return dateB - dateA
                })

                console.log("📦 Loaded products for listing:", list)
                setProducts(list)

                // If user just created a product (or navigated from a product card), prefer selecting that product by id.
                try {
                    const navProductId = location?.state?.productId
                    const navProductName = location?.state?.productName
                    const lastId = localStorage.getItem('lastCreatedProductId')
                    const lastObj = JSON.parse(localStorage.getItem('lastCreatedProduct') || 'null')

                    // Prefer navigation state productId (from ProductCard 'Đăng tin' button)
                    if (navProductId) {
                        const found = list.find(p => String(p.productId ?? p.id) === String(navProductId))
                        if (found) {
                            setForm(prev => ({ ...prev, productId: found.productId ?? found.id ?? String(navProductId) }))
                        } else {
                            // server hasn't returned it (maybe client-only or synthetic) -> add synthetic option
                            const synthetic = { productId: String(navProductId), productName: navProductName ?? String(navProductId), sellerId }
                            setProducts(prev => [synthetic, ...prev])
                            setForm(prev => ({ ...prev, productId: String(navProductId) }))
                        }
                        // clear navigation state so copy/paste doesn't reapply
                        window.history.replaceState({}, '')
                        return
                    }

                    if (lastId) {
                        const found = list.find(p => String(p.productId ?? p.id) === String(lastId))
                        if (found) {
                            setForm(prev => ({ ...prev, productId: found.productId ?? found.id ?? String(lastId) }))
                            localStorage.removeItem('lastCreatedProductId')
                            localStorage.removeItem('lastCreatedProduct')
                            return
                        }
                    }

                    if (!lastId && lastObj && lastObj.sellerId && String(lastObj.sellerId) === String(sellerId)) {
                        const syntheticId = lastObj.productId ?? lastObj._localId ?? `local-sel-${Date.now()}`
                        const toAdd = { ...(lastObj), productId: syntheticId }
                        setProducts(prev => [toAdd, ...prev])
                        setForm(prev => ({ ...prev, productId: syntheticId }))
                        return
                    }

                    if (list.length > 0 && !form.productId) {
                        setForm(prev => ({ ...prev, productId: list[0].productId ?? list[0].id ?? "" }))
                    }
                } catch (e) {
                    console.warn('Could not auto-select last created product', e)
                    if (list.length > 0 && !form.productId) {
                        setForm(prev => ({ ...prev, productId: list[0].productId ?? list[0].id ?? "" }))
                    }
                }
            })
            .catch((err) => {
                console.error("❌ Lỗi tải sản phẩm:", err)
                setError("Không thể tải danh sách sản phẩm.")
            })
            .finally(() => setLoadingProducts(false))
    }

    useEffect(() => {
        fetchProducts()
    }, [sellerId, location.key]) // Re-fetch khi navigate vào trang

    // If navigate here with a productId in state (from ProductCard), auto-select it
    useEffect(() => {
        try {
            const navProductId = location?.state?.productId
            const navProductName = location?.state?.productName
            if (navProductId) {
                setForm(prev => ({ ...prev, productId: String(navProductId) }))
            } else if (navProductName && products.length === 0) {
                // nothing to select yet; saved by fetchProducts logic which will handle lastCreatedProduct
            }
        } catch (e) {
            console.warn('Could not read navigation state for product selection', e)
        }
    }, [location, products])

    // 🎯 Tự động load hình ảnh từ product được chọn
    useEffect(() => {
        const loadProductImage = async () => {
            if (form.productId && !form.featuredImage) {
                try {
                    const productDetail = await productApi.getProductDetail(form.productId)
                    const productData = productDetail?.data || productDetail

                    if (productData?.featuredImage) {
                        setForm(prev => ({
                            ...prev,
                            featuredImage: productData.featuredImage,
                            title: prev.title || productData.productName || ""
                        }))
                    }
                } catch (err) {
                    console.warn("Không thể tự động load hình ảnh product:", err)
                }
            }
        }

        loadProductImage()
    }, [form.productId])

    const handleChange = async (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))

        // 🎯 Khi chọn product, tự động lấy hình ảnh từ product
        if (name === "productId" && value) {
            try {
                const productDetail = await productApi.getProductDetail(value)
                const productData = productDetail?.data || productDetail

                console.log("📸 Product detail fetched:", productData)
                console.log("🖼️ Featured Image:", productData?.featuredImage)

                // Tự động điền featuredImage từ product nếu có
                if (productData?.featuredImage) {
                    setForm(prev => ({
                        ...prev,
                        productId: value,
                        featuredImage: productData.featuredImage,
                        // Tự động điền title nếu chưa có
                        title: prev.title || productData.productName || ""
                    }))
                } else {
                    console.warn("⚠️ Product không có featuredImage")
                }
            } catch (err) {
                console.warn("Không thể lấy chi tiết sản phẩm:", err)
                // Vẫn set productId ngay cả khi fetch fail
                setForm(prev => ({ ...prev, productId: value }))
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!form.productId) {
            setError("Vui lòng chọn sản phẩm.")
            return
        }
        if (!form.title.trim()) {
            setError("Vui lòng nhập tiêu đề tin đăng.")
            return
        }

        setSubmitting(true)
        try {
            const response = await listingApi.createListing({
                productId: form.productId,
                sellerId: sellerId,
                title: form.title.trim(),
                featuredImage: form.featuredImage.trim(),
            })

            console.log("✅ Listing created:", response)

            // Navigate với success message
            navigate("/seller/listings", {
                state: { success: "Đăng tin thành công! Tin đăng mới đã được tạo." }
            })
        } catch (err) {
            const msg = err?.response?.data?.message ?? err?.response?.data ?? "Đăng tin thất bại. Vui lòng thử lại."
            setError(typeof msg === "string" ? msg : JSON.stringify(msg))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Đăng tin bán xe</h1>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/seller/products")}
                        className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        📦 Quản lý sản phẩm
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/seller/listings")}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-5">

                {/* Chọn sản phẩm */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium">
                            Sản phẩm <span className="text-red-500">*</span>
                        </label>
                        <button
                            type="button"
                            onClick={fetchProducts}
                            disabled={loadingProducts}
                            className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                        >
                            {loadingProducts ? "🔄 Đang tải..." : "🔄 Làm mới"}
                        </button>
                    </div>
                    {loadingProducts ? (
                        <p className="text-sm text-gray-400">Đang tải sản phẩm...</p>
                    ) : products.length === 0 ? (
                        <div className="text-sm p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-orange-700 mb-2">
                                Bạn chưa có sản phẩm nào để đăng tin.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/seller/products")}
                                className="text-blue-600 hover:text-blue-800 underline font-medium"
                            >
                                → Tạo sản phẩm mới ngay
                            </button>
                        </div>
                    ) : (
                        <select
                            name="productId"
                            value={form.productId}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {products.map((p) => {
                                const id = p.productId ?? p.id
                                const name = p.name ?? p.productName ?? p.title ?? id
                                const brand = p.brand ? ` — ${p.brand}` : ""
                                return (
                                    <option key={id} value={id}>
                                        {name}{brand}
                                    </option>
                                )
                            })}
                        </select>
                    )}
                </div>

                {/* Tiêu đề tin đăng */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Tiêu đề tin đăng <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Ví dụ: Bán xe đạp Giant Talon 29er mới 95%"
                    />
                </div>

                {/* Ảnh đại diện */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        URL ảnh đại diện
                    </label>
                    <input
                        type="url"
                        name="featuredImage"
                        value={form.featuredImage}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="https://..."
                    />
                    {form.featuredImage && (
                        <img
                            src={form.featuredImage}
                            alt="preview"
                            className="mt-2 h-32 w-auto rounded-lg object-cover border"
                            onError={(e) => { e.target.style.display = "none" }}
                        />
                    )}
                </div>

                {/* Action */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/seller/listings")}
                        className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
                    >
                        Huỷ
                    </button>
                    <button
                        type="submit"
                        disabled={submitting || products.length === 0}
                        className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Đang đăng..." : "Đăng tin"}
                    </button>
                </div>
            </form>
        </div>
    )
}
