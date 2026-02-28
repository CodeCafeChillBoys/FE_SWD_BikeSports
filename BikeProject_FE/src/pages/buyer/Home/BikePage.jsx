import { useEffect, useMemo, useState } from 'react'
import SearchSection from '../components/search/SearchSection'
import productApi from '../../../services/productApi'
import BikeList from '../components/bike/BikeList'


function BikePage() {
    const [bikes, setBikes] = useState([])
    const [filters, setFilters] = useState({})
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await productApi.getAllProducts()
                setBikes(res)
                console.log(res);

            } catch (error) {
                console.error("Fetch products error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const filteredBikes = useMemo(() => {
        if (!Array.isArray(bikes)) return []

        return bikes.filter((bike) => {
            const matchKeyword =
                !keyword ||
                bike.productName
                    ?.toLowerCase()
                    .includes(keyword.toLowerCase())

            const matchCategory =
                !filters.categoryId ||
                bike.categoryId === filters.categoryId

            return matchKeyword && matchCategory
        })
    }, [bikes, keyword, filters])

    return (
        <div className="p-6">
            <SearchSection
                filters={filters}
                setFilters={setFilters}
                keyword={keyword}
                setKeyword={setKeyword}
            />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <BikeList bikes={filteredBikes} />
            )}
        </div>
    )
}

export default BikePage