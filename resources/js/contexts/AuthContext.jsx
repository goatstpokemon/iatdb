import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const SetAuth = (user) => {
        setUser(user);
        setIsLoggedIn(true);
    };
    const Logout = () => {
        setUser({});
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ user, SetAuth, isLoggedIn, Logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
