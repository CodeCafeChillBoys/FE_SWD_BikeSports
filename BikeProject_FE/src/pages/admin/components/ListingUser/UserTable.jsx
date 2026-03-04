import { useState } from "react"
import { Pencil, User } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table"
import { Badge } from "../../../../components/ui/badge"
import { Button } from "../../../../components/ui/button"
import UserEditDialog from "./UserEditDialog"

const roleMap = {
    "1": { label: "Admin", variant: "destructive" },
    "2": { label: "Seller", variant: "info" },
    "3": { label: "Buyer", variant: "success" },
    "4": { label: "Inspector", variant: "warning" },
}

const statusMap = {
    1: { label: "Hoạt động", variant: "success" },
    2: { label: "Bị khóa", variant: "destructive" },
    3: { label: "Không hoạt động", variant: "secondary" },
}

const genderMap = {
    0: "—",
    1: "Nam",
    2: "Nữ",
}

export default function UserTable({ users, loading, onRefresh }) {
    const [editingUser, setEditingUser] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleEdit = (user) => {
        setEditingUser(user)
        setDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setDialogOpen(open)
        if (!open) setEditingUser(null)
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
                Đang tải người dùng...
            </div>
        )
    }

    if (!users || users.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400 border rounded-xl bg-white">
                <User size={40} className="mx-auto mb-2 opacity-40" />
                Không tìm thấy người dùng nào.
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-xl bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80">

                            <TableHead>Họ tên</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>SĐT</TableHead>
                            <TableHead>Vai trò</TableHead>
                            <TableHead>Giới tính</TableHead>
                            <TableHead>Ngày tạo</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => {
                            const role = roleMap[String(user.roleId)] || { label: "Khác", variant: "secondary" }
                            const status = statusMap[Number(user.status)] ?? statusMap[user.status] ?? { label: "Khác", variant: "secondary" }

                            return (
                                <TableRow key={user.userId || user.id || index}>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {user.avatarUrl ? (
                                                    <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <User size={16} className="text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{user.fullName || "—"}</p>
                                                <p className="text-xs text-gray-400">@{user.userName}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{user.email}</TableCell>
                                    <TableCell className="text-sm">{user.phoneNumber || "—"}</TableCell>
                                    <TableCell>
                                        <Badge variant={role.variant}>{role.label}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">{genderMap[user.gender] || "—"}</TableCell>
                                    <TableCell className="text-sm text-gray-500">{formatDate(user.createdAt)}</TableCell>
                                    <TableCell>
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                            className="text-gray-500 hover:text-gray-900"
                                        >
                                            <Pencil size={14} />
                                            Sửa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            {editingUser && (
                <UserEditDialog
                    user={editingUser}
                    open={dialogOpen}
                    onOpenChange={handleDialogClose}
                    onUpdated={handleUpdated}
                />
            )}
        </>
    )
}
