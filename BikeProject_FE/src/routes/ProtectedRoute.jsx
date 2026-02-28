import { Navigate } from "react-router-dom"

// Map Role ID -> Role Name
const roleMap = {
    "1": "Admin",
    "2": "Seller",
    "3": "Buyer",
    "4": "Inspector"
}

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("accessToken")
    const roleId = localStorage.getItem("role")

    // ❌ Chưa login
    if (!token) {
        return <Navigate to="/login" replace />
    }

    const roleName = roleMap[roleId]

    // ❌ Sai quyền
    if (allowedRoles && !allowedRoles.includes(roleName)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}