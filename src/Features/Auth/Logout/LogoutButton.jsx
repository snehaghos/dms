import React from "react";
import { useStateContext } from "../contexts/StateContext";


const LogoutButton = () => {
    const { setToken } = useStateContext();

    const handleLogout = () => {
        authLogout()
            .then(() => {
                setToken(null); 
                localStorage.removeItem("ACCESS_TOKEN"); 
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 ease-in-out"
        >
            Logout
        </button>
    );
};

export default LogoutButton;