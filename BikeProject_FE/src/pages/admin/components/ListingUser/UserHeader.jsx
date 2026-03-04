import { Search, Filter } from "lucide-react"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select"

function UserHeader({ filters, onFilterChange, onSearch }) {

    const handleInputChange = (field, value) => {
        onFilterChange({ ...filters, [field]: value })
    }

    const handleRoleChange = (value) => {
        onFilterChange({ ...filters, RoleId: value === "all" ? "" : value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Quản lý người dùng
                </h1>
            </div>

            {/* Search & Filters */}
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
                {/* Search by name/email */}
                <div className="flex-1 min-w-[200px] relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Tìm theo tên..."
                        value={filters.FullName || ""}
                        onChange={(e) => handleInputChange("FullName", e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="min-w-[200px]">
                    <Input
                        placeholder="Tìm theo email..."
                        value={filters.Email || ""}
                        onChange={(e) => handleInputChange("Email", e.target.value)}
                    />
                </div>

                <div className="min-w-[200px]">
                    <Input
                        placeholder="Tìm theo SĐT..."
                        value={filters.PhoneNumber || ""}
                        onChange={(e) => handleInputChange("PhoneNumber", e.target.value)}
                    />
                </div>

                {/* Role filter */}
                <div className="w-[160px]">
                    <Select
                        value={filters.RoleId || "all"}
                        onValueChange={handleRoleChange}
                    >
                        <SelectTrigger>
                            <Filter size={14} className="mr-1 text-gray-400" />
                            <SelectValue placeholder="Vai trò" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả vai trò</SelectItem>
                            <SelectItem value="1">Admin</SelectItem>
                            <SelectItem value="2">Seller</SelectItem>
                            <SelectItem value="3">Buyer</SelectItem>
                            <SelectItem value="4">Inspector</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit">
                    <Search size={16} />
                    Tìm kiếm
                </Button>
            </form>
        </div>
    )
}

export default UserHeader