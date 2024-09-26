
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AboutUs from '../Features/Guest/pages/AboutUs';
import Login from '../Features/Auth/components/Login';
import Register from '../Features/Auth/components/Register';
import Indexhome from '../Features/Guest/IndexHome';






const GuestRouter = () => {
console.log("i am in guestR");

  return (
    <Routes>

      <Route index element={<Indexhome />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to={"/"}/>}/>

    </Routes>
  )

};

export default GuestRouter;
