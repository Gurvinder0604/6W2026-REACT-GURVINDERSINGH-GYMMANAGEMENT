// import { useEffect, useState } from "react"
// import MembershipService from "../../../services/MembershipService"
// import { toast } from "react-toastify"
// import { Navigate, useNavigate, useParams } from "react-router-dom"

// export default function Editmembership(){

//     const[planName, setPlanName]=useState('')
//     const nav=useNavigate()

//     // const [PlanName, setPlanName] = useState('')
//     const [Duration, setDuration] = useState('')
//     const [Price, setPrice] = useState('')
//     const [Description, setDescription] = useState('')

//     const useParams= useParams()


//     function Editmembership(e) {
//             e.preventDefault()
//             try {
//                 let payload = {
//                     name: planName,
//                     duration:Duration,
//                     price:Price,
//                     description: Description,
                   
    
//                 }
    
//                 MembershipService.update(payload,params.id)
                
    
//                 toast.success("Trainers Added")
//                 nav('/admin/membershipplan')
//             }catch(err){
//                 console.log("Error: ", err)
//                 toast.error("Error adding trainers")
//             }
    
//         }
//          async function getMembershipplanDetails(){
//             let res = await MembershipService.single(params.id)
//             if(res){
//                 console.log("Res: ", res);
                
//                 setPlanName(res.name)
//                 setDuration(res.Duration)
//                 setPrice(res.Price)
//                 setPhoneNo(res.phoneno)
//                 setDescription(res.description)
                
    
//             }else{
//                 toast.error("No such Document")
//             }
//         }
    
//         useEffect(()=>{
//             getMembershipplanDetails()
//         }, [])
    

//     return(
//         <>
        
//         <div className="container">

//                 <div class="d-flex justify-content-between my-4">
//                     <div >
//                         <h2>Manage Membership Plan</h2>
//                     </div>
//                     <div >
//                         <Link to="/admin/membershipPlan/add"  >
//                             <li><button class="btn btn-primary">Add Membership Plan</button></li>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//              <div className="d-flex justify-content-center mt-5">

//                 <div className="col-lg-7">
//                     <form action="" onSubmit={Editmembership} className="" >


//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4" 
//                             value={planName}
//                             placeholder="Enter Trainer Name" onChange={(e) => { setPlanName(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Duration}
//                             placeholder="Enter Specialsation" onChange={(e) => { setDuration(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Price}
//                             placeholder="Enter Experience" onChange={(e) => { setPrice(e.target.value) }}
//                         />
//                         <input
//                             type="text"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             value={Description}
//                             placeholder="Enter Phoneno" onChange={(e) => { setDescription(e.target.value) }}
//                         />
                        
                        
                       
                        
//                         {/* <input
//                             type="file"
//                             className="w-100 form-control border-0 py-3 mb-4"
//                             placeholder="Enter Image" onChange={(e) => { setImage(e.target.files[0]) }}
//                         /> */}
                        





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



import { useEffect, useState } from "react"
import MembershipService from "../../../services/MembershipService"
import { toast } from "react-toastify"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function Editmembership() {
    const [planName, setPlanName] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const nav = useNavigate()
    const params = useParams()

    async function handleEditMembership(e) {
        e.preventDefault()
        try {
            let payload = {
                name: planName,
                duration: duration,
                price: price,
                description: description,
            }

            await MembershipService.update(payload, params.id)

            toast.success("Membership plan updated successfully")
            nav('/admin/membershipplan')
        } catch (err) {
            console.log("Error: ", err)
            toast.error("Error updating membership plan")
        }
    }

    async function getMembershipplanDetails() {
        try {
            let res = await MembershipService.single(params.id)
            if (res) {
                console.log("Res: ", res)
                setPlanName(res.name || '')
                setDuration(res.duration || res.Duration || '')
                setPrice(res.price || res.Price || '')
                setDescription(res.description || '')
            } else {
                toast.error("No such Document")
            }
        } catch (err) {
            console.log("Error: ", err)
            toast.error("Error fetching plan details")
        }
    }

    useEffect(() => {
        if (params.id) {
            getMembershipplanDetails()
        }
    }, [params.id])

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between my-4">
                    <div>
                        <h2>Manage Membership Plan</h2>
                    </div>
                    <div>
                        <Link to="/admin/membershipPlan/add">
                            <button className="btn btn-primary">Add Membership Plan</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-5">
                <div className="col-lg-7">
                    <form onSubmit={handleEditMembership}>
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={planName}
                            placeholder="Enter Plan Name"
                            onChange={(e) => setPlanName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={duration}
                            placeholder="Enter Duration"
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={price}
                            placeholder="Enter Price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={description}
                            placeholder="Enter Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button
                            className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}