
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";
import Home from "./Home/Home";
import Course from "./Course/Course";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Viewtrainer from "./viewtrainer/Viewtrainer";


function UserLayout(){
    return(
        <>
        <UserHeader></UserHeader>

        <Outlet></Outlet>
    
        

        <UserFooter></UserFooter>
        
        </>
    )
}
export default UserLayout