import React, { Suspense } from 'react'

import GuestNavbar from '../Guest/components/GuestNavbar'




const GuestLayout = ({children}) => {
  console.log("Hoo this is guest");
  
  return (
    <>
     
        <GuestNavbar />
        {children}
   

    </>
  )
}
export default GuestLayout