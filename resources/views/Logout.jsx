import apiClient from "@/api";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useEffect } from "react";

const Logout = () => {
    const { setToken, setUser } = useAuthContext();

    useEffect(() => {
        apiClient
            .get("http://localhost:8000/api/logout")
            .then(() => {
                setToken(null);
                setUser(null);
            })
            .then(() => {
                window.location.replace("/login");
            });
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;
