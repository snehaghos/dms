import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GuestLayout from '../Features/Layouts/GuestLayout'
import Indexhome from '../Features/Guest/IndexHome'
import Login from '../Features/Login/components/Login'
import AboutUs from '../Features/Guest/pages/AboutUs'



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GuestLayout />}>
                    <Route index element={<Indexhome />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path="login" element={<Login />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router