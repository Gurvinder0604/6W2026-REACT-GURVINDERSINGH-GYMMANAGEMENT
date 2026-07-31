import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

function UserLayout(){
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const publicPaths = ["/", "/about", "/course", "/contact", "/viewtrainer", "/login", "/register"];
        const isPublicPath = publicPaths.includes(location.pathname);
        
        if (!isPublicPath) {
            const userStr = localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;
            if (!user || user.userType !== "customer") {
                navigate("/login");
            }
        }
    }, [navigate, location.pathname]);

    return(
        <>
        <UserHeader></UserHeader>
        <Outlet></Outlet>
        <UserFooter></UserFooter>
        </>
    )
}
export default UserLayout