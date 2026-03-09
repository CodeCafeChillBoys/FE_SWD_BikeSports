import { useState } from "react"
import { Button } from "../../../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../../components/ui/dialog"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import { brandAPI } from "../../../../services/brandAPI"

export default function BrandEditDialog({ brand, open, onOpenChange, onUpdated }) {
    const [formData, setFormData] = useState({
        brandName: brand?.name || brand?.brandName || "",
        description: brand?.description || "",
        isActive: brand?.isActive ?? true,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (brand?.brandId) {
                // Update existing brand
                await brandAPI.update(brand.brandId, formData)
            } else {
                // Create new brand
                await brandAPI.create(formData)
            }
            onUpdated?.()
            onOpenChange(false)
        } catch (err) {
            console.error("❌ Error saving brand:", err)
            setError(err.response?.data?.message || "Không thể lưu thương hiệu")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {brand?.brandId ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Name */}
                    <div>
                        <Label htmlFor="brandName">Tên thương hiệu <span className="text-red-500">*</span></Label>
                        <Input
                            id="brandName"
                            value={formData.brandName}
                            onChange={(e) => handleChange("brandName", e.target.value)}
                            placeholder="Nhập tên thương hiệu"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Mô tả</Label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Nhập mô tả (tùy chọn)"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-600 px-3 py-2 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
