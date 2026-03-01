import BikeCard from './BikeCard'

function BikeList({ bikes }) {
    if (!bikes || bikes.length === 0) {
        return (
            <p className="mt-6 text-gray-500">
                Không tìm thấy xe phù hợp
            </p>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {bikes.map((bike) => (
                <BikeCard
                    key={bike.listingId}
                    bike={bike}
                />
            ))}
        </div>
    )
}

export default BikeList