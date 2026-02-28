import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BikeGallery from "../components/bikeDetail/BikeGallery"
import BikeInfo from "../components/bikeDetail/BikeInfo"
import SellerCard from "../components/bikeDetail/SellerCard"
import productApi from "../../../services/productApi"


function BikeDetailPage() {
    const { id } = useParams()
    const [bike, setBike] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await productApi.getProductDetail(id)
                setBike(res)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchDetail()
    }, [id])

    if (loading) return <p>Đang tải...</p>
    if (!bike) return <p>Không tìm thấy xe</p>

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-8 space-y-6">

                {/* Hiện backend chưa có images */}
                <BikeGallery
                    featuredImage={bike.featuredImage}
                    inspectionStatus={bike.inspectionStatus}
                />

                <BikeInfo bike={bike} />
            </div>

            {/* RIGHT */}
            <div className="col-span-12 lg:col-span-4">
                <SellerCard bike={bike} />
            </div>
        </div>
    )
}

export default BikeDetailPage