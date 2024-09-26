import React, { Suspense } from 'react'
import Nav from '../Auth/components/Nav'


const AuthLayout = ({ children }) => {
  console.log("AuthLayout is rendering");
  return (
    <div>
      <Nav/>
    {children}
    </div>
  );
};

export default AuthLayout