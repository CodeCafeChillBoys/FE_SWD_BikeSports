import { useEffect, useState, useCallback } from "react"
import UserHeader from "../components/ListingUser/UserHeader"
import UserTable from "../components/ListingUser/UserTable"
import { Button } from "../../../components/ui/button"
import { userAPI } from "../../../services/userAPI"
import { ChevronLeft, ChevronRight } from "lucide-react"

function UserPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({
        FullName: "",
        Email: "",
        PhoneNumber: "",
        RoleId: "",
    })

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            // Build query params — chỉ gửi field có giá trị
            const params = {
                PageNumber: page,
                PageSize: pageSize,
            }
            if (filters.FullName) params.FullName = filters.FullName
            if (filters.Email) params.Email = filters.Email
            if (filters.PhoneNumber) params.PhoneNumber = filters.PhoneNumber
            if (filters.RoleId) params.RoleId = filters.RoleId

            console.log("🔄 Fetching users with params:", params)
            const response = await userAPI.search(params)
            console.log("📦 Users Response:", response)
            console.log("📦 Response type:", typeof response, "| isArray:", Array.isArray(response))
            if (response && typeof response === 'object') {
                console.log("📦 Response keys:", Object.keys(response))
            }

            // Xử lý response — hỗ trợ nhiều dạng
            let userData = []
            let total = 1

            if (Array.isArray(response)) {
                userData = response
            } else if (response && typeof response === 'object') {
                // Tìm array users trong response (có thể nằm ở data, items, result, users, ...)
                const arrayField = response.data || response.items || response.result || response.users
                if (Array.isArray(arrayField)) {
                    userData = arrayField
                    total = response.totalPages || response.totalPage || Math.ceil((response.totalCount || response.total || userData.length) / pageSize)
                } else if (response.userId || response.userName) {
                    // Response is a single user object
                    userData = [response]
                } else {
                    // Fallback: try to find any array property
                    const firstArray = Object.values(response).find(v => Array.isArray(v))
                    if (firstArray) {
                        userData = firstArray
                        total = response.totalPages || response.totalPage || 1
                    }
                }
            }

            console.log("📦 Parsed users:", userData.length, "items")
            if (userData.length > 0) {
                console.log("📦 First user keys:", Object.keys(userData[0]))
                console.log("📦 First user sample:", userData[0])
            }

            setUsers(userData)
            setTotalPages(total)

        } catch (err) {
            console.error("❌ Fetch users error:", err)
            if (err.response?.status === 404) {
                setUsers([])
                setTotalPages(1)
            } else {
                setError("Không thể tải danh sách người dùng.")
            }
        } finally {
            setLoading(false)
        }
    }, [page, pageSize, filters])

    // Fetch on mount and when page changes
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handleSearch = () => {
        setPage(1) // Reset to page 1 on new search
        fetchUsers()
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-6">
            {/* Header with filters */}
            <UserHeader
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />

            {/* Error */}
            {error && (
                <div className="text-center py-4 text-red-500 bg-red-50 rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            {/* User table */}
            <UserTable
                users={users}
                loading={loading}
                onRefresh={fetchUsers}
            />

            {/* Pagination */}
            {!loading && users.length > 0 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-500">
                        Trang {page} / {totalPages} • {users.length} người dùng
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page <= 1}
                        >
                            <ChevronLeft size={16} />
                            Trước
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                        >
                            Sau
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserPage