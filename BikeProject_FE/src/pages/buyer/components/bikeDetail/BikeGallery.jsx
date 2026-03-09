function BikeGallery({ featuredImage, inspectionStatus }) {
    const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || 'https://localhost:7247';

    // 🎯 Xử lý hình ảnh với fallback
    const imageSrc = featuredImage
        ? (featuredImage.startsWith('http') ? featuredImage : `${API_BASE_URL}/${featuredImage}`)
        : null

    return (
        <div className="relative flex justify-center bg-gray-100 rounded-xl">

            {/* Ảnh chính */}
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="bike"
                    className="max-h-[350px] w-auto object-contain"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://placehold.co/400x350?text=No+Image"
                    }}
                />
            ) : (
                <div className="max-h-[350px] h-[350px] w-full flex items-center justify-center text-gray-400">
                    Không có ảnh
                </div>
            )}

            {/* Badge kiểm định */}
            {inspectionStatus === 2 && (
                <span className="absolute top-3 left-3 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full shadow flex items-center gap-1">
                    Đã kiểm định
                </span>
            )}
        </div>
    )
}

export default BikeGallery