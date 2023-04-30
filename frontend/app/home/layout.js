import Navebar from '@/components/navbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <>
            <Navebar />
            {children}
        </>
    )
}

export default layout