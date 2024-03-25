import ReactDOM from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "../views/Wrapper";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";
import { NavbarContextProvider } from "./contexts/NavbarContext";

import Borrow from "../views/Borrow";
import Lend from "../views/Lend";
import Home from "../views/Home";
import Logout from "../views/Logout";
import SettingsLayout from "../views/cms/settings/SettingsLayout";
import ProfileWrapper from "../views/cms/settings/profile/ProfileWrapper";
import { AccountPage } from "../views/cms/settings/account/AccountPage";
import NotFound from "../views/404";
import Product from "../views/Product";
import LendingPage from "../views/cms/settings/lending/LendingPage";
import AllUsers from "../views/admin/users/AllUsers";
import { AuthContextProvider } from "./contexts/AuthContext";
import YourProducts from "../views/cms/settings/products/YourProducts";

ReactDOM.createRoot(document.getElementById("app")).render(
    <AuthContextProvider>
        <NavbarContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<AppWrapper />}>
                        <Route index path="" element={<Home />} />
                        <Route path="lenen" element={<Borrow />} />
                        <Route path="verhuren" element={<Lend />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/admin/users" element={<AllUsers />} />
                    </Route>
                    <Route path="profile" element={<SettingsLayout />}>
                        <Route index path="" element={<ProfileWrapper />} />
                        <Route path="account" element={<AccountPage />} />
                        <Route path="lending" element={<LendingPage />} />
                        <Route path="products" element={<YourProducts />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/aanmelden" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </NavbarContextProvider>
    </AuthContextProvider>
);
