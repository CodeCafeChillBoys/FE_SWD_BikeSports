import React from 'react'
import DashboardPage from '../../pages/selller/Home/DashboardPage'

function MainLayout() {
    return (
        <main className='bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto px-4 py-6 space-y-6'>
                <DashboardPage />
            </div>
        </main>
    )
}

export default MainLayout