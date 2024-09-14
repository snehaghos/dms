import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNavbar from '../Guest/components/GuestNavbar'




 const GuestLayout = () => {
  return (
    <>
          <GuestNavbar/>
            <Outlet/>
          

    </>
  )
}
export default GuestLayout