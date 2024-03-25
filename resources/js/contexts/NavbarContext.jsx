import { createContext, useContext, useEffect, useState } from "react";
export const NavbarContext = createContext({
    navItem: "Home",
    Select: () => {},
});

export const NavbarContextProvider = (props) => {
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

export const useNavbarContext = () => useContext(NavbarContext);
