import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const history = useNavigate();
    const { user, isLoggedIn } = useContext(AuthContext);
    console.log({ user, isLoggedIn });
    useEffect(() => {
        if (isLoggedIn === false) {
            history("/login");
        }
    }, [isLoggedIn]);
    return <div>{isLoggedIn ? <h1>Hello {user.name}</h1> : ""}</div>;
};

export default Home;
