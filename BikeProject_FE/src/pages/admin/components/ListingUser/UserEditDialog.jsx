import { useState } from "react"
import { Pencil, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Label } from "../../../../components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select"
import { userAPI } from "../../../../services/userAPI"

const roleMap = {
    "1": "Admin",
    "2": "Seller",
    "3": "Buyer",
    "4": "Inspector",
}

const genderMap = {
    1: "Nam",
    2: "Nữ",
}

const statusMap = {
    1: "Hoạt động",
    2: "Bị khóa",
    3: "Không hoạt động",
}

export default function UserEditDialog({ user, open, onOpenChange, onUpdated }) {
    const [form, setForm] = useState({
        userName: user?.userName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        fullName: user?.fullName || "",
        avatarUrl: user?.avatarUrl || "",
        address: user?.address || "",
        dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        gender: user?.gender ?? 0,
        status: user?.status ?? 1,
        roleId: user?.roleId || "3",
    })
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        try {
            const payload = {
                ...form,
                gender: Number(form.gender),
                status: Number(form.status),
            }
            console.log("📝 Updating user:", user.userId, payload)
            await userAPI.update(user.userId, payload)
            console.log("✅ User updated successfully")
            onUpdated?.()
            onOpenChange(false)
        } catch (err) {
            console.error("❌ Update user error:", err)
            setError(err.response?.data || "Cập nhật thất bại. Vui lòng thử lại.")
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Pencil size={18} />
                        Chỉnh sửa người dùng
                    </DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin cho <strong>{user?.fullName || user?.userName}</strong>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: userName + fullName */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="userName">Tên đăng nhập</Label>
                            <Input
                                id="userName"
                                value={form.userName}
                                onChange={(e) => handleChange("userName", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input
                                id="fullName"
                                value={form.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Row 2: email + phone */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phoneNumber">Số điện thoại</Label>
                            <Input
                                id="phoneNumber"
                                value={form.phoneNumber}
                                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Row 3: address */}
                    <div className="space-y-1.5">
                        <Label htmlFor="address">Địa chỉ</Label>
                        <Input
                            id="address"
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </div>

                    {/* Row 4: dob + gender */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={form.dateOfBirth}
                                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Giới tính</Label>
                            <Select
                                value={String(form.gender)}
                                onValueChange={(val) => handleChange("gender", Number(val))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(genderMap).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 5: role + status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label>Vai trò</Label>
                            <Select
                                value={form.roleId}
                                onValueChange={(val) => handleChange("roleId", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(roleMap).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label>Trạng thái</Label>
                            <Select
                                value={String(form.status)}
                                onValueChange={(val) => handleChange("status", Number(val))}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(statusMap).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
                    )}

                    {/* Footer */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={saving}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Đang lưu...
                                </>
                            ) : (
                                "Lưu thay đổi"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
