import ReactDOM from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "../views/Wrapper";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";
import NavbarContextProvider from "./contexts/NavbarContext";
import AuthContextProvider from "./contexts/AuthContext";
import Borrow from "../views/Borrow";
import Lend from "../views/Lend";
import Home from "../views/Home";
import Logout from "../views/Logout";

ReactDOM.createRoot(document.getElementById("app")).render(
    <AuthContextProvider>
        <NavbarContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<AppWrapper />}>
                        <Route path="" element={<Home />} />
                        <Route path="lenen" element={<Borrow />} />
                        <Route path="verhuren" element={<Lend />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/aanmelden" element={<SignUp />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </BrowserRouter>
        </NavbarContextProvider>
    </AuthContextProvider>
);
