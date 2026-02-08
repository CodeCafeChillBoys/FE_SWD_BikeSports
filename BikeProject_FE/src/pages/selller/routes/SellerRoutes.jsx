import { Routes, Route, Navigate } from "react-router-dom"
import SellerLayout from "../layouts/SellerLayout"
import DashboardPage from "../Home/DashboardPage"

function SellerRoutes() {
    return (
        <Routes>
            {/* redirect gốc */}
            <Route path="/" element={<Navigate to="/seller" />} />

            <Route path="/seller" element={<SellerLayout />}>
                <Route index element={<DashboardPage />} />
                {/* <Route path="listings" element={<SellerListings />} /> */}
                {/* <Route path="orders" element={<SellerOrders />} />
                <Route path="messages" element={<SellerMessages />} />
                <Route path="reviews" element={<SellerReviews />} /> */}
            </Route>
        </Routes>
    )
}

export default SellerRoutes
