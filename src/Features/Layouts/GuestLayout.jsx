import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNavbar from '../GuestInterface/components/GuestNavbar'
// import Navbar from '../components/Frontend/Navbar'



 const GuestLayout = () => {
  return (
    <>
          <GuestNavbar/>
            <Outlet/>
          

    </>
  )
}
export default GuestLayout