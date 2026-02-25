import { useMemo, useState } from 'react'
import bikes from '../../../mock/bikes'
import SearchSection from '../components/search/SearchSection'
import BikeList from '../components/bike/BikeList'
import { filterBikes } from '../../../services/filterBikes'

function BikePage() {
    const [filters, setFilters] = useState({})

    const [keyword, setKeyword] = useState(filters.keyword || '')


    const filteredBikes = useMemo(() => {
        return filterBikes(bikes, filters)
    }, [filters])
    return (
        <div className="p-6">
            <SearchSection filters={filters} setFilters={setFilters} keyword={keyword} setKeyword={setKeyword} />
            <BikeList bikes={filteredBikes} />
        </div>
    )
}

export default BikePage

