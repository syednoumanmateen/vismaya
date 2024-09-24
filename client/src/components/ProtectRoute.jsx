import React, { memo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectRoute = ({ children }) => {
    const { authState } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            {children}
            {/* {authState.isAuthenticated ? children : navigate("/login")} */}
        </>
    )
}

export default memo(ProtectRoute)
