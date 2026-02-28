function BikeGallery({ featuredImage, inspectionStatus }) {
    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247';
    return (

        <div className="relative flex justify-center bg-gray-100 rounded-xl">

            {/* Ảnh chính */}
            <img
                src={`${API_BASE_URL}/${featuredImage}`}
                alt="bike"
                className="max-h-[350px] w-auto object-contain"
            />

            {/* Badge kiểm định */}
            {inspectionStatus === 1 && (
                <span className="absolute top-3 left-3 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                    Đã kiểm định
                </span>
            )}
        </div>
    )
}

export default BikeGallery