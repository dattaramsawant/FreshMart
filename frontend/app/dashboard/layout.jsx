import AdminPanel from '@/components/adminPanel'
import React from 'react'

const layout = ({children}) => {
    return (
        <div>
            <AdminPanel pageName="Dashboard">
                {children}
            </AdminPanel>
        </div>
    )
}

export default layout