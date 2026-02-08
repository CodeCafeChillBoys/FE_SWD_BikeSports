import { Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "../Home/DashboardPage"
import CreateListingPage from "../Home/CreateListingPage"
import SellerListingsPage from "../Home/SellerListingPage"
import SellerLayout from "../layouts/sellerLayout"
import OrderPage from "../Home/OrderPage"

function SellerRoutes() {
    return (
        <Routes>
            {/* redirect gốc */}
            <Route path="/" element={<Navigate to="/seller" />} />

            <Route path="/seller" element={<SellerLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="listings/new" element={<CreateListingPage />} />
                <Route path="listings" element={<SellerListingsPage />} />
                <Route path="orders" element={<OrderPage />} />
                {/* // <Route path="messages" element={<SellerMessages />} />
                // <Route path="reviews" element={<SellerReviews />} /> */}
            </Route>
        </Routes>
    )
}
export default SellerRoutes
