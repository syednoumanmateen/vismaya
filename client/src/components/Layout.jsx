import React, { memo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const [show, setShow] = useState(true)
    return (
        <>
            <div className="container-fluid p-0 totalbar">
                <div className="row g-0 p-0">
                    <div className={`${show ? 'col-2' : ''} p-0`}>
                        {show && <Sidebar show={show} />}
                    </div>
                    <div className={`${show ? 'col-10' : ''} p-0`}>
                        <Navbar show={show} setShow={setShow} />
                        <div className="p-3"> <Outlet /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Layout)
