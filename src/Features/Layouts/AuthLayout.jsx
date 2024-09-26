import React, { useState } from 'react'
import { authLogout } from '../Login/services/auth-api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Login/contexts/StateContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUser } from '../Login/services/user-api';
import { fetchAllDocs } from '../Login/services/document-api';
import AuthNavbar from '../Auth/components/AuthNavbar';
import Home from '../Auth/pages/Home';

const AuthLayout = () => {
  const { user, token, setUser, setToken } = useStateContext();
    const [isOpen, setOpen] = useState(true);
    const navigate= useNavigate();

    const authUser = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser
        
    })
    

    // const logout = useMutation({
    //     mutationFn: authLogout,
    //     onSuccess: () => {
    //         setUser({});
    //         setToken(null);
    //         // toast.success("Logout Successful")
    //     },
    //     onError: (err) => {
    //         console.log(err);
    //     }
    // })
    if (!token) {
        console.log("no token")
        navigate('/home')
    }
    if(authUser.isError){
      return "Something went wrong"+authUser.error.message
    }
    if(authUser.isFetching){
      return "loading..."
    }
    console.log({...authUser});
    // const onLogout = (ev) => {
    //     ev.preventDefault();
    //     logout.mutate()
    // };
  return (
    <>
      <div className=''>
        <AuthNavbar/>
        {/* <div className='mt-20'>AuthLayout</div> */}
        <div className='mt-20 text-2xl '><span>Hello, </span><span>{authUser.data.name}</span></div>
        {/* <Home/> */}
        <main className='mt-10'>

        <Outlet/>
        </main>
      </div>
    </>
  )
}

export default AuthLayout