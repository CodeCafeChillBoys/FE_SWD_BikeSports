import { ShieldCheck, AlertCircle } from 'lucide-react'

function BikeInfo({ bike }) {
    // Get inspection status badge: 1 = Not Inspected | 2 = Inspected
    const getStatusBadge = () => {
        switch (bike.inspection_status) {
            case 1:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                        <AlertCircle size={16} />
                        Chưa kiểm định
                    </div>
                )
            case 2:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        <ShieldCheck size={16} />
                        Đã kiểm định
                    </div>

                )
            default:
                return null
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    {bike.productName}
                </h1>
                {getStatusBadge()}
            </div>

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