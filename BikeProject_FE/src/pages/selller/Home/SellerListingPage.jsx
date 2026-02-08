import { useState } from "react"

import bikes from "../../../mock/bikes"
import ListingCard from "../components/Listing/ListingCard"
import StatusTabs from "../components/Listing/StatusTabs"

export default function SellerListingsPage() {
    const currentSellerId = "u2" // mock seller login
    const [tab, setTab] = useState("active")

    const sellerBikes = bikes.filter(
        bike => bike.sellerId === currentSellerId
    )

    const filteredBikes = sellerBikes.filter(bike => {
        if (tab === "active") return bike.status === "active" && !bike.sold
        if (tab === "hidden") return bike.status === "hidden"
        if (tab === "sold") return bike.sold
        return true
    })

    const counts = {
        active: sellerBikes.filter(b => b.status === "active" && !b.sold).length,
        hidden: sellerBikes.filter(b => b.status === "hidden").length,
        sold: sellerBikes.filter(b => b.sold).length,
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Quản lý tin đăng</h1>

            <StatusTabs
                current={tab}
                onChange={setTab}
                counts={counts}
            />

            {filteredBikes.map(bike => (
                <ListingCard key={bike.id} item={bike} />
            ))}
        </div>
    )
}
