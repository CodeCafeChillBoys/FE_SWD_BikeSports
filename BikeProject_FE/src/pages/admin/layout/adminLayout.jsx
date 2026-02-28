import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../../layouts/admin/header'

function AdminLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
        </>
    )
}

export default AdminLayout