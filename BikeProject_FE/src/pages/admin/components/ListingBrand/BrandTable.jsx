import { useState } from "react"
import { Pencil, Package } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table"
import { Button } from "../../../../components/ui/button"
import BrandEditDialog from "./BrandEditDialog"

export default function BrandTable({ brands, loading, onRefresh }) {
    const [editingBrand, setEditingBrand] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleEdit = (brand) => {
        setEditingBrand(brand)
        setDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setDialogOpen(open)
        if (!open) setEditingBrand(null)
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
                Đang tải thương hiệu...
            </div>
        )
    }

    if (!brands || brands.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 border rounded-xl bg-white">
                <Package size={40} className="mx-auto mb-2 opacity-40" />
                Không tìm thấy thương hiệu nào.
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-xl bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80">
                            <TableHead>Tên thương hiệu</TableHead>
                            <TableHead>Mô tả</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brands.map((brand, index) => (
                            <TableRow key={brand.brandId || brand.id || index}>
                                <TableCell>
                                    <div className="font-medium">{brand.name || brand.brandName || "—"}</div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600 max-w-md truncate">
                                    {brand.description || "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(brand)}
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
            {editingBrand && (
                <BrandEditDialog
                    brand={editingBrand}
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onUpdated={handleUpdated}
                />
            )}
        </>
    )
}
