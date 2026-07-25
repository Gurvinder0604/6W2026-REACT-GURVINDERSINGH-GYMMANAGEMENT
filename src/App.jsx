import { BrowserRouter,Routes,Route } from "react-router-dom";

import UserLayout from "./components/User/UserLayout";
import Home from "./components/User/Home/Home";
import Course from "./components/User/Course/Course";
import About from "./components/User/About/About";
import Contact from "./components/User/Contact/Contact";
import Viewtrainer from "./components/User/viewtrainer/Viewtrainer";

import Layout from "./components/Admin/Layout/Layout";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import ManageTrainers from "./components/Admin/trainer/ManageTrainers";
import Addtrainers from "./components/Admin/trainer/Addtrainers";
import { ToastContainer } from "react-toastify";
import Edittrainers from "./components/Admin/trainer/Edittrainers";
import Managemembership from "./components/Admin/membershipplan/Managemembership";
import AddMembership from "./components/Admin/membershipplan/AddMembership";





function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
     <Route path="/"element={<UserLayout/>}>
     <Route path="/" element={<Home/>}></Route>
     <Route path="/course"element={<Course/>}></Route>
     <Route path="/about"element={<About/>}></Route>
     <Route path="/contact"element={<Contact/>}></Route>
     <Route path="/viewtrainer" element={<Viewtrainer/>}></Route>
     </Route>


     <Route path="/admin"element={<Layout/>}>
        <Route path="" element={<Dashboard/>}></Route>
        <Route path="trainers" element={<ManageTrainers/>}></Route>
        <Route path="trainers/add" element={<Addtrainers/>}></Route>
        <Route path="trainers/edit/:id" element={<Edittrainers/>}></Route>
        <Route path="membershipplan" element={<Managemembership/>}></Route>
        <Route path="membershipplan/add" element={<AddMembership/>}></Route>
        

     </Route>








    </Routes>



    </BrowserRouter>
    
    <ToastContainer />
    </>
  )
}
export default App 