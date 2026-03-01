export function filterBikes(bikes, filters) {
    let result = [...bikes];

    //Search keyWord
    if (filters.keyword && filters.keyword.trim() !== '') {
        const keyword = filters.keyword.toLowerCase();
        result = result.filter(bike =>
            (bike.title?.toLowerCase().includes(keyword)) ||
            (bike.brand?.toLowerCase().includes(keyword)) ||
            (bike.description?.toLowerCase().includes(keyword))
        )
    }

    // Filter theo loại xe
    if (filters.type && filters.type !== 'Tất cả loại xe') {
        result = result.filter(bike => bike.type === filters.type)
    }

    //  Filter theo hãng
    if (filters.brand && filters.brand !== 'Tất cả hãng') {
        result = result.filter(bike => bike.brand === filters.brand)
    }

    // Filter theo tình trạng
    if (filters.condition && filters.condition !== 'Tất cả tình trạng') {
        result = result.filter(bike => bike.condition === filters.condition)
    }

    // Filter theo giá (<= giá chọn)
    if (filters.price && filters.price !== 'Tất cả giá') {
        const maxPrice = typeof filters.price === 'string' ? parseInt(filters.price) : filters.price
        result = result.filter(bike => {
            const bikePrice = typeof bike.price === 'string' ? parseInt(bike.price) : bike.price
            return bikePrice <= maxPrice
        })
    }

    return result
}