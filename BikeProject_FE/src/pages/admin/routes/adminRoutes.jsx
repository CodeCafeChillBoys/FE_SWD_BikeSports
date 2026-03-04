import React from 'react'
import UserPage from '../home/UserPage'
import ListingPage from '../home/ListingPage'

import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layout/adminLayout'

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<UserPage />} />
                <Route path="listings" element={<ListingPage />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes