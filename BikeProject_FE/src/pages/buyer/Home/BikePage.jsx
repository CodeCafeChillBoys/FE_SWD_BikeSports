import { useEffect, useMemo, useState } from 'react'
import SearchSection from '../components/search/SearchSection'
import BikeList from '../components/bike/BikeList'
import listingApi from '../../../services/listingAPI'
import productApi from '../../../services/productApi'
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

                // Chỉ hiển thị listing đã hoạt động (status = 1)
                const activeOnly = data.filter(x => x.status === 1)

                // 🎯 Nếu listing không có featuredImage, fetch từ product
                const listingsWithImages = await Promise.all(
                    activeOnly.map(async (listing) => {
                        if (!listing.featuredImage && listing.productId) {
                            try {
                                const productRes = await productApi.getProductDetail(listing.productId)
                                const productData = productRes?.data || productRes
                                return {
                                    ...listing,
                                    featuredImage: productData?.featuredImage || listing.featuredImage
                                }
                            } catch (err) {
                                console.warn(`Cannot fetch product ${listing.productId}:`, err)
                                return listing
                            }
                        }
                        return listing
                    })
                )

                console.log('Active listings (status=1):', listingsWithImages)
                console.log('Total: All=' + data.length + ', Active=' + activeOnly.length)

                // Sort theo thời gian mới nhất lên đầu (updatedAt hoặc createdAt)
                listingsWithImages.sort((a, b) => {
                    const dateA = new Date(a.updatedAt || a.createdAt || 0)
                    const dateB = new Date(b.updatedAt || b.createdAt || 0)
                    return dateB - dateA
                })

                // 🔍 Debug: Kiểm tra xem listing có featuredImage không
                if (listingsWithImages.length > 0) {
                    console.log('📸 First listing images:', {
                        featuredImage: listingsWithImages[0]?.featuredImage,
                        productImage: listingsWithImages[0]?.productImage,
                        image: listingsWithImages[0]?.image
                    })
                }

                setBikes(listingsWithImages)
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