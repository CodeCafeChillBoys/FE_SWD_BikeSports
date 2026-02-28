import { Routes, Route } from "react-router-dom"
import DashboardPage from "../home/DashboardPage"
import InspectorLayout from "../layouts/inspectorLayout"

function InspectorRoutes() {
    return (
        <Routes>
            <Route path="/" element={<InspectorLayout />}>
                <Route index element={<DashboardPage />} />
                {/* Sau này thêm route con ở đây */}
                {/* <Route path="reports" element={<ReportsPage />} /> */}
            </Route>
        </Routes>
    )
}

export default InspectorRoutes