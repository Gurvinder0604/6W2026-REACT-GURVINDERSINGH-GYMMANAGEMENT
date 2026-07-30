// import { useEffect, useState } from "react"
// import TrainerService from "../../../services/TrainerService"
// import { toast } from "react-toastify"
// import { Navigate, useNavigate, useParams } from "react-router-dom"

// export default function Edittrainers(){

//     const [trainerName, setTrainerName] = useState('')
   
   
//     const [Specialization, setSpecialzation] = useState('')
//     const [Experience, setExperience] = useState('')   
//     const [PhoneNo, setPhoneNo] = useState('')
//     const [Email, setEmail] = useState('')
//     const [Address, setAddress] = useState('') 
//      const [Image, setImage] = useState('')

//     const params = useParams()
//      const nav=useNavigate()
    
//    function editTrainers(e) {
//         e.preventDefault()
//         try {
//             let payload = {
//                 name: trainerName,
//                 specialisation:Specialisation,
//                 experience:Experience,
//                 phoneno: PhoneNo,
//                 emai: Email,               
//                 Image:ImageUrl

                

//             }

//             TrainerService.update(payload,params.id)
//             nav(-1)

//             toast.success("Trainers Added")
//             nav('/admin/trainers')
//         }catch(err){
//             console.log("Error: ", err)
//             toast.error("Error adding trainers")
//         }

//     }
//      async function getTrainersDetails(){
//         let res = await TrainerService.single(params.id)
//         if(res){
//             console.log("Res: ", res);
            
//             setTrainerName(res.name)
//             setSpecialzation(res.Specialization)
//             setExperience(res.Experience)
//             setPhoneNo(res.phoneno)
//             setEmail(res.email)
//             setAddress(res.Address)
//             setImage(res.ImageUrl)

//         }else{
//             toast.error("No such Document")
//         }
//     }

//     useEffect(()=>{
//         getTrainersDetails()
//     }, [])




//     return(
//         <>
//          <div className="container">

//                 <div class="d-flex justify-content-between my-4">
//                     <div >
//                         <h2>Manage Trainers</h2>
//                     </div>
//                     <div >
//                        <li> <button class="btn btn-primary">Add Trainer</button></li>
//                     </div>
//                 </div>
//             </div>

            
//             <div className="d-flex justify-content-center mt-5">

//                 <div className="col-lg-7">
//                     <form action="" onSubmit={editTrainers} className="" >


//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4" 
//                             value={trainerName}
//                             placeholder="Enter Trainer Name" onChange={(e) => { setTrainerName(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Specialzation}
//                             placeholder="Enter Specialzation" onChange={(e) => { setSpecialzation(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Experience}
//                             placeholder="Enter Experience" onChange={(e) => { setExperience(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={PhoneNo}
//                             placeholder="Enter Phoneno" onChange={(e) => { setPhoneNo(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Email}
//                             placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }}
//                         />
//                          <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Address}
//                             placeholder="Enter Address" onChange={(e) => { setAddress(e.target.value) }}
//                         />
                        
//                         {/* <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Subject}
//                             placeholder="Enter Subject" onChange={(e) => { setSubject(e.target.value) }}
//                         /> */}
                        
//                         <input
//                             type="file"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             placeholder="Enter Image" onChange={(e) => { setImage(e.target.files[0]) }}
//                         />
                        





//                         <button
//                             className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
//                             type="submit"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>

//             </div>

        
        
//         </>
//     )
// }


import { useEffect, useState } from "react";
import TrainerService from "../../../services/TrainerService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


export default function Edittrainers() {

    const [trainerName, setTrainerName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    async function editTrainers(e) {
        e.preventDefault();

        try {
            const payload = {
                name: trainerName,
                specialization: specialization,
                experience: experience,
                phoneno: phoneNo,
                email: email,
                address: address,
                image: image
            };

            await TrainerService.update(payload, params.id);

            toast.success("Trainer Updated Successfully");
            navigate("/admin/trainers");

        } catch (err) {
            console.log(err);
            toast.error("Error Updating Trainer");
        }
    }

    async function getTrainerDetails() {
        try {
            const res = await TrainerService.single(params.id);

            console.log(res);

            if (res) {
                setTrainerName(res.name);
                setSpecialization(res.specialization);
                setExperience(res.experience);
                setPhoneNo(res.phoneno);
                setEmail(res.email);
                setAddress(res.address);
                setImage(res.image);
            } else {
                toast.error("Trainer Not Found");
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTrainerDetails();
    }, []);

    return (
        <>
            <div className="container">

                <div className="d-flex justify-content-between my-4">
                    <h2>Edit Trainer</h2>
                </div>

                <div className="d-flex justify-content-center">

                    <div className="col-lg-7">

                        <form onSubmit={editTrainers}>

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Trainer Name"
                                value={trainerName}
                                onChange={(e) => setTrainerName(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Specialization"
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Experience"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Phone Number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <input
                                type="file"
                                className="form-control mb-3"
                                onChange={(e) => setImage(e.target.files[0])}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Update Trainer
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}