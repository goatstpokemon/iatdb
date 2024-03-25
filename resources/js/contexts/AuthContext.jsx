import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    getUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
    const [user, _setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    const setUser = (user) => {
        _setUser(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };
    const getUser = () => {
        const user = localStorage.getItem("user");
        if (user) {
            _setUser(JSON.parse(user));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                getUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => useContext(AuthContext);
