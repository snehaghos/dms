import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadDoc from '../../Document/Forms/UploadDoc';

const GuestNavbar = () => {
  const navigate=useNavigate();
  const handleLoginClick=()=>{
          navigate('/login');
  }
  const handleAboutUsClick=()=>{
    navigate('/about');
  }
  const homeClick=()=>{
    navigate('/');
  }


  return (
    <header className="absolute w-full p-4 text-white bg-slate-900">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">DMS</h1>
        <nav>
          <ul className="flex space-x-4">
         
            <li><a onClick={homeClick} className="hover:underline">Home</a></li>
            <li><a href="#examples" className="hover:underline">Examples</a></li>
            <li><a className="hover:underline" onClick={handleAboutUsClick}>About us</a></li>
            <li><a className="px-4 py-2 text-blue-600 bg-white rounded hover:bg-gray-200 cursor-pointer" onClick={handleLoginClick}>Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default GuestNavbar;
