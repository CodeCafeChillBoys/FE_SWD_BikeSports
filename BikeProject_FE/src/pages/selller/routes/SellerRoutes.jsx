import { Routes, Route } from "react-router-dom"
import DashboardPage from "../Home/DashboardPage"
import CreateListingPage from "../Home/CreateListingPage"
import SellerListingsPage from "../Home/SellerListingPage"
import SellerLayout from "../layouts/sellerLayout"
import OrderPage from "../Home/OrderPage"
import ProductPage from "../Home/ProductPage"

function SellerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SellerLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="listings/new" element={<CreateListingPage />} />
                <Route path="listings" element={<SellerListingsPage />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="orders" element={<OrderPage />} />
            </Route>
        </Routes>
    )
}
export default SellerRoutes
