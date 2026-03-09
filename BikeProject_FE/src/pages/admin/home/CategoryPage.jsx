import { useEffect, useState, useCallback } from "react"
import CategoryHeader from "../components/ListingCategory/CategoryHeader"
import CategoryTable from "../components/ListingCategory/CategoryTable"
import CategoryEditDialog from "../components/ListingCategory/CategoryEditDialog"
import { categoryAPI } from "../../../services/categoryAPI"

function CategoryPage() {
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState("")

    // Dialog for adding new category
    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            console.log("🔄 Fetching categories...")
            const response = await categoryAPI.getAll()
            console.log("📦 Categories Response:", response)

            // Handle response - support different formats
            let categoryData = []

            if (Array.isArray(response)) {
                categoryData = response
            } else if (response && typeof response === 'object') {
                const arrayField = response.data || response.items || response.result || response.categories
                if (Array.isArray(arrayField)) {
                    categoryData = arrayField
                }
            }

            console.log("📦 Parsed categories:", categoryData.length, "items")
            setCategories(categoryData)
            setFilteredCategories(categoryData)

        } catch (err) {
            console.error("❌ Fetch categories error:", err)
            setError("Không thể tải danh sách loại xe.")
        } finally {
            setLoading(false)
        }
    }, [])

    // Fetch on mount
    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setFilteredCategories(categories)
            return
        }

        const keyword = searchKeyword.toLowerCase()
        const filtered = categories.filter(category =>
            (category.name || category.categoryName || "").toLowerCase().includes(keyword) ||
            (category.description || "").toLowerCase().includes(keyword)
        )
        setFilteredCategories(filtered)
    }

    const handleSearchChange = (value) => {
        setSearchKeyword(value)
        if (!value.trim()) {
            setFilteredCategories(categories)
        }
    }

    const handleAdd = () => {
        setAddDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setAddDialogOpen(open)
    }

    const handleUpdated = () => {
        fetchCategories()
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6">
            <CategoryHeader
                searchKeyword={searchKeyword}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
                onAdd={handleAdd}
            />

            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <CategoryTable
                categories={filteredCategories}
                loading={loading}
                onRefresh={fetchCategories}
            />

            {/* Add Dialog */}
            <CategoryEditDialog
                category={null}
                open={addDialogOpen}
                onOpenChange={handleDialogClose}
                onUpdated={handleUpdated}
            />
        </div>
    )
}

export default CategoryPage
