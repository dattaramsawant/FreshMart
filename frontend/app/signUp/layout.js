import Register from '@/components/register'
import React from 'react'

const layout = ({children}) => {
    return (
        <Register
            pageName="Sign Up"
        >
            {children}
        </Register>
    )
}

export default layout