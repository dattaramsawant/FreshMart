import Register from '@/components/register'
import React from 'react'

const layout = ({children}) => {
    return (
        <Register
            pageName="Sign In"
        >
            {children}
        </Register>
    )
}

export default layout