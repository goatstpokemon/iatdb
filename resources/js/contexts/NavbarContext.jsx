import { createContext, useEffect, useState } from "react";
export const NavbarContext = createContext();

const NavbarContextProvider = (props) => {
    const [navItem, setNavItem] = useState("Home");

    const Select = (item) => {
        setNavItem(item);
    };

    return (
        <NavbarContext.Provider value={{ navItem, Select }}>
            {props.children}
        </NavbarContext.Provider>
    );
};

export default NavbarContextProvider;
