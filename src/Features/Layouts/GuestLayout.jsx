import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNavbar from '../Guest/components/GuestNavbar'




 const GuestLayout = ({children}) => {
  return (
    <>
          <GuestNavbar/>
          {children}
          

    </>
  )
}
export default GuestLayout