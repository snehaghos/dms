import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GuestLayout from '../Features/Layouts/GuestLayout'
import Indexhome from '../Features/Guest/pages/Home'
import Login from '../Features/Login/components/Login'
import AboutUs from '../Features/Guest/pages/AboutUs'
import Register from '../Features/Login/components/Register'
import Home from '../Features/Auth/pages/Home'
import AuthLayout from '../Features/Layouts/AuthLayout'
import UploadDoc from '../Features/Auth/pages/UploadDoc'




const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GuestLayout />}>
                    <Route index element={<Indexhome />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* <Route path="home" element={<Home/>}/> */}
                </Route>

                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path="home" element={<Home/>}/>
                    <Route path="upload-document" element={<UploadDoc/>}/>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router