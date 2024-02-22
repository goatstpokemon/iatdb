import ReactDOM from "react-dom/client";
import "../css/app.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppWrapper } from "../views/Wrapper";
import { Login } from "../views/Login";
import { SignUp } from "../views/SignUp";

ReactDOM.createRoot(document.getElementById("app")).render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<AppWrapper />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aanmelden" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
);
