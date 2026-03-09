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
import { categoryAPI } from "../../../../services/categoryAPI"

export default function CategoryEditDialog({ category, open, onOpenChange, onUpdated }) {
    const [formData, setFormData] = useState({
        categoryName: category?.name || category?.categoryName || "",
        description: category?.description || "",
        isActive: category?.isActive ?? true,
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
            if (category?.categoryId) {
                // Update existing category
                await categoryAPI.update(category.categoryId, formData)
            } else {
                // Create new category
                await categoryAPI.create(formData)
            }
            onUpdated?.()
            onOpenChange(false)
        } catch (err) {
            console.error("❌ Error saving category:", err)
            setError(err.response?.data?.message || "Không thể lưu loại xe")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {category?.categoryId ? "Chỉnh sửa loại xe" : "Thêm loại xe mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Name */}
                    <div>
                        <Label htmlFor="categoryName">Tên loại xe <span className="text-red-500">*</span></Label>
                        <Input
                            id="categoryName"
                            value={formData.categoryName}
                            onChange={(e) => handleChange("categoryName", e.target.value)}
                            placeholder="Nhập tên loại xe"
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
