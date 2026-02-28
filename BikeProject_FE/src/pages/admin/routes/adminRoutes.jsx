import React from 'react'
import UserPage from '../home/UserPage'

import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layout/adminLayout'

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<UserPage />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes