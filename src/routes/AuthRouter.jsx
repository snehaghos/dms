import React from 'react'
import Home from '../Features/Auth/pages/Home';
import AboutUs from '../Features/Guest/pages/AboutUs';
import AllDocuments from '../Features/Document/components/AllDocuments';
import { Route, Routes } from 'react-router-dom';
import UploadDoc from '../Features/Document/components/UploadDoc';
import MultiImageToPdf from '../Features/DocumentConversion/pages/MultiImageToPdf';

const AuthRouter = () => {
    console.log("I am in auth Layout");
  return (
    <>
      <Routes>
            <Route index element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/upload-document" element={<UploadDoc/>}/>
            <Route path="/all-document" element={<AllDocuments/>}/>
            <Route path="/to-pdf" element={<MultiImageToPdf/>}/>
      </Routes>
    </>
  )
}

export default AuthRouter
