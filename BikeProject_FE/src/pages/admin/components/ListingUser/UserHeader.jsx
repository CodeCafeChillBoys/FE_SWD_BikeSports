import { Search } from "lucide-react"
import { useState } from "react"

function UserHeader({ onSearch }) {
    const [keyword, setKeyword] = useState("")

    const handleChange = (e) => {
        const value = e.target.value
        setKeyword(value)
        onSearch(value)
    }

    return (
        <div className="space-y-4">

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800">
                Quản lý người dùng
            </h1>

            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    value={keyword}
                    onChange={handleChange}
                    className="
                        w-full
                        pl-11 pr-4 py-3
                        bg-gray-100
                        rounded-xl
                        text-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-500
                        transition
                    "
                />
            </div>

        </div>
    )
}

export default UserHeader