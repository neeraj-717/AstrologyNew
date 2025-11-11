import React from 'react'
import Header from './Dashboardheader'
import { Outlet } from 'react-router-dom'
import Footer from './Dashboardfooter'
import Dashboardsidebar from './Dashboardsidebar'

const Dashboardmaster = () => {
    return (
        <>
            <Header />
            <div className='flex'>
                <Dashboardsidebar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Dashboardmaster