import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/StateContext';
import { authLogout } from '../services/auth-api';



const Nav = () => {
  const navigate = useNavigate();
  const { setToken, setRefreshToken } = useStateContext();

  // const handleLoginClick = () => {
  //   navigate('/login');
  // };

  const handleAboutUsClick = () => {
    navigate('/about');
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  const handleDocClick=()=>{
    navigate('/docs');
  }

  const handleLogout = (e) => {
    e.preventDefault();
    authLogout()
      .then(() => {
        setToken(null);
        setRefreshToken(null);

       
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');

        // navigate('/login');
        window.location.href="/login"

      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };
  return (
    <header className="absolute w-full p-4 text-white bg-slate-900">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">DMS</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="px-4 py-2 text-blue-600 bg-white rounded hover:bg-gray-200" onClick={handleUpload}>
                Upload
              </a>
            </li>
            <li>
              <a className="hover:underline" onClick={handleDocClick}>
                Docummets
              </a>
            </li>
            <li>
              <a href="#examples" className="hover:underline">
                Examples
              </a>
            </li>
            <li>
              <a className="hover:underline" onClick={handleAboutUsClick}>
                About Us
              </a>
            </li>
            <li>
              <a className="px-4 py-2 text-blue-600 bg-white rounded hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                Logout
              </a>
            </li>
         
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
