
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadDoc from '../Features/Document/Forms/UploadDoc';
import DocumentIndex from '../Features/Document/components/DocumentIndex';
import Home from '../Features/Auth/pages/Home';
import NotFound from '../Features/Auth/components/NotFound';



const AuthRouter = () => {
  console.log("I am in auth Layout");
  
  return(
  <Routes>
   
      <Route index element={<Home/>} />
      <Route path="/upload" element={<UploadDoc />} />
      <Route path="/docs" element={<DocumentIndex />} />
      <Route path="*" element={<NotFound/>}/>

  </Routes>
  );
}

export default AuthRouter;
