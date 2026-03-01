import { Routes, Route } from "react-router-dom"
import DashboardPage from "../home/DashboardPage"
import ListingPage from "../home/ListingPage"
import InspectorLayout from "../layouts/inspectorLayout"
import BikeDetailPage from "../../buyer/Home/BikeDetailsPage"

function InspectorRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InspectorLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="listings" element={<ListingPage />} />
                <Route path="bikes/:id" element={<BikeDetailPage />} />
            </Route>
        </Routes>
    )
}

export default InspectorRoutes