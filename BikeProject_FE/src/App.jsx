import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AdminRoutes from './pages/admin/routes/adminRoutes'
import BuyerRoutes from './pages/buyer/routes/BuyerRoutes'
import InspectorRoutes from './pages/inspector/routes/inspectorRoutes'
import SellerRoutes from './pages/selller/routes/SellerRoutes'
import LoginPage from './pages/login/home/loginPage'
import UnauthorizedPage from './pages/unauthorized/UnauthorizedPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* BUYER */}
        <Route
          path="/buyer/*"
          element={
            <ProtectedRoute allowedRoles={["Buyer"]}>
              <BuyerRoutes />
            </ProtectedRoute>
          }
        />

        {/* SELLER */}
        <Route
          path="/seller/*"
          element={
            <ProtectedRoute allowedRoles={["Seller"]}>
              <SellerRoutes />
            </ProtectedRoute>
          }
        />

        {/* INSPECTOR */}
        <Route
          path="/inspector/*"
          element={
            <ProtectedRoute allowedRoles={["Inspector"]}>
              <InspectorRoutes />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App