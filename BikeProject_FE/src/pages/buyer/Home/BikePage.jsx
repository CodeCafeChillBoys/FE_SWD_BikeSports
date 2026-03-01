import { useEffect, useMemo, useState } from 'react'
import SearchSection from '../components/search/SearchSection'
import BikeList from '../components/bike/BikeList'
import listingApi from '../../../services/listingAPI'
import { filterBikes } from '../../../services/filterBikes'

function BikePage() {
    const [bikes, setBikes] = useState([])
    const [filters, setFilters] = useState({})
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)

    // =========================
    // FETCH LISTINGS
    // =========================
    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true)
                const res = await listingApi.getAllListings()

                // Lấy data đúng cách
                const data = res || []
                console.log('API Response:', res)
                console.log('All listings:', data)

                // Chỉ hiển thị listing đã duyệt
                const approvedOnly = data.filter(x => x.status === 2)
                console.log('Approved listings (status=2):', approvedOnly)
                console.log('Total: All=' + data.length + ', Approved=' + approvedOnly.length)

                setBikes(approvedOnly)
            } catch (error) {
                console.error("Fetch listings error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchListings()
    }, [])

    // =========================
    // FILTER
    // =========================
    const filteredBikes = useMemo(() => {
        if (!Array.isArray(bikes)) return []

        // Sử dụng filterBikes function nhưng cần map dữ liệu từ API sang format của filter
        const bikeData = bikes.map(bike => ({
            ...bike,
            title: bike.productName || bike.title,
            brand: bike.sellerName || bike.brand,
            type: bike.type,
            condition: bike.condition,
            price: bike.price,
            description: bike.description
        }))

        // Apply bộ lọc từ SearchSection
        let result = filterBikes(bikeData, {
            ...filters,
            keyword: keyword.trim()
        })

        return result
    }, [bikes, keyword, filters])

    return (
        <div className="p-6">
            <SearchSection
                bikes={bikes}
                filters={filters}
                setFilters={setFilters}
                keyword={keyword}
                setKeyword={setKeyword}
            />

            {loading ? (
                <div className="mt-6">Loading...</div>
            ) : (
                <BikeList bikes={filteredBikes} />
            )}
        </div>
    )
}

export default BikePage