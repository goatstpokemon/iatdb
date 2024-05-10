import ReactDOM from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "../views/Wrapper";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";
import { NavbarContextProvider } from "./contexts/NavbarContext";

import Lend from "../views/Lend";
import Home from "../views/Home";
import Logout from "../views/Logout";
import SettingsLayout from "../views/cms/settings/SettingsLayout";
import ProfileWrapper from "../views/cms/settings/profile/ProfileWrapper";
import { AccountPage } from "../views/cms/settings/account/AccountPage";
import NotFound from "../views/404";
import Product from "../views/Product";
import LendingPage from "../views/cms/settings/lending/LendingPage";
import { AuthContextProvider } from "./contexts/AuthContext";
import YourProducts from "../views/cms/settings/products/YourProducts";
import AddProduct from "../views/cms/settings/products/AddProduct";
import EditProducts from "../views/cms/settings/products/EditProducts";
import CategoryStore from "../views/shop/CategoryStore";
import CategoriesList from "../views/shop/CategoriesList";
import ViewRequest from "../views/shop/Requests/ViewRequest";
import AllUsers from "../views/cms/admin/users/AllUsers";
import User from "../views/shop/User";
import AdminDashboard from "../views/cms/admin/AdminDashboard";
import AllProducts from "../views/cms/admin/products/AllProducts";
import AdminEditProducts from "../views/cms/admin/products/EditProducts";
import AllCategories from "../views/cms/admin/categories/AllCategories";
import AddCategory from "../views/cms/admin/categories/AddCategory";
import AdminEditCategory from "../views/cms/admin/categories/EditCategory";
import EditUser from "../views/cms/admin/users/EditUser";
ReactDOM.createRoot(document.getElementById("app")).render(
    <AuthContextProvider>
        <NavbarContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<AppWrapper />}>
                        <Route index path="" element={<Home />} />
                        <Route path="lenen" element={<CategoriesList />} />
                        <Route path="verhuren" element={<Lend />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="users/:id" element={<User />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AllUsers />} />
                        <Route
                            path="/admin/products"
                            element={<AllProducts />}
                        />
                        <Route
                            path="/admin/products/:id/edit"
                            element={<AdminEditProducts />}
                        />
                        <Route
                            path="/admin/users/:id/edit"
                            element={<EditUser />}
                        />
                        <Route
                            path="/admin/categories/:id/edit"
                            element={<AdminEditCategory />}
                        />
                        <Route
                            path="/admin/categories"
                            element={<AllCategories />}
                        />
                        <Route
                            path="/admin/categories/add"
                            element={<AddCategory />}
                        />
                        <Route
                            path="/products/categories/:id"
                            element={<CategoryStore />}
                        />

                        <Route path="request/:id" element={<ViewRequest />} />
                    </Route>
                    <Route path="profile" element={<SettingsLayout />}>
                        <Route index path="" element={<ProfileWrapper />} />
                        <Route path="account" element={<AccountPage />} />
                        <Route path="lending" element={<LendingPage />} />
                        <Route path="products" element={<YourProducts />} />
                        <Route path="products/add" element={<AddProduct />} />
                        <Route
                            path="products/:id/edit"
                            element={<EditProducts />}
                        />
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
