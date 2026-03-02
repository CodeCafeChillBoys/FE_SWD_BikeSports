import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import productApi from "../../../services/productApi"
import listingApi from "../../../services/listingAPI"

export default function CreateListingPage() {
    const navigate = useNavigate()
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
    useEffect(() => {
        if (!sellerId) {
            setError("Không tìm thấy thông tin người bán. Vui lòng đăng nhập lại.")
            return
        }
        setLoadingProducts(true)
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
                setProducts(list)
                if (list.length > 0) {
                    setForm(prev => ({ ...prev, productId: list[0].productId ?? list[0].id ?? "" }))
                }
            })
            .catch((err) => {
                console.error("❌ Lỗi tải sản phẩm:", err)
                setError("Không thể tải danh sách sản phẩm.")
            })
            .finally(() => setLoadingProducts(false))
    }, [sellerId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
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
            await listingApi.createListing({
                productId: form.productId,
                sellerId: sellerId,
                title: form.title.trim(),
                featuredImage: form.featuredImage.trim(),
            })
            setSuccess("Đăng tin thành công!")
            setTimeout(() => navigate("/seller/listings"), 1500)
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
                <button
                    type="button"
                    onClick={() => navigate("/seller/listings")}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    ← Quay lại
                </button>
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
                    <label className="block text-sm font-medium mb-1">
                        Sản phẩm <span className="text-red-500">*</span>
                    </label>
                    {loadingProducts ? (
                        <p className="text-sm text-gray-400">Đang tải sản phẩm...</p>
                    ) : products.length === 0 ? (
                        <p className="text-sm text-orange-500">
                            Bạn chưa có sản phẩm nào.{" "}
                            <a href="/seller/products" className="underline text-blue-600">
                                Tạo sản phẩm trước
                            </a>
                        </p>
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
