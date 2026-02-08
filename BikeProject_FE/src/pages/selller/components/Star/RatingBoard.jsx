import StarRating from "./StarRating"

function RatingBoard({ data }) {
    const { average, total, distribution } = data

    return (
        <div className="grid md:grid-cols-2 gap-6">

            {/* Tổng quan */}
            <div className="border rounded-xl p-6 bg-white text-center">
                <p className="text-blue-600 text-xl font-semibold">
                    {average.toFixed(1)}/5
                </p>

                <div className="flex justify-center mt-2">
                    <StarRating value={Math.round(average)} />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    {total} đánh giá
                </p>
            </div>

            {/* Phân bố đánh giá */}
            <div className="border rounded-xl p-6 bg-white">
                <h3 className="font-semibold mb-4">Phân bố đánh giá</h3>

                {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star]
                    const percent = total ? (count / total) * 100 : 0

                    return (
                        <div key={star} className="flex items-center gap-3 mb-2">
                            <span className="w-8 flex items-center gap-1">
                                {star}
                                <span className="text-yellow-400">★</span>
                            </span>

                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>

                            <span className="w-6 text-sm text-gray-600">
                                {count}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default RatingBoard