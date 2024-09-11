import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GuestLayout from '../Layouts/GuestLayout'
import Indexhome from '../GuestInterface/IndexHome'
import AboutUs from '../GuestInterface/pages/AboutUs'
import Login from '../Login/components/Login'

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