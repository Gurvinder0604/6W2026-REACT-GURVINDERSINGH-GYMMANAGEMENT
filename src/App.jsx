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
import AddMembership from "./components/Admin/membershipplan/Addmembership";
// import { ToastContainer } from "react-toastify";
import Editmembership from "./components/Admin/membershipplan/Editmembership";

import ManageMembers from "./components/Admin/Members/ManageMembers";
import ManageWorkouts from "./components/Admin/Workout/ManageWorkouts";
import ManageDietPlans from "./components/Admin/DietPlan/ManageDietPlans";



import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CustomerDashboard from "./components/User/Dashboard/CustomerDashboard";
import BrowseMemberships from "./components/User/Membership/BrowseMemberships";
import MembershipDetails from "./components/User/Membership/MembershipDetails";
import ViewWorkout from "./components/User/Workout/ViewWorkout";
import ViewDietPlans from "./components/User/DietPlan/ViewDietPlans";
import TrackProgress from "./components/User/Progress/TrackProgress";
import ManageProfile from "./components/User/Profile/ManageProfile";

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
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/register" element={<Register/>}></Route>
     <Route path="/dashboard" element={<CustomerDashboard/>}></Route>
     <Route path="/browse-memberships" element={<BrowseMemberships/>}></Route>
     <Route path="/membership-details" element={<MembershipDetails/>}></Route>
     <Route path="/view-workouts" element={<ViewWorkout/>}></Route>
     <Route path="/view-diet-plans" element={<ViewDietPlans/>}></Route>
     <Route path="/track-progress" element={<TrackProgress/>}></Route>
     <Route path="/manage-profile" element={<ManageProfile/>}></Route>
     </Route>




     <Route path="/admin"element={<Layout/>}>
        <Route path="" element={<Dashboard/>}></Route>
        <Route path="trainers" element={<ManageTrainers/>}></Route>
        <Route path="trainers/add" element={<Addtrainers/>}></Route>
        <Route path="trainers/edit/:id" element={<Edittrainers/>}></Route>
        <Route path="membershipplan" element={<Managemembership/>}></Route>
        <Route path="membershipplan/add" element={<AddMembership/>}></Route>
        <Route path="membershipplans/edit/:id" element={<AddMembership/>}></Route>
        <Route path="members" element={<ManageMembers/>}></Route>
        <Route path="workouts" element={<ManageWorkouts/>}></Route>
        <Route path="dietplans" element={<ManageDietPlans/>}></Route>
     </Route>








    </Routes>



    </BrowserRouter>
    
    <ToastContainer />
    </>
  )
}
export default App 