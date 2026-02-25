import { Navigate, Route, Routes } from "react-router-dom"
import DashboardPage from "../home/DashboardPage"
import InspectorLayout from "../layouts/inspectorLayout"

function InspectorRoutes() {
    return (
        <Routes>
            {/* Redirect root */}
            <Route path="/" element={<Navigate to="/inspector" replace />} />

            {/* Inspector layout wrapper */}
            <Route path="/inspector" element={<InspectorLayout />}>
                <Route index element={<DashboardPage />} />
                {/* Sau này thêm route con ở đây */}
                {/* <Route path="reports" element={<ReportsPage />} /> */}
            </Route>
        </Routes>
    )
}

export default InspectorRoutes