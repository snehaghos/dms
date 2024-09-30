import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    userId: null,
    token: null,
    refreshToken: null,
    setUserId: () => {},
    setUser: () => {},
    setToken: () => {},
    setRefreshToken: () => {}
});

export const StateProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, _setUserId] = useState(localStorage.getItem("USER_ID"));
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [refreshToken, _setRefreshToken] = useState(localStorage.getItem("REFRESH_TOKEN"));

    const setUserId = (userId) => {
        _setUserId(userId);
        if (userId) {
            localStorage.setItem("USER_ID", userId); 
        } else {
            localStorage.removeItem("USER_ID");
        }
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setRefreshToken = (refreshToken) => {
        _setRefreshToken(refreshToken);
        if (refreshToken) {
            localStorage.setItem("REFRESH_TOKEN", refreshToken);
        } else {
            localStorage.removeItem("REFRESH_TOKEN");
        }
    };

    return (
        <StateContext.Provider value={{ 
            user, userId, token, refreshToken, setUser, setUserId, setToken, setRefreshToken 
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
