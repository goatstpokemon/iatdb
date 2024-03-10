import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});

    const SetAuth = (user) => {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };
    const Logout = () => {
        setUser({});
        localStorage.setItem("user", "");
        localStorage.setItem("loggedIn", false);
    };
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, SetAuth, Logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
