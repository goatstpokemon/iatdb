import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

const Profile = () => {
    const { user } = useContext(AuthContext);
    return <div>Profile</div>;
};

export default Profile;
