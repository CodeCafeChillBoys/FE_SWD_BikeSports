import { Outlet } from "react-router-dom"
import Header from "../../../layouts/seller/Header"
function SellerLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default SellerLayout
