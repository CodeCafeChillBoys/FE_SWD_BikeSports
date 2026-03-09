import { Search, Plus } from "lucide-react"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"

function CategoryHeader({ searchKeyword, onSearchChange, onSearch, onAdd }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <div className="space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Quản lý Loại xe
                </h1>
                <Button onClick={onAdd}>
                    <Plus size={16} />
                    Thêm loại xe
                </Button>
            </div>

            {/* Search */}
            <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <div className="flex-1 min-w-[300px] relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Tìm kiếm loại xe..."
                        value={searchKeyword || ""}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Button type="submit">
                    <Search size={16} />
                    Tìm kiếm
                </Button>
            </form>
        </div>
    )
}

export default CategoryHeader
