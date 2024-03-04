import apiClient from "@/api";
import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { Logout } = useContext(AuthContext);
    const history = useNavigate();
    useEffect(() => {
        Logout();
        apiClient.post("http://localhost:8000/api/logout");
        setTimeout(() => {
            history("/login");
        }, 1000);
    }, []);

    return <div>Je wordt doorverwzen naar de inlog pagina</div>;
};

export default Logout;
