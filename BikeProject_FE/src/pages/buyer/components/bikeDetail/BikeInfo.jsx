

function BikeInfo({ bike }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h1 className="text-2xl font-bold">
                {bike.productName}
            </h1>

            <p className="text-gray-500">
                {bike.brandName} • {bike.categoryName}
            </p>

            <p className="text-gray-700">
                {bike.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Tình trạng:</b> {bike.condition}</p>
                <p><b>Khung:</b> {bike.frameSize}</p>
                <p><b>Chất liệu:</b> {bike.frameMaterial}</p>
                <p><b>Bánh xe:</b> {bike.wheelSize}</p>
                <p><b>Phanh:</b> {bike.brakeType}</p>
                <p><b>Bộ số:</b> {bike.gearSystem}</p>
                <p><b>Màu:</b> {bike.color}</p>
                <p><b>Năm:</b> {bike.yearOfManufacture}</p>
                <p><b>Cân nặng:</b> {bike.weight} kg</p>
                <p><b>Lượt xem:</b> {bike.viewCount}</p>
            </div>
        </div>
    )
}
export default BikeInfo