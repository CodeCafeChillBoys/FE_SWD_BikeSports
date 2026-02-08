import reviews from "../../../mock/reviews "
import RatingBoard from "../components/Star/RatingBoard"


function SellerDetailPage() {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                Đánh giá từ khách hàng
            </h1>
            <RatingBoard data={reviews} />
        </div>
    )
}

export default SellerDetailPage
