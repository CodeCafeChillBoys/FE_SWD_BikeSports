import { useState } from "react"
import { Pencil, Tag } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table"
import { Button } from "../../../../components/ui/button"
import CategoryEditDialog from "./CategoryEditDialog"

export default function CategoryTable({ categories, loading, onRefresh }) {
    const [editingCategory, setEditingCategory] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleEdit = (category) => {
        setEditingCategory(category)
        setDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setDialogOpen(open)
        if (!open) setEditingCategory(null)
    }

    const handleUpdated = () => {
        onRefresh?.()
    }

    const formatDate = (value) => {
        if (!value) return "—"
        return new Date(value).toLocaleDateString("vi-VN")
    }

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
                Đang tải loại xe...
            </div>
        )
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 border rounded-xl bg-white">
                <Tag size={40} className="mx-auto mb-2 opacity-40" />
                Không tìm thấy loại xe nào.
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-xl bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80">
                            <TableHead>Tên loại xe</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow key={category.categoryId || category.id || index}>
                                <TableCell>
                                    <div className="font-medium">{category.name || category.categoryName || "—"}</div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600 max-w-md truncate">
                                    {category.description || "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(category)}
                                        className="text-gray-500 hover:text-gray-900"
                                    >
                                        <Pencil size={14} />
                                        Sửa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            {editingCategory && (
                <CategoryEditDialog
                    category={editingCategory}
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onUpdated={handleUpdated}
                />
            )}
        </>
    )
}
