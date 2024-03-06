import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});

    const SetAuth = (user) => {
        localStorage.setItem("loggedIn", true);
        setUser(user);
    };
    const Logout = () => {
        setUser({});

        localStorage.setItem("loggedIn", false);
    };

    return (
        <AuthContext.Provider value={{ user, SetAuth, Logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
