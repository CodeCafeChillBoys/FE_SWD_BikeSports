import { useEffect, useState, useCallback } from "react"
import BrandHeader from "../components/ListingBrand/BrandHeader"
import BrandTable from "../components/ListingBrand/BrandTable"
import BrandEditDialog from "../components/ListingBrand/BrandEditDialog"
import { brandAPI } from "../../../services/brandAPI"

function BrandPage() {
    const [brands, setBrands] = useState([])
    const [filteredBrands, setFilteredBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState("")

    // Dialog for adding new brand
    const [addDialogOpen, setAddDialogOpen] = useState(false)

    const fetchBrands = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            console.log("🔄 Fetching brands...")
            const response = await brandAPI.getAll()
            console.log("📦 Brands Response:", response)

            // Handle response - support different formats
            let brandData = []

            if (Array.isArray(response)) {
                brandData = response
            } else if (response && typeof response === 'object') {
                const arrayField = response.data || response.items || response.result || response.brands
                if (Array.isArray(arrayField)) {
                    brandData = arrayField
                }
            }

            console.log("📦 Parsed brands:", brandData.length, "items")
            setBrands(brandData)
            setFilteredBrands(brandData)

        } catch (err) {
            console.error("❌ Fetch brands error:", err)
            setError("Không thể tải danh sách thương hiệu.")
        } finally {
            setLoading(false)
        }
    }, [])

    // Fetch on mount
    useEffect(() => {
        fetchBrands()
    }, [fetchBrands])

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            setFilteredBrands(brands)
            return
        }

        const keyword = searchKeyword.toLowerCase()
        const filtered = brands.filter(brand =>
            (brand.name || brand.brandName || "").toLowerCase().includes(keyword) ||
            (brand.description || "").toLowerCase().includes(keyword)
        )
        setFilteredBrands(filtered)
    }

    const handleSearchChange = (value) => {
        setSearchKeyword(value)
        if (!value.trim()) {
            setFilteredBrands(brands)
        }
    }

    const handleAdd = () => {
        setAddDialogOpen(true)
    }

    const handleDialogClose = (open) => {
        setAddDialogOpen(open)
    }

    const handleUpdated = () => {
        fetchBrands()
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6">
            <BrandHeader
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

            <BrandTable
                brands={filteredBrands}
                loading={loading}
                onRefresh={fetchBrands}
            />

            {/* Add Dialog */}
            <BrandEditDialog
                brand={null}
                open={addDialogOpen}
                onOpenChange={handleDialogClose}
                onUpdated={handleUpdated}
            />
        </div>
    )
}

export default BrandPage
