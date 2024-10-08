import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/StateContext';
import { useMutation } from '@tanstack/react-query';
import { authLogin } from '../services/auth-api';
import axiosClient from '../../../axios-client';

const Login = () => {
  const { setUser, setToken } = useStateContext();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (response) => {
      console.log(response);
      setUser(response.data);   // Ensure response.data contains the correct user data.
      setToken(response.token); // Ensure response.token contains the correct token.
      navigate('/home');
    },
    onError: (err) => {
      console.log('Login failed:', err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page refresh

    // Get the values from input refs
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // Trigger the login mutation with the payload
    loginMutation.mutate(payload);
  };


  const handleLogin=()=>{
    axiosClient.get("/home").then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
      
    })
  }

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  ref={usernameRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-white">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-white">
                  Sign up
                </Link>

              </p>
            </form>

            <button onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
