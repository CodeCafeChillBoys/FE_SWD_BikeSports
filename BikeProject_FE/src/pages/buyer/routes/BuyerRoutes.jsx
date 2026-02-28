
import { Routes, Route } from "react-router-dom"
import BuyerLayout from "../layouts/BuyerLayout"
import OrdersPage from "../Home/OrdersPage"
import FavoritesPage from "../Home/FavoritesPage"
import ChatPage from "../Home/ChatPage"
import BikePage from "../Home/BikePage"
import BikeDetailPage from "../Home/BikeDetailsPage"
function BuyerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BuyerLayout />}>
                <Route index element={<BikePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="messages" element={<ChatPage />} />
                <Route path="bikes/:id" element={<BikeDetailPage />} />
            </Route>
        </Routes>
    )
}
export default BuyerRoutes