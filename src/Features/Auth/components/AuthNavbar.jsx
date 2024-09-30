import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import { authLogout } from '../services/auth-api';
import { useStateContext } from '../contexts/StateContext';

const AuthNavbar = () => {
   
    const { setToken, setRefreshToken } = useStateContext();
    const navigate = useNavigate();

    const handleAboutUsClick = () => {
        navigate('/about');
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
        <>
            <header className=" w-full p-4 text-white bg-slate-900 fixed top-0 z-50">
                <div className="container flex items-center justify-between mx-auto">
                    <h1 className="text-2xl font-bold">DMS</h1>
                    <nav>
                        <ul className="flex space-x-4 justify-center items-center">

                            <li><Link to="/home" className="hover:underline flex justify-center items-center">Home</Link></li>
                            <li><a href="#features" className="hover:underline flex justify-center items-center">Features</a></li>
                            <li><a href="#examples" className="hover:underline flex justify-center items-center">Examples</a></li>
                            <li><a className="hover:underline flex justify-center items-center" onClick={handleAboutUsClick}>About us</a></li>
                            <li><a className="px-4 py-2 text-blue-600 bg-white rounded hover:bg-gray-200 hover:cursor-pointer" onClick={handleLogout} >Logout</a></li>
                            {/* <li className='flex justify-center items-center'><LogoutButton/></li> */}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default AuthNavbar
