import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
    return (
        <main>
            <Sidebar />
            <main className="flex-1 p-4 lg:ml-64">
                dashboard page
            </main>
        </main>
    )
}

export default page
